import datetime

from flask import jsonify, request

from app import create_app, db
from models import Hackathon, hackathons_schema, hackathon_schema

app = create_app()


@app.route('/update_contract', methods=['POST'], strict_slashes=False)
def update_contract():
    uid = request.json['user_id']
    contract_id = request.json['contract_id']
    status = request.json['status']  # new status
    # TODO: update contract status only if applicable. so, status e. g.:
    # 'initial' -> 'pending' -> 'active' -> 'returned' -> 'completed'
    #                                    -> 'complained'
    #                                                  -> 'complained'


@app.route('/confirm_request', methods=["POST"], strict_slashes=False)
def confirm_request():
    uid = request.json['user_id']
    request_id = request.json['request_id']
    # TODO: set request status to confirmed
    # TODO: create contract with "status": "initial"
    return jsonify({'result': 'OK'})


@app.route('/request_item', methods=["POST"], strict_slashes=False)
def request_item():
    uid = request.json['user_id']
    item_id = request.json['item_id']
    text = request.json['text']
    # TODO: generate request test
    # TODO: send an email
    # TODO: create request item in the database
    response = {
        "request_id": 1,
    }
    return jsonify(response)


@app.route('/items/<item_id>')
def item(item_id):
    dummy_item = {
        "id": item_id,
        "date_added": "2021-10-10T00:00:00",
        "name": "Skateboard",
        "description": "A skateboard that I'm not using since I started to work at a big corporation.",
        "owner": 1,
        "state": "Heavily abused",
        "available_since": "2021-12-12",
        "max_rent_length": 90,
        "kaution": 200,
        "coins": 30,
        "location": {
            "lat": 48.1351253,
            "lon": 11.5819806
        },
        "Fragile": False,
        "required_post_actions": "Please clean it after you use it",
        "checked_at_return": "Wheels stability",
        "status": "available",
        "picture_before": "/img1.jpeg"
    }
    return jsonify(dummy_item)


@app.route('/add_item', methods=["POST"], strict_slashes=False)
def add_item():
    name = request.json['name']
    item = {
        "name": name,
        "description": request.json["description"],
        "state": request.json["state"],
        "available_since": request.json["available_since"],
        "max_rent_length": request.json["max_rent_length"],
        "kaution": request.json["kaution"],
        "location": {
            "lat": 48.1351253,
            "lon": 11.5819806
        },
        "Fragile": request.json["Fragile"],
        "required_post_actions": request.json["required_post_actions"],
        "checked_at_return": request.json["checked_at_return"],
        "status": request.json["status"],
        "picture_before": "/img1.jpeg"
    }
    return jsonify(item)


@app.route('/user_profile/<uid>')
def user_profile(uid):
    """The profile of some user shown to everyone logged in"""
    user_profile_ = {
        "id": uid,
        "coins": 1000,
        "first_name": "Bruce",
        "last_name": "Lee",
        "successful_returns": 5,
        "num_current_contracts_consumer": 10,  # suspicious!
        "num_current_contracts_provider": 0,
        "level": "padavan"
    }
    return jsonify(user_profile_)


@app.route('/account/<uid>')
def user_account(uid):
    """The account of the logged in user with uid"""
    user_profile_ = {
        "id": uid,
        "coins": 1000,
        "first_name": "Bruce",
        "last_name": "Lee",
        "successful_returns": 5,
        "num_current_contracts_consumer": 10,  # suspicious!
        "num_current_contracts_provider": 0,
        "complaints": 1,
        "level": "padavan"
    }
    return jsonify(user_profile_)


@app.route('/running_provider_contracts/<uid>')
def running_provider_contracts(uid):
    """Contract items for the user with this id"""
    contracts = [{
        "contract_id": 1,
        "provider": uid,
        "consumer": 2,
        "item": 1,
        "start_date": "2021-12-12",
        "end_date": "2021-12-20",
        "status": "active",
        "picture_after": None,
        "closed_on": None,
        "provider_confirmed_return": False,
        "consumer_confirmed_return": False,
    }]
    return jsonify(contracts)


@app.route('/running_consumer_contracts/<uid>')
def running_consumer_contracts(uid):
    """Contract items for the user with this id"""
    contracts = [{
        "contract_id": 1,
        "provider": 1,
        "consumer": uid,
        "item": 1,
        "start_date": "2021-12-12",
        "end_date": "2021-12-20",
        "status": "active"
    }]
    return jsonify(contracts)


