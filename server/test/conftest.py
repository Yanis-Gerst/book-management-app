import pytest
from flaskr import create_app
from flaskr.orm.setup import db
from flaskr.orm.script import  generate_fake_data


class TestConfig:
    SQLALCHEMY_DATABASE_URI = "sqlite:////Users/ikims/Work/Project/book-management-store/server/db/test.db"
    Testing: True
    DEBUB: True

@pytest.fixture()
def app():
    app = create_app(TestConfig)
    app.config.update()   

    with app.app_context():
        pass
        # db.drop_all()
        # db.create_all()
        # generate_fake_data(10, 20, 1000, 10, 20, 10)
    # other setup can go here

    yield app
    # clean up / reset resources here

@pytest.fixture()
def client(app):
    return app.test_client()