
class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:////Users/ikims/Work/Project/book-management-store/server/db/main.db"

class DevelopmentConfig(Config):
    DEBUB = True

class ProductionConfig(Config):
    DEBUB = False

config = {
    "dev": DevelopmentConfig,
    "prod": ProductionConfig
}