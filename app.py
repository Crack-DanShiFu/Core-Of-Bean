from flask import Flask

import config
from exts import db

app = Flask(__name__)
app.config.from_object(config)
app.config['JSON_AS_ASCII'] = False
db.init_app(app)
with app.app_context():
    db.create_all()

from main import main

app.register_blueprint(main, url_prefix='/')

from download import download

app.register_blueprint(download, url_prefix='/download')

if __name__ == '__main__':
    app.run()
