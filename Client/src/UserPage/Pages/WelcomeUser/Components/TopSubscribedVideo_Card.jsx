
import React, { useState, useEffect , useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ComponentCSS/TopSubscribedVideo_Card.css";
import { AuthContext } from "../../../Auth/AuthContext";
import { getUserData } from "../../../Auth/UserDataManager";

const TopSubscribedVideo_Card = ({ title, description, thumbnail,_id }) => {
  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  
    const handleViewDetails = async () => {
        try {
          if (isAuthenticated) {
            const response = await fetch(
              `http://localhost:3000/E-Grantha/user/recommendations/${title}`
            );
            const jsonData = await response.json();
    
            // Navigate to "/E-Grantha/coursedetail" and pass the data as state
            navigate("/E-Grantha/coursedetail", { state: { responseData: jsonData } });
          } else {
            navigate("/E-Grantha/register");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

  return (
    <div id="card">
      <div id="video_thumbnail" onClick={handleViewDetails}>
           <img id="thumbnail_topsubscribed" src={thumbnail} alt="thumbnail" />
      </div>
      <h2 id="heading">{title}</h2>
      <p id="description">{description && description.split(" ").slice(0, 10).join(" ")}</p>

      
      <a id="view_details_link" onClick={handleViewDetails}>
        View Details
      </a>
    </div>
  );
};

export default TopSubscribedVideo_Card;
