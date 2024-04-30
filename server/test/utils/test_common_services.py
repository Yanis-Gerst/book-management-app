post_endpoint = ["book"]
get_endpoint = ["book", "reservation"]

def test_get_item_by_id(client):
    for data in get_endpoint:
        json = client.get(f"{data}/1").json
        assert json[f"{data}_id"] == 1


    

    