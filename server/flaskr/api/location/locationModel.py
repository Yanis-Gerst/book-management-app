from datetime import datetime
from flaskr.orm.setup import Location, db
from sqlalchemy import select
from flaskr.utils.conversion import convert_sequence_to_sql_dict

def get_location_end_before(date: datetime):
    locations = db.session.scalars(select(Location).filter(Location.dateOfEnd < date)).all()
    return locations
