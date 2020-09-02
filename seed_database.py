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



os.system('dropdb beanstalksquare') #Run the string as a command in a subshell 
os.system('createdb beanstalksquare') #Run the string as a command in a subshell 

model.connect_to_db(server.app) #import app from server.py file.
model.db.drop_all() #Drops all existing tables, import from model.py file.
model.db.create_all() #Creates all tables, import from model.py file.


#Create schools, grades, covid_risk_profiles
crud.create_covid_risk_profiles()
crud.create_grades()
crud.create_schools()


#Create households in db:
i=1
for _ in range(20):

    if i<6:
        new_household = crud.create_household(covid_risk_profile_id=i)
   
    else:
        new_household = crud.create_household(covid_risk_profile_id=1)
   
    model.db.session.add(new_household)
    model.db.session.commit()
    i+=1


#Create parents in db:
j=1
for _ in range(20):

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


eric = crud.create_parent(fname="Eric", lname="Anderson", email="eric.anderson@gmail.com", password="asdf", household_id=11, mobile_number="917-538-4741")

marcy = crud.create_parent(fname="Marcy", lname="Anderson", email="marcy.anderson@gmail.com", password="asdf", household_id=11, mobile_number="917-538-4741")

jessica = crud.create_parent(fname="Jessica", lname="Martinez", email="jessica.martinez@gmail.com", password="asdf", household_id=12, mobile_number="917-538-4741",)


