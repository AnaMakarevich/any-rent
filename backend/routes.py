import datetime

from flask import jsonify, request

from app import create_app, db
from models import Hackathon, hackathons_schema, hackathon_schema, Item, Contract
from serializers import user_schema, users_schema, items_schema, item_schema, contracts_schema
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
    item = Item.query.filter_by(id=item_id)[0]
    contracts = Contract.query.filter_by(item_id=item_id, consumer=uid)
    item_ = item_schema.dump(item)
    if contracts.count() != 0:
        item_["rented_by_this_user"] = True
    # TODO: make contract check
    return jsonify(item_)


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
    contracts = Contract.query.filter_by(provider_id=uid)
    contracts_ = contracts_schema.dump(contracts)
    return jsonify(contracts_)


@app.route('/running_consumer_contracts/<uid>')
def running_consumer_contracts(uid):
    """Contract items for the user with this id"""
    contracts = Contract.query.filter_by(consumer_id=uid)
    contracts_ = contracts_schema.dump(contracts)
    return jsonify(contracts_)


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
