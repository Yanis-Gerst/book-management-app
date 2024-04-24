from flaskr.orm.setup import Reservation
from flaskr.utils.commonServices import get_item_by_id
from flask import request
from typing import TypedDict, List
from flaskr.api.reservation.reservationModel import add_reservation

def get_reservation_by_id(reservation_id: int):
    return get_item_by_id(Reservation, reservation_id)

class BookReservationRequest(TypedDict):
    books_id: List[int]
    client_name: str
    client_phone_number: str


def post_reservation():
    jsonRequest: BookReservationRequest = request.get_json()
    client_data = {"name": jsonRequest["client_name"], "phone_number": jsonRequest["client_phone_number"]}
    return  add_reservation(client_data, jsonRequest["books_id"])
