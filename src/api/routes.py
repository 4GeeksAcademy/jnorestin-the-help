"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Post,Image
from api.utils import generate_sitemap, APIException
from cloudinary import uploader
import os
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

@api.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    post_dictionaries = list(map(
        lambda post: post.serialize(),
        posts
    ))
    return jsonify(post_dictionaries)

@api.route('/posts', methods=['POST'])
@jwt_required()
def create_posts():
    user_id = get_jwt_identity()
    request_body = request.get_json()
    new_post = Post(
        description = request_body["description"],
        location = request_body["location"],
        date = request_body["date"],
        user_id=user_id
    )
    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.serialize()),201

@api.route("/post-images", methods=["POST"])
@jwt_required()
def create_post_image(): 
    image = request.files['file']
    post_id = request.form.get("post_id")
    response = uploader.upload(
        image,
        resource_type="image",
        folder="posts"
    )
    print(f"here: {response}")
    new_post_image = Image.create_new(
        post_id=post_id,
        url=response["secure_url"],
        public_id=response["public_id"]
    )
    return jsonify(new_post_image.serialize()), 201

@api.route("/log-in", methods=["POST"])
def log_in():
    body = request.json
    user = User.query.filter_by(
        email = body["email"]
    ).one_or_none()
    if user is None:
        return "no such user", 404
    if not user.check_password(
        body["password"]
    ):
        return "invalid credentials", 400
    # create token
    token = create_access_token(
        identity=user.id
    )
    return jsonify({
        "user": user.serialize(),
        "token": token
    }), 201

@api.route("/sign-up", methods=["POST"])
def sign_up():
    body = request.json
    existing_user = User.query.filter_by(
        email=body["email"]
    ).one_or_none()
    if existing_user is not None:
        return "user exists already", 400
    user = User.create_user(
        email=body["email"],
        password=body["password"],
        name=body["name"]
    )
    return jsonify(user.serialize()), 201
