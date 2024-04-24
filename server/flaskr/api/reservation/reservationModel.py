from typing import TypedDict, List
from flaskr.orm.setup import db, Reservation, Book, ReservationBook
from flask import jsonify
from datetime import date

class IClientData(TypedDict):
    name: str
    phone_number: str


def add_reservation(client_data: IClientData, books_id: List[int]):
    newReservation = Reservation(client_data["name"], client_data["phone_number"], date.today())
    db.session.add(newReservation)
    db.session.commit()
   
    for book_id in books_id:
       
        reservationBook = ReservationBook(newReservation.reservation_id, book_id)
        db.session.add(reservationBook)

    db.session.commit()

    return jsonify(success=True)

    

