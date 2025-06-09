"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, make_response
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# @api.after_request
def add_cors_headers(response):
    # Agregar los encabezados necesarios para CORS
    response.headers.add("Access-Control-Allow-Origin", "*")  # O * para permitir todos los orígenes
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.add("Access-Control-Max-Age", "3600")  # La validez de la preflight
    return response


@api.route('/api/signup', methods=['OPTIONS'])
def preflight():
    response = jsonify({})
    response.status_code = 200
    return response

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/signup', methods=['POST','OPTIONS'])
def signup():

    if request.method == 'OPTIONS':
        # Responder solo con los headers CORS
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        return response

    data = request.get_json()
    email = data.get("email",None)
    password = data.get("password", None)

    if not email:
        return jsonify({"msg":"debe agregar el email"}),400
    
    if not password:
        return jsonify({"msg":"debe agregar el password"}),400
    

    exist_user = User.query.filter_by(email=email).first()
    if exist_user:
        return jsonify({"msg": "el usuario ya existe"}),409
    
    #hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()),201

@api.route('/login', methods=['POST','OPTIONS'])
def login():

    if request.method == 'OPTIONS':
        # Responder solo con los headers CORS
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        return response


    data = request.get_json()
    email = data.get("email",None)
    password = data.get("password", None)

    if not email:
        return jsonify({"msg":"debe agregar el email"}),400
    
    if not password:
        return jsonify({"msg":"debe agregar el password"}),400
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg":"el usuario no existe"}),404
    if user.password != password:
        return jsonify({"msg":"Hubo algun error o el usuario o clave no coinciden"}),400

    token = create_access_token(
        identity= user.email,
        )
    return jsonify({"token":token}),200

# Ruta privada protegida por JWT
@api.route('/private', methods=['GET','OPTIONS'])
@jwt_required()
def private():


    if request.method == 'OPTIONS':
        # Responder solo con los headers CORS
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        return response

    current_user_email = get_jwt_identity()
    return jsonify({
        "message": f"Bienvenido {current_user_email}, esta es tu pagina privada"
    }), 200
