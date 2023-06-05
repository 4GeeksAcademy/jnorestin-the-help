from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy()

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"))
    user = db.relationship("User", backref = "posts")
    description = db.Column(db.String(500),unique=False, nullable=False)
    location = db.Column(db.String(256), unique=False, nullable=False)
    date = db.Column(db.String(256), unique=False, nullable=False)

    def __repr__(self):
        return f'<Post {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "description":self.description,
            "location":self.location,
            "date":self.date,
            "user":self.user.serialize()
            # do not serialize the password, its a security breach
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    profile_image = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    name = db.Column(db.String(256), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "profile_image":self.profile_image,
            "name":self.name
            
            # do not serialize the password, its a security breach
        }

class PostCandidate (db.Model):
    id = db.Column(db.Integer,primary_key=True)
    helper_id = db.Column(db.Integer, ForeignKey("helper.id"))
    post_id = db.Column(db.Integer,ForeignKey("post.id"))

    def __repr__(self):
        return f'<post_candidate {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "helper_id": self.helper_id,
            "post_id": self.post_id
            # do not serialize the password, its a security breach
        }
class Helper (db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"))
    bio = db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return f'<Helper {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "bio":self.bio
        }
class Image (db.Model):
    id = db.Column(db.Integer,primary_key=True)
    post_id = db.Column(db.Integer, ForeignKey("post.id"))
    image_url = db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return f'<Image {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "image":self.image_url
        }

    


 