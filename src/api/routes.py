"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Post,Image,Helper,PostCandidate
from api.utils import generate_sitemap, APIException
from cloudinary import uploader
import os
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from cloudinary import uploader

api = Blueprint('api', __name__)

@api.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    post_dictionaries = [post.serialize() for post in posts]
    return jsonify(post_dictionaries)

@api.route('/posts/<int:id>', methods=['GET'])
def get_post(id):
    post = Post.query.get(id)
    return jsonify(post.serialize()),200

api.route('/userposts', methods=['GET'])
@jwt_required()
def get_post_by_user_id():
    user_id = get_jwt_identity()
    posts = Post.query.filter_by(user_id = user_id)
    post_dictionaries = [post.serialize() for post in posts]
    return jsonify(post_dictionaries)
    

@api.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    request_body = request.get_json()
    new_post = Post(
        description=request_body["description"],
        location=request_body["location"],
        date=request_body["date"],
        user_id=user_id
    )
    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.serialize()), 201

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
    new_post_image = Image(
        post_id=post_id,
        url=response["secure_url"],
        public_id=response["public_id"]
    )
    db.session.add(new_post_image)
    db.session.commit()

    return jsonify(new_post_image.serialize()), 201

@api.route("/log-in", methods=["POST"])
def log_in():
    body = request.json
    user = User.query.filter_by(email=body["email"]).one_or_none()
    if user is None or not user.check_password(body["password"]):
        return "Invalid credentials", 401

    token = create_access_token(identity=user.id)
    return jsonify({
        "user": user.serialize(),
        "token": token
    }), 200

@api.route("/sign-up", methods=["POST"])
def sign_up():
    body = request.json
    user = User.create_user(
        email=body["email"],
        password=body["password"],
        name=body["name"]
    )
    if user is None:
        return "Failed to create user", 400

    return jsonify(user.serialize()), 201

@api.route("/helper", methods=["GET"])
def get_helper():
    helpers = Helper.query.all()
    helper_dictionaries = list(map(
        lambda helper: helper.serialize(),
        helpers
    ))
    return jsonify(helper_dictionaries)

@api.route("/helper", methods=["POST"])
@jwt_required()
def creat_helper():
    user_id = get_jwt_identity()
    body = request.json
    new_helper = Helper(
        bio = body["bio"],
        user_id = user_id
    )
    db.session.add(new_helper)
    db.session.commit()

    return jsonify("Successful"),200

@api.route("/postcandidate", methods=["POST"])
@jwt_required()
def craete_postcandidate():
    user_id = get_jwt_identity()
    helper = Helper.query.filter_by(user_id = user_id)
    if not helper:
        return jsonify("user is not registered as a helper")
    body = request.json
    new_postcandidate = PostCandidate(
        helper_id = helper.id,
        post_id = body["post_id"]
    )
    db.session.add(new_postcandidate)
    db.session.commit()

    return jsonify("Successful"),200

@api.route("/postcandidate/<int:id>", methods=["DELETE"])
def delete_postcandidate(id):
    PostCandidate.query.filter_by(id = id).delete()

    
    db.session.commit()

    return jsonify("Successful"),200




       
