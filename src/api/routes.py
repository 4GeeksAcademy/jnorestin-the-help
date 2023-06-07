"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Post,Image
from api.utils import generate_sitemap, APIException

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
def create_posts():
    request_body = request.get_json()
    new_post = Post(
        description = request_body["description"],
        location = request_body["location"],
        date = request_body["date"]
    )
    db.session.add(new_post)
    db.session.commit()

    return (jsonify),200
