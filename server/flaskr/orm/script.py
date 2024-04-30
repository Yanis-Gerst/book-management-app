from flaskr.orm.setup import *
import random
from faker import Faker

fake = Faker(locale="fr_FR")


def generate_fake_data(num_authors, num_books, num_articles,num_account, num_locations, num_reservations):
    # Create fake authors
    authors = []
    for _ in range(num_authors):
        first_name = fake.first_name()
        last_name = fake.last_name()
        author = Author(first_name=first_name, last_name=last_name)
        authors.append(author)
        db.session.add(author)

    db.session.commit()
    # Create fake books
    books = []
    for _ in range(num_books):
        title = fake.sentence()
        price = random.randint(10, 100)
        genre = fake.word()
        coverSrc = fake.image_url()
        publicationDate = fake.date_between(start_date='-50y', end_date='today')
        resume = fake.text()
        book = Book(title=title, price=price, genre=genre, coverSrc=coverSrc, publicationDate=publicationDate, resume=resume)
        books.append(book)
        db.session.add(book)

    db.session.commit()
    # Create fake author-book associations
    for book_id in range(1, num_books + 1):
        num_authors_per_book = random.randint(1,3)
        authors_ids = random.sample(range(1, num_authors + 1), num_authors_per_book)
        for author_id in authors_ids:
            author_book = AuthorBook(author_id=author_id, book_id=book_id)
            db.session.add(author_book)

    db.session.commit()

    # Create fake accounts
    accounts = []
    for _ in range(num_account):
        role = "user"
        first_name = fake.first_name()
        last_name = fake.last_name()
        phone_number = fake.phone_number()
        mail = f"{first_name}-{last_name}@gmail.com"
        password = fake.word()
        account = Account(role=role, first_name=first_name, last_name=last_name, phone_number=phone_number, mail=mail, password=password )
        accounts.append(account)
        db.session.add(account)

    adminAccount = Account(role="admin", first_name="first-admin", last_name="last-admin", phone_number="06 15 15 15 15", mail="admin@compangny.com", password="admin")
    db.session.add(adminAccount)
    db.session.commit()

    # Create fake locations
    locations = []
    for _ in range(num_locations):
        dateOfStart = fake.date_between(start_date='-1y', end_date='today')
        dateOfEnd = fake.date_between(start_date=dateOfStart, end_date='+1y')
        account_id = random.randint(1, num_account)
        location = Location(dateOfStart=dateOfStart, dateOfEnd=dateOfEnd, account_id=account_id)
        locations.append(location)
        db.session.add(location)

    for _ in range(num_reservations):
        reservation_date =  fake.date_between(start_date='-30d', end_date='+30d')
        account_id = random.randint(1, num_account)
        reservation = Reservation(account_id=account_id, reservationDate=reservation_date)
        db.session.add(reservation)
    
    db.session.commit()

    # Create fake articles
    articles = []
    unique_places = random.sample(range(1, 1500), num_articles)
    for i in range(num_articles):
        state = random.choice(["excellent", "bon", "moyen", "mauvais"])
        book_id = random.randint(1, num_books)
        if i > 700:
            reservation_id = random.randint(1, num_reservations)
            location_id = None
        elif i > 300:
            reservation_id = None
            location_id = random.randint(1, num_locations)
        else:
            reservation_id = None
            location_id = None
        
        article = Article(state=state, place=unique_places[i], book_id=book_id, reservation_id=reservation_id, location_id=location_id)
        articles.append(article)
        db.session.add(article)

    db.session.commit()
