from flask import Blueprint
from flaskr.api.account.account_controller import *

blueprint = Blueprint("account-routes", __name__, url_prefix="/account")

blueprint.route("/login", methods=["POST"])(log_account)
blueprint.route("/signup", methods=["POST"])(signup_account)
blueprint.route("/<int:account_id>", methods=["GET"])(get_account_by_id)
