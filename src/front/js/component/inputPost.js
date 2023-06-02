import React, { useState, useEffect, useContext } from "react";


import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const InputPost = () => {
	const { store, actions } = useContext(Context);
    const [userPosts, setUserPosts] = useState([])
    const [inputValue, setInputValue] = useState({})
    const [inputPicture1, setInputPicture1] = useState(null)
    const [inputPicture2, setInputPicture2] = useState(null)
    const [inputPicture3, setInputPicture3] = useState(null)

   
    const picture1Change = (event) => {
        setInputPicture1(event.target.files) 
    }
    const picture2Change = (event) => {
        setInputPicture2(event.target.files) 
    }
    const picture3Change = (event) => {
        setInputPicture3(event.target.files) 
    }


	return (
        <div>
                <div className="form-container">
                    <input className="input" onChange={inputChange} type="text">
                    </input>
                    <input className="input.pictures" onChange={picture1Change} type="file">
                    </input>
                    <input className="input.pictures" onChange={picture2Change} type="file">
                    </input>
                    <input className="input.pictures" onChange={picture3Change} type="file">
                    </input>
                    <button className="btn btn-primary" onClick={addPost}> Create Post </button>

                </div>
                {userPosts.length ? userPosts.map((posts, index) => { return (
                <div>
                <p>{posts.post}</p> 
                <img src={URL.createObjectURL(inputPicture1)} ></img>
                <img src={URL.createObjectURL(inputPicture2)} ></img>
                <img src={URL.createObjectURL(inputPicture3)} ></img>
                </div>



                ) }) : null}
            </div>
    )
}