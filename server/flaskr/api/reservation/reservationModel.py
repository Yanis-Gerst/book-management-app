from typing import TypedDict, List
from flaskr.orm.setup import db, Reservation, Book, Article
from flask import jsonify, abort
from datetime import date
from sqlalchemy import select
from flaskr.api.type import SearchQuery
from flaskr.utils.conversion import convert_sequence_to_sql_dict
from flaskr.utils.commonServices import get_item_by_id

class BookReservationRequest(TypedDict):
    articles_id: List[int]
    account_id: int


def add_reservation(client_data: BookReservationRequest):

    newReservation = Reservation(account_id=client_data["account_id"], reservationDate=date.today())
    db.session.add(newReservation)
    db.session.commit()
   
    for article_id in client_data["articles_id"]:
        article: Article = db.session.get(Article, article_id)
        
        if article.reservation_id is not None:
            abort(409, descriptions="article already reserved")
       
        article.reservation_id = newReservation.reservation_id

    db.session.commit()


    return jsonify(success=True)

