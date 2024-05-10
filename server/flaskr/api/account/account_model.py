from flaskr.orm.setup import Account, db
from sqlalchemy import select
from flask import abort, jsonify
from typing import TypedDict
from sqlalchemy import insert

class AccountData(TypedDict):
    mail: str
    password: str

class SignupAccountData(TypedDict):
    firstName: str
    lastName:str
    phoneNumber: str
    mail: str
    password: str

def find_account_by_account_data(account_data: AccountData):
    account = db.session.scalars(select(Account).filter(Account.mail == account_data['mail'] and Account.password == account_data['password'])).one_or_none()
    if account is None:
        abort(404, description="wrong password or mail")
        return
    return account

def add_account(signup_account_data: SignupAccountData):
    new_account = Account(role="user", first_name=signup_account_data['firstName'], last_name=signup_account_data['lastName'], mail=signup_account_data['mail'], password=signup_account_data['password'], phone_number=signup_account_data["phoneNumber"])
    db.session.add(new_account)
    db.session.commit()
    