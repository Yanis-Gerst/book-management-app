from flaskr.orm.setup import Reservation


def test_get_full_reservation_by_id(client):
    response = client.get("/reservation/9")
    json = response.json
   
    assert "articles" in json.keys() and json["reservation_id"] == 9

def test_post_reservation(client):
    response = client.post("/reservation", json={
        "account_id": 1,
        "articles_id": [
            1,
            2
        ]
    })

    newReservation = client.get("/reservation/11")

    article1 = client.get("/article/1").json
    article2 = client.get("/article/2").json

    assert response.json["success"] == True and newReservation.json["reservation_id"] == 11 and article1["reservation_id"] == 11 and article2["reservation_id"] == 11

