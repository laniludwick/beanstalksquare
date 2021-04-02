import unittest #Python standard library
from crud import create_household, create_parent, create_pod, create_child
from model import connect_to_db, Household, Parent, Child, Pod
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from server import app


class BeanstalkCrudUnitTestCases(unittest.TestCase):
    """Tests for my CRUD functions."""

    def setUp(self):
        """Code to run before every test."""

        self.client = app.test_client() #This method makes a pretend web browser
        app.config['TESTING'] = True 
        connect_to_db(app, "postgresql:///beanstalksquaretestdb")
        #db.create_all()
        #example_data() #This is in model.py, it's example data added in tables.


    def test_create_household(self):
        """Does household creation produce the correct result?"""

        testhouse = create_household()
        self.assertEqual(type(testhouse), Household)


    def test_create_parent(self):
        """Does parent creation product the correct result?"""

        testparent = create_parent(fname="Bento", lname="Willow", email="bento@gmail.com", password="asdf", household_id=4)
        self.assertEqual(testparent.fname, "Bento")
        self.assertEqual(type(testparent), Parent)
        #db.session.query(Parent).filter(Parent.fname=="Bento").one()

    
    def test_create_child(self):
        """Does parent creation product the correct result?"""

        testchild = create_child(fname="Johnny", lname="Williams", zipcode="94010", household_id=2, school_id=1, grade_id=2)
        self.assertEqual(testchild.fname, "Johnny")
        self.assertEqual(type(testchild), Child)
        #db.session.query(Child).filter(Child.fname=="Johnny").one()


    def test_create_pod(self):
        """Does parent creation product the correct result?"""

        testpod = create_pod(pod_name="Dragons", max_child_capacity=5, days_per_week=3, total_hours_per_day=6, covid_risk_profile_id=4)
        self.assertEqual(testpod.pod_name, "Dragons")
        self.assertEqual(type(testpod),Pod)
        #db.session.query(Child).filter(Child.fname=="Johnny").one()


if __name__ == '__main__':
    unittest.main()