from flask import (Flask, request, flash, session, redirect, render_template, 
                    jsonify)
from model import connect_to_db
import crud
#import os
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity)

from twilio.rest import Client 
import os

account_sid = os.environ["ACCOUNT_SID"]
auth_token = os.environ["AUTH_TOKEN"]
to_phone_number = os.environ["TO_PHONE_NUMBER"]



app = Flask(__name__)
app.secret_key = "dev"
#API_KEY = os.environ['GOOGLEMAPS_APIKEY']
#app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)
#app.secret_key = "dev"
#app.jinja_env.undefined = StrictUndefined


@app.route("/")
def root():
    """Show homepage."""

    return render_template("root.html")


# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return render_template('root.html')


@app.route("/api/pods")
def show_pods():
    """Show pods filtered by zipcode."""
    
    zipcode = request.args.get("zipcode")

    filtered_pods = crud.get_filtered_pods(zipcode)

    #Turn the SQLAlchemy pod objects into dictioaries before jsonifying them.
    pods = []

    for pod, pod_location in filtered_pods: 
        
        if pod.paid_teacher==True:
            paid_teacher= "Yes"
        if pod.paid_teacher==False:
            paid_teacher= "No"

        pods.append({
            "pod_id": pod.pod_id,
            "pod_name": pod.pod_name,
            "days_per_week": pod.days_per_week,
            "total_hours_per_day": pod.total_hours_per_day,
            "paid_teacher": paid_teacher,
            "zipcode": pod_location.zipcode
            }, )

    return jsonify(pods)
                                  


@app.route("/api/pods/<pod_id>")
def show_pod_details(pod_id):
    """Show details of the selected pod."""

    pods = crud.get_pod_details_by_pod_id(pod_id) #Get pod based on click event.

    pod_details = []

    for pod, pod_location in pods:
    
        if pod.paid_teacher==True:
            paid_teacher= "Yes"
        if pod.paid_teacher==False:
            paid_teacher= "No"

        if pod.same_school_only==True:
            same_school_only= "Yes"
        if pod.same_school_only==False:
            same_school_only= "No"

        if pod.same_school_program_only==True:
            same_school_program_only= "Yes"
        if pod.same_school_program_only==False:
            same_school_program_only= "No"

        if pod.same_grade_only==True:
            same_grade_only= "Yes"
        if pod.same_grade_only==False:
            same_grade_only= "No"

        if pod.outdoors_only==True:
            outdoors_only= "Yes"
        if pod.outdoors_only==False:
            outdoors_only= "No"

        if pod.periodic_covid_testing==True:
            periodic_covid_testing= "Yes"
        if pod.periodic_covid_testing==False:
            periodic_covid_testing= "No"


        pod_details.append({
            "pod_id": pod.pod_id,
            "pod_name": pod.pod_name,
            "max_child_capacity": pod.max_child_capacity,
            "days_per_week": pod.days_per_week,
            "total_hours_per_day": pod.total_hours_per_day,
            "paid_teacher": paid_teacher,
            "same_school_only": same_school_only,
            "same_school_program_only": same_school_program_only,
            "same_grade_only": same_grade_only,
            "outdoors_only": outdoors_only,
            "periodic_covid_testing": periodic_covid_testing,
            "cost_per_hour": pod.cost_per_hour,
            "street_address": pod_location.street_address,
            "city": pod_location.city, 
            "state": pod_location.state, 
            "zipcode": pod_location.zipcode, 
            },)

    return jsonify(pod_details)



@app.route("/api/children/<pod_id>")
def show_children_in_pod(pod_id):
    """Show details of the selected pod."""

    children = crud.get_children_by_pod_id(pod_id) #Get pod based on click event.
    #Returns tuples of Child, Child_Pod, Grade, School SQL Alchemy objects
    #[(<Child child_id=1 fname=Eric>, <Child_Pod child_pod_id=1 child_id=1>, 
    #<Grade grade_id=1 grade_name=Preschool>, 
    #<School school_id=1 school_name=McKinley Elementary School>)]
    print("************children result of crud op:", children)
    childrenlist = []

    for child in children:
    
        print("*************child in children:", child)
        childrenlist.append({
            "child_id": child[0].child_id,
            "fname": child[0].fname,
            "lname": child[0].lname,
            "zipcode": child[0].zipcode,
            "school_program": child[0].school_program,
            "grade_name": child[2].grade_name,
            "school_name": child[3].school_name
            },)

    print("************children list:", childrenlist)
    return jsonify(childrenlist)



