

def test_articles(client):
    response = client.get("/article/1")

    print(response.json, "ici la")
    assert False == True