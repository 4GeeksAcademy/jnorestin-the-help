import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import Paymentmodal from "../component/paymentmodal"

export const Post = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="post-page">
      <div className="container-fluid">
        <div className="row mt-5">
          {store.user ? (
            store.posts
              .filter((item, index) => item?.user_id == store.user.id)
              .map((post, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={post.user.profile_image}
                          alt="User Profile Image"
                          className="profile_image me-3"
                        />
                        <div>
                          <p className="m-0">{post.user.name}</p>
                        </div>
                      </div>

                      <p className="card-text">{post.description}</p>
                      <p className="card-price">Price: ${post.price}</p>
                      <div className="post-images d-flex flex-wrap">
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
                        <ul className="list-unstyled">
                          {post.candidates.map((candidate) => (
                            <li key={candidate.id} className="d-flex align-items-center">
                              <img
                                src={candidate.profile_image}
                                alt="Candidate Profile Image"
                                className="candidate-profile-image me-3"
                              />
                              <p>{candidate.name}</p>
                            </li>
                          ))}
                        </ul>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                          <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                        </div>
                        <i className="fa-regular fa-envelope"></i>
                        <Paymentmodal></Paymentmodal>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};