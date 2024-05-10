import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass, Mapped, mapped_column, relationship
from typing import List
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import func, select
from sqlalchemy.ext.associationproxy import association_proxy, AssociationProxy

class Base(DeclarativeBase, MappedAsDataclass):
   pass

db = SQLAlchemy(model_class=Base)


states = ["excellent", "bon", "moyen", "mauvais"]
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
    price: Mapped[int] = mapped_column(nullable=False)
    genre: Mapped[str] = mapped_column(nullable=False)
    coverSrc: Mapped[str] = mapped_column(nullable=False)
    publicationDate: Mapped[datetime.date] = mapped_column()
    resume: Mapped[str] = mapped_column()
    authors: Mapped[List["Author"]] = relationship(secondary="author_book")
    articles: Mapped[List["Article"]] = relationship()
    total_stocks: Mapped[int]
    stocks_per_state: Mapped[dict[str, dict[str, int]]]
    
    def __init__(self, title, price, genre, coverSrc, publicationDate, resume):
        self.title = title
        self.price = price
        self.genre = genre
        self.coverSrc = coverSrc
        if (publicationDate == ""): 
            self.publicationDate = datetime.datetime.now()
        else:
            self.publicationDate = publicationDate
        self.resume = resume
   
    
    @hybrid_property
    def total_stocks(self):
        if isinstance(self.articles, list):
            return len(self.articles)
        return -4
    @total_stocks.setter
    def total_stocks(self, value):
        self.total_stocks = value
    
    @hybrid_property
    def stocks_per_state(self):
        if not isinstance(self.articles, list):
            return {}
        per_state_counter = {}
        for state in states:
            per_state_counter[state] = {
                "reserved": 0,
                "loaned": 0,
                "available": 0
            }
        
        for article in self.articles:
            if article.reservation_id is not None:
                per_state_counter[article.state]["reserved"] += 1
            elif article.location_id is not None:
                per_state_counter[article.state]["loaned"] += 1
            else:
                per_state_counter[article.state]["available"] += 1
        return per_state_counter
    
    @stocks_per_state.setter
    def stocks_per_state(self, value):
        self.stocks_per_state = value
    
    def __repr__(self):
        return '<Book %r>' % self.book_id   
    
    


class Article(db.Model):
    __tablename__ = "article"
    article_id: Mapped[int] = mapped_column(primary_key=True, autoincrement="auto")
    state: Mapped[str] = mapped_column(nullable=False)
    place: Mapped[int] = mapped_column(nullable=False)
    book_id: Mapped[int] = mapped_column(ForeignKey("book.book_id"), nullable=False)
    reservation_id: Mapped[int] = mapped_column(ForeignKey("reservation.reservation_id"), nullable=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("location.location_id"), nullable=True)

    def __init__(self, state, place, book_id, reservation_id, location_id):
        self.state = state
        self.place = place
        self.book_id = book_id
        self.reservation_id = reservation_id
        self.location_id = location_id

    
        

class AuthorBook(db.Model):
    __tablename__ = "author_book"
    author_id: Mapped[int] = mapped_column(ForeignKey("author.author_id"), primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("book.book_id"), primary_key=True)
  
    def __init__(self, book_id, author_id):
        self.book_id = book_id
        self.author_id = author_id


class Account(db.Model):
    __tablename__ = "account"
    account_id: Mapped[int] = mapped_column(primary_key=True, autoincrement="auto")
    role: Mapped[str] = mapped_column(nullable=False)
    first_name: Mapped[str] = mapped_column()
    last_name: Mapped[str] = mapped_column()
    phone_number: Mapped[str] = mapped_column(nullable=False)
    mail: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    locations: Mapped[List["Location"]] = relationship()
    reservations: Mapped[List["Reservation"]] = relationship()

    def __init__(self, role, first_name, last_name, phone_number, mail, password):
        self.role = role
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.mail = mail
        self.password = password

class Location(db.Model):
    __tablename__ = "location"
    location_id: Mapped[int] = mapped_column(primary_key=True, autoincrement="auto")
    dateOfStart: Mapped[datetime.date] = mapped_column(nullable=False)
    dateOfEnd: Mapped[datetime.date] = mapped_column(nullable=False)
    account_id: Mapped[int] = mapped_column(ForeignKey("account.account_id"), nullable=False)
    articles: Mapped[List["Article"]] = relationship()

    def __init__(self, dateOfStart, dateOfEnd, account_id):
        self.dateOfStart = dateOfStart
        self.dateOfEnd = dateOfEnd
        self.account_id = account_id

class Reservation(db.Model):
    __tablename__ = "reservation"
    reservation_id: Mapped[int] = mapped_column(primary_key=True, autoincrement="auto")
    reservationDate: Mapped[datetime.date] = mapped_column(nullable=False)
    account_id: Mapped[int] = mapped_column(ForeignKey("account.account_id"), nullable=False)
    articles: Mapped[List["Article"]] = relationship()
  
    def __init__(self, account_id, reservationDate):
        self.reservationDate = reservationDate
        self.account_id = account_id

