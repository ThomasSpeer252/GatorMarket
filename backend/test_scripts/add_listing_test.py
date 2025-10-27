import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # .../backend/scripts
PROJECT_DIR = os.path.dirname(BASE_DIR)                 # .../backend
sys.path.append(PROJECT_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
django.setup()

from core.utils import addListing
from core.models import Listing

def main():

    testListing = addListing(listing_number=1, title="Used Toilet", description="Slightly used toilet, minor poop stains", price=100, image_location = "file/test", category = "product", original_poster = "sarah123")

    if testListing:
        print("Listing successfully added")
    else:
        print("Listing add unsuccessful")

        
main()
