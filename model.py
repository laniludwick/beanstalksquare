"""Models for PeachPodSquare app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Parent(db.Model):
    """A parent user."""

    __tablename__ = "parents"
    
    parent_id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))


    def __repr__(self):
        return f'<Parent parent_id={self.parent_id} email={self.email}>'


def connect_to_db(flask_app, db_uri='postgresql:///beanstalksquare', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)

