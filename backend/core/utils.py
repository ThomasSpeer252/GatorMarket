from datetime import date
from core.models import Listing

def addListing(listing_number, title, description, price, image_location):
     #Add a single listing to the database

    date_created = date.today


    obj, created = Listing.objects.get_or_create(listing_number=listing_number, defaults={"title": title, "description": description, "date_created": date_created, "price": price, "image_location": image_location}) #Use ORM to create the listing 

    if created:
        print(f"Listing {listing_number}:{obj.title} inserted in database")#If created, return true. If the listing number already exists or the operation fails, return false
        return True
    else:
        print(f"Listing {listing_number}:{obj.title} failed insertion into the database")
        return False
