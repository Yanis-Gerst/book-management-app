from flaskr.api.book.bookModel import get_random_book, get_book_by_id, get_book_by, get_book_of_genre
from flask import request

def get_promo_book():
    books = get_random_book(4)
    return books

def get_one_book(book_id: int):
    return get_book_by_id(book_id)

def get_top_5_book(categorie: str):
    return get_book_of_genre(categorie, 5)

def research_book():
    title = request.get_json()["title"]
    return get_book_by(title)