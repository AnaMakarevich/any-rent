import datetime

from flask import jsonify, request

from app import create_app, db
from models import Hackathon, hackathons_schema, hackathon_schema

app = create_app()


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
            }
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
            }
        }
    ]
    return jsonify(dummy_owned_items)

@app.route("/rented_items")
def borrowed_items():
    dummy_borrowed_items = {

    }
    return None


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
