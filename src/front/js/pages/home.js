import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import VideoComponent from "../component/videoComponent";
import HelpSlider from "../component/helpslider";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <VideoComponent />
      <div />
      <div>
        <HelpSlider />
      </div>
      <div className="text-center mt-5">
        <h1>Hello Rigo!!</h1>
        <p>
          <img src={rigoImageUrl} alt="Rigo" />
        </p>
        <div className="alert alert-info">
          {store?.message || "Loading message from the backend (make sure your python backend is running)..."}
        </div>
        <footer></footer>
      </div>
    </div>
  );
};
