import React, { useContext } from "react";
import userContext from "../context/UserContext/userContext.js";
import Notes from "../components/Notes.jsx";
import Hr from "../components/Hr.jsx";
import TitelHome from "../components/TitelHome.jsx";
import Feature_list from "../components/Feature_list.jsx";
import Auth from "../components/Auth.jsx";

const Home = () => {
  const { auth } = useContext(userContext);

  return (
    <div className="min-h-[80vh]">
      {auth ? (
        <>
          <Feature_list />
          <Hr />
          <TitelHome />
          <Notes />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default Home;