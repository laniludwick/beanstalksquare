from model import db, Parent, connect_to_db #Need to fill in here


def create_parent(fname, lname, email, password):
    """Add a new parent to the parents table and return the parent."""

    parent = Parent(fname=fname, lname=lname, email=email, password=password)
    db.session.add(parent)
    db.session.commit()

    return parent


def get_pods_by_zipcode(zipcode):
    """Get and return pods and podless kids filtered by zipcode entered."""

    filtered_pods = db.session.query(Pod).filter(Pod.zipcode==zipcode).all()
    #Need to refactor the queryto add the poddless children.

    return filtered_pods


if __name__ == '__main__':
    from server import app
    connect_to_db(app)


    # def find_humans_by_animal_species(species):
    # """Returns a list of all Human objects who have animals of that species."""

    # humans = db.session.query(Human).join(Animal) #SQLAlchemy base object
    # #Chaining base object to filter method:
    # filtered_humans = humans.filter(Animal.animal_species==species).all()

    # return filtered_humans

