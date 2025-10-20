import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # .../backend/scripts
PROJECT_DIR = os.path.dirname(BASE_DIR)                 # .../backend
sys.path.append(PROJECT_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
django.setup()

from core.utils import getHighestKeyNum

def main():

    highest_num = getHighestKeyNum("account")

    print(f"The current highest account number is {highest_num}.")

    highest_num = getHighestKeyNum("listing")

    print(f"The current highest listing number is {highest_num}.")

    highest_num = getHighestKeyNum("transaction")

    print(f"The current highest transaction ID is {highest_num}.")

    highest_num = getHighestKeyNum("blablabla")



        
main()
