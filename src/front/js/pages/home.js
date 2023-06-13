import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";

import VideoComponent from "../component/videoComponent";
import HelpSlider from '../component/helpslider.js';






export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
<<<<<<< HEAD
		<div>

			<VideoComponent />
			<div>
        <HelpSlider/>
		 
=======
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store?.message || "Loading message from the backend (make sure your python backend is running)..."}
>>>>>>> 95b682fea160248afc4f7e1ceea0870be97d5f11
			</div>
			<div>
				<footer />
			</div>

		</div>

	);

};