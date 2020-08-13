from model import (db, Parent, Household, Pod, Child, Pod_Location, School, 
Grade, Child_Pod, Parent_Pod, Covid_Risk_Profile, connect_to_db) #Need to fill in here


def create_household(covid_risk_profile_id=None):
    """Add a new household to the households table and return the household."""

    household = Household(covid_risk_profile_id=covid_risk_profile_id)
    db.session.add(household)
    db.session.commit()

    return household


def create_parent(fname, lname, email, password, household_id=None, 
                mobile_number=None):
    """Add a new parent to the parents table and return the parent."""

    parent = Parent(fname=fname, lname=lname, email=email, password=password, 
                    household_id=household_id, mobile_number=mobile_number)
    db.session.add(parent)
    db.session.commit()

    return parent


def create_pod(pod_name=None, max_child_capacity=None, days_per_week=None, 
            total_hours_per_day=None, hired_teacher=None, 
            same_school_program_only=None, same_school_only=None, 
            same_grade_only=None, outdoors_only=None, periodic_covid_testing=None, 
            covid_risk_profile_id=None, cost_per_hour=None):
    """Add a new pod to the pods table and return the pod."""

    pod = Pod(pod_name=pod_name, 
            max_child_capacity=max_child_capacity, 
            days_per_week=days_per_week, 
            total_hours_per_day=total_hours_per_day, 
            hired_teacher=hired_teacher, 
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
                prefer_hired_teacher=None, prefer_same_school_program_only=None, 
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
                prefer_hired_teacher=prefer_hired_teacher,
                prefer_same_school_program_only=prefer_same_school_program_only,
                prefer_same_school_only=prefer_same_school_only,
                prefer_same_grade_only=prefer_same_grade_only,
                prefer_outdoors_only=prefer_outdoors_only,
                prefer_periodic_covid_testing=prefer_periodic_covid_testing,
                max_budget_per_hour=max_budget_per_hour)
    db.session.add(child)
    db.session.commit()

    return child


def create.covid_risk_profile():
    """Add the risk profiles for use in a parent questionnaire form."""

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


def add_parent_to_pod(parent_id, pod_id):
    """Add a new parent to the parents_pods table."""

    pod = get_pod_by_pod_id(pod_id)
    pod.parent_id.append(parent_id)
    db.session.commit()


def add_child_to_pod(child_id, pod_id):
    """Add a new child to the children_pods table."""

    pod = get_pod_by_pod_id(pod_id)
    pod.child_id.append(child_id)
    db.session.commit()


def get_pod_by_pod_id(pod_id):
    """Get the SQLAlchemy pod object based on the pod_id."""

    return db.session.query(Pod).filter(Pod.pod_id==pod_id).one()


# def populate_schools(): #???????
#     """Add a new parent to the parents table and return the parent."""

#     school = School(school_name=school_name)
#     db.session.add(school)
#     db.session.commit()

#     return school


# def populate_grades(): #???????
#     """Add a new parent to the parents table and return the parent."""

#     grade = Grade(grade_name=grade_name)
#     db.session.add(grade)
#     db.session.commit()

#     return grade


# def populate_covid_risk_profiles(): #???????
#     """Add a new parent to the parents table and return the parent."""

#     parent = Parent(fname=fname, lname=lname, email=email, password=password)
#     db.session.add(parent)
#     db.session.commit()

#     return parent





def create_pod_location(pod_id):
    """Add a new pod location to the pod_locations table and return it."""

    pod_location = Pod_Location(fname=fname, lname=lname, email=email, 
                                password=password)
    db.session.add(parent)
    db.session.commit()

    return parent




def get_pods_by_zipcode(zipcode):
    """Get and return pods and podless kids filtered by zipcode entered."""

    filtered_pods = db.session.query(Pod).filter(Pod.zipcode==zipcode).all()
    #Need to refactor the queryto add the poddless children.

    return filtered_pods


if __name__ == '__main__':
    from server import app
    connect_to_db(app)


    # def find_humans_by_animal_species(species):
    # """Returns a list of all Human objects who have animals of that species."""

    # humans = db.session.query(Human).join(Animal) #SQLAlchemy base object
    # #Chaining base object to filter method:
    # filtered_humans = humans.filter(Animal.animal_species==species).all()

    # return filtered_humans

