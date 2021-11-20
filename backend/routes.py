import datetime

from flask import jsonify, request

from app import create_app, db
from models import Hackathon, hackathons_schema, hackathon_schema

app = create_app()


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
