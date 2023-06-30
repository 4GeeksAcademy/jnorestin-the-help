from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy()


candidates = db.Table(
    'candidates',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True)
)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    profile_image = db.Column(db.String(256), unique=True)
    password = db.Column(db.String(256), unique=False, nullable=False)
    name = db.Column(db.String(256), unique=False, nullable=False)
    date_of_birth = db.Column(db.String(256), unique=False, nullable=True)
    is_helper = db.Column(db.Boolean(), unique=False, nullable=True)
    description = db.Column(db.String(500), unique=False, nullable=True)
    phone_number = db.Column(db.String(20), unique=False, nullable=True)
    address = db.Column(db.String(200), unique=False, nullable=True)
    skills = db.Column(db.String(500), unique=False, nullable=True)
    city = db.Column(db.String(50), unique=False, nullable=True)
    location = db.Column(db.String(50), unique=False, nullable=True)
    zipcode=db.Column(db.Integer)

    posts = db.relationship("Post", back_populates="user", foreign_keys='Post.user_id')
    posts_to_help = db.relationship("Post", back_populates="helper", foreign_keys='Post.helper_id')
    candidate_in = db.relationship("Post", secondary=candidates, back_populates="candidates")

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
            "is_helper": self.is_helper,
            "description": self.description,
            "phone_number": self.phone_number,
            "address": self.address,
            "skills": self.skills,
             "city":self.city,
            "location":self.location
        }

# ... User class stays the same ...

# ... User class stays the same ...

# class Post(db.Model):
#     __tablename__ = 'posts'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     user = db.relationship("User", back_populates="posts", foreign_keys=[user_id])
#     candidates = db.relationship("User", secondary=candidates, back_populates="candidate_in")
#     helper_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     helper = db.relationship("User", back_populates="posts_to_help", foreign_keys=[helper_id])
#     description = db.Column(db.String(500), nullable=False)
#     location = db.Column(db.String(256), nullable=False)
#     city = db.Column(db.String(256), nullable=False)
#     date = db.Column(db.String(256), nullable=False)
#     price = db.Column(db.Integer, nullable=False)
#     images = db.relationship('Image', backref='post')
#     post_status = db.Column(db.String(256), nullable=False)

#     def __repr__(self):
#         return f'<Post {self.id}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "description": self.description,
#             "location": self.location,
#             "date": self.date,
#             "user": self.user.serialize(),
#             "city": self.city,
#             "images": [image.serialize() for image in self.images],
#             "price": self.price,
#             "post_status": self.post_status,
#             "candidates": list(map(lambda x: x.serialize(), self.candidates)),
#             "helper":self.helper.serialize(),
#             "helper_id":self.helper_id
#         }
class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="posts", foreign_keys=[user_id])
    candidates = db.relationship("User", secondary=candidates, back_populates="candidate_in")
    helper_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    helper = db.relationship("User", back_populates="posts_to_help", foreign_keys=[helper_id])
    description = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(256), nullable=False)
    city = db.Column(db.String(256), nullable=False)
    date = db.Column(db.String(256), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    images = db.relationship('Image', backref='post')
    post_status = db.Column(db.String(256), nullable=False)

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
            "city": self.city,
            "images": [image.serialize() for image in self.images],
            "price": self.price,
            "post_status": self.post_status,
            "candidates": list(map(lambda x: x.serialize(), self.candidates)),
            "helper": self.helper.serialize() if self.helper else None,
            "helper_id": self.helper_id
        }

# ... Image class stays the same ...

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, ForeignKey("posts.id"))
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
