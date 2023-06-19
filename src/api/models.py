from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy()

from datetime import datetime

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(256), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    city = db.Column(db.String(256), nullable=False)
    images = db.relationship('Image', backref='post')
    candidates = db.relationship("PostCandidate", backref="post")

    user = db.relationship("User", backref="posts")

    def __repr__(self):
        return f'<Post {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "description": self.description,
            "location": self.location,
            "date": self.date.strftime("%Y-%m-%d %H:%M:%S"),
            "city": self.city,
            "user": self.user.serialize(),
            "images": [image.serialize() for image in self.images],
            "candidates": [candidate.serialize() for candidate in self.candidates]
        }



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    profile_image = db.Column(db.String(256), unique=True)
    password = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(256), nullable=False)
    date_of_birth = db.Column(db.String(256), nullable=False)
    city = db.Column(db.String(256), nullable=True)
    location = db.Column(db.String(256), nullable=True)
    zip_code = db.Column(db.String(256), nullable=True)
    helper = db.relationship("Helper", uselist=False, backref="user")

    @classmethod
    def create_user(cls, email, password, name, date_of_birth, city, location, zip_code):
        new_user = cls(
            email=email,
            password=password,
            name=name,
            date_of_birth=date_of_birth,
            city=city,
            location=location,
            zip_code=zip_code
        )
        db.session.add(new_user)
        try:
            db.session.commit()
            return new_user
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    def __repr__(self):
        return f'<User {self.email}>'

    def check_password(self, pswd):
        return self.password == pswd

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "profile_image": self.profile_image,
            "name": self.name,
            "date_of_birth": self.date_of_birth,
            "city": self.city,
            "location": self.location,
            "zip_code": self.zip_code
        }


class PostCandidate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    helper_id = db.Column(db.Integer, ForeignKey("helper.id"))
    post_id = db.Column(db.Integer, ForeignKey("post.id"))

    @classmethod
    def create_new(cls, helper_id, post_id):
        helper = Helper.query.get(helper_id)
        if helper and helper.role == 'Helper':
            new_post_candidate = cls(
                helper_id=helper_id,
                post_id=post_id
            )
            db.session.add(new_post_candidate)
            try:
                db.session.commit()
                return new_post_candidate
            except Exception as error:
                db.session.rollback()
                print(error)
                return None
        else:
            return None

    def __repr__(self):
        return f'<PostCandidate {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "helper_id": self.helper_id,
            "post_id": self.post_id
        }

class Helper(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"))
    bio = db.Column(db.String(500), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Helper {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "bio": self.bio,
            "role": self.role
        }

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, ForeignKey("post.id"))
    url = db.Column(db.String(500), nullable=False)
    public_id = db.Column(db.String(250), unique=True, nullable=False)

    @classmethod
    def create_new(cls, post_id, url, public_id):
        new_image = cls(
            post_id=post_id,
            url=url,
            public_id=public_id
        )
        db.session.add(new_image)
        try:
            db.session.commit()
            return new_image
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    def __repr__(self):
        return f'<Image {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "url": self.url
        }



    


 