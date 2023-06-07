import React, { useState, useEffect } from "react";
import "../../../front/styles/help.css";
import "../../../front/styles/form.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import PopupForm from "../component/popupform";

export const Help = (props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [postImageIndex, setPostImageIndex] = useState(0);
  const [postItem, setPostItem] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://ronaldinep-congenial-fishstick-r9w4pjjq4xxfx554-3001.preview.app.github.dev/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const arrow = document.querySelector(".scroll-down-indicator .arrow");
      arrow.classList.add("blink");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      // Fetch user account information
      const userResponse = await fetch("https://ronaldinep-congenial-fishstick-r9w4pjjq4xxfx554-3001.preview.app.github.dev/api/user");
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user account");
      }
      const userAccount = await userResponse.json();

      // Add user account and timestamp to the post data
      const postWithUser = {
        ...postData,
        user: {
          name: userAccount.name,
          avatar: userAccount.avatar,
        },
        timestamp: new Date().toLocaleString(),
        location: "Your current location",
      };

      const response = await fetch("https://ronaldinep-congenial-fishstick-r9w4pjjq4xxfx554-3001.preview.app.github.dev/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postWithUser),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, newPost]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="popup-container">
        {!popupOpen && <button onClick={openPopup}>New Post</button>}
        {popupOpen && <PopupForm createPost={createPost} onClose={closePopup} />}
      </div>
      <div className="cards">
        {posts.map((post, i) => (
          <div key={post.id} className="card">
            <div className="card-body">
              <div className="user-info">
                <img src={post.user.avatar} alt="User Avatar" className="user-avatar" />
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



