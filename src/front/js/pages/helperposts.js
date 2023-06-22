import React, { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";

export const HelperPosts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Fetch user posts and post candidates when the component mounts
    actions.fetchUserPosts();
  }, []);

  const { posts, user } = store;

  // Render the userPosts and associated postCandidates
  return (
    <div className='post-container'>
      <h1>Helper View</h1>
      {posts.filter((item, index) => item.helper == user.helper).map((post, index) => {
        return (
          <div className="post-body">
            <div className="user-info">
              <div className='d-flex w-100'>
                <div className='w-50'>
                  <img src={post.user.profile_image} alt="User Profile Image" className="user-profile-image me-auto" />
                </div>
                <div className='w-50'>
                  <p>{post.user.name}</p>
                </div>
              </div>
              <p className="post-text">{post.description}</p>
              <div className="post-images">
                {post.images.map((image) => (
                  <div className="image-wrapper" key={image.id}>
                    <img src={image.url} alt="Post Image" />
                  </div>
                ))}
              </div>
            </div>
            <div className="post-info">
              <p className="timestamp">{post.timestamp}</p>
              <p className="location">
                {post.city}, {post.location}
              </p>
            </div>
            
          </div>
        )
      })}

    </div>
  );
};