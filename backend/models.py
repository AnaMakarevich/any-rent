from app import db, ma


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), index=True, unique=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    coins = db.Column(db.Integer, default=100, nullable=False)
    level = db.Column(db.String(100), default='padavan', nullable=False)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_added = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text(), default='', nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    state = db.Column(db.String(100), default='', nullable=False)
    availible_since = db.Column(db.DateTime, default=db.func.now())
    max_rent_length = db.Column(db.Integer, default=90, nullable=False)
    kaution = db.Column(db.Integer, default=0, nullable=False)
    coins = db.Column(db.Integer, default=0, nullable=False)
    lat = db.Column(db.Float, nullable=True)
    lon = db.Column(db.Float, nullable=True)
    required_post_actions = db.Column(db.Text, default='', nullable=False)
    checked_at_return = db.Column(db.Text, default='', nullable=False)
    image_url = db.Column(db.String(200), default='', nullable=False)

    def __repr__(self):
        return '<Item {}>'.format(self.name)


class Contract(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    consumer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    start_date = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    end_date = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    status = db.Column(db.String(100), default='initial', nullable=False)
    image_after_url = db.Column(db.String(200), nullable=True)
    closed_on = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return '<Contract {}>'.format(self.id)


class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    # provider_id is related item.owner_id
    consumer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date_added = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    text = db.Column(db.Text, default='', nullable=False)

    def __repr__(self):
        return '<Request {}>'.format(self.id)


class Hackathon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime(), nullable=True)
    description = db.Column(db.Text, nullable=False)
    organiser = db.Column(db.String(256), nullable=True)

    sponsors = db.relationship('Sponsor', backref='hackathon', lazy=True)

    def __repr__(self):
        return '<Hackathon %r>' % self.name


class Sponsor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    hackathon_id = db.Column(db.Integer, db.ForeignKey('hackathon.id'), nullable=False)

    def __repr__(self):
        return '<Sponsor %r>' % self.name


class HackathonSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'date', 'description', 'organiser', 'sponsors')
        include_fk = True


hackathon_schema = HackathonSchema()
hackathons_schema = HackathonSchema(many=True)
