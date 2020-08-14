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

    return render_template('homepage.html')



@app.route("/pods")
def show_all_pods():
    """Show all pods."""

    all_pods = crud.get_all_pods()

    return render_template("all_pods.html", pods=all_pods)



@app.route("/pods_by_zip")
def show_all_pods_by_zip():
    """Show all pods."""

    zip = request.args.get("zipcode") #Get name on form input on homepage.html.

    filtered_pods = crud.get_pods_by_zipcode(zip)

    return render_template("all_pods.html", filtered_pods=filtered_pods)



@app.route("/pods/<pod_id>")
def show_pod_details(pod_id):
    """Show details of the selected pod."""

    pod = crud.get_pod_by_id(pod_id) #Get pod based on click event.

    return render_template("pod_details.html", pod=pod)




if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)



