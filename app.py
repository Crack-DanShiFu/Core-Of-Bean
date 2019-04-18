from flask import Flask
import config
from exts import db
from entity import model

app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)
with app.app_context():
    db.create_all()

from main import main

app.register_blueprint(main, url_prefix='/')

if __name__ == '__main__':
    app.run()
