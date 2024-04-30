
def test_get_book_by_id(client):
    response = client.get("/book/5")
    data = response.json
    
    sum_per_state_stock = 0
    for state in data["stocks_per_state"]:
        sum_per_state_stock += sum(list(data["stocks_per_state"][state].values()))
    
    assert data["book_id"] == 5 and "authors" in data.keys()  and "articles" in data.keys() and data["total_stocks"] > 0 and data["total_stocks"] == sum_per_state_stock

