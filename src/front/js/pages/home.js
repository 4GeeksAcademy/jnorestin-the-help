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
		<div>

			<VideoComponent />
			<div>
        <HelpSlider/>
		 
			</div>
			<div>
				<footer />
			</div>

		</div>

	);

};