from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

users_bp = Blueprint('users', __name__)

@users_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email i hasło są wymagane"}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Użytkownik o tym e-mailu już istnieje"}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = User(email=data['email'], password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Rejestracja zakończona sukcesem", "user_id": new_user.id}), 201

@users_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if not user or not check_password_hash(user.password, data.get('password')):
        return jsonify({"error": "Nieprawidłowy e-mail lub hasło"}), 401
    return jsonify({
        "message": "Zalogowano pomyślnie",
        "user": {
            "id": user.id,
            "email": user.email
        }
    }), 200
