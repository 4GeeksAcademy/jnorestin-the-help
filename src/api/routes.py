from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from cloudinary import uploader
from api.models import db, User, Post, Image
from api.utils import generate_sitemap, APIException
from flask import Flask, request, jsonify
from api.models import User
from flask import Flask, request, jsonify
from flask_cors import CORS
from api.models import db, User
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from flask import jsonify
from flask import Flask, request, jsonify



app = Flask(__name__)
CORS(app)


api = Blueprint('api', __name__)

# User-related routes
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    return jsonify(user.serialize()), 200

@api.route("/sign-up", methods=["POST"])
def sign_up():
    print("#########its running")
    body = request.json
    email = body.get("email")
    password = body.get("password")
    name = body.get("name")
    date_of_birth = body.get("date_of_birth")
    city = body.get("city")
    location = body.get("location")
    zipcode = body.get("zipcode")

    if not email or not password or not name or not date_of_birth:
        return jsonify("Email, password, name, and date of birth are required"), 400
    
    check_user = User.query.filter_by(email=email).first()

    if check_user:
        return jsonify({
            'msg': 'The email address already is already in use. Please login to your account to continue, or choose a different email.'
        }),409

    user = User(
        email=email,
        password=password,
        name=name,
        city=city,
        location=location,
        zipcode=zipcode,
        date_of_birth=date_of_birth,
        is_helper=True
    )

    if user is None:
        return jsonify("Failed to create user"), 400
    
    db.session.add(user)
    try:
        db.session.commit()
        return jsonify(user.serialize()), 201
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify(error), 400




#from flask_jwt_extended import jwt_optional, get_jwt_identity

# ...

#from flask_jwt_extended import get_jwt_identity

@api.route('/user-by-token', methods=['GET'])
def get_user_by_token():
    # Verify if the JWT is present in the request
    try:
        verify_jwt_in_request()
    except Exception as e:
        return jsonify({"error": str(e)}), 401

    current_user_id = get_jwt_identity()

    if current_user_id is None:
        return jsonify({"error": "No JWT provided"}), 401

    # Query the user from the database
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    # Return the user's serialized data
    return jsonify(user.serialize()), 200


   

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
@api.route("/profile-image", methods=["PUT"])
@jwt_required()
def create_profile_image():
    image = request.files['file']
    user_id = get_jwt_identity()
    response = uploader.upload(image)
    profile_image_url = response['secure_url']

    user = User.query.get(user_id)
   
    new_user_image = User
    db.session.commit()

    return jsonify({"message": "Profile image uploaded successfully", "profile_image_url": profile_image_url}), 201




# ...

@api.route("/update-user", methods=["PUT"])
@jwt_required()
def update_user():
    # Retrieve the data from the request
    data = request.json
    skills = data.get("skills")
    description = data.get("description")
    phone_number = data.get("phone_number")
    address = data.get("address")

    # Get the current user from the JWT identity
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Update the user's profile
    if skills is not None:
        user.skills = skills
    if description is not None:
        user.description = description
    if phone_number is not None:
        user.phone_number = phone_number
    if address is not None:
        user.address = address

    db.session.commit()

    # Return a success response
    return jsonify({"message": "Profile updated successfully"}), 200

# ...

# Post-related routes

@api.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    post_dictionaries = [post.serialize() for post in posts]
    return jsonify(post_dictionaries)

@api.route('/posts/<int:id>', methods=['GET'])
def get_post(id):
    post = Post.query.get(id)
    return jsonify(post.serialize()), 200

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
        post_status="pending",
        user_id=user_id
    )
    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.serialize()), 201

@api.route('/add-post-candidate', methods=['PUT'])
@jwt_required()
def add_post_candidate():
    user_id = get_jwt_identity()
    request_body = request.get_json()

    if request_body is None:
        return "no data was sent on the request", 400
    post = Post.query.filter_by(id=request_body["post_id"]).first()
    if post is None:
        return "post not found", 404
    if post.candidates is None:
        post.candidates=[]
    user= User.query.get(user_id)
    post.candidates.append(user)

    db.session.commit()

    return jsonify(post.serialize()), 200

@api.route("/post/<int:id>", methods=["DELETE"])
def delete_post(id):
    Post.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify("Successful"), 200

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
