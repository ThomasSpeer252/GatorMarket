GatorMarket is a student markeplace for UF gators. It is a platform for students to easily buy and exchange items with eachother on campus 


---SETUP GUIDE---
1. download repo
2. navigate to directory
3. run "docker pull postgres:15" if you do not have the image installed
4. run "docker-compose up --build"
5. profit



-----ORM-----

in backend/test_scripts there is a test script called add_listing_test.py

Run it from the /backend directory with "docker compose exec backend python test_scripts/add_listing_test.py"

It will fail because that listing number is already in the database

To get it to work, simply change the listing number in the test script then run it with the command above


----TO-DO-----
* test scripts for add transaction and add account
