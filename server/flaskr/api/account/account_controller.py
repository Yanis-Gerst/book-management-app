from flaskr.api.account.account_model import *
from flask import request
from flaskr.utils.commonServices import get_item_by_id
from flaskr.orm.schema import AccountSchema
def log_account():
    json_request: AccountData = request.get_json()
    res = find_account_by_account_data(json_request)

    return jsonify(res)

def signup_account():
    json_request: SignupAccountData = request.get_json()
    add_account(json_request)   
    return jsonify(success="true")

def get_account_by_id(account_id: int):
    return get_item_by_id(Account, account_id)