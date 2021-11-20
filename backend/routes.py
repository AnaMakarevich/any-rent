import datetime

from flask import jsonify, request

from app import create_app, db
from models import Hackathon, hackathons_schema, hackathon_schema, Item
from serializers import user_schema, users_schema, items_schema
from models import User

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
    # return updated contract
    return jsonify({
        'status': status
    })


@app.route('/confirm_request', methods=["POST"], strict_slashes=False)
def confirm_request():
    uid = request.json['user_id']
    request_id = request.json['request_id']
    # TODO: set request status to confirmed
    # TODO: create contract with "status": "initial"
    return jsonify({'result': 'OK'})


@app.route('/item_requests/<request_id>')
def get_item_request(request_id):
    r = {
        'id': request_id,
        'item_id': 1,
        'provider_id': 1,
        'consumer_id': 2,
        'text': 'I wanted to try skateboarding!',
    }
    return jsonify(r)


@app.route('/item_requests/<uid>')
def item_requests(uid):
    r = [{
        'id': 1,
        'item_id': 1,
        'provider_id': uid,
        'consumer_id': 2,
        'text': 'I wanted to try skateboarding!',
    }]
    return jsonify(r)


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


@app.route('/items/<item_id>', defaults={"uid": None})
@app.route('/items/<item_id>/<uid>')
def item(item_id, uid):
    dummy_item = {
        "id": item_id,
        "date_added": "2021-10-10T00:00:00",
        "name": "Skateboard",
        "description": "A skateboard that I'm not using since I started to work at a big corporation.",
        "owner_id": 1,
        "state": "Heavily abused",
        "available_since": "2021-12-12",
        "max_rent_length": 90,
        "kaution": 200,
        "coins": 30,
        "lat": 48.1351253,
        "lon": 11.5819806,
        "fragile": False,
        "required_post_actions": "Please clean it after you use it",
        "checked_at_return": "Wheels stability",
        "status": "available",
        "picture_before": "/img1.jpeg"

    }
    if uid is not None:
        dummy_item["rented_by_this_user"] = True
    return jsonify(dummy_item)


@app.route('/add_item/<uid>', methods=["POST"], strict_slashes=False)
def add_item(uid):
    name = request.json['name']
    item = {
        "name": name,
        "description": request.json["description"],
        "owner_id": uid,
        "state": request.json["state"],
        "available_since": request.json["available_since"],
        "max_rent_length": request.json["max_rent_length"],
        "kaution": request.json["kaution"],
        "lat": 48.1351253,
        "lon": 11.5819806,
        "fragile": request.json["fragile"],
        "required_post_actions": request.json["required_post_actions"],
        "checked_at_return": request.json["checked_at_return"],
        "status": request.json["status"],
        "picture_before": "/img1.jpeg"
    }
    return jsonify(item)


@app.route('/user_profile/<uid>')
def user_profile(uid):
    """The profile of some user shown to everyone logged in"""
    user = User.query.filter_by(id=1)[0]
    user_profile_ = user_schema.dump(user)
    return jsonify(user_profile_)


@app.route('/account/<uid>')
def user_account(uid):
    user = User.query.filter_by(id=1)[0]
    user_profile_ = user_schema.dump(user)
    """The account of the logged in user with uid"""
    return jsonify(user_profile_)


@app.route('/running_provider_contracts/<uid>')
def running_provider_contracts(uid):
    """Contract items for the user with this id"""
    contracts = [{
        "contract_id": 1,
        "provider_id": uid,
        "consumer_id": 2,
        "item_id": 1,
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
        "provider_id": 1,
        "consumer_id": uid,
        "item_id": 1,
        "start_date": "2021-12-12",
        "end_date": "2021-12-20",
        "status": "active"
    }]
    return jsonify(contracts)


@app.route('/all_items')
def available_items():
    items = Item.query.filter_by(status="available")
    items_ = items_schema.dump(items)
    return jsonify(items_)


@app.route('/owned_items/<uid>')
def owned_items(uid):
    items = Item.query.filter_by(owner_id=uid)
    items_ = items_schema.dump(items)
    return jsonify(items_)


@app.route("/rented_items/<uid>")
def borrowed_items(uid):
    items = Item.query.filter_by(owner_id=uid, status="in lease")
    items_ = items_schema.dump(items)
    return jsonify(items_)


@app.route('/', methods=["GET"], strict_slashes=False)
def index():
    return "<h1>Hello</h1>"


@app.route('/hackathons', methods=["GET"], strict_slashes=False)
def hackathons():
    # get queryset
    all_hackathons = Hackathon.query.all()
    items = Item.query.all()
    items_ = items_schema.dump(items)
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
