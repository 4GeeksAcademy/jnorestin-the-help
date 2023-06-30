import React, { useContext } from 'react';
import { Context } from '../store/appContext';

export const HelperPosts = () => {
  const { store, actions } = useContext(Context);

  const { posts, user } = store;
  return (
    <div className="container">
      <div className="row mt-5">
        {posts
          .filter((item) => item.helper_id === user.id)
          .map((post, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div style={{width:"40rem"}}className="card h-100">
                <img
                  src={post.user.profile_image}
                  alt="User Profile Image"
                  className="user-profile-image card-img-top me-3"
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