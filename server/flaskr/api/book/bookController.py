from flaskr.api.book.bookModel import *
from flask import request
from flaskr.utils.commonServices import get_item_by_id, post_item
from flaskr.orm.setup import Book
from flaskr.api.type import SearchQuery
from flaskr.orm.schema import BookSchema

def get_promo_book():
    books = get_random_book(4)
    return books

def get_one_book(book_id: int):
    return get_item_by_id(Book, book_id)
    
def get_top_5_book(categorie: str):
    return get_book_of_genre(categorie, 5)

def research_book():
    jsonRequest  =  request.get_json()
    query = jsonRequest["query"]
    categorie = jsonRequest["categorie"]
    return get_book_by(query, categorie)

def post_book():
    jsonRequest = request.get_json()
    return post_item(Book, jsonRequest)

def get_books_pro():
    json_request: SearchQuery = request.get_json()
    return get_all_books(json_request)