from flask import Flask, json
from flask.json.provider import DefaultJSONProvider
from flaskr.config import config
from flaskr.orm.setup import db
from flaskr.orm.script import generate_fake_data
from flaskr.api.book.bookRoutes import blueprint as book_blueprint
from flaskr.api.reservation.reservationRoutes import blueprint as reservation_blueprint
from flaskr.api.location.locationRoutes import blueprint as location_blueprint
from flaskr.api.articles.articles_routes import blueprint as articles_blueprint
from flaskr.api.account.account_routes import blueprint as account_blueprint
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from datetime import datetime, date
from flaskr.orm.schema import ma

class UpdatedJSONProvider(DefaultJSONProvider):
    def default(self, o):
        if isinstance(o, date) or isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)

def create_app(app_config=None):
    
    app = Flask(__name__)
    app.json = UpdatedJSONProvider(app)
  
    CORS(app, resources={r"/*": {"origins": "*"}})
    if app_config is None:
     app.config.from_object(config["dev"])
    else:   
        app.config.from_object(app_config)
    app.register_blueprint(book_blueprint)
    app.register_blueprint(reservation_blueprint)
    app.register_blueprint(location_blueprint)
    app.register_blueprint(articles_blueprint)
    app.register_blueprint(account_blueprint)

    db.init_app(app)
    ma.init_app(app)
    with app.app_context():
        pass
        # db.drop_all()
        # db.create_all()
        # generate_fake_data(10, 20, 1000, 10, 20, 10)

    @app.route('/')
    def hello():
        return 'Hello, none!'

    @app.errorhandler(HTTPException)
    def handle_exception(e):
        print("Error handler", e)
        response = e.get_response()
        response.data = json.dumps({
            "code": e.code,
            "name": e.name,
            "description": e.description,
        })
        response.content_type = "application/json"
        return response

    return app
