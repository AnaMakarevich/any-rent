from app import db, ma


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coins = db.Column(db.Integer, default=100, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    successful_returns = db.Column(db.Integer, default=0, nullable=False)
    num_current_contracts_consumer = db.Column(db.Integer, default=0, nullable=False)
    num_current_contracts_provider = db.Column(db.Integer, default=0, nullable=False)
    complaints = db.Column(db.Integer, default=0, nullable=False)
    level = db.Column(db.String(100), default='padavan', nullable=False)

    items = db.relationship('Item', backref='owner', lazy=True)
    provider_contracts = db.relationship('Contract', backref='provider',
        foreign_keys='Contract.provider_id', lazy=True)
    consumer_contracts = db.relationship('Contract', backref='consumer',
        foreign_keys='Contract.consumer_id', lazy=True)
    incoming_requests = db.relationship('Request', backref='provider',
        foreign_keys='Request.provider_id', lazy=True)
    outgoing_requests = db.relationship('Request', backref='consumer',
        foreign_keys='Request.consumer_id', lazy=True)

    def __repr__(self):
        return '<User {}>'.format(self.id)


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_added = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text(), default='', nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    state = db.Column(db.String(100), default='', nullable=False)
    availible_since = db.Column(db.DateTime, default=db.func.now())
    max_rent_length = db.Column(db.Integer, default=90, nullable=False)
    kaution = db.Column(db.Integer, default=0, nullable=False)
    coins = db.Column(db.Integer, default=0, nullable=False)
    lat = db.Column(db.Float, nullable=True)
    lon = db.Column(db.Float, nullable=True)
    fragile = db.Column(db.Boolean, default=False, nullable=False)
    required_post_actions = db.Column(db.Text, default='', nullable=False)
    checked_at_return = db.Column(db.Text, default='', nullable=False)
    status = db.Column(db.String(100), default='', nullable=False)
    picture_before = db.Column(db.String(200), default='', nullable=False)

    contracts = db.relationship('Contract', backref='item', lazy=True)
    requests = db.relationship('Request', backref='item', lazy=True)

    def __repr__(self):
        return '<Item {}>'.format(self.name)


class Contract(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    consumer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    start_date = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    end_date = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    status = db.Column(db.String(100), default='initial', nullable=False)
    picture_after = db.Column(db.String(200), nullable=True)
    closed_on = db.Column(db.DateTime, nullable=True)
    provider_confirmed_return = db.Column(db.Boolean, default=False, nullable=False)
    consumer_confirmed_return = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return '<Contract {}>'.format(self.id)


class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    consumer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
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
