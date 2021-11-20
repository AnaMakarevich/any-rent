import datetime
import json

from models import Request


def convert_to_valid_date(date_str):
    date = date_str.split('-')
    parsed_date = datetime.datetime(int(date[0]), int(date[1]), int(date[2]))
    return parsed_date


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
                item["available_since"] = convert_to_valid_date(item["available_since"])
                item["date_added"] = convert_to_valid_date(item["date_added"])
                it = Item(**item)
                print(it)
                db.session.add(it)
                db.session.commit()
    with open('contracts.json') as f:
        contracts = json.load(f)["contracts"]
        with app.app_context():
            for contract in contracts:
                contract["start_date"] = convert_to_valid_date(contract["start_date"])
                contract["end_date"] = convert_to_valid_date(contract["end_date"])
                contract_ = Contract(**contract)
                print(contract_)
                db.session.add(contract_)
                db.session.commit()
    with open('requests.json') as f:
        requests_ = json.load(f)["requests"]
        with app.app_context():
            for req in requests_:
                req["start_date"] = convert_to_valid_date(req["start_date"])
                req["end_date"] = convert_to_valid_date(req["end_date"])
                req["date_added"] = convert_to_valid_date(req["date_added"])
                req_ = Request(**req)
                print(req_)
                db.session.add(req_)
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
