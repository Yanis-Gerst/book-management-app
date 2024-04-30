post_endpoint = ["book"]
get_endpoint = ["book", "reservation"]
fake_data = [
    {
    "title": "Le Petit Prince",
    "state": "moyen",
    "price": 1000,
    "genre": "Conte philosophique",
    "author_id": 1,
    "publicationDate": "",
    "coverSrc": "https://placehold.co/1400x1873",
    "avgStar": "4.5",
    "stocks": 10,
    "resume": "Un petit prince venu d'une autre planète rencontre un aviateur perdu dans le désert du Sahara et lui raconte ses aventures sur les astéroïdes qu'il a visités."
    },   
]

def test_get_item_by_id(client):
    for data in get_endpoint:
        json = client.get(f"{data}/1").json
        assert json[f"{data}_id"] == 1

        
def test_get_post_item(client):
    for i in range(0, len(post_endpoint)):
        json = client.post(f"{post_endpoint[i]}", json=fake_data[i]).json
       
        print(post_endpoint[i], json)
        assert json["success"] == True 

    

    