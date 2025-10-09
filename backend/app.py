from flask import Flask
from flask_cors import CORS
from models import db, Product
from routes.products import products_bp
from routes.users import users_bp
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(products_bp)
app.register_blueprint(users_bp)

@app.route('/')
def index():
    return "Hello World"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)