import React, { useEffect, useRef, useState } from "react";
import "./VideoComponent.css"; // Import the CSS file for styling

const VideoComponent = () => {
  const textRef = useRef(null);
  const messages = [
    "Find the nanny you need!",
    "Find the mechanic you need!",
    "Find the dog walker you need!",
    "Find the help you need!"
  ];
 const [index, setIndex] = useState(0)
  
  // useEffect(()=> {
  //   const _intervalId = setInterval(()=>{
  //     setIndex((prev)=> (index<messages.length-1)
  //       ?  prev+1
  //       :0)
  //   }, 3000);
   
  //   return () => {
  //     clearInterval(_intervalId);
  //   };
  // },[messages]);

  useEffect(() => {
    const textElements = textRef.current.querySelectorAll(".text");
    let currentIndex = 0;

    const animateText = () => {
      textElements.forEach((textElement, index) => {
        if (index === currentIndex) {
         // textElement.style.display = "block"
          textElement.classList.add("visible");
        } else {
          //textElement.style.display = "none"
          textElement.classList.remove("visible");
        }
      });

      currentIndex = (currentIndex + 1) % textElements.length;
    };

    const animationInterval = setInterval(animateText, 3000);
    return () => {
      clearInterval(animationInterval);
    };
  
  }, []);

  return (
    <div className="video-container">
      <div className="text-overlay">
        <div className="animated-text" ref={textRef}>
          {/* <div className="text">{messages[index]}</div> */}
          <div className="text">Find the nanny you need!</div> <div className="text">Find the mechanic you need!</div>
          <div className="text">Find the dog walker you need!</div>
          <div className="text">Find the help you need!</div>
        </div>
      </div>
      <video autoPlay loop muted className="video-element">
        <source
          src="https://res.cloudinary.com/dggcy5lcn/video/upload/v1686145526/My_Movie_jtqim7.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoComponent;

