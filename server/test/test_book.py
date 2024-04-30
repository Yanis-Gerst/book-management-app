
def test_get_book_by_id(client):
    response = client.get("/book/5")
    data = response.json
    assert data["book_id"] == 5 and "author" in data.keys()


def test_get_pro_book(client):
    response = client.post("/book/pro", json={"limit": 30})
    firstItem = response.json[1]
    assert "loan_number" in firstItem and "reservation_number" in firstItem and "to_render_number" in firstItem
