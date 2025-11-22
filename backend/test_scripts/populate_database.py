import os
import sys
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # .../backend/scripts
PROJECT_DIR = os.path.dirname(BASE_DIR)                 # .../backend
sys.path.append(PROJECT_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
django.setup()


from core.utils import addTransaction
from core.utils import addListing
from core.utils import addAccount
from core.models import Account
from core.models import Listing
from core.models import Transaction





def load_json(path):
    with open(path, "r") as file:
            return json.load(file)

def main():
    accounts = load_json("/app/dummy_data/accounts.json")
    listings = load_json("/app/dummy_data/listings.json")
    transactions = load_json("/app/dummy_data/transactions.json")

    print("Adding Accounts")
    for account in accounts:
            addAccount(account_number=account["account_number"], username=account["username"], password=account["password"], email=account["email"], phone_number=account["phone_number"], rating=account["rating"], isSeller=account["isSeller"], isAdmin=account["isAdmin"])
    print("Accounts Added")
    print("Adding Listings")
    for listing in listings:
        addListing(listing_number=listing["listing_number"], title=listing["title"], description=listing["description"], price=listing["price"], image_location=listing["image_location"], category=listing["category"], original_poster=listing["original_poster"])
    print("Listings Added")
    print("Adding Transactions")
    for transaction in transactions:
         addTransaction(transaction_id=transaction["transaction_id"], lister_username=transaction["lister_username"], buyer_username=transaction["buyer_username"])
    print("Transactions Added")
    print("All data loaded to database")
        

main()
