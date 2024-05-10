from flask import Blueprint
from flaskr.api.location.locationController import *

blueprint = Blueprint("location-routes", __name__, url_prefix="/location")

blueprint.route("/all", methods=["POST"])(get_all_location)
blueprint.route("/to-render", methods=["GET"])(get_location_to_render)
blueprint.route("/<int:location_id>", methods=["GET"])(get_location_by_id)
blueprint.route("/<int:location_id>", methods=["DELETE"])(delete_location)
    