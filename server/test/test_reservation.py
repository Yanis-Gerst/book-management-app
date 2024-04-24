from flaskr.orm.setup import Reservation

def test_post_reservation(client):
    response = client.post("/reservation", json={
         "client_name": "Benoit Gerst",
        "client_phone_number": "0789230338",
        "books_id": [
            1,
            2
        ]
    })

    assert response.json["success"] == True