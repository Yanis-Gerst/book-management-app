from flaskr.utils.commonServices import get_item_by_id, post_item
from flaskr.orm.setup import Article
from flaskr.orm.schema import ArticleSchema,BookSchema
from flaskr.orm.setup import db


def get_article_by_id(article_id: int):
    article = db.session.get(Article, article_id)
    print(article, "from db")
    article_schema = ArticleSchema()
    book_schema = BookSchema()
    return article_schema.dump(article) 