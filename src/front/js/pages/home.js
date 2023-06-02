import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";

import VideoComponent from "../component/videoComponent";

import FrontHelpCard from "../component/FrontHelpCard";




export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			
			<VideoComponent/>
			<div>
			<FrontHelpCard/>
			</div>
			<div>
				<footer/>
			</div>

		</div>

	);

};