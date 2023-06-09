from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy()

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"), nullable=False)
    user = db.relationship("User", backref="posts")
    description = db.Column(db.String(500), unique=False, nullable=False)
    location = db.Column(db.String(256), unique=False, nullable=False)
    date = db.Column(db.String(256), unique=False, nullable=False)
    images = db.relationship('Image', backref='post')

    def __repr__(self):
        return f'<Post {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "description": self.description,
            "location": self.location,
            "date": self.date,
            "user": self.user.serialize(),
            "images": [image.serialize() for image in self.images]
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    profile_image = db.Column(db.String(256), unique=True)
    password = db.Column(db.String(256), unique=False, nullable=False)
    name = db.Column(db.String(256), unique=False, nullable=False)
    helper = db.relationship("Helper", uselist=False, backref="user")

    @classmethod
    def create_user(cls, email, password, name):
        new_user = cls(
            email=email,
            password=password,
            name=name
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
        if self.password == pswd:
            return True
        return False

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "profile_image": self.profile_image,
            "name": self.name
        }

class PostCandidate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    helper_id = db.Column(db.Integer, ForeignKey("helper.id"))
    post_id = db.Column(db.Integer, ForeignKey("post.id"))

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
    bio = db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return f'<Helper {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "bio": self.bio
        }

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, ForeignKey("post.id"))
    url = db.Column(db.String(500), unique=False, nullable=False)
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

    


 