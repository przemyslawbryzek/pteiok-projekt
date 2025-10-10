from flask import Flask, session
from flask_cors import CORS
from models import db
from flask_jwt_extended import JWTManager
from datetime import timedelta
from routes.products import products_bp
from routes.users import users_bp
from routes.cart import cart_bp
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = "key"
app.permanent_session_lifetime = timedelta(days=3)

app.config["JWT_SECRET_KEY"] =  "jwt_key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=3)
jwt = JWTManager(app)

db.init_app(app)

app.register_blueprint(products_bp)
app.register_blueprint(users_bp)
app.register_blueprint(cart_bp)

@app.route('/')
def index():
    return "Hello World"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)