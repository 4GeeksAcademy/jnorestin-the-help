import React, { useEffect, useRef, useState } from "react";
import "../../../front/styles/VideoComponent.css";

const VideoComponent = () => {
  const textRef = useRef(null);
  const messages = [
    "Welcome to your neighborhood",
    "Find the nanny you need",
    "Find the mechanic you need",
    "Find the dog walker you need",
    "Find the help you need"
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const _intervalId = setInterval(() => {
      setTimeout(() => {
        setIndex((prev) => (index < messages.length - 1) ? prev + 1 : 0);
      }, 500);
      const textElement = textRef.current.querySelector(".custom-text");
      textElement.classList.remove("visible");
    }, 3000);
    return () => {
      clearInterval(_intervalId);
    };
  }, [messages]);

  useEffect(() => {
    if (index === undefined) return;
    setTimeout(() => {
      const textElement = textRef.current.querySelector(".custom-text");
      textElement.classList.add("visible");
    }, 500);
  }, [index]);

  return (
    <div className="custom-video-container">
      <div className="custom-text-overlay">
        <div className="animated-text" ref={textRef}>
          <div className="custom-text">{messages[index]}</div>
        </div>
      </div>
      <video autoPlay loop muted className="custom-video-element">
        <source
          src="https://res.cloudinary.com/dggcy5lcn/video/upload/v1686616744/My_Movie_io34zg.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoComponent;
