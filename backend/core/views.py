from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.serializers import serialize
import json
from .models import Listing, Account, Transaction
from .utils import addListing, addAccount, addTransaction, getHighestKeyNum
from django.db.models import Q
from django.conf import settings


def test_api(request):
    return JsonResponse({"message": "Hello from GatorMarket backend API!"})


@csrf_exempt
def listings_api(request):
    # listings with category -1 don't appear (sold)
    if request.method == "GET":
        # all active listings, newest first
        listings = Listing.objects.exclude(category='-1').order_by('-listing_number')

        # filter parameters
        category = request.GET.get("category")
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        keyword = request.GET.get("keyword")
        date_posted = request.GET.get("date_posted")

        # apply filters
        if category:
            listings = listings.filter(category__iexact=category)
        if min_price:
            listings = listings.filter(price__gte=min_price)
        if max_price:
            listings = listings.filter(price__lte=max_price)
        if keyword:
            listings = listings.filter(
                Q(title__icontains=keyword) | Q(description__icontains=keyword)
            )
        if date_posted:
            listings = listings.filter(date_posted__date=date_posted)

        # convert to list
        listings_data = list(listings.values())

        # ADD IMAGE URL HERE
        for item in listings_data:
            if item.get("image_location"):
                # Build full URL: http://127.0.0.1:8000/media/images/….
                item["image_url"] = request.build_absolute_uri(
                    settings.MEDIA_URL + item["image_location"]
                )

        return JsonResponse(listings_data, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)

            # next listing number
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
                return JsonResponse(
                    {"message": "Listing added successfully",
                     "listing_number": new_listing_number},
                     status=201
                )
            else:
                return JsonResponse({"error": "Listing already exists"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def account_api(request, account_number=None):
    # If account_number is provided in the URL, support GET (detail), PUT (update)
    if account_number is not None:
        if request.method == "GET":
            try:
                acc = Account.objects.get(account_number=account_number)
                acc_data = {
                    "account_number": acc.account_number,
                    "username": acc.username,
                    "password": acc.password,
                    "email": acc.email,
                    "phone_number": acc.phone_number,
                    "rating": acc.rating,
                    "isseller": acc.isseller,
                    "isadmin": acc.isadmin,
                }
                return JsonResponse(acc_data, safe=False)
            except Account.DoesNotExist:
                return JsonResponse({"error": "Account not found"}, status=404)

        elif request.method == "PUT":
            try:
                data = json.loads(request.body)
                try:
                    acc = Account.objects.get(account_number=account_number)
                except Account.DoesNotExist:
                    return JsonResponse({"error": "Account not found"}, status=404)

                # update fields if present
                acc.username = data.get("username", acc.username)
                acc.password = data.get("password", acc.password)
                acc.email = data.get("email", acc.email)
                acc.phone_number = data.get("phone_number", acc.phone_number)
                acc.rating = data.get("rating", acc.rating)
                acc.isseller = data.get("isseller", acc.isseller)
                acc.isadmin = data.get("isadmin", acc.isadmin)
                acc.save()

                acc_data = {
                    "account_number": acc.account_number,
                    "username": acc.username,
                    "password": acc.password,
                    "email": acc.email,
                    "phone_number": acc.phone_number,
                    "rating": getattr(acc, "rating", 0),
                    "isseller": acc.isseller,
                    "isadmin": acc.isadmin,
                }
                return JsonResponse(acc_data, status=200)
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=500)

        else:
            return JsonResponse({"error": "Invalid request method"}, status=405)

    # No account_number in URL: support list (GET) and create (POST)
    if request.method == "GET":
        accounts = list(Account.objects.values())
        return JsonResponse(accounts, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)

            new_account_number = getHighestKeyNum("account") + 1

            success = addAccount(
                new_account_number,
                data["username"],
                data["password"],
                data["email"],
                data["phone_number"],
                data.get("rating", 0),
                data.get("isseller", False),
                data.get("isadmin", False),
            )

            if success:
                return JsonResponse(
                    {"message": "Account added successfully",
                     "account_number": new_account_number},
                     status=201
                )
            else:
                return JsonResponse({"error": "Account already exists"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def transaction_api(request):
    if request.method == "GET":
        transactions = list(Transaction.objects.values())
        return JsonResponse(transactions, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)

            new_transaction_number = getHighestKeyNum("transaction") + 1

            success = addTransaction(
                new_transaction_number,
                data["lister_username"],
                data["buyer_username"],
            )

            if success:
                # if listing number supplied, mark it sold
                listing_number = data.get("listing_number")
                if listing_number:
                    try:
                        listing = Listing.objects.get(listing_number=listing_number)
                        listing.category = "-1"
                        listing.save()
                    except Listing.DoesNotExist:
                        return JsonResponse(
                            {"warning": "Transaction created, but listing not found to update."},
                            status=201
                        )

                return JsonResponse(
                    {"message": "Transaction added successfully",
                     "transaction_id": new_transaction_number},
                     status=201
                )
            else:
                return JsonResponse({"error": "Transaction already exists"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
