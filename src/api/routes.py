"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Post,Image
from api.utils import generate_sitemap, APIException
from cloudinary import uploader
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)

@api.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    post_dictionaries = [post.serialize() for post in posts]
    return jsonify(post_dictionaries)

@api.route('/posts/<int:id>', methods=['GET'])
def get_post(id):
    post = Post.query.get(id)
    return jsonify(post.serialize()), 200


# @api.route('/userposts/<int:user_id>', methods=['GET'])
# # @jwt_required()
# def get_post_by_user_id(user_id):
#     # user_id = get_jwt_identity()
#     print("user_id",user_id)
#     return jsonify(user_id),200
    # posts = Post.query.filter_by(user_id = user_id)
    # post_dictionaries = [post.serialize() for post in posts]
    # return jsonify(post_dictionaries)
    # return jsonify("Hello!!!")

# @api.route('/postswithhelper', methods=['GET'])
# @jwt_required()
# def get_posts_with_helper(): 
#     user_id = get_jwt_identity()
#     helper_posts = []
#     helper = Helper.query.filter_by(user_id=user_id)  
#     posts = Post.query.all()
#     for post in posts :
#         for candidate in post.candidates:
#             if candidate.helper_id == helper.id:
#                 helper_posts.append(post)
#     post_dictionaries = [post.serialize() for post in helper_posts]
#     return jsonify(post_dictionaries)



@api.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    request_body = request.get_json()
    new_post = Post(
        description=request_body["description"],
        location=request_body["location"],
        city=request_body["city"],
        date=request_body["date"],
        price=request_body["price"],
        post_status=request_body["post_status"],
        user_id=user_id
    )
    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.serialize()), 201


@api.route("/post/<int:id>", methods=["DELETE"])
def delete_post(id):
    Post.query.filter_by(id = id).delete()

    
    db.session.commit()

    return jsonify("Successful"),200

# @api.route("/postcandidate/<int:id>", methods=["DELETE"])
# def delete_postcandidate(id):
#     PostCandidate.query.filter_by(id = id).delete()

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


@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    return jsonify(user.serialize()), 200


# @api.route("/sign-up", methods=["POST"])
# def sign_up():
#     body = request.json
#     email = body.get("email")
#     password = body.get("password")
#     name = body.get("name")
#     date_of_birth = body.get("date_of_birth")
#     city = body.get("city")
#     location = body.get("location")
#     zip_code = body.get("zip_code")

#     if not email or not password or not name or not date_of_birth:
#         return jsonify("Email, password, name, and date of birth are required"), 400

@api.route("/sign-up", methods=["POST"])
def sign_up():
    body = request.json
    email = body.get("email")
    password = body.get("password")
    name = body.get("name")
    date_of_birth = body.get("date_of_birth")
    city = body.get("city")
    location = body.get("location")
    

    if not email or not password or not name or not date_of_birth:
        return jsonify("Email, password, name, and date of birth are required"), 400

    user = User.create_user(
        email=body["email"],
        password=body["password"],
        name=body["name"],
        city=body["city"],
        location=body["location"],
        date_of_birth=body["date_of_birth"]
    )

    if user is None:
        return jsonify("Failed to create user"), 400

    return jsonify(user.serialize()), 201

@api.route("/profile-image", methods=["POST"])
@jwt_required()
def create_profile_image():
    image = request.files['file']
    user_id = User.query.filter_by(email=get_jwt_identity).first()
    response = uploader.upload(
        image,
        resource_type="image",
        folder="user"
    )
    new_post_image = Image(
        user_id=user_id,
        url=response["secure_url"],
        public_id=response["public_id"]
    )
    db.session.add(new_post_image)
    db.session.commit()

    return jsonify(new_post_image.serialize()), 201


# @api.route("/helper", methods=["GET"])
# def get_helper():
#     helpers = Helper.query.all()
#     helper_dictionaries = list(map(
#         lambda helper: helper.serialize(),
#         helpers
#     ))
#     return jsonify(helper_dictionaries)

# @api.route("/helper", methods=["POST"])
# @jwt_required()
# def creat_helper():
#     user_id = get_jwt_identity()
#     body = request.json
#     new_helper = Helper(
#         bio = body["bio"],
#         role = body["role"],
#         user_id = user_id
#     )
#     db.session.add(new_helper)
#     db.session.commit()

#     return jsonify("Successful"),200


@api.route("/post_candidates", methods=["PUT"])
@jwt_required()

def create_post_candidates():

    user_id = get_jwt_identity()
    helper = Helper.query.filter_by(user_id = user_id).first()
    if not helper:

        return jsonify("user is not registered as a helper"),400
    body = request.json
    if body["post_id"] is None :
        return "No Post Provide", 400 
    post = Post.query.filter_by(id = body["post_id"]).first()
    if post is None :
        return "Post Not Found",404
    new_post_candidate = helper.id
    
    if post.post_candidates is None :
        post.post_candidates =[]
    try:
        post.post_candidates.append(new_post_candidate)
    except Exception as e:
        payload = {
            "msg": " Couldn't add Candidate",
            "error": e
        }
        return jsonify(payload),409
        return jsonify("Successful"), 200

@api.route("/postcandidate/<int:id>", methods=["DELETE"])
def delete_post_candidate(id):
    post_candidate = PostCandidate.query.filter_by(id=id).first()

    if not post_candidate:
        return jsonify("Post candidate not found"), 404

    db.session.delete(post_candidate)
    db.session.commit()

def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False

    app.config['JWT_SECRET_KEY'] = 'super-secret-key'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False

    app.register_blueprint(api)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run()






       
