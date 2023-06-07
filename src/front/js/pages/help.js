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
  const [posts, setPosts] = useState([
    {
      id: 1,
      user_id: 1,
      description: "I need help to repair my car",
      images: [
        { id: 12, url: "https://cdn1.dealermarketing.com/public/article/rehost/1622533137452.png.png" },
        { id: 13, url: "https://www.autotrainingcentre.com/wp-content/uploads/2015/09/Top-5-Most-Common-Repairs-Youll-Encounter-in-an-Auto-Repair-Career.jpg" },
        { id: 14, url: "https://media.istockphoto.com/id/1284285171/photo/auto-mechanic-working-on-car-engine-in-mechanics-garage-repair-service-authentic-close-up-shot.jpg?s=170667a&w=0&k=20&c=qMzvOSFlDHhwupYpaNfl3YjFlTva3ZUAJLN8v6IGkyc=" },
      ],
      user: {
        id: 1,
        name: "George",
        email: "george@gmail.com",
        profile_pic: "img.jpeg"
      },
      date: new Date(),
      location: "city, state"
    },
    {
      id: 2,
      user_id: 2,
      description: "Looking for a plumber",
      images: [
        { id: 15, url: "https://apexpros.com/wp-content/uploads/2021/12/Apex-89.png" },
        { id: 16, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvb6iiysn4n_cl1ra3wrtIJsaTLCLFhzWbPg&usqp=CAU" }
      ],
      user: {
        id: 2,
        name: "John",
        email: "john@gmail.com",
        profile_pic: "img2.jpeg"
      },
      date: new Date(),
      location: "city, state"
    },
    {
      id: 3,
      user_id: 3,
      description: "Need assistance with gardening",
      images: [
        { id: 17, url: "https://ca-times.brightspotcdn.com/dims4/default/c8f0d3e/2147483647/strip/true/crop/1800x1013+0+0/resize/1200x675!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff5%2F33%2F417fa05141e394041be1e7fe9813%2Fgardening-clip-art-adobe-stock.jpg" },
        { id: 18, url: "https://media.greenmatters.com/brand-img/kER6G5G9-/0x0/is-gardening-good-for-you-1598025162933.jpg" }
      ],
      user: {
        id: 3,
        name: "Alice",
        email: "alice@gmail.com",
        profile_pic: "img3.jpeg"
      },
      date: new Date(),
      location: "city, state"
    },
    {
      id: 4,
      user_id: 4,
      description: "Looking for a tutor",
      images: [
        {
          id: 21,
          url: "https://images.theconversation.com/files/268439/original/file-20190409-2921-1a4uike.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip"
        }
      ],
      user: {
        id: 4,
        name: "Bob",
        email: "bob@gmail.com",
        profile_pic: "img4.jpeg"
      },
      date: new Date(),
      location: "city, state"
    }
  ]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        console.log(data)
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

  return (
    <div>
      <div className="popup-container">
        {!popupOpen &&
          <button onClick={openPopup}>New Post</button>}
        {popupOpen && <PopupForm onClose={closePopup} />}
      </div>

      <div className="card-container">
        {posts.map((post, i) => (
          <div key={post.id} className="card">
            <div className="card-body">
              <h5 className="card-title">{post.user.name}</h5>
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
              <a href="#" className="btn btn-primary">
                HELP ME
              </a>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="custom-lightbox">
          <Lightbox
            mainSrc={posts[postItem].images[postImageIndex].url}
            onCloseRequest={closeLightbox}
          />
        </div>
      )}
    </div>
  );
};

