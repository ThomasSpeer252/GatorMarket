from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.serializers import serialize
import json
from .models import Listing, Account, Transaction
from .utils import addListing, addAccount, addTransaction, getHighestKeyNum

def test_api(request):
    return JsonResponse({"message": "Hello from GatorMarket backend API!"})

@csrf_exempt
def listings_api(request):
    if request.method == "GET": #return list of all listing objects
        listings = list(Listing.objects.values())
        return JsonResponse(listings, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)

            # Optionally get next listing number
            new_listing_number = getHighestKeyNum("listing") + 1

            success = addListing(
                new_listing_number,
                data["title"],
                data["description"],
                data["price"],
                data["image_location"],
                data["category"],
                data["original_poster"],
            )

            if success:
                return JsonResponse({"message": "Listing added successfully", "listing_number": new_listing_number}, status=201)
            else:
                return JsonResponse({"error": "Listing already exists"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def account_api(request):
    if request.method == "GET": #return list of all listing objects
        accounts = list(Account.objects.values())
        return JsonResponse(accounts, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)

            # Optionally get next listing number
            new_account_number = getHighestKeyNum("account") + 1

            success = addAccount(
                new_account_number,
                data["username"],
                data["password"],
                data["email"],
                data["phone_number"],
                data["rating"],
                data["isseller"],
                data["isadmin"],
            )

            if success:
                return JsonResponse({"message": "Account added successfully", "account_number": new_account_number}, status=201)
            else:
                return JsonResponse({"error": "Account already exists"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def transaction_api(request):
    if request.method == "GET": #return list of all listing objects
        transactions = list(Transaction.objects.values())
        return JsonResponse(transactions, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)

            # Optionally get next listing number
            new_transaction_number = getHighestKeyNum("transaction") + 1

            success = addTransaction(
                new_transaction_number,
                data["lister_username"],
                data["buyer_username"],
            )

            if success:
                return JsonResponse({"message": "Transaction added successfully", "transaction_id": new_transaction_number}, status=201)
            else:
                return JsonResponse({"error": "Transaction already exists"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)