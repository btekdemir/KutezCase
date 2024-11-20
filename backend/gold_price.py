import requests


def get_gold_price():
    """
    Fetch the real-time gold price in USD per ounce from GoldAPI.
    """
    api_key = "goldapi-4v43y3sm3q2ky02-io"
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
