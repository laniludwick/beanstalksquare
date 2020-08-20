from flask import Flask, request, flash, session, redirect, render_template, jsonify
from model import connect_to_db
import crud
#from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "dev"
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



@app.route("/api/createpod", methods = ["POST"])
def start_pod():
    """Create a new pod."""

    #pod_name = request.form.get("pod_name")
    #max_child_capacity = request.form.get("max_child_capacity")
    #password = request.form.get("password")
    data = request.get_json()
    pod_name = data["pod_name"]
    max_child_capacity = data["max_child_capacity"]
    days_per_week = data["days_per_week"]
    total_hours_per_day = data["total_hours_per_day"]
    paid_teacher = data["paid_teacher"]

    pod = crud.create_pod(pod_name, max_child_capacity, days_per_week, total_hours_per_day, paid_teacher)

    #pod_creation = []

    #for pod in pod_creation:

    #    pod_creation.append({"pod_name": pod.pod_name},)

        
    #flash("Successfully created pod in server route!")

    return jsonify("Successful post to beanstalksquaretestdb")

    
    


@app.route("/login")
def process_login():

    email = request.args.get("email")
    password = request.args.get("password")

    #Check if possword matches with the stored user's password:
    
    print("email:", email)
    print("password:",password)

    try: 
        parent = crud.get_user_by_email(email)

        print("parent:", parent)
        
        print("parent.password:", parent.password)
    
        return parent

        if password == parent.password:
            session["logged_in_parent"] = parent.parent_id
            print("session:", session)
            flash("Login successful!")

        else: 
            flash("Sorry, failed login attempt. Please try again.")

    except:
        flash("Sorry, no user found. Please try again.")



@app.route("/users", methods = ["POST"])
def register_user():
    """Create a new user."""

    email = request.form.get("email")
    password = request.form.get("password")

    #If email already exists in the system, block user from re-registering.
    if crud.get_user_by_email(email): 
        flash("Sorry, that user already exists. Please try again.")

    #Otherwise, allow user to register for an account with that email address.
    else:
        user = crud.create_user(email, password)
        flash("Successfully registered a new account!")

    return redirect("/")    





if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
