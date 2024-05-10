from flask import request
from flaskr.api.type import SearchQuery
from flaskr.utils.commonServices import get_all
from flaskr.orm.setup import Location
from flaskr.utils.commonServices import get_item_by_id, delete_item_by_id
from flaskr.api.location.locationModel import *
from flaskr.orm.schema import LocationSchema
from datetime import datetime


def get_all_location():
    json_request: SearchQuery = request.get_json()
    return get_all(Location, json_request)

def get_location_by_id(location_id: int):

    return get_item_by_id(Location, location_id)

def get_location_to_render():

    return get_location_end_before(datetime.now())

def delete_location(location_id: int):
    return delete_item_by_id(Location, location_id)

