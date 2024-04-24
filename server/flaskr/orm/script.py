from flaskr.orm.setup import *
import random
from faker import Faker

fake = Faker(locale="fr_FR")


def generate_fake_data(num_authors, num_books, num_tags, num_locations, num_reservations):
    # Génération des auteurs
    for _ in range(num_authors):
        author = Author(
            first_name=fake.first_name(),
            last_name=fake.last_name()
        )
        db.session.add(author)

    # Génération des livres
    for _ in range(num_books):
        book = Book(
            title=fake.catch_phrase(),
            state=random.choice(["excellent", "bon", "moyen", "mauvais"]),
            price=random.randint(10, 100),
            genre=random.choice(["Fantasy", "Science-fiction", "Dystopie", "Réaliste", "Romance"]),
            author_id=random.randint(1, num_authors),
            coverSrc="https://placehold.co/1400x1873",
            publicationDate=fake.date_between(start_date="-50y", end_date="today"),
            avgStar=str(random.uniform(1, 5))[:3],
            stocks=random.randint(1, 100),
            resume=fake.paragraph(nb_sentences=5)
        )
        db.session.add(book)

    for _ in range(num_tags):
        tag = Tags(
            name=fake.word()
        )
        db.session.add(tag)

    db.session.commit()

    # Génération des associations entre les tags et les livres
    for book_id in range(1, num_books + 1):
        num_tags_per_book = random.randint(1, 3)
        tags_ids = random.sample(range(1, num_tags + 1), num_tags_per_book)
        for tag_id in tags_ids:
            tags_book = TagsBook(
                tags_id=tag_id,
                book_id=book_id
            )
            db.session.add(tags_book)

    # Génération des locations
    for _ in range(num_locations):
        location = Location(
            client_name=fake.name(),
            mobileNumber=fake.phone_number(),
            dateOfStart=fake.date_between(start_date="today", end_date="+30d"),
            dateOfEnd=fake.date_between(start_date="+31d", end_date="+60d")
        )
        db.session.add(location)

    db.session.commit()

    # Génération des réservations
    for _ in range(num_reservations):
        reservation = Reservation(
            client_name=fake.name(),
            mobileNumber=fake.phone_number(),
            reservationDate=fake.date_between(start_date="today", end_date="+30d")
        )
        db.session.add(reservation)

    db.session.commit()

    # Génération des associations entre les livres et les locations
    for book_id in range(1, num_books + 1):
        num_locations_per_book = random.randint(1, 5)
        location_ids = random.sample(range(1, num_locations + 1), num_locations_per_book)
        for location_id in location_ids:
            location_book = LocationBook(
                location_id=location_id,
                book_id=book_id
            )
            db.session.add(location_book)

    db.session.commit()

    # Génération des associations entre les livres et les réservations
    for book_id in range(1, num_books + 1):
        num_reservations_per_book = random.randint(1, 5)
        reservation_ids = random.sample(range(1, num_reservations + 1), num_reservations_per_book)
        for reservation_id in reservation_ids:
            reservation_book = ReservationBook(
                reservation_id=reservation_id,
                book_id=book_id
            )
            db.session.add(reservation_book)

    db.session.commit()


def delete_All_Data():
    db.session.query(TagsBook).delete()
    db.session.query(Tags).delete()
    db.session.query(ReservationBook).delete()
    db.session.query(Reservation).delete()
    db.session.query(LocationBook).delete()
    db.session.query(Location).delete()
    db.session.query(Book).delete()
    db.session.query(Author).delete()
    db.session.commit()