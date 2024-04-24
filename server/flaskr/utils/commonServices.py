from flaskr.orm.setup import db, Author, Book, Reservation, Location, LocationBook, Tags, TagsBook, ReservationBook
from typing import Union
from flask import jsonify, abort

type DbModel = Union[Author, Book, Reservation, Location, LocationBook, Tags, TagsBook, ReservationBook]

def get_item_by_id(Item: DbModel , id: int):
    result = Item.query.get_or_404(id, f"Cant find item of id {id}")
    db.session.commit()
    return jsonify(result)

def post_item(Item: DbModel, item_to_add: dict[str, any]):
    try:
        newItem = Item(**item_to_add)
    except Exception as err:
        abort(400, description=f"Wrong data format {item_to_add}. Get err {err}")
    db.session.add(newItem)
    db.session.commit()
    print("Send response")
    return jsonify({"success": True})

