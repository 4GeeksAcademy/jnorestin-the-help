import React, { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";

export const Post = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Fetch user posts and post candidates when the component mounts
    actions.fetchUserPosts();
    actions.fetchPostCandidates();
  }, []);

  const { userPosts, postCandidates } = store;

  // Render the userPosts and associated postCandidates
  return (
    <div>
      <h1>User Posts</h1>
      {userPosts.map((post) => (
        <div className="card" key={post.id}>
          <div className="card-body">
            <div className="user-info">
              <img src={post.user.profile_image} alt="User Profile Image" className="profile_image" />
              <h5 className="card-title">{post.user.name}</h5>
            </div>
            <p className="card-text">{post.description}</p>
            <div className="card-images">
              {post.images.map((image) => (
                <div className="image-wrapper" key={image.id}>
                  <img src={image.url} alt="Post Image" />
                </div>
              ))}
            </div>
            <div className="post-info">
              <p className="timestamp">{post.timestamp}</p>
              <p className="location">
                {post.city}, {post.location}
              </p>
            </div>
            <div className="post-candidates">
              <h3>Post Candidates</h3>
              <ul>
                {postCandidates
                  .filter((candidate) => candidate.postId === post.id)
                  .map((candidate) => (
                    <li key={candidate.id}>
                      <div className="candidate-info">
                        <img src={candidate.profile_image} alt="Candidate Profile Image" className="profile_image" />
                        <p>{candidate.name}</p>
                      </div>
                      {/* Add any other candidate details */}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
