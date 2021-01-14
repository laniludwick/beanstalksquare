"""Models for Beanstalk Square app."""

from flask_sqlalchemy import SQLAlchemy
#import crud
import os

db = SQLAlchemy()
db_url = os.environ['DATABASE_URL']

def connect_to_db(flask_app, db_uri=db_url, echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = flask_app
    db.init_app(flask_app)
    print('Connected to the db!')


class Household(db.Model):
    """A household, which can be associated with children and parents."""

    __tablename__="households"

    household_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    covid_risk_profile_id = db.Column(db.Integer, db.ForeignKey('covid_risk_profiles.covid_risk_profile_id'))
    household_join_code = db.Column(db.String)

    child = db.relationship('Child')
    covid_risk_profile = db.relationship('Covid_Risk_Profile')
    parent = db.relationship('Parent')

    def __repr__(self):
        return f'<Household household_id={self.household_id} covid_risk_profile_id={self.covid_risk_profile_id}>'


class Parent(db.Model):
    """A parent user."""

    __tablename__ = "parents"
    
    parent_id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))
    mobile_number = db.Column(db.String(50))
    household_id = db.Column(db.Integer, db.ForeignKey('households.household_id'))
    img_url = db.Column(db.String(50), nullable=True)

    household = db.relationship('Household')
    parent_pod = db.relationship('Parent_Pod')

    def __repr__(self):
        return f'<Parent parent_id={self.parent_id} email={self.email}>'


class Pod(db.Model):
    """A pod, which can be associated with students (and eventually teachers)."""

    __tablename__="pods"

    pod_id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    pod_name = db.Column(db.String(50))
    max_child_capacity = db.Column(db.Integer)
    days_per_week = db.Column(db.Integer)
    total_hours_per_day = db.Column(db.Integer)
    paid_teacher = db.Column(db.Boolean)
    same_school_program_only = db.Column(db.Boolean)    
    same_school_only = db.Column(db.Boolean)
    same_grade_only = db.Column(db.Boolean)
    outdoors_only = db.Column(db.Boolean)
    periodic_covid_testing = db.Column(db.Boolean)
    covid_risk_profile_id = db.Column(db.Integer, db.ForeignKey('covid_risk_profiles.covid_risk_profile_id')) #one risk profile (e.g. "Very strict") can have many pods
    cost_per_hour = db.Column(db.Float)

    parent_pod = db.relationship('Parent_Pod')
    child_pod = db.relationship('Child_Pod')
    pod_location = db.relationship('Pod_Location')
    covid_risk_profile = db.relationship('Covid_Risk_Profile')
    children = db.relationship('Child', secondary='children_pods')
    parents = db.relationship('Parent', secondary='parents_pods')
    teacher = db.relationship('Teacher')

    def __repr__(self):
        return f'<Pod pod_id={self.pod_id} pod_name={self.pod_name}>'


class Child(db.Model):
    """A child."""

    __tablename__="children"

    child_id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    gender = db.Column(db.String(50), nullable=True)
    household_id = db.Column(db.Integer, db.ForeignKey('households.household_id'))
    zipcode = db.Column(db.Integer)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.school_id'))
    school_program = db.Column(db.String(50))
    grade_id = db.Column(db.Integer, db.ForeignKey('grades.grade_id'))
    distance_willing_to_travel = db.Column(db.Integer)
    preferred_days_per_week = db.Column(db.Integer)
    preferred_total_hours_per_day = db.Column(db.Integer)
    prefer_paid_teacher = db.Column(db.Boolean)
    prefer_same_school_program_only = db.Column(db.Boolean)
    prefer_same_school_only = db.Column(db.Boolean)
    prefer_same_grade_only = db.Column(db.Boolean)
    prefer_outdoors_only = db.Column(db.Boolean)
    prefer_periodic_covid_testing = db.Column(db.Boolean)
    max_budget_per_hour = db.Column(db.Float)

    household = db.relationship('Household')
    school = db.relationship('School')
    grade = db.relationship('Grade')
    child_pod = db.relationship('Child_Pod')
    pods = db.relationship('Pod', secondary='children_pods')

    def __repr__(self):
        return f'<Child child_id={self.child_id} fname={self.fname}>'


class Teacher(db.Model):
    """A teacher, which can be associated with a pod."""

    __tablename__="teachers"

    teacher_id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    pod_id = db.Column(db.Integer, db.ForeignKey('pods.pod_id'))
    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))
    mobile_number = db.Column(db.String(50), nullable=True)
    img_url = db.Column(db.String, nullable=True)
    zipcode = db.Column(db.String(50))
    days_of_week = db.Column(db.String(50), nullable=True)
    bio = db.Column(db.String)
    pay_rate_per_hour = db.Column(db.Float)
    teaching_experience_in_hours = db.Column(db.Integer)
    covid_risk_profile_id = db.Column(db.Integer, db.ForeignKey('covid_risk_profiles.covid_risk_profile_id'))

    covid_risk_profile = db.relationship('Covid_Risk_Profile')
    pod = db.relationship('Pod')


class Pod_Location(db.Model):
    """A pod, which can be associated with children (and eventually teachers)."""

    __tablename__="pod_locations"

    pod_location_id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    pod_id = db.Column(db.Integer, db.ForeignKey('pods.pod_id'))
    street_address = db.Column(db.String(50))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    zipcode = db.Column(db.String(50))
    day_of_week = db.Column(db.String(50)) #Note- this is an enum
    
    pod = db.relationship('Pod')

    def __repr__(self):
        return f'<Pod_Location pod_location_id={self.pod_location_id} street_address={self.street_address}>'



class Covid_Risk_Profile(db.Model):
    """A pod, which can be associated with students (and eventually teachers)."""

    __tablename__="covid_risk_profiles"

    covid_risk_profile_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    scale_value = db.Column(db.String(50))
    scale_description = db.Column(db.String) #This is an enum

    household = db.relationship('Household')
    pod = db.relationship('Pod')

    def __repr__(self):
        return f'<Covid_Risk_Profile covid_risk_profile_id={self.covid_risk_profile_id} scale_value={self.scale_value}>'


class Parent_Pod(db.Model):
    """A pod, which can be associated with students (and eventually teachers)."""

    __tablename__="parents_pods"

    parent_pod_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.parent_id'))
    pod_id = db.Column(db.Integer, db.ForeignKey('pods.pod_id'))

    parent = db.relationship('Parent')
    pod = db.relationship('Pod')

    def __repr__(self):
        return f'<Parent_Pod parent_pod_id={self.parent_pod_id} parent_id={self.parent_id}>'


class Child_Pod(db.Model):
    """A pod, which can be associated with students (and eventually teachers)."""

    __tablename__="children_pods"

    child_pod_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('children.child_id'))
    pod_id = db.Column(db.Integer, db.ForeignKey('pods.pod_id'))

    pod = db.relationship('Pod')
    child = db.relationship('Child')

    def __repr__(self):
        return f'<Child_Pod child_pod_id={self.child_pod_id} child_id={self.child_id}>'


class Grade(db.Model):
    """A child's grade or year in school, e.g. "1st grade."""

    __tablename__ ="grades"

    grade_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    grade_name = db.Column(db.String)

    child = db.relationship('Child')

    def __repr__(self):
        return f'<Grade grade_id={self.grade_id} grade_name={self.grade_name}>'



class School(db.Model):
    """A child's school name."""

    __tablename__ ="schools"

    school_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    school_name = db.Column(db.String)

    child = db.relationship('Child')

    def __repr__(self):
        return f'<School school_id={self.school_id} school_name={self.school_name}>'


if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)

