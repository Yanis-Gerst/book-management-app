from flaskr.orm.setup import db, Book, Author, Location, Article, AuthorBook
from flask import jsonify, abort
from flaskr.utils.conversion import convert_sequence_to_sql_dict
from sqlalchemy import or_, func, select
from flaskr.api.type import SearchQuery
from datetime import datetime   
from typing import TypedDict


def get_random_book(number: int):
    books = Book.query.limit(number).all()
    db.session.commit()
    if (len(books) == 0):
        abort(404, description="Can't find any books")

    return books


def get_book_by_id(book_id: int):
    book = db.session.get(Book, book_id)
    return book

def get_book_of_genre(genre: str, limit=5):
    books = Book.query.filter(Book.genre == genre).limit(limit).all()
    db.session.commit()
    if (len(books) == 0):
        abort(404, description=f"Can't find any book of genre {genre}")
    return books


def get_book_by(query="", categories=""):
    expr = or_(Book.title.ilike(f"%{query}%"), Author.last_name.ilike(
        f"%{query}%"), Author.first_name.ilike(f"%{query}%"))
    books = Book.query.join(AuthorBook, Book.book_id == AuthorBook.book_id).join(Author, AuthorBook.author_id == Author.author_id).filter(
        expr, Book.genre.like(f"%{categories}%")).all()
    db.session.commit()
    return books        

def get_all_books(query: SearchQuery):
    books = db.session.scalars(select(Book).limit(query["limit"])).all()
    return books



