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
                parsed_date_added = datetime.datetime(int(data_added[0]),
                                                      int(data_added[1]),
                                                      int(data_added[2]))
                item["date_added"] = parsed_date_added
                it = Item(**item)
                print(it)
                db.session.add(it)
                db.session.commit()
    with open('contracts.json') as f:
        contracts = json.load(f)["contracts"]
        with app.app_context():
            for contract in contracts:
                start_date = contract["start_date"].split('-')
                parsed_start_date = datetime.datetime(int(start_date[0]),
                                                      int(start_date[1]),
                                                      int(start_date[2]))
                end_date = contract["end_date"].split('-')
                parsed_end_date = datetime.datetime(int(end_date[0]),
                                                    int(end_date[1]),
                                                    int(end_date[2]))
                contract["start_date"] = parsed_start_date
                contract["end_date"] = parsed_end_date
                contract_ = Contract(**contract)
                print(contract_)
                db.session.add(contract_)
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
