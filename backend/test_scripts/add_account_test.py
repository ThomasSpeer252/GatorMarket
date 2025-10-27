import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # .../backend/scripts
PROJECT_DIR = os.path.dirname(BASE_DIR)                 # .../backend
sys.path.append(PROJECT_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
django.setup()

from core.utils import addAccount
from core.models import Account

def main():

    testAccount = addAccount(account_number= 1, username= "boobo", password= "password", email= "mary.rocks@gmail.com" , phone_number = "561-222-3324", rating = "4", isSeller = True, isAdmin = False)

    if testAccount:
        print("Account successfully added")
    else:
        print("Account add unsuccessful.")

        
main()