#Create children in db
k=1
for _ in range(20):

    #Faker.seed(0)
    fname = fake.first_name()
    lname = fake.last_name()
    zipcode = fake.zipcode()
    
    school_id = 1
    grade_id = 3
    household_id = k 
    school_program = "Dual Language Immersion" 
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
    
    if k<12:
        new_child = crud.create_child(fname=fname, lname=lname, zipcode=zipcode, gender="Female", school_id=school_id, 
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
    else:
        new_child = crud.create_child(fname=fname, lname=lname, zipcode='94010', gender="Male", school_id=school_id, 
                                grade_id=3, household_id=household_id,
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

jackson = crud.create_child(fname="Jackson", lname="Daniels", gender="Male",
    zipcode="94010", school_id=1,school_program="Spanish immersion",
    grade_id=3, household_id=1)

emily = crud.create_child(fname="Emily", lname="Sanders", gender="Female",
    zipcode="94010", school_id=1, school_program="Spanish immersion", 
    grade_id=3, household_id=2)

zahara = crud.create_child(fname="Zahara", lname="Gupta", gender="Female", 
    zipcode="94010", school_id=1,school_program="Spanish immersion",
    grade_id=3, household_id=3)


#Create pods in db
m=1
for _ in range(20):

    pod_name = fake.color_name() + " learning pod"
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


new_pod1 = crud.create_pod(pod_name="Dragons", max_child_capacity=5, days_per_week=5, total_hours_per_day=5,
    paid_teacher=True, same_school_program_only=True,same_school_only=True,
    same_grade_only=False,outdoors_only=False, periodic_covid_testing=False,
    covid_risk_profile_id=2, cost_per_hour=2)

new_pod2 = crud.create_pod(pod_name="Shooting stars", max_child_capacity=5,
    days_per_week=5, total_hours_per_day=6,paid_teacher=False, 
    same_school_program_only=True,same_school_only=True, same_grade_only=True,
    outdoors_only=True, periodic_covid_testing=False,covid_risk_profile_id=1, cost_per_hour=0)

new_pod3 = crud.create_pod(pod_name="Aguilas", max_child_capacity=5,
    days_per_week=5, total_hours_per_day=7,paid_teacher=True,
    same_school_program_only=True,same_school_only=True, same_grade_only=True,
    outdoors_only=False, periodic_covid_testing=True,
    covid_risk_profile_id=2, cost_per_hour=2)

new_pod4 = crud.create_pod(pod_name="Explorers", max_child_capacity=5,
    days_per_week=5, total_hours_per_day=5,
    paid_teacher=True, same_school_program_only=True,
    same_school_only=True, same_grade_only=False,
    outdoors_only=False, periodic_covid_testing=False,
    covid_risk_profile_id=3, cost_per_hour=3)



#Create teachers in db
tonya = crud.create_teacher(fname="Tonya", lname="Kramer", email="tonya.lopez@gmail.com", password="asdf", mobile_number="917-538-4741", zipcode="94010",
    bio="I'm a positive and energetic 28-year-old college graduate. Ever since I was in high school I have been tutoring children and even my peers in all subjects.",
    days_of_week="Mon-Fri", teaching_experience_in_hours="900",pay_rate_per_hour=25,covid_risk_profile_id=2,img_url="/static/img/teacher1.jpg",)

nadine = crud.create_teacher(fname="Nadine", lname="Cruz",email="nadine.cruz@gmail.com", password="asdf", mobile_number="917-538-4741", pod_id=21, zipcode="94010",
    bio="I minored in Spanish in college. During college, I also tutored student-athletes averaging no less than a B+ on all assignments and course levels. I am fluent in Spanish reading, writing, and speaking. I know how to work with all skill levels and have the patience and energy needed to be an effective teacher.",
                            days_of_week="Mon-Fri",teaching_experience_in_hours="500",pay_rate_per_hour=15,covid_risk_profile_id=2,img_url="/static/img/teacher2.jpg",)

jasmine = crud.create_teacher(fname="Jasmine", lname="Jones", email="jasmine.jones@gmail.com", password="asdf", mobile_number="917-538-4741", zipcode="94010",
    bio="I have a masters in education and have nannied and tutored students after school for the past year. I am very organized and punctual and make sure to plan the prior day for the next day's lessons.",
    days_of_week="Mon-Fri",teaching_experience_in_hours="800",pay_rate_per_hour=20,covid_risk_profile_id=3,img_url="/static/img/teacher3.jpg",)




#Add parents to pods
r=1
for _ in range(10):
    pp_pod_id=r
    pp_parent_id=r

    new_parent_pod=crud.add_parent_to_pod(pod_id=pp_pod_id, parent_id=pp_parent_id)
    r+=1

parent1 = new_parent_pod=crud.add_parent_to_pod(pod_id=21, parent_id=21)
parent2 = new_parent_pod=crud.add_parent_to_pod(pod_id=21, parent_id=22)
parent3 = new_parent_pod=crud.add_parent_to_pod(pod_id=21, parent_id=23)



# #Add children to pods
q=1
for _ in range(20):
    pod_id=q
    child_id=q

    if q<10:
        new_child_pod=crud.add_child_to_pod(pod_id=pod_id, child_id=child_id)
    else:
        new_child_pod=crud.add_child_to_pod(pod_id=1, child_id=child_id)


kid1 = new_child_pod=crud.add_child_to_pod(pod_id=21, child_id=21)
kid2 = new_child_pod=crud.add_child_to_pod(pod_id=21, child_id=22)
kid3 = new_child_pod=crud.add_child_to_pod(pod_id=21, child_id=23)


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

new_pod_location1 = crud.create_pod_location(pod_id=21,
    street_address="142 Channing Rd",
    city="Burlingame", state="CA", zipcode="94010",
    day_of_week = "Mon-Fri")

new_pod_location1 = crud.create_pod_location(pod_id=22,
    street_address="100 Paloma Rd",
    city="Burlingame", state="CA", zipcode="94010",
    day_of_week = "Mon-Fri")

new_pod_location1 = crud.create_pod_location(pod_id=23,
    street_address="150 Howard Ave",
    city="Burlingame", state="CA", zipcode="94010",
    day_of_week = "Mon-Fri")

new_pod_location1 = crud.create_pod_location(pod_id=24,
    street_address="320 Cabrillo Lane",
    city="Burlingame", state="CA", zipcode="94010",
    day_of_week = "Mon-Fri")

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

