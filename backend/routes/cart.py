from flask import Blueprint, jsonify, request, session
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, CartItem, Product

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/api/cart', methods=['POST'])
@jwt_required(optional=True)
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Produkt nie istnieje"}), 404
    user_id = get_jwt_identity()
    if user_id:
        item = CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()
        if item:
            if item.quantity + quantity > 0:
                item.quantity += quantity
            else:
                db.session.delete(item)
        else:
            if quantity > 0:
                item = CartItem(user_id=user_id, product_id=product_id, quantity=quantity)
                db.session.add(item)
            else:
                return jsonify({"error": "Nieprawidłowa ilość"}), 400
        db.session.commit()
        return jsonify({"message": "Dodano do koszyka użytkownika"}), 201
    else:
        cart = session.get("cart", [])
        for c in cart:
            if c["product_id"] == product_id:
                if c["quantity"] + quantity > 0:
                    c["quantity"] += quantity
                else:
                    cart.remove(c)
                break
        else:
            if quantity > 0:
                cart.append({
                    "product_id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "quantity": quantity
                })
            else:
                return jsonify({"error": "Nieprawidłowa ilość"}), 400
        session["cart"] = cart
        session.modified = True
        return jsonify({"message": "Dodano do koszyka sesyjnego", "cart": cart}), 201

@cart_bp.route('/api/cart', methods=['GET'])
@jwt_required(optional=True)
def get_cart():
    user_id = get_jwt_identity()
    if user_id:
        items = CartItem.query.filter_by(user_id=user_id).all()
        return jsonify([item.to_dict() for item in items])
    else:
        cart = session.get('cart', [])
        return jsonify(cart), 200
    
@cart_bp.route('/api/cart', methods=['DELETE'])
@jwt_required(optional=True)
def clear_cart():
    user_id = get_jwt_identity()
    if user_id:
        CartItem.query.filter_by(user_id=user_id).delete()
        db.session.commit()
        return jsonify({"message": "Koszyk wyczyszczony"}), 200
    else:
        session.pop('cart', None)
        return jsonify({"message": "Koszyk wyczyszczony"}), 200
@cart_bp.route('/api/cart/<int:product_id>', methods=['DELETE'])
@jwt_required(optional=True)
def remove_from_cart(product_id):
    user_id = get_jwt_identity()
    if user_id:
        item = CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()
        if not item:
            return jsonify({"error": "Pozycja nie istnieje"}), 404
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Produkt usunięty z koszyka"}), 200
    else:
        cart = session.get('cart', [])
        cart = [item for item in cart if item['product_id'] != product_id]
        session['cart'] = cart
        session.modified = True
        return jsonify({"message": "Produkt usunięty z koszyka"}), 200