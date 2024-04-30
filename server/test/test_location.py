from datetime import datetime

def test_location_to_render(client):
    response = client.get("/location/to-render")
    locations = response.json
    for location in locations:
        assert datetime.fromisoformat(location["dateOfEnd"]) < datetime.now() and location["location_id"] is not None