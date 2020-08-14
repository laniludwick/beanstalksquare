"""Script to seed database"""

#We won't define functions because this is a script. 
#This file will be used to re-create my databaseand seed it with data.

import os #Module from std library, contains code related to working w/ my computer's OS.
import json #needed to load data from data/movies.json
from random import randrange, randint #takes a list and returns rand el from list; return rand num in range. 
from datetime import datetime #we'll use datetime.strptime to turn string into Python datetime object.

import crud #my file
import model #my file
import server #my file
from faker import Faker
import string
import random

fake = Faker()


os.system('dropdb beanstalksquaretestdb') #Run the string as a command in a subshell 
os.system('createdb beanstalksquaretestdb') #Run the string as a command in a subshell 

model.connect_to_db(server.app) #import app from server.py file.
model.db.create_all() #Creates all tables, import from model.py file.


#Create schools, grades, covid_risk_profiles
crud.create_covid_risk_profiles()
crud.create_grades()
crud.create_schools()


#Create households in db:
i=1
for _ in range(10):

    if i<6:
        new_household = crud.create_household(covid_risk_profile_id=i)
   
    else:
        new_household = crud.create_household(covid_risk_profile_id=1)
   
    model.db.session.add(new_household)
    model.db.session.commit()
    i+=1


#Create parents in db:
j=1
for _ in range(10):

    #Faker.seed(0)
    fname = fake.first_name()
    lname = fake.last_name()
    email= fake.ascii_email()
    password = fake.password(length=6)
    household_id =j
    mobile_number=fake.phone_number()

    new_parent = crud.create_parent(fname=fname, lname=lname, email=email, 
                            password=password, household_id=household_id, 
                            mobile_number=mobile_number)
    j+=1



#Create children in db
k=1
for _ in range(10):

    #Faker.seed(0)
    fname = fake.first_name()
    lname = fake.last_name()
    zipcode = fake.zipcode()
    school_id = k
    grade_id = k
    household_id = k 
    distance_willing_to_travel = randrange(1,10)
    preferred_days_per_week = randrange(3,5)
    preferred_total_hours_per_day = randrange(3,6)
    prefer_paid_teacher = fake.boolean(chance_of_getting_true=50)
    prefer_same_school_program_only = fake.boolean(chance_of_getting_true=50)
    prefer_same_school_only = fake.boolean(chance_of_getting_true=50)
    prefer_same_grade_only = fake.boolean(chance_of_getting_true=50)
    prefer_outdoors_only = fake.boolean(chance_of_getting_true=50)
    prefer_periodic_covid_testing = fake.boolean(chance_of_getting_true=50)
    max_budget_per_hour = randrange(0,5)
    
    new_child = crud.create_child(fname=fname, lname=lname, zipcode=zipcode, school_id=school_id, 
                                grade_id=grade_id, household_id=household_id,
                                distance_willing_to_travel=distance_willing_to_travel,
                                preferred_days_per_week=preferred_days_per_week,
                                preferred_total_hours_per_day=preferred_total_hours_per_day,
                                prefer_paid_teacher=prefer_paid_teacher,
                                prefer_same_school_program_only=prefer_same_school_program_only,
                                prefer_same_school_only=prefer_same_school_only,
                                prefer_same_grade_only=prefer_same_grade_only,
                                prefer_outdoors_only=prefer_outdoors_only,
                                prefer_periodic_covid_testing=prefer_periodic_covid_testing,
                                max_budget_per_hour=max_budget_per_hour)
    k+=1

#Create pods in db
m=1
for _ in range(10):

    pod_name = fake.color_name() + "learning pod"
    max_child_capacity = randrange(2,8)
    days_per_week = randrange(3,5)
    total_hours_per_day = randrange(3,6)
    paid_teacher = fake.boolean(chance_of_getting_true=50)
    same_school_program_only = fake.boolean(chance_of_getting_true=50)
    same_school_only = fake.boolean(chance_of_getting_true=50)
    same_grade_only = fake.boolean(chance_of_getting_true=50)
    outdoors_only = fake.boolean(chance_of_getting_true=50)
    periodic_covid_testing = fake.boolean(chance_of_getting_true=50)
    cost_per_hour = randrange(0,5)

    if i<6:
        covid_risk_profile_id = m
    else:
        covid_risk_profile_id = 2

    new_pod = crud.create_pod(pod_name=pod_name, max_child_capacity=max_child_capacity,
                            days_per_week=days_per_week, total_hours_per_day=total_hours_per_day,
                            paid_teacher=paid_teacher, same_school_program_only=same_school_program_only,
                            same_school_only=same_school_only, same_grade_only=same_grade_only,
                            outdoors_only=outdoors_only, periodic_covid_testing=periodic_covid_testing,
                            covid_risk_profile_id=covid_risk_profile_id, cost_per_hour=cost_per_hour)
    m+=1


#Add parents to pods
r=1
for _ in range(10):
    pp_pod_id=r
    pp_parent_id=r

    new_parent_pod=crud.add_parent_to_pod(pod_id=pp_pod_id, parent_id=pp_parent_id)
    r+=1


# #Add children to pods
q=1
for _ in range(10):
    pod_id=q
    child_id=q

    new_child_pod=crud.add_child_to_pod(pod_id=pod_id, child_id=child_id)
    q+=1




#Create pod locations in db
n=1
for _ in range(10):

    pl_pod_id=n
    pl_street_address = fake.street_address()
    pl_city = fake.city()
    pl_state = "CA" #fake.state_abbr()
    pl_zipcode = fake.zipcode()
    day_of_week = "All"
    print("Print:", pl_pod_id, pl_street_address, pl_city, pl_state, pl_zipcode, day_of_week)
    new_pod_location = crud.create_pod_location(pod_id=pl_pod_id, 
                               street_address=pl_street_address, 
                               city=pl_city, state=pl_state, zipcode=pl_zipcode, 
                               day_of_week = day_of_week)
    
    n+=1



# for _ in range(10):
#     email = f'{i}@gmail.com'
#     pw = f'password{i}'

#     user = crud.create_user(email, pw)


#Load parent data from JSON file (for practice loading data from file)
#with open('data/parent_data.json') as f:
#    parent_data = json.loads(f.read())

#Parent data will be a list of dictionaries. Loop over each dictionary in 
#parent_data and use it to supply args to crud.create_parent.
#When read in data from a file, we always get strings.

#Create parents, store them in list so we can use them to create fake children 
#for parent in parent_data:
        
    #fname, lname, email, password, household_id, mobile_number = (parent["fname"], parent["lname"], parent["email"], parent["password"], parent["household_id"], parent["mobile_number"])
    #release_date = datetime.strptime(movie["release_date"],"%Y-%m-%d") #"2020-05-22"

    #new_parent = crud.create_parent(fname, lname, email, password, household_id, mobile_number) #Need non-nullable fields as args
    #db.session.add(new_parent)
    #db.session.commit()

