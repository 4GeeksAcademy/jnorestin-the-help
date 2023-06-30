import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import Paymentmodal from "../component/paymentmodal"
import PayPal from '../component/paypal';

export const Post = () => {
  const { store, actions } = useContext(Context);
  const [isShowing, setIsShowing] = useState(false);


  const deletePost = (id) => {
    fetch(process.env.BACKEND_URL +`/post/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          actions.deletePost(id);
        }
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className="post-page">
      <div className="container-fluid">
        <div className="row mt-5">
          {store.user ? (
            store.posts
              .filter((item, index) => item?.user_id == store.user.id)
              .map((post, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="card h-70">
                    <div className="card-body d-flex flex-column">
                      <div className="align-items-center mb-3">
                        <img
                          src={post.user.profile_image || 'https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'}
                          alt="User Profile Image"
                          className="profile_image"
                        />
                        <div>
                          <p className="m-20">{post.user.name}</p>
                        </div>
                      </div>

                      <p className="custom-card-text">{post.description}</p>
                      <p className="card-price">Price: ${post.price}</p>
                      <div className="post-images d-flex flex-wrap">
                        {post.images.map((image) => (
                          <div className="image-wrapper" key={image.id}>
                            <img src={image.url} alt="Post Image" className="img-fluid" />
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
                        <ul className="list-unstyled">
                          {post.candidates.map((candidate) => (
                            <li key={candidate.id} className="d-flex align-items-center justify-content-between mb-3">
                              <div className="d-flex align-items-center">
                                <img
                                  src={post.user.profile_image || 'https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'}
                                  className="candidate-profile-image me-3"
                                />
                                <p className="m-0">{candidate.name}</p>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="form-check form-switch me-3">
                                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                                </div>
                                <i className="fa-regular fa-envelope me-2"></i>
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => setIsShowing(!isShowing)}
                                >
                                  Make Payment
                                </button>
                                {!isShowing ? "" : <PayPal />}
                              </div>
                            </li>
                          ))}
                        </ul>

                        <div className="position-absolute top-0 end-0 mt-4 me-2">
                          <div className="d-flex">
                            <div className="me-2">
                              <button type="button" className="btn btn-info">
                                EDIT
                              </button>
                            </div>
                            <div>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => deletePost(post.id)}
                              >
                                DELETE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
