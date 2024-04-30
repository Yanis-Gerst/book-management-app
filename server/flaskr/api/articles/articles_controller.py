from flaskr.utils.commonServices import get_item_by_id, post_item
from flaskr.orm.setup import Article


def get_article_by_id(article_id: int):
    return get_item_by_id(Article, article_id)