from fastapi import FastAPI
import json
#from gold_price import get_gold_price
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import requests
import os


def get_gold_price():
    """
    Fetch the real-time gold price in USD per ounce from GoldAPI.
    """
    api_key = "goldapi-dml919m3td57vl-io"
    symbol = "XAU"
    curr = "USD"
    url = f"https://www.goldapi.io/api/{symbol}/{curr}"

    headers = {
        "x-access-token": api_key,
        "Content-Type": "application/json",
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise exception for HTTP errors

        # Parse the API response
        data = response.json()
        gold_price_per_ounce = data.get("price")

        if gold_price_per_ounce is not None:
            # Convert from ounce to gram
            gold_price_per_gram = gold_price_per_ounce / 31.1035
            return round(gold_price_per_gram, 2)
        else:
            print("Error: Gold price not found in the API response.")
            return None
    except requests.exceptions.RequestException as e:
        print("Error:", str(e))
        return None




app = FastAPI()

#@app.get("/")
#def read_root():
    #return {"message": "Hello from FastAPI"}

#if __name__ == "__main__":
    #import uvicorn
    #uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)








# Load product data from JSON file
with open("backend/data.json") as f:
    products = json.load(f)




@app.get("/api/products")
def get_products():
    """
    API endpoint to fetch products with dynamically calculated prices and image URLs.
    """
    gold_price = get_gold_price()
    if not gold_price:
        return {"error": "Could not fetch gold price"}

    updated_products = []

    for product in products:
        try:
            # Calculate the price
            price = (product["popularityScore"]/100 + 1) * product["weight"] * gold_price

            # Retain image URLs directly
            updated_product = {
                "name": product["name"],
                "popularityScore": round(product["popularityScore"] / 20, 1),  # Convert to 5-point scale
                "weight": product["weight"],
                "price": round(price, 2),  # Round price to 2 decimal places
                "images": product["images"],  # Keep the image URLs
            }
            updated_products.append(updated_product)
        except Exception as e:
            print(f"Error processing product {product['name']}: {e}")

    return {"products": updated_products}

# Serve static files under /static
#app.mount("/", StaticFiles(directory="backend/build", html=True), name="static")

# Serve React app for unknown routes
@app.get("/{full_path:path}")
def serve_react_app(full_path: str):
    if not os.path.exists(f"backend/build/{full_path}"):
        return FileResponse("backend/build/index.html")
    return FileResponse(f"backend/build/{full_path}")
