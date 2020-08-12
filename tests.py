"""Tests for PeachPodSquare Flask app."""

import unittest #Python standard library
import server


class BeanstalkUnitTestCases(unittest.TestCase):
    """Tests for my party site."""

    def setUp(self):
        """Code to run before every test."""

        self.client = server.app.test_client() #This method makes a pretend web browser
        server.app.config['TESTING'] = True 


    def test_homepage(self):
        """Can we reach the homepage?"""

        result = self.client.get('/') #makes a pretend get request to the client
        self.assertIn(b'Find Students', result.data) #Find this on the homepage


    def test_not_logged_in_yet(self):
        """Do users who haven't logged in see the correct view?"""

        result = self.client.get('/')
        self.assertIn(b'Log In', result.data) #Find this on the homepage
        self.assertIn(b'Sign Up', result.data) #Find this on the homepage
        #self.assertNotIn(b'xxx', result.data)


    def test_pod_search_by_zip(self):
        """Do logged in users see the correct view?"""

        zip = {'zip': 94010}

        result = self.client.get('/all_pods', data=zip)

        #self.assertIn(b'{zip_info}', result.data)
        self.assertNotIn(b'Find Students', result.data)


    def test_login_mel(self):
        """Can Mel log in?"""

        login_info = {'email': 'mel@ubermelon.com', 'password': 'melons'}
        result = self.client.post('/login', data=login_info,
                                  follow_redirects=True)

        self.assertNotIn(b'Log In', result.data)
        #self.assertIn(b'Please RSVP', result.data)


    def test_register_user_mel(self):
        """Can Mel register as a new user?"""

        registration_info = {'first_name': 'Mel', 'email': 'mel@ubermelon.com'}
        result = self.client.post('/', data=registration_info,
                                  follow_redirects=True)

        # Will this work? self.assertIn(b'You successfully registered', result.data)
        # Can I add a query to show the data is in the db?


if __name__ == '__main__':
    unittest.main()
