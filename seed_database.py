"""Script to seed database"""

#We won't define functions. File will be used to re-create my database.

import os #Module from std library, contains code related to working w/ my computer's OS.
import json #needed to load data from data/movies.json
from random import choice, randint #takes a list and returns rand el from list; return rand num in range. Use to create fake users and ratings.
from datetime import datetime #we'll use datetime.strptime to turn string into Python datetime object.

import crud #my file
import model #my file
import server #my file

os.system('dropdb beanstalksquare') #Run the string as a command in a subshell 
os.system('createdb beanstalksquare') #Run the string as a command in a subshell 

model.connect_to_db(server.app) #import app from server.py file.
model.db.create_all() #Creates all tables, import from model.py file.



# Create households in db
    #household = crud.create_household(covid_risk_profile_id)


# for i in range(10):
#     covid_risk_profile_id = f'{i}@gmail.com'
#     pw = f'password{i}'

#     user = crud.create_user(email, pw)


#Load parent data from JSON file (for practice loading data from file)
with open('data/parent_data.json') as f:
    parent_data = json.loads(f.read())

#Parent data will be a list of dictionaries. Loop over each dictionary in 
#parent_data and use it to supply args to crud.create_parent.
#When read in data from a file, we always get strings.

#Create parents, store them in list so we can use them to create fake children 
parents_in_db = []

#Create parents in db 
for parent in parent_data:
    
    fname, lname, email, password, household_id, mobile_number = (parent["fname"], parent["lname"], parent["email"], parent["password"], parent["household_id"], parent["mobile_number"])
    #release_date = datetime.strptime(movie["release_date"],"%Y-%m-%d") #"2020-05-22"

    new_parent = crud.create_parent(fname, lname, email, password, household_id, mobile_number) #Need non-nullable fields as args
    parents_in_db.append(new_parent)


# Create user in db
# for i in range(10):
#     email = f'{i}@gmail.com'
#     pw = f'password{i}'

#     user = crud.create_user(email, pw)

#     #Create ratings per user
#     for _ in range(10):
        
#         movie = choice(movies_in_db)
#         score = randint(1,5)

#         rat = crud.create_rating(user, movie, score)
