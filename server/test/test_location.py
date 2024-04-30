from datetime import datetime


def test_get_location(client):
    response = client.get("/location/1")

    assert response.json["location_id"] == 1 and "articles" in response.json.keys()

def test_post_location(client):
    return
    response = client.post("/location", json={
         "client_name": "Benoit Gerst",
        "client_phone_number": "0789230338",
        "dateOfEnd": "2024/9/5",
        "books_id": [
            1,
            2
        ]
    })

    newLocation = client.get("/location/11")

    for book in newLocation["books"]:
        assert book["book_id"] == 1 or book["book_id"] == 2

    assert response.json["success"] == True and newLocation.json["location_id"] == 11

def test_location_to_render(client):
    response = client.get("/location/to-render")
    locations = response.json
    for location in locations:
        assert datetime.fromisoformat(location["dateOfEnd"]) < datetime.now() and "location_id" in location.keys()