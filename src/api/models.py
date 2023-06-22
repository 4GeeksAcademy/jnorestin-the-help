from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy()

candidates = db.Table('candidates',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True)
)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user = db.relationship("User", backref="posts")
    candidates = db.relationship('User', secondary=candidates, lazy='subquery')
    description = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(256), nullable=False)
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
            "description":self.description,
            "location":self.location,
            "date":self.date,
            "user":self.user.serialize(),
            "images":[image.serialize() for image in self.images],
            "price": self.price,
            "post_status":self.post_status,
            "candidates": list(map(lambda x: x.serialize(), self.candidates))
            

            
            
            # do not serialize the password, its a security breach
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    profile_image = db.Column(db.String(256), unique=True)
    password = db.Column(db.String(256), unique=False, nullable=False)
    name = db.Column(db.String(256), unique=False, nullable=False)
    date_of_birth = db.Column(db.String(256), unique=False, nullable=True)
    helper = db.Column(db.Boolean(),unique=False,nullable=True)
    description = db.Column(db.String(500), unique=False, nullable=True)
    role = db.Column(db.String(50), unique=False, nullable=True)
    phone_number = db.Column(db.String(20), unique=False, nullable=True)
    address = db.Column(db.String(200), unique=False, nullable=True)
    skills = db.Column(db.String(500), unique=False, nullable=True)


    @classmethod
    def create_user(cls, email, password, name, date_of_birth, helper, description, role, phone_number, address, skills):
        new_user = cls(
            email=email,
            password=password,
            name=name,
            date_of_birth=date_of_birth,
            helper=helper,
            description=description,
            role=role,
            phone_number=phone_number,
            address=address,
            skills=skills
           
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



# class PostCandidate(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     helper_id = db.Column(db.Integer, ForeignKey("helper.id"))
#     post_id = db.Column(db.Integer, ForeignKey("post.id"))

#     def __repr__(self):
#         return f'<PostCandidate {self.id}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "helper_id": self.helper_id,
#             "post_id": self.post_id
#         }

# class Helper(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, ForeignKey("user.id"))
#     bio = db.Column(db.String(500), unique=False, nullable=False)
#     role = db.Column(db.String(50), unique=False, nullable=False)

#     def __repr__(self):
#         return f'<Helper {self.id}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "bio": self.bio,
#             "role": self.role
#         }

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


    


 