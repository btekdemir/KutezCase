from fastapi import FastAPI
import json
from gold_price import get_gold_price
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles



app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:3001","https://my-react-frontend.onrender.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)



app.mount("/", StaticFiles(directory="frontend/build", html=True), name="static")





# Load product data from JSON file
with open("data.json") as f:
    products = json.load(f)




@app.get("/products")
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
