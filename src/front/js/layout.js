import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import UpdateProfile from "./component/UpdateProfile";
import UpdatedProfile from "./pages/UpdatedProfile";


import { Home } from "./pages/home";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Help } from "./pages/help";
import { Post } from "./pages/post";
import {HelperPosts} from "./pages/helperposts";

//create your first component
function Layout() {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Help />} path="/help" />
            <Route element={<Post />} path="/post" />
            <Route element={<HelperPosts />} path="/helperpost" />
            <Route element={<UpdateProfile />} path="/update-profile" />
            <Route element={<UpdatedProfile/>} path ="/updated-profile"/>
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default injectContext(Layout);


