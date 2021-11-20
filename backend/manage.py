
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


deploy()
