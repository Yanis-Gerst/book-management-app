from flask import Blueprint
from flaskr.api.articles.articles_controller import *
blueprint = Blueprint("articles-routes", __name__, url_prefix="/article")

blueprint.route("/<int:article_id>", methods=["GET"])(get_article_by_id)

