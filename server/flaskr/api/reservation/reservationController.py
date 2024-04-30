from flaskr.orm.setup import Reservation
from flaskr.utils.commonServices import get_item_by_id, get_all
from flaskr.api.reservation.reservationModel import *
from flask import request
from typing import TypedDict, List
from flaskr.api.reservation.reservationModel import add_reservation
from flaskr.api.type import SearchQuery
from flaskr.utils.commonServices import get_item_by_id


def get_reservation_by_id(reservation_id: int):
    return get_item_by_id(Reservation, reservation_id)


def get_all_reservation():
    json_request: SearchQuery = request.get_json()
    print(json_request)
    return get_all(Reservation, json_request)


class BookReservationRequest(TypedDict):
    books_id: List[int]
    client_name: str
    client_phone_number: str


def post_reservation():
    jsonRequest: BookReservationRequest = request.get_json()
    client_data = {"name": jsonRequest["client_name"],
                   "phone_number": jsonRequest["client_phone_number"]}
    return add_reservation(client_data, jsonRequest["books_id"])
