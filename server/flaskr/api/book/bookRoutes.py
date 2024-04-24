from flask import Blueprint
from flaskr.api.book.bookController import get_promo_book, get_one_book, research_book, get_book_of_genre, post_book, get_books_pro

blueprint = Blueprint("book-routes", __name__, url_prefix="/book")

blueprint.route("/promo", methods=["GET"])(get_promo_book)
blueprint.route("/<int:book_id>", methods=["GET"])(get_one_book)
blueprint.route("/search", methods=["POST"])(research_book)
blueprint.route("/top-5/<string:genre>", methods=["GET"])(get_book_of_genre)
blueprint.route("", methods=["POST"])(post_book)
blueprint.route("/pro", methods=["POST"])(get_books_pro)