
import React, { useState, useEffect , useContext} from "react";
import { useNavigate } from "react-router-dom";
import "./ComponentCSS/Video_Card.css";
import { AuthContext } from "../../../Auth/AuthContext";

const Video_Card = ({ title, description, thumbnail, _id }) => {
  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  
    const handleViewDetails = async () => {
        try {
          if (isAuthenticated) {
            const response = await fetch(
              `http://localhost:3000/E-Grantha/user/recommendations_data/${_id}`
            );
            const jsonData = await response.json();
            console.log(jsonData)
    
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
        <button id="view_detail"> View Details </button>
      </a>
    </div>
  );
};

export default Video_Card;
