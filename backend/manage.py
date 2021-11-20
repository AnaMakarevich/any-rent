import datetime
import json


def seed(app, db):
    from models import User, Item, Contract
    with open('initial_data.json') as f:
        data = json.load(f)
        with app.app_context():
            users = data["users"]
            for user in users:
                u = User(**user)
                print(u)
                db.session.add(u)
                db.session.commit()
            items = data["items"]
            for item in items:
                date = item["available_since"].split('-')
                parsed_date = datetime.datetime(int(date[0]), int(date[1]), int(date[2]))
                item["available_since"] = parsed_date
                data_added = item["date_added"].split('-')
                parsed_date_added = datetime.datetime(int(date[0]), int(date[1]), int(date[2]))
                item["date_added"] = parsed_date_added
                it = Item(**item)
                print(it)
                db.session.add(it)
                db.session.commit()


def deploy():
    from app import create_app, db
    from flask_migrate import upgrade, migrate, stamp
    from models import Hackathon, Sponsor
    from models import User, Item, Contract
    app = create_app()
    app.app_context().push()

    # actually initialize DB and migrate
    db.create_all()

    stamp()
    migrate()
    upgrade()
    seed(app, db)


deploy()
