import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # .../backend/scripts
PROJECT_DIR = os.path.dirname(BASE_DIR)                 # .../backend
sys.path.append(PROJECT_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
django.setup()

from core.utils import addTransaction
from core.models import Transaction

def main():

    testTransaction = addTransaction(transaction_id=1, lister_username="Ren", buyer_username="Stimpy")

    if testTransaction:
        print("Transaction successfully added")
    else:
        print("Transaction add unsuccessful")

        
main()
