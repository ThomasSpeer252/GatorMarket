GatorMarket is a student markeplace for UF gators. It is a platform for students to easily buy and exchange items with eachother on campus 


---SETUP GUIDE---
1. download repo
2. navigate to directory
3. run "docker pull postgres:15" if you do not have the image installed
5. run "docker-compose up --build"
6. profit

**When new files are added to the Docker directory, run "docker-compose up --build" again to make them visible and usable by Docker**



-----RUNNING ORM TEST SCRIPTS-----

Test scripts are located in backend/test_scripts

Run them from the /backend directory with "docker compose exec backend python test_scripts/test_name.py"

Printed statements, as well as the returning of Boolean variables will indicate whether respective tests pass or fail.


-----VIEWING THE DATABASE-----
1. Select the "db" container in Docker
2. Select the "Exec" tab
3. In the command line, type "psql -U gatoradmin -d gatormarket" to log in to the database
4. You can now type SQL database queries to view and modify the gatormarket database and its tables. **EVERY QUERY MUST HAVE A SEMICOLON (;) AT THE END OF THEM TO WORK**

Example:
<img width="1063" height="355" alt="image" src="https://github.com/user-attachments/assets/99c813e0-d290-4dc7-a220-eddbab12df04" />



----TO-DO-----
* Write ORM code for searching tables based on filters
* Write ORM code for deleting and/or disabling data from tables
* Determine where we want images to be stored via file location
