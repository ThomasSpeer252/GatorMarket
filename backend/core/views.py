from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.serializers import serialize
import json
from .models import Listing, Account, Transaction
from .utils import addListing, addAccount, addTransaction, getHighestKeyNum
from django.db.models import Q

def test_api(request):
    return JsonResponse({"message": "Hello from GatorMarket backend API!"})

@csrf_exempt
def listings_api(request):
    #listings with categories of -1 will NOT appear. Category of -1 indicates that the transaction completed, so the listing does not need to be there anymore.
    if request.method == "GET": #get listing objects
        # Get all listings
        #listings = Listing.objects.all()
        listings = Listing.objects.exclude(category='-1').order_by('-listing_number')

        # filter parameters
        category = request.GET.get("category")
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        keyword = request.GET.get("keyword")
        date_posted = request.GET.get("date_posted")

        # Apply filters if they are used
        if category:
            listings = listings.filter(category__iexact=category)
        if min_price:
            listings = listings.filter(price__gte=min_price)
        if max_price:
            listings = listings.filter(price__lte=max_price)
        if keyword:
            listings = listings.filter(Q(title__icontains=keyword) | Q(description__icontains=keyword))
        if date_posted:
            listings = listings.filter(date_posted__date=date_posted)


        #example api call with filters applied:
        #GET http://localhost:8000/api/listings/?category=Electronics&keyword=macbook&min_price=100&max_price=1000
        #(get listing with category Electronics, keyword macbook, price between 100 and 1000 dollars)

        # Convert to list of dictionaries
        listings_data = list(listings.values())
        return JsonResponse(listings_data, safe=False)

    elif request.method == "POST": #create a new listing object
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

            #if transaction completes...
            if success:
                listing_number = data.get("listing_number") #tries to get the listing number included in the POST
                if listing_number:
                    try: #if found, remove the listing with the corresponding listing number by setting category to -1
                        listing = Listing.objects.get(listing_number=listing_number)
                        listing.category = "-1"
                        listing.save()
                    except Listing.DoesNotExist:
                        return JsonResponse({
                            "warning": "Transaction created, but listing not found to update."
                        }, status=201)
                return JsonResponse({"message": "Transaction added successfully", "transaction_id": new_transaction_number}, status=201)
            else:
                return JsonResponse({"error": "Transaction already exists"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)