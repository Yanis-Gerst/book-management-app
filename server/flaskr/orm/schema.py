from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from marshmallow_sqlalchemy.fields import Nested
from flaskr.orm.setup import *

ma = Marshmallow()
class SmartNested(Nested):
    def serialize(self, attr, obj, accessor=None):
        if attr not in obj.__dict__:
            return {"id": int(getattr(obj, attr + "_id"))}
        return super(SmartNested, self).serialize(attr, obj, accessor)

class BookSchema(SQLAlchemyAutoSchema):
    class Meta:
        model: Book
        sqla_session = db.session
        load_instance = True 





class ArticleSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Article
        sqla_session = db.session
        include_relationships = True




class AccountSchema(SQLAlchemyAutoSchema):
    class Meta:
        model= Account
        load_instance = True 


class ReservationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Reservation
        load_instance = True 

class LocationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Location
        load_instance = True 

class AuthorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Author
        load_instance = True 



  



