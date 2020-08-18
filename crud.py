from model import (db, Parent, Household, Pod, Child, Pod_Location, School, 
Grade, Child_Pod, Parent_Pod, Covid_Risk_Profile, connect_to_db) #Need to fill in here
import string
import random

def create_household(covid_risk_profile_id=None):
    """Add a new household to the households table and return the household."""

    #Create household join code: 
    #using random string with the combination of lower and upper case
    letters = string.ascii_letters
    household_join_code = ''.join(random.choice(letters) for i in range(8))
    #print("HH join code is:", household_join_code)    

    household = Household(covid_risk_profile_id=covid_risk_profile_id, household_join_code=household_join_code)
    
    db.session.add(household)
    db.session.commit()

    return household


def create_parent(fname, lname, email, password, household_id, 
                mobile_number=None):
    """Add a new parent to the parents table and return the parent."""

    parent = Parent(fname=fname, lname=lname, email=email, password=password, 
                    household_id=household_id, mobile_number=mobile_number)
    db.session.add(parent)
    db.session.commit()

    return parent


def create_pod(pod_name=None, max_child_capacity=None, days_per_week=None, 
            total_hours_per_day=None, paid_teacher=None, 
            same_school_program_only=None, same_school_only=None, 
            same_grade_only=None, outdoors_only=None, periodic_covid_testing=None, 
            covid_risk_profile_id=None, cost_per_hour=None):
    """Add a new pod to the pods table and return the pod."""

    pod = Pod(pod_name=pod_name, 
            max_child_capacity=max_child_capacity, 
            days_per_week=days_per_week, 
            total_hours_per_day=total_hours_per_day, 
            paid_teacher=paid_teacher, 
            same_school_program_only=same_school_program_only, 
            same_school_only=same_school_only, 
            same_grade_only=same_grade_only, 
            outdoors_only=outdoors_only, 
            periodic_covid_testing=periodic_covid_testing, 
            covid_risk_profile_id=covid_risk_profile_id,
            cost_per_hour=cost_per_hour)
    db.session.add(pod)
    db.session.commit()

    return pod


