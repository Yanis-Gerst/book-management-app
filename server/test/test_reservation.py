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

def test_get_full_reservation_by_id(client):
    response = client.get("/reservation/9")
    json = response.json
    assert json["books"] is not None and json["reservation_id"] == 9