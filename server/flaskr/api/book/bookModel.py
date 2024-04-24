from flaskr.orm.setup import db, Book, Author, LocationBook, ReservationBook
from flask import jsonify, abort, json
from flaskr.utils.conversion import row_to_merge_dict
from sqlalchemy import or_, func, select, desc, Row, Sequence

def get_random_book(number: int):
    books = Book.query.limit(number).all()
    db.session.commit()
    if (len(books) == 0): abort(404, description="Can't find any books")
    return books

def get_book_by_id(book_id: int):

    book = Book.query.get_or_404(book_id, f"Cant find book of id {book_id}")
    db.session.commit()
    return jsonify(book)

def get_book_of_genre(genre: str, limit = 5):
    books = Book.query.filter(Book.genre == genre).limit(limit).all()
    db.session.commit()
    if (len(books) == 0): abort(404, description=f"Can't find any book of genre {genre}")
    return books

def get_book_by(query="", categories = ""):
    expr = or_(Book.title.ilike(f"%{query}%"), Author.last_name.ilike(f"%{query}%"), Author.first_name.ilike(f"%{query}%"))
    books = Book.query.join(Author, Book.author_id == Author.author_id).filter(expr, Book.genre.like(f"%{categories}%")).all()
    db.session.commit()
    return books
    
def get_full_book_data():

    loan_sub_query = select(Book.book_id, func.count(LocationBook.book_id).label("loan_number")).join(LocationBook).group_by(Book.book_id).subquery()
    reservation_sub_query = select(Book.book_id, func.count(ReservationBook.book_id).label("reservation_number")).join(ReservationBook).group_by(Book.book_id).subquery()

    books = db.session.execute(select(Book, loan_sub_query.c.loan_number, reservation_sub_query.c.reservation_number).outerjoin(loan_sub_query, Book.book_id == loan_sub_query.c.book_id).outerjoin(reservation_sub_query, Book.book_id == reservation_sub_query.c.book_id)).all()
    
    test = []
    for item in books:
        newItem = item._asdict()
        for key in newItem.keys():
            if type(newItem[key]) is Book:
                newItem[key] = json.loads(json.dumps(newItem[key]))
        test.append(newItem)

    return list(map(lambda item: row_to_merge_dict(item, "Book"), test))


def convert_row_to_dict(row: Row, Model):
    dict_row = row._asdict()
    for key in dict_row.keys():
        if type(dict_row[key]) is Model:
            dict_row[key] = json.loads(json.dumps(dict_row[key]))
    return dict_row

def convert_sequence_dict_array(sequence, Model):
    output = []
    for row in sequence:
        output.append(convert_row_to_dict(row))
    return output