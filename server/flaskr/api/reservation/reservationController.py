from flaskr.orm.setup import Reservation
from flaskr.utils.commonServices import get_item_by_id, get_all, delete_item_by_id
from flaskr.api.reservation.reservationModel import *
from flask import request
from flaskr.api.reservation.reservationModel import add_reservation
from flaskr.api.type import SearchQuery
from flaskr.utils.commonServices import get_item_by_id


def get_reservation_by_id(reservation_id: int):
    return get_item_by_id(Reservation, reservation_id)


def get_all_reservation():
    json_request: SearchQuery = request.get_json()
    return get_all(Reservation, json_request)


def post_reservation():
    jsonRequest: BookReservationRequest = request.get_json()
    return add_reservation(jsonRequest)

def delete_reservation(reservation_id: int):
    return delete_item_by_id(Reservation, reservation_id)

def book_reservation(reservation_id: int):
    return reservation_to_location(reservation_id)