@app.route("/api/createpod", methods = ["POST"])
def start_pod():
    """Create a new pod."""



    data = request.get_json()
    print("******************data in createpod route:", data)
    pod_name = data["pod_name"]
    max_child_capacity = data["max_child_capacity"]
    days_per_week = data["days_per_week"]
    total_hours_per_day = data["total_hours_per_day"]
    paid_teacher = data["paid_teacher"]
    same_grade_only = data["same_grade_only"]
    same_school_only = data["same_school_only"]
    same_school_program_only = data["same_school_program_only"]
    outdoors_only = data["outdoors_only"]
    periodic_covid_testing = data["periodic_covid_testing"]
    cost_per_hour = data["cost_per_hour"]


    if data["paid_teacher"]=="":
        paid_teacher="No" 
    else:
        paid_teacher="Yes"
    
    if data["same_grade_only"]=="":
        same_grade_only="No" 
    else:
        same_grade_only="Yes"
    
    if data["same_school_only"]=="":
        same_school_only="No" 
    else:
        same_school_only="Yes"
        
    if data["same_school_program_only"]=="":
        same_school_program_only="No" 
    else:
        same_school_program_only="Yes"

    if data["outdoors_only"]=="":
        outdoors_only="No" 
    else:
        outdoors_only="Yes"

    if data["periodic_covid_testing"]=="":
        periodic_covid_testing="No" 
    else:
        periodic_covid_testing="Yes"

    print("****************pod name createpod route:", pod_name)

    pod = crud.create_pod(pod_name, max_child_capacity, days_per_week, 
                            total_hours_per_day, paid_teacher, same_grade_only, 
                            same_school_only, same_school_program_only, 
                            outdoors_only, periodic_covid_testing, 
                            cost_per_hour)
    print("***************result from createpod crud:", pod)
    #flash("Successfully created pod in server route!")

    return jsonify("Successful post to beanstalksquaretestdb")

    

@app.route("/api/signup_parent", methods = ["POST"])
def signup_parent():
    """Create a new user."""

    data = request.get_json()
    fname = data["fname"]
    lname = data["lname"]
    email = data["signupemail"]
    password = data["signuppassword"]

    #If email already exists in the system, block user from re-registering.
    #if crud.get_user_by_email(email): 
    #    return jsonify("Sorry, that user already exists. Please try again.")

    #Otherwise, allow user to register for an account with that email address.
    #else:
    user = crud.create_parent(fname, lname, email, password)
    
    return jsonify("Successfully registered a new parent!")



@app.route("/api/login", methods=['POST'])
def process_login():
    """Check if user's login credentials are valid and return a response."""

    data= request.get_json()

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"})


    
    email = data["loginemail"]
    password = data["loginpassword"]
    #password = request.json.get('password', None)
    

    if not email:
        return jsonify({"msg": "Missing username parameter"})

    if not password:
        return jsonify({"msg": "Missing password parameter"})


    print("Email to login:", email)
    print("Password to login:", password)

    if ((crud.get_user_by_email(email))=="undefined"):
        return jsonify({"msg": "Unrecognized email or password"})
       
    else:
        parent = crud.get_user_by_email(email)
        print("Parent from crud get user by email:", parent)

        if (parent.email != email) or (parent.password != password):  
            return jsonify({"msg": "Bad email or password"})
    
        access_token = create_access_token(identity=parent.email)
        print("******Access token:", access_token)
        
        return jsonify({"access_token": access_token})
        


@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    """Access the identity of the current user with get_jwt_identity."""

    current_user = get_jwt_identity()
    
    return jsonify(logged_in_as=current_user), 200



# @app.route("/api/logout", methods=['POST'])
# def process_logout():
#     """Log the user out of their session."""

#     del session["logged_in_customer_email"]
#     flash("Logged out")
#     return redirect("/melons")



@app.route("/api/send_stock_sms/<pod_id>", methods=['POST'])
def send_stock_sms_to_pod_organizer(pod_id):

    print("pod_id in sms api route:", pod_id)
    data = request.get_json()

    name = data["name"]
    phone = data["phone"]
    email = data["email"]
    message = data["message"]
  
    
    if data:
        print("**************data from json:", data)
    else:
        print("**************data from json seems to be nonexistent.")


    pod_organizers = crud.get_parents_by_pod_id(pod_id)
    print(pod_organizers)
    
    pod_organizers_mobiles = []

    for parent, parent_pod in pod_organizers:

        pod_organizers_mobiles.append(parent.mobile_number)
        print("parent mobile:", parent.mobile_number)
        print("pod organizers mobiles list:", pod_organizers_mobiles)

    client = Client(account_sid, auth_token)

    message = client.messages \
                    .create(
                         body="A parent is interested to learn more about this pod. Please respond at your earliest convenience. \n \n Contact info: \n" + name + ", \n" + phone + ", \n" + email + ". \n Message: \n \" "+message +"\"",
                         messaging_service_sid='MG8b0587e27f85f4b05d7525a5833f89db',
                         to=pod_organizers_mobiles,
                     )

    print("message.sid:", message.sid)
    return jsonify({"message.sid": message.sid,
                    "pod_organizers_mobiles": pod_organizers_mobiles},)
        




if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)



# @app.route("/login")
# def process_login():

#     email = request.args.get("email")
#     password = request.args.get("password")

#     #Check if possword matches with the stored user's password:
    
#     print("email:", email)
#     print("password:",password)

#     try: 
#         parent = crud.get_user_by_email(email)

#         print("parent:", parent)
        
#         print("parent.password:", parent.password)
    
#         return parent

#         if password == parent.password:
#             session["logged_in_parent"] = parent.parent_id
#             print("session:", session)
#             flash("Login successful!")

#         else: 
#             flash("Sorry, failed login attempt. Please try again.")

#     except:
#         flash("Sorry, no user found. Please try again.")