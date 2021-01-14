# <img src="/static/img/beanstalksquarelogo.png" width="50%" alt="Beanstalk Square">
Beanstalk Square was a project I built during Hackbright's full-stack software engineering program. I was inspired to create this project to help ease the burden the global Coronavirus pandemic has caused for parents. Beanstalk Square is a tool to help families create and find distance learning pods for their children since many schools have been operating remotely due to Covid. The pods consist of students and teachers or parent volunteers. 

I wrote this single page app's frontend using React and the backend using Python with Flask as the web framework. Beanstalk Square includes features such as a zipcode-based search yielding a list of student pods or teachers, detailed pod and teacher profile views, an ability to create new pods, and an ability to send messages to pod organizers or teachers.

# <img src="/static/img/beanstalksquare-intro.png" width="100%" alt="Beanstalk Square Intro">

## Deployment
http://www.beanstalksquare.com

## About the Developer
Lani graduated from Stanford University with a B.S. in Industrial Engineering and a M.A. in Sociology with a focus on "Organizations, Business and the Economy." She worked in real estate private equity investing in New York for several years and grew determined to help modernize the industry. She joined a startup in San Francisco building an online investment marketplace and became a product manager. She later joined a B2B SaaS company selling a CRM, an end-user portal, and investment management products. In her product management roles, Lani enjoyed deciding which products to build and why, but she grew increasingly interested in how to build the products, which led her to software engineering.

## Contents
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Future Features](#future)
* [Installation](#installation)
* [License](#license)

## <a name="tech-stack"></a>Technologies
* JavaScript
* React
* Python
* HTML
* CSS
* Flask
* PostgreSQL
* SQL
* SQLAlchemy
* Bootstrap
* APIs used: Google Maps Javascript API including the geocoding service, Cloudinary’s image upload API, and Twilio’s programmable messaging API.

# <img src="/static/img/beanstalksquare-techstack.png" width="100%" alt="Beanstalk Square Tech Stack">

## <a name="features"></a>Features

#### Landing Page
Users are brought to a webpage built in React containing an option to log in. The login functionality was created using JSON web tokens. The zipcode search allows parents to search for student pods or teachers. 

![alt text](https://github.com/gloryleilani/beanstalksquare1/blob/main/static/readme-img/beanstalksquarelanding.gif "Beanstalk Square landing page")

#### List of student pods 
The parent or teacher can view a list of pods in their selected zipcode. The table data for the pod list is retrieved from the postGres database. The frontend components make Fetch requests to the Flask server routes, which call crud functions written using SQLAlchemy, a python-based ORM.

![alt text](https://github.com/gloryleilani/beanstalksquare1/blob/main/static/readme-img/beanstalk-studentpodlist.gif "Beanstalk Square Student Pod List")

#### Pod details page 
The parent could choose a student pod from the list and view its details, which includes both student and teacher information. If the parent is interested to learn even more about the pod, he or she may contact the pod's organizer. The data in the messaging form gets sent in a text message to the parents associated with the pod. I built the messaging functionality using Twilio's programmable messaging API. When the message data arrives to the backend, a route extracts the data that got sent from the front-end in JSON format, and a crud function returns the parent mobile phone numbers, which I put into an array for Twilio to use.  

![alt text](https://github.com/gloryleilani/beanstalksquare1/blob/main/static/readme-img/beanstalk-studentpoddetails.gif "Beanstalk Square Student Pod Details Page")

#### List of available teachers and teacher profile page
The parent could choose from the list of available teachers in their area and view the teacher's profile. Teachers may create a profile for themselves so that parents can easily find them. The profile page allows the parent to text message the teacher directly. The messaging functionality uses Twilio's API.  

![alt text](https://github.com/gloryleilani/beanstalksquare1/blob/main/static/readme-img/beanstalk-teacherlist.gif "Beanstalk Square Student Teacher List and Details Pages")

#### Photo upload in teacher's sign-up flow 
After creating an account on Beanstalk Square, the teacher's sign-up flow allows the teacher to upload a profile photo and a biography as well as other details. The profile photo uses Cloudinary's Upload API.  On the frontend, the Fetch method sends the data containing the file to the backend in a post request. In the server route, the file data is sent to Cloudinary and receives a secure URL in the response which I save to the database.   

#### Ability to create a new pod
If a parent does not find an existing pod that is a fit for their child, the parent can start a new pod that gets published with its own details. 

#### Ability to text message a teacher or pod organizers 
If a user would like to contact a teacher or the pod organizers, who are parents in the pod, the user may fill out a contact form which uses Twilio's text-messaging API. 


## <a name="future"></a>The Future of Beanstalk Square
Possible future features:
* Ability to add a household and family members to Beanstalk Square
* Ability for only parents and teachers within a pod to see each other's private contact details such as phone number
* Ability to choose local schools from a dropdown menu
* Ability to share lessons and photos within a pod, with view access
* Ability to edit/delete teacher, student, or pod data once published.

The goal would be to make this a more fully-featured webapp to assist users (e.g. a parent or teacher) not only in finding each other during the initial search, but also to use the site during the lifecycle of the pod as well.

## <a name="installation"></a>Installation
To run Beanstalk Square on your own machine: 

Clone or fork this repo:
```
https://github.com/gloryleilani/beanstalksquare
```

Create and activate a virtual environment inside your Beanstalk Square directory:
```
virtualenv env
source env/bin/activate
```

Install the dependencies:
```
pip install -r requirements.txt
```

Sign up to use the [Twilio API](https://www.twilio.com/try-twilio/)

Sign up to use the [Google Maps Javascript, Google Places and Geocoder APIs](https://cloud.google.com/maps-platform/)

You will need to register for 2 Google API keys.  One will be used in the JavaScript front-end and one for the Python back-end.  Your front-end API key will need to be locked to your personal IP address and included in your script tags, the back-end key will need to be saved as below:

Sign up to use the [Cloudinary API](https://cloudinary.com/documentation/how_to_integrate_cloudinary)



Save your API keys in a file called <kbd>secrets.sh</kbd> using this format:

```
export TWILIO_API_KEY="YOUR_KEY_HERE"
export TWILIO_AUTH_TOKEN="YOUR_TOKEN_HERE"
export TWILIO_PHONE="YOUR_TWILIO_PHONE_NUMBER"
export GOOGLE_API_KEY="YOUR_KEY_HERE"
export GOOGLE_CLIENT_ID="YOUR_ID_HERE"
export cloudinary_api_key="YOUR_KEY_HERE"
export cloudinary_api_secret="YOUR_SECRET_HERE"
```

Source your keys from your secrets.sh file into your virtual environment:

```
source secrets.sh
```

Set up the database:

```
createdb beanstalk
python3.6 model.py
```

Run the app:

```
python3.6 server.py
```

You can now navigate to 'localhost:5000/' to access Beanstalk Square.

## <a name="license"></a>License
The MIT License (MIT) Copyright (c) 2016 Agne Klimaite

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
