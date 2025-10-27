from datetime import date
from core.models import Listing, Account, Transaction
from django.db.models import Max

def addListing(listing_number, title, description, price, image_location, category, original_poster):
     #Add a single listing to the database

    date_created = date.today()


    obj, created = Listing.objects.get_or_create(listing_number=listing_number, defaults={"title": title, "description": description, "date_created": date_created, "price": price, "image_location": image_location, "category": category, "original_poster": original_poster}) #Use ORM to create the listing 

    if created:
        #will create a new listing ONLY IF an existing listing number hasnt been already found
        print(f"Listing {listing_number}:{obj.title} inserted in table")#If created, return true. If the listing number already exists or the operation fails, return false
        return True
    else:
        print(f"Listing {listing_number}:{obj.title} failed insertion in table")
        return False

def addAccount(account_number, username, password, email, phone_number, rating, isSeller, isAdmin):
    obj, created = Account.objects.get_or_create(account_number=account_number, defaults={"username": username, "password": password, "email": email, "phone_number": phone_number, "rating" : rating, "isseller" : isSeller, "isadmin": isAdmin})

    if created:
        print(f"Account {account_number}:{obj.username} inserted in table")
        return True
    else:
        print(f"Account {account_number}:{obj.username} failed insertion in table")
        return False

def addTransaction(transaction_id, lister_username, buyer_username):
    date_closed = date.today()

    obj, created = Transaction.objects.get_or_create(transaction_id = transaction_id, defaults = {"lister_username": lister_username, "buyer_username": buyer_username, "date_closed":date_closed})

    if created:
        print(f"Transaction {transaction_id}:{obj.lister_username} and {obj.buyer_username} inserted in table")
        return True
    else:
        print(f"Transaction {transaction_id}:{obj.lister_username} and {obj.buyer_username} failed insertion in table")
        return False

def getHighestKeyNum(table_to_look_at): #will look at a table depending on the parameter and return the highest listing number, account_number or transaction_id
    
    if table_to_look_at == "account":
        max_account_number = Account.objects.aggregate(Max("account_number"))["account_number__max"]
        return max_account_number or 0

    elif table_to_look_at == "listing":
        max_listing_number = Listing.objects.aggregate(Max("listing_number"))["listing_number__max"]
        return max_listing_number or 0


    elif table_to_look_at == "transaction":
        max_transaction_id = Transaction.objects.aggregate(Max("transaction_id"))["transaction_id__max"]
        return max_transaction_id or 0


    else:
        print("Invalid table.")
        return -1