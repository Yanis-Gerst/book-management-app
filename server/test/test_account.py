from flask import request

def test_log_acccount(client):
    account_data = {
        "mail": "Marcelle-Gosselin@gmail.com",
        "password": "faute"   
    }
    res = client.post("/account/login", json=account_data)

    assert res.json["account_id"] == 1

def test_fail_log_account(client):
    account_data = {
        "mail": "NotExistedAccount@gmail.com",
        "password": "passwordThatNobodyUse"   
    }
 
    res = client.post("/account/login", json=account_data)

    assert res.json["code"] == 404

def test_get_account(client):
    res = client.get("/account/1")
    print(res.json)

    assert res.json["account_id"] == 1 and "locations" in res.json.keys() and "reservations" in res.json.keys() and False == True
