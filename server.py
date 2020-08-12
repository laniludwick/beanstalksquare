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


@app.route("/all_pods")
def show_all_pods():
    """Show all pods."""

    zip = request.args.get("zipcode") #Get name on form input on homepage.html.

    filtered_pods = crud.get_pods_by_zipcode(zip)

    return render_template('all_pods.html', filtered_pods=filtered_pods)





if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)

