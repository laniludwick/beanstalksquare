from flask import Flask, request, flash, session, redirect, render_template
from model import connect_to_db
import crud
from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def show_homepage():
    """Show homepage."""

    return render_template("homepage.html")

# @app.route("/pods")
# def show_all_pods():
#     """Show all pods."""
    
#     all_pods = crud.get_all_pods()

#     return render_template("all_pods.html", pods=all_pods)

@app.route("/pods")
def show_all_pods_by_zip():
    """Show all filtered pods."""

    zipcode = request.args.get("zipcode") #Get name on form input on homepage.html.
    #filter 2  
    #filter 3  

    filtered_pods = crud.get_filtered_pods(zipcode)
    #filtered_pods = crud.get_filtered_pods(zipcode, filter 2, filter 3)

    return render_template("all_pods.html", filtered_pods=filtered_pods)



@app.route("/pods/<pod_id>")
def show_pod_details(pod_id):
    """Show details of the selected pod."""

    pod = crud.get_pod_details_by_pod_id(pod_id) #Get pod based on click event.

    return render_template("pod_details.html", pod=pod)





if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)


@app.route("/login")
def process_login():

    email = request.args.get("email")
    password = request.args.get("password")

    #Check if possword matches with the stored user's password:
    
    print("email:", email)
    print("password:",password)

    try: 
        user = crud.get_user_by_email(email)

        print("user:", user)
        
        print("user.password:", user.password)
    

        if password == user.password:
            session["logged_in_user"] = user.user_id
            print("session:", session)
            flash("Login successful!")

        else: 
            flash("Sorry, failed login attempt. Please try again.")

    except:
        flash("Sorry, no user found. Please try again.")


    return redirect("/")

