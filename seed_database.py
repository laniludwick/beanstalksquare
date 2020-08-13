"""Script to seed database"""

#We won't define functions. File will be used to re-create my database.

import os #Module from std library, contains code related to working w/ my computer's OS.
import json #needed to load data from data/movies.json
#from random import choice, randint #takes a list and returns rand el from list; return rand num in range. Use to create fake users and ratings.
from datetime import datetime #we'll use datetime.strptime to turn string into Python datetime object.

import crud #my file
import model #my file
import server #my file
from faker import Faker
import string
import random

fake = Faker()



os.system('dropdb beanstalksquare') #Run the string as a command in a subshell 
os.system('createdb beanstalksquare') #Run the string as a command in a subshell 

model.connect_to_db(server.app) #import app from server.py file.
model.db.create_all() #Creates all tables, import from model.py file.




#Create households in db:
for i in range(10):

    hh_household_id = i
    hh_covid_risk_profile_id = i
    household_join_code = create_household_join_code()

    new_household = crud.create_household(pl_street_address, pl_city, pl_state, pl_zipcode, day_of_week)
    db.session.add(new_pod_location)
    db.session.commit()


#Load parent data from JSON file (for practice loading data from file)
with open('data/parent_data.json') as f:
    parent_data = json.loads(f.read())

#Parent data will be a list of dictionaries. Loop over each dictionary in 
#parent_data and use it to supply args to crud.create_parent.
#When read in data from a file, we always get strings.

#Create parents, store them in list so we can use them to create fake children 

for parent in parent_data:
        
    fname, lname, email, password, household_id, mobile_number = (parent["fname"], parent["lname"], parent["email"], parent["password"], parent["household_id"], parent["mobile_number"])
    #release_date = datetime.strptime(movie["release_date"],"%Y-%m-%d") #"2020-05-22"

    new_parent = crud.create_parent(fname, lname, email, password, household_id, mobile_number) #Need non-nullable fields as args
    db.session.add(new_parent)
    db.session.commit()






#Create pods in db


#Create pod locations in db

for i in range(10):

    pod_id = i
    pl_street_address = fake.street_address()
    pl_city = fake.city()
    pl_state = fake.state()
    pl_zipcode = fake.postcode()

    new_pod_location = crud.create_pod_location(pl_street_address, pl_city, pl_state, pl_zipcode, day_of_week)
    db.session.add(new_pod_location)
    db.session.commit()


#Create children in db
# for _ in range(10):

#     Faker.seed(0)
#     fname = fake.name()
#     lname = fake.last_name()
#     zipcode = fake.postalcode()
#     school_id = 
#     grade_id =
#     household_id = 
#     distance_willing_to_travel =
#     preferred_days_per_week =
#     preferred_total_hours_per_day =
#     prefer_paid_teacher =
#     prefer_same_school_program_only =
#     prefer_same_school_only =
#     prefer_same_grade_only =
#     prefer_outdoors_only =
#     prefer_periodic_covid_testing =
#     max_budget_per_hour =
    
#     new_child = crud.create_child(fname, lname, school_id, grade_id, 
#                             household_id, distance_willing_to_travel, 
#                             preferred_days_per_week, 
#                             preferred_total_hours_per_day, 
#                             prefer_paid_teacher, prefer_same_school_program_only,
#                             prefer_same_school_only, prefer_same_grade_only, 
#                             prefer_outdoors_only, prefer_periodic_covid_testing,
#                             max_budget_per_hour)
#     db.session.add(new_child)
#     db.session.commit()


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



#Create covid risk profiles in db
#create.covid_risk_profile():
    


    #household = crud.create_household(covid_risk_profile_id)
 #   for i in range(10):
#       email = f'{i}@gmail.com'
#     pw = f'password{i}'

#     user = crud.create_user(email, pw)



#Create households in db
    #household = crud.create_household(covid_risk_profile_id)
#    for i in range(10):
#       email = f'{i}@gmail.com'
#     pw = f'password{i}'

#     user = crud.create_user(email, pw)

# for i in range(10):
#     covid_risk_profile_id = f'{i}@gmail.com'
#     pw = f'password{i}'

#     user = crud.create_user(email, pw)
