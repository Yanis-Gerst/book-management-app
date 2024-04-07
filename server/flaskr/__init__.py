from flask import Flask
from flaskr.config import config
from flaskr.models.orm import db
from flaskr.models.script import delete_All_Data, generate_fake_data
from flaskr.api.book.bookRoutes import blueprint


app = Flask(__name__)
app.config.from_object(config["dev"])
app.register_blueprint(blueprint)
db.init_app(app)

with app.app_context():
    pass
    # delete_All_Data()
    # db.create_all()
    # generate_fake_data(10, 20, 5, 10, 20)

@app.route('/')
def hello():
    return 'Hello, none!'