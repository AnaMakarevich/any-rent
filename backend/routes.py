import datetime

from flask import jsonify, request

from app import create_app, db
from models import Hackathon, hackathons_schema, hackathon_schema, Item, Contract, Request
from serializers import user_schema, items_schema, item_schema, contracts_schema, requests_schema, \
    request_schema
from models import User
from scclient import MyClientProtocol, run as run_client, queue

app = create_app()


@app.route('/update_contract/<action>', methods=['POST'], strict_slashes=False)
def update_contract(action):
    contract_id = request.json['contract_id']
    uid = request.json['user_id']
    contract = db.session.query(Contract).get(contract_id)
    consumer = db.session.query(User).get(contract.consumer_id)
    provider = db.session.query(User).get(contract.provider_id)
    item = db.session.query(Item).get(contract.item_id)
    if action == "consumer_confirm_return":
        contract.consumer_confirmed_return = True
        contract.status = "returned"
    elif action == "provider_confirm_return":
        contract.provider_confirmed_return = True
        contract.status = "completed"
        consumer.successful_returns += 1
        consumer.num_current_contracts_consumer -= 1
        provider.num_current_contracts_consumer -= 1
        provider.coins += item.coins
    elif action == "provider_confirm_transfer":
        contract.provider_confirmed_transfer = True
        contract.status = "pending"
        consumer.coins -= item.coins
    elif action == "consumer_confirm_transfer":
        contract.consumer_confirmed_transfer = True
        contract.status = "active"
        consumer.num_current_contracts_consumer += 1
        provider.num_current_contracts_consumer += 1
    elif action == "complain":
        contract.status = "complained"
        if contract.provider_id == uid:
            contract.status = "provider_complained"
            consumer.complaints += 1
        elif contract.consumer_id == uid:
            contract.status = "consumer_complained"
            provider.complaints += 1
        print("The complaint was registered. The money will be transferred to your account")
    db.session.commit()

    # TODO: update contract status only if applicable. so, status e. g.:
    # 'initial' -> 'pending' -> 'active' -> 'returned' -> 'completed'
    #                                    -> 'complained'
    #                                                  -> 'complained'
    # return updated contract
    return jsonify({
        'status': contract.status
    })


@app.route('/confirm_request', methods=["POST"], strict_slashes=False)
def confirm_request():
    uid = request.json['user_id']
    request_id = request.json['request_id']
    # set request status to confirmed
    req = db.session.query(Request).get(request_id)
    req.confirmed = True
    db.session.commit()
    # TODO: initialize blockchain block
    new_contract = Contract(
        provider_id=req.provider_id,
        consumer_id=req.consumer_id,
        item_id=req.item_id,
        start_date=req.start_date,
        end_date=req.end_date,
        statue="initial",
        picture_after=None,
        closed_on=None,
        provider_confirmed_return=None,
        consumer_confirmed_return=None
    )
    db.session.add(new_contract)
    db.session.commit()
    return jsonify({'result': 'OK'})


@app.route('/item_request/<request_id>')
def get_item_request(request_id):
    """Returns particular request by id"""
    req = Request.query.filter_by(id=request_id)
    req_ = request_schema.dump(req)
    return jsonify(req_)


@app.route('/item_requests/<uid>')
def item_requests(uid):
    """Returns all the requests made to the user with the given user id"""
    reqs = db.session.query(Request).filter_by(provider_id=uid, confirmed=False)
    reqs_ = requests_schema.dump(reqs)
    return jsonify(reqs_)


@app.route('/request_item', methods=["POST"], strict_slashes=False)
def request_item():
    """Implements making request to the provider of the item"""
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
    item_ = {
        "name": request.json['name'],
        "description": request.json["description"],
        "owner_id": uid,
        "state": request.json["state"],
        "available_since": request.json["available_since"],
        "max_rent_length": request.json["max_rent_length"],
        "kaution": request.json["kaution"],
        "lat": request.json["lat"],
        "lon": request.json["lon"],
        "fragile": request.json["fragile"],
        "required_post_actions": request.json["required_post_actions"],
        "checked_at_return": request.json["checked_at_return"],
        "status": request.json["status"],
        "picture_before": request.json["picture_before"],
    }
    date = item["available_since"].split('-')
    parsed_date = datetime.datetime(int(date[0]), int(date[1]), int(date[2]))
    item["available_since"] = parsed_date
    new_item = Item(**item_)
    db.session.add(new_item)
    db.session.commit()
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


@app.route('/test')
def test_endpoint():
    contract = 'DigitalCurrency'
    method = 'balance'
    kwargs = {
        'key': 'account2'
    }
    response = MyClientProtocol.call(contract, method, **kwargs)
    return jsonify({
        'response': response
    })


def run_scclient():
    import threading
    def thread():
        import asyncio
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        print("Starting thread")
        run_client()
    t = threading.Thread(target=thread, daemon=True)
    MyClientProtocol._stop.clear()
    t.start()


#run_scclient()


if __name__ == "__main__":
    app.run(debug=True)