@app.route('/all_items')
def available_items():
    """All available items"""
    dummy_items = [{
        "id": 1,
        "date_added": "2021-10-10T00:00:00",
        "name": "Skateboard",
        "description": "A skateboard that I'm not using since I started to work at a big corporation.",
        "owner": 1,
        "state": "Heavily abused",
        "available_since": "2021-12-12",
        "max_rent_length": 90,
        "kaution": 200,
        "coins": 30,
        "location": {
            "lat": 48.1351253,
            "lon": 11.5819806
        },
        "Fragile": False,
        "required_post_actions": "Please clean it after you use it",
        "checked_at_return": "Wheels stability",
        "status": "available",
        "picture_before": "/img1.jpeg"
    },
        {
            "id": 2,
            "date_added": "2021-10-10T00:00:00",
            "name": "Travel suitcase",
            "description": "A huge 100L travel suitcase that I only use once per  year",
            "owner": 1,
            "state": "Almost new",
            "available_since": "2021-12-12",
            "max_rent_length": 60,
            "kaution": 200,
            "coins": 60,
            "location": {
                "lat": 48.1351253,
                "lon": 11.5819806
            },
            "Fragile": False,
            "required_post_actions": "Please clean it after you use it",
            "checked_at_return": "Wheels stability, cleanness, visual damage",
            "status": "available",
            "picture_before": "/img1.jpeg"
        },
        {
            "id": 4,
            "date_added": "2021-10-10T00:00:00",
            "name": "Electric Piano",
            "description": "A piano I'm not using because I'm dead inside.",
            "owner": 2,
            "state": "Almost new",
            "available_since": "2021-12-12",
            "max_rent_length": 180,
            "kaution": 200,
            "coins": 30,
            "location": {
                "lat": 48.1351253,
                "lon": 11.5819806
            },
            "Fragile": True,
            "required_post_actions": "None",
            "checked_at_return": "Keys stability, visual damage such as scratches",
            "status": "available",
            "picture_before": "/img1.jpeg"
        }
    ]
    return jsonify(dummy_items)


@app.route('/owned_items/<uid>')
def owned_items(uid):
    dummy_owned_items = [
        {
            "id": 1,
            "date_added": "2021-10-10T00:00:00",
            "name": "Skateboard",
            "description": "A skateboard that I'm not using since I started to work at a big corporation.",
            "owner": uid,
            "state": "Heavily abused",
            "available_since": "2021-12-12",
            "max_rent_length": 90,
            "kaution": 200,
            "coins": 30,
            "location": {
                "lat": 48.1351253,
                "lon": 11.5819806
            },
            "Fragile": False,
            "required_post_actions": "Please clean it after you use it",
            "checked_at_return": "Wheels stability",
            "status": "available",
            "picture_before": "/img1.jpeg"
        },
        {
            "id": 2,
            "date_added": "2021-10-10T00:00:00",
            "name": "Travel suitcase",
            "description": "A huge 100L travel suitcase that I only use once per  year",
            "owner": uid,
            "state": "Almost new",
            "available_since": "2021-12-12",
            "max_rent_length": 60,
            "kaution": 200,
            "coins": 60,
            "location": {
                "lat": 48.1351253,
                "lon": 11.5819806
            },
            "Fragile": False,
            "required_post_actions": "Please clean it after you use it",
            "checked_at_return": "Wheels stability, cleanness, visual damage",
            "status": "available",
            "picture_before": "/img1.jpeg"
        }
    ]
    return jsonify(dummy_owned_items)


@app.route("/rented_items/<uid>")
def borrowed_items(uid):
    """Items that you rented to someone"""
    dummy_rented_items = [
        {
            "id": 3,
            "date_added": "2021-10-10T00:00:00",
            "name": "Crotches",
            "description": "A pair of crotches I had to buy when I broke a leg.",
            "owner": uid,
            "state": "Good condition",
            "available_since": "2021-12-12",
            "max_rent_length": None,  # None means for as long as needed
            "kaution": 0,
            "coins": 30,
            "location": {
                "lat": 48.1351253,
                "lon": 11.5819806
            },
            "Fragile": False,
            "required_post_actions": "Please clean it after you use it",
            "checked_at_return": "Wheels stability, cleanness, visual damage",
            "status": "in lease",
            "picture_before": "/img1.jpeg"
        }
    ]
    return dummy_rented_items


@app.route('/', methods=["GET"], strict_slashes=False)
def index():
    return "<h1>Hello</h1>"


@app.route('/hackathons', methods=["GET"], strict_slashes=False)
def hackathons():
    # get queryset
    all_hackathons = Hackathon.query.all()

    all_hackathons_ser = jsonify(hackathons_schema.dump(all_hackathons))
    return all_hackathons_ser


@app.route('/add_hackathon', methods=["POST"], strict_slashes=False)
def add_hackathon():
    name = request.json['name']
    date = request.json['date'].split('-')
    parsed_date = datetime.datetime(int(date[0]), int(date[1]), int(date[2]))
    description = request.json['description']
    organiser = request.json['organiser']
    hackathon = Hackathon(
        name=name,
        date=parsed_date,
        description=description,
        organiser=organiser
    )
    db.session.add(hackathon)
    db.session.commit()
    return hackathon_schema.jsonify(hackathon)


if __name__ == "__main__":
    app.run(debug=True)
