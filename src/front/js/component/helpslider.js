import React from "react";
import Slider from "react-slick";
import Help from "./Help";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../path/to/helpslider.css"; // Replace with the path to your helpslider.css file
import "./HelpSlider.css";
import { Help } from "./Help";
const HelpSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            <Help />
            <Help />
            <Help />
            {/* Add additional Help components here if needed */}
        </Slider>
    );
};

export default HelpSlider;
