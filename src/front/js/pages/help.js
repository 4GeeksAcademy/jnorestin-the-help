import React, { useState, useEffect, useContext } from "react";
import "../../../front/styles/help.css";
import "../../../front/styles/form.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import PopupForm from "../component/popupform";
import { Context } from "../store/appContext";

export const Help = (props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [postImageIndex, setPostImageIndex] = useState(0);
  const [postItem, setPostItem] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchPosts();
  }, []);

  useEffect(() => {
    if (!store.posts) return;
    setPosts(store.posts);
  }, [store.posts]);

  const openLightbox = (index) => {
    setLightboxOpen(true);
    setPostImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setPostImageIndex(0);
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const createPost = async (postData) => {
    try {
      const postWithUser = {
        description: postData.description,
        date: new Date().toLocaleString(),
        location: "Your current location",
        // images: images,
      };

      const response = await fetch(store.apiUrl + "/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${store.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postWithUser),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();
      console.log(">>> 🍎", postData.images);
      for (const image of postData.images) {
        let formData = new FormData();
        formData.append("file", image.file);
        formData.append("post_id", newPost.id);
        await actions.createPostImage(formData);
      }
      actions.fetchPosts(); // Fetch posts again
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePost = (postData) => {
    console.log("HERE")
    createPost(postData);

  };

  return (
    <div>
      <div className="popup-container">
        {!popupOpen && !lightboxOpen && (
          <button onClick={openPopup} className="btn-new-post">
            New Post
          </button>
        )}
        {popupOpen && <PopupForm onSuccess={handleCreatePost} onClose={closePopup} />}
      </div>

      <div className="card-container">
        {posts.map((post, i) => (
          <div key={post.id} className="card">
            <div className="card-body">
              <div className="user-info">
                <img src={post.user.profile_image} alt="User Profile Image" className="profile_image" />
                <h5 className="card-title">{post.user.name}</h5>
              </div>
              <p className="card-text">{post.description}</p>
              <div className="card-images">
                {post.images.map((image, index) => (
                  <div className="image-wrapper" key={image.id}>
                    <img
                      src={image.url}
                      alt="Post Image"
                      onClick={() => {
                        openLightbox(index);
                        setPostItem(i);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="post-info">
                <p className="timestamp">{post.timestamp}</p>
                <p className="location">{post.location}</p>
              </div>
              <a href="#" className="btn btn-primary">
                HELP ME
              </a>
            </div>
          </div>
        ))}
      </div>
      {lightboxOpen && (
        <Lightbox
          mainSrc={posts[postItem].images[postImageIndex].url}
          nextSrc={posts[postItem].images[(postImageIndex + 1) % posts[postItem].images.length].url}
          prevSrc={posts[postItem].images[(postImageIndex + posts[postItem].images.length - 1) % posts[postItem].images.length].url}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() => setPostImageIndex((postImageIndex + posts[postItem].images.length - 1) % posts[postItem].images.length)}
          onMoveNextRequest={() => setPostImageIndex((postImageIndex + 1) % posts[postItem].images.length)}
        />
      )}
    </div>
  );
};





