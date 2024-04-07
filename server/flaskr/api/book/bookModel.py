from flaskr.models.orm import db, Book
from flask import jsonify

def get_random_book(number: int):
    books = Book.query.limit(number).all()
    db.session.commit()
    return books

def get_book_by_id(book_id: int):

    book = Book.query.get_or_404(book_id)
    db.session.commit()
    return jsonify(book)

def get_book_of_genre(genre: str, limit = 5):
    books = Book.query.filter(Book.genre == genre).limit(limit).all()
    db.session.commit()
    return books

def get_book_by(title="", categories = "", author = ""):
    #Join book/author to search by author name
    books = Book.query.filter(Book.title.like(f"%{title}%"), Book.genre.like(f"%{categories}%")).all()
    db.session.commit()
    return books
    