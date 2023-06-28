import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

export const HelperPosts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Fetch user posts and post candidates when the component mounts
    // actions.fetchUserPosts();
  }, []);

  const { posts, user } = store;

console.log(posts, "These are the posts")
console.log(user, "This is the helper")
console.log(posts
  .filter((item) => item.helper_id === user.id), "posts the helper is assigned to")

  return (
    <div className="container">
      <h1 className="mt-3">Helper View</h1>
      <div className="row">
        {posts
          .filter((item) => item.helper_id === user.id)
          .map((post, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100">
                <img
                  src={post.user.profile_image}
                  alt="User Profile Image"
                  className="user-profile-image card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{post.user.name}</h5>
                  <p className="card-text">{post.description}</p>
                  <div className="post-images">
                    {post.images.map((image) => (
                      <div className="image-wrapper" key={image.id}>
                        <img src={image.url} alt="Post Image" className="img-fluid" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    {post.timestamp}, {post.city}, {post.location}
                  </small>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};