import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


import VideoComponent from "../component/videoComponent";
import HelpSlider from '../component/helpslider.js';






export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>

			<VideoComponent />
			
			<div className="review-title">
				<h1> See what they say about us </h1>
			</div>
			<HelpSlider />

			<div>
				<footer />
			</div>

		</div>

	);

};