def create_child(fname, lname, zipcode, school_id, grade_id, household_id, 
                school_program=None, distance_willing_to_travel=None, 
                preferred_days_per_week=None, preferred_total_hours_per_day=None, 
                prefer_paid_teacher=None, prefer_same_school_program_only=None, 
                prefer_same_school_only=None, prefer_same_grade_only=None, 
                prefer_outdoors_only=None, prefer_periodic_covid_testing=None, 
                max_budget_per_hour=None):
    """Add a new child to the children table and return the child."""

    child = Child(fname=fname, lname=lname,
                zipcode=zipcode, school_id=school_id,
                school_program=school_program, grade_id=grade_id,
                household_id=household_id, 
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
    db.session.add(child)
    db.session.commit()

    return child

def create_pod_location(pod_id, zipcode, street_address=None, city=None, state=None, day_of_week=None):
    """Add a new pod location to the pod_locations table and return it."""

    pod_location = Pod_Location(pod_id=pod_id, street_address=street_address, city=city, state=state, 
                                zipcode=zipcode, day_of_week=day_of_week)
    db.session.add(pod_location)
    db.session.commit()



def get_all_pods():
    """Get and return pods filtered by zipcode entered by the user."""

    return db.session.query(Pod, Pod_Location).join(Pod_Location).all()

    #return pods


def get_filtered_pods(zipcode): #Must use single quotes in SQL and SQLAlchemy
    """Get and return pods filtered by zipcode entered by the user."""

    #def get_filtered_pods(zipcode, school_name, grade_name)
    #filtered_pods = db.session.query(Pod).join tables filter(Pod.zipcode==zipcode, school_name, grade_name).all()
    #Need to refactor the query to add the poddless children later.
    

    #Returns a tuple of Pod and Pod_Location objects
    return db.session.query(Pod, Pod_Location).join(Pod_Location).filter(Pod_Location.zipcode==zipcode).all()



def add_parent_to_pod(parent_id, pod_id):
    """Add a new parent to the parents_pods table."""

    parent_pod_rel = Parent_Pod(parent_id=parent_id, pod_id=pod_id)
    db.session.add(parent_pod_rel)
    db.session.commit()


def add_child_to_pod(child_id, pod_id):
    """Add a new child to the children_pods table."""

    child_pod_rel = Child_Pod(child_id=child_id, pod_id=pod_id)
    db.session.add(child_pod_rel)
    db.session.commit()


def get_pod_details_by_pod_id(pod_id):
    """Get the SQLAlchemy pod object based on the pod_id."""

    #Returns a tuple of Pod and Child objects
    #return db.session.query(Pod, Child_Pod, Child).join(Child_Pod, Pod.pod_id==Child_Pod.pod_id).join(Child, Child.child_id==Child_Pod.child_id).filter(Pod.pod_id==pod_id).all()
    return db.session.query(Pod, Child_Pod).join(Child_Pod, Pod.pod_id==Child_Pod.pod_id).filter(Pod.pod_id==pod_id).all()

def get_children_by_pod_id(pod_id):
    """Get the SQLAlchemy child objects based on the associated pod_id."""

    #Creates a list 
    children = db.session.query(Child).join(Child_Pod).filter(Child_Pod.pod_id==pod_id).all()

    #Creates a list of SQLAlchemy objects
    #children[0].fname = 'Eric'
    # child = []
    # for child in children:
    #     child_name = child.fname+child.lname
    #     grade = child.grade_name
    #     school = child.school_name
    #     zipcode = child.zipcode

    return children


def get_household_join_code_by_household_id(household_id):

    return db.session.query(Household.household_join_code).filter(Household.household_id==household_id).one()    


def get_user_by_email(email):

    return db.session.query(Parent).filter(Parent.email==email).first()



#Below are constants:
def create_covid_risk_profiles():
    """Add the risk profiles for use in a parent questionnaire form about their household."""

    covid_values = [
    {
        "scale_value": "Very strict", 
        "scale_description": "Stays within home; Maintains 6’ distance; No one outside contact; Strict infection control protocol; No contact with outside world"
    },
    {
        "scale_value": "Strict", 
        "scale_description": "Leaves home for essentials; Maintains 6’ of distance outside of home when leaves for essentials; Strict etiquette including hand washing, masks and social distancing are used 100% of the time when outside of the home; No socializing outside of the home"
    },
    {
        "scale_value": "Fairly strict", 
        "scale_description": "Leaves home only to go to work and for essentials; Fairly strict etiquette including hand washing, masks and social distancing are used 80-99% of the time when outside of the home; Occasionally socializes with others who are not in one’s home, but stay outdoors and maintain social distance of 6’ or less than 6’ only with masks"
    },
    {
        "scale_value": "Somewhat open", 
        "scale_description": "Leaves home to exercise, go to the store, work,and other activities several times per week; Etiquette including hand washing, masks and social distancing are used 60-79% of the time when outside of the home; Sometimes socializes with others who are not in one’s home at less than a 6 foot distance if they have been following fairly strict or somewhat open protocols as well"
    },
    {
        "scale_value": "Moderately open", 
        "scale_description": "Leaves home to exercise, go to the store, work,and other activities multiple times per week; Etiquette including hand washing, masks and social distancing are used 20-59% of the time when outside of the home; May not maintain social distance and may see more than 10 people at a time"
    },
    {
        "scale_value": "Very open", 
        "scale_description": "No precautions to protect oneself from infection; Actively socializes without regard to social distancing or recommended etiquette"
    }
    ]

    for value in covid_values:
        scale_value = value["scale_value"]
        scale_descr = value["scale_description"]

        covid_entry = Covid_Risk_Profile(scale_value=scale_value, scale_description=scale_descr)
        db.session.add(covid_entry)
        db.session.commit()



def create_grades():
    """Add the list of grade levels for use in a child questionnaire form."""

    grades = ["Preschool", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th trade", "12th grade"] 

    for grade in grades:
        grade_name = grade
        #print("Gr name:", grade_name)
        gr = Grade(grade_name=grade_name)
        db.session.add(gr)
        db.session.commit()


def create_schools():
    """Add the list of schools for use in a child questionnaire form."""

    schools = ["McKinley Elementary School", "Washington Elementary School", "Lincoln Elementary School", "Eldorado Elementary School", 
                "Canyon Elementary School", "Roosevelt Elementary School", "Hoover Elementary School", 
                "La Mirada Elementary School", "El Modena Elementary School", "Orange Elementary School"] #Replace with greatschools API data

    for school in schools:
        school_name = school
        sch = School(school_name=school_name)
        db.session.add(sch)
        db.session.commit()








if __name__ == '__main__':
    from server import app
    connect_to_db(app)


    # def find_humans_by_animal_species(species):
    # """Returns a list of all Human objects who have animals of that species."""

    # humans = db.session.query(Human).join(Animal) #SQLAlchemy base object
    # #Chaining base object to filter method:
    # filtered_humans = humans.filter(Animal.animal_species==species).all()

    # return filtered_humans

