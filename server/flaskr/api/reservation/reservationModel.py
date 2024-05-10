from typing import TypedDict, List
from flaskr.orm.setup import db, Reservation, Book, Location
from flask import jsonify, abort
from datetime import date,timedelta
from sqlalchemy import select
from flaskr.api.type import SearchQuery
from flaskr.utils.conversion import convert_sequence_to_sql_dict
from flaskr.utils.commonServices import get_item_by_id

class BasketBook(TypedDict):
    book_id: int
    quantity: int
    state: str

class BookReservationRequest(TypedDict):
    account_id: int
    basket_books: List[BasketBook]


def add_reservation(reservation_data: BookReservationRequest):

    newReservation = Reservation(account_id=reservation_data["account_id"], reservationDate=date.today())
    db.session.add(newReservation)

   
    for basket_book in reservation_data["basket_books"]:
        current_book = db.session.get(Book, basket_book["book_id"])
        article_of_book = list(filter(lambda article: article.state == basket_book["state"] and article.reservation_id is None and article.location_id is None, current_book.articles))
        if len(article_of_book) < basket_book["quantity"]:
            abort(409, description="article already reserved")
        for i in range(0, basket_book["quantity"]):
            article_of_book[i].reservation_id = newReservation.reservation_id

    db.session.commit()


    return jsonify(success=True)


def reservation_to_location(reservation_id: int):
    reservation = db.session.get(Reservation, reservation_id)
    endDate = date.today() + timedelta(days=10)
    newLocation = Location(account_id=reservation.account_id, dateOfStart=date.today(), dateOfEnd=endDate)
    db.session.add(newLocation)
    for article in reservation.articles:
        article.reservation_id = None
        article.location_id = newLocation.location_id
    db.session.delete(reservation)
    db.session.commit()
    return jsonify(success=True)