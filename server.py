from flask import (Flask, request, flash, session, redirect, render_template, 
                    jsonify)
from model import connect_to_db
import crud
#import os
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity)



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
        pods.append({
            "pod_id": pod.pod_id,
            "pod_name": pod.pod_name,
            "days_per_week": pod.days_per_week,
            "total_hours_per_day": pod.total_hours_per_day,
            "paid_teacher": pod.paid_teacher,
            "zipcode": pod_location.zipcode
            }, )

    return jsonify(pods)
                                  


@app.route("/api/pods/<pod_id>")
def show_pod_details(pod_id):
    """Show details of the selected pod."""

    pods = crud.get_pod_details_by_pod_id(pod_id) #Get pod based on click event.

    pod_details = []

    for pod, child_pod in pods:
    
        pod_details.append({
            "pod_id": pod.pod_id,
            "pod_name": pod.pod_name,
            "days_per_week": pod.days_per_week,
            "total_hours_per_day": pod.total_hours_per_day,
            "paid_teacher": pod.paid_teacher,
            
            "child_pod_id": child_pod.child_pod_id,
            },)

    return jsonify(pod_details)


@app.route("/api/children/<pod_id>")
def show_children_in_pod(pod_id):
    """Show details of the selected pod."""

    children = crud.get_children_by_pod_id(pod_id) #Get pod based on click event.

    childrenlist = []

    for child in children:
    
        childrenlist.append({
            "child_id": child.child_id,
            "zipcode": child.zipcode,
            "school program": child.school_program,
            
            },)

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
    #paid_teacher = data["paid_teacher"]
    print("****************pod name createpod route:", pod_name)

    pod = crud.create_pod(pod_name, max_child_capacity, days_per_week, total_hours_per_day)
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



@app.route("/api/logout", methods=['POST'])
def process_logout():
    """Log the user out of their session."""

    del session["logged_in_customer_email"]
    flash("Logged out")
    return redirect("/melons")



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