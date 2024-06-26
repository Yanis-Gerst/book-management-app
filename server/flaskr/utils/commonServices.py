from flaskr.orm.setup import db, Author, Book, Reservation, Location
from typing import Union
from flask import jsonify, abort
from flaskr.api.type import SearchQuery
from sqlalchemy import delete

type DbModel = Union[Author, Book, Reservation, Location]


def get_item_by_id(Item: DbModel, id: int):
    result = db.session.get(Item, id)
    return jsonify(result)


def post_item(Item: DbModel, item_to_add: dict[str, any]):
    try:
        newItem = Item(**item_to_add)
    except Exception as err:
        abort(400, description=f"Wrong data format {item_to_add}. Get err {err}")
    db.session.add(newItem)
    db.session.commit()
    return jsonify({"success": True})


def get_all(Item: DbModel, query: SearchQuery):
    result = Item.query.limit(query["limit"]).all()
    db.session.commit()
    return jsonify(result)


def delete_item_by_id(Item, id: int):
    result = db.session.delete(db.session.get(Item, id))
    db.session.commit()
    return jsonify({"success": True})