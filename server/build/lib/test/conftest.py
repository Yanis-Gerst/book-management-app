import pytest
from flaskr import create_app

@pytest.fixture()
def app():
    print("L'app en question", app)
    app = create_app()
    app.config.update({
        "TESTING": True,
    })

    # other setup can go here

    yield app

    # clean up / reset resources here
