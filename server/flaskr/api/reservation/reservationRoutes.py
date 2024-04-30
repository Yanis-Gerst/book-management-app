from flask import Blueprint
from flaskr.api.reservation.reservationController import *


blueprint = Blueprint("reservation-routes", __name__, url_prefix="/reservation")

blueprint.route("/<int:reservation_id>", methods=["GET"])(get_reservation_by_id)
blueprint.route("", methods=["POST"])(post_reservation)
blueprint.route("/all", methods=["POST"])(get_all_reservation)
