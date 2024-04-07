import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass, Mapped, mapped_column


class Base(DeclarativeBase, MappedAsDataclass):
   pass

db = SQLAlchemy(model_class=Base)


class Author(db.Model):
    __tablename__ = "author"
    author_id: Mapped[int] = mapped_column(primary_key=True, autoincrement="auto")
    first_name: Mapped[str] = mapped_column(nullable=False)
    last_name: Mapped[str] = mapped_column(nullable=False)

    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

class Book(db.Model):
    __tablename__ = "book"

    book_id: Mapped[int] = mapped_column( primary_key=True, autoincrement="auto")
    title: Mapped[str] = mapped_column(nullable=False)
    state: Mapped[str] = mapped_column(nullable=False)
    price: Mapped[int] = mapped_column(nullable=False)
    genre: Mapped[str] = mapped_column(nullable=False)
    author_id: Mapped[str] = mapped_column(ForeignKey("author.author_id"), nullable=False)
    coverSrc: Mapped[str] = mapped_column(nullable=False)
    publicationDate: Mapped[datetime.date] = mapped_column(nullable=False)
    avgStar: Mapped[str]
    stocks: Mapped[int] = mapped_column()

    def __init__(self, title, price, genre, author_id, coverSrc, publicationDate, avgStar, state, stocks):
        self.title = title
        self.price = price
        self.genre = genre
        self.author_id = author_id
        self.coverSrc = coverSrc
        self.avgStar = avgStar
        self.publicationDate = publicationDate
        self.state = state
        self.stocks = stocks
    
    def __repr__(self):
        return '<Book %r>' % self.book_id


class Tags(db.Model):
    __tablename__ = "tags"
    tags_id: Mapped[int] = mapped_column(primary_key=True, autoincrement="auto")
    name: Mapped[str] = mapped_column(nullable=False)

    def __init__(self, name):
        self.name = name


class TagsBook(db.Model):
    __tablename__ = "tagsBook"
    tags_id: Mapped[int] = mapped_column(ForeignKey("tags.tags_id"), primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("book.book_id"), primary_key=True)

    def __init__(self, tags_id, book_id):
        self.tags_id = tags_id
        self.book_id = book_id

class Location(db.Model):
    __tablename__ = "location"
    location_id: Mapped[int] = mapped_column(primary_key=True, autoincrement="auto")
    client_name: Mapped[str] = mapped_column(nullable=False)
    mobileNumber: Mapped[str] = mapped_column(nullable=False)
    dateOfStart: Mapped[datetime.date] = mapped_column(nullable=False)
    dateOfEnd: Mapped[datetime.date] = mapped_column(nullable=False)

    def __init__(self, client_name, mobileNumber, dateOfStart, dateOfEnd):
        self.client_name = client_name
        self.mobileNumber = mobileNumber
        self.dateOfStart = dateOfStart
        self.dateOfEnd = dateOfEnd

class Reservation(db.Model):
    __tablename__ = "reservation"
    reservation_id: Mapped[int] = mapped_column(primary_key=True, autoincrement="auto")
    client_name: Mapped[str] = mapped_column(nullable=False)
    mobileNumber: Mapped[str] = mapped_column(nullable=False)
    reservationDate: Mapped[datetime.date] = mapped_column(nullable=False)

    def __init__(self, client_name, mobileNumber, reservationDate):
        self.client_name = client_name
        self.mobileNumber = mobileNumber
        self.reservationDate = reservationDate
  
class LocationBook(db.Model):
    __tablename__ = "locationBook"
    location_id: Mapped[int] = mapped_column(ForeignKey("location.location_id"), primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("book.book_id"), primary_key=True)

    def __init__(self, location_id, book_id):
        self.location_id = location_id
        self.book_id = book_id

class ReservationBook(db.Model):
    __tablename__ = "reservationBook"
    reservation_id: Mapped[int] = mapped_column(ForeignKey("reservation.reservation_id"), primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("book.book_id"), primary_key=True)

    def __init__(self, reservation_id, book_id):
        self.reservation_id = reservation_id
        self.book_id = book_id

