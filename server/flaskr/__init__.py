from flask import Flask, json
from flaskr.config import config
from flaskr.orm.setup import db
from flaskr.orm.script import delete_All_Data, generate_fake_data
from flaskr.api.book.bookRoutes import blueprint as book_blueprint
from flaskr.api.reservation.reservationRoutes import blueprint as reservation_blueprint
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

def create_app():

    app = Flask(__name__)
    CORS(app, resources={r"/book/*": {"origins": "*"}})
    app.config.from_object(config["dev"])
    app.register_blueprint(book_blueprint)
    app.register_blueprint(reservation_blueprint)
    db.init_app(app)

    with app.app_context():
        pass
        # delete_All_Data()
        # db.drop_all()
        # db.create_all()
        # generate_fake_data(10, 20, 5, 10, 20)


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