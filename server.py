from flask import Flask, request, flash, session, redirect, render_template, jsonify
from model import connect_to_db
import crud
#from jinja2 import StrictUndefined


app = Flask(__name__)
#app.secret_key = "dev"
#app.jinja_env.undefined = StrictUndefined


@app.route("/")
def root():
    """Show homepage."""

    return render_template("root.html")




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

    pod = crud.get_pod_details_by_pod_id(pod_id) #Get pod based on click event.

    {
    "pod_id": pod.pod_id,
    "pod_name": pod.pod_name,
    "days_per_week": pod.days_per_week,
    "total_hours_per_day": pod.total_hours_per_day,
    "paid_teacher": pod.paid_teacher,
    "zipcode": pod_location.zipcode
    }

    return jsonify(pod)





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


    





if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
