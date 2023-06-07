import React from "react";
import { Help } from "../pages/help";


export  const HelpSlider = ({ posts }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      
  return (
    <div className="help-slider">
      {posts.map((post) => (
        <div key={post.id} className="help-slider-item">
          <img src={post.user.profile_pic} alt="Profile Picture" />
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};



  


