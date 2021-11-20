from app import db, ma


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
