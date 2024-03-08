import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../NewDesign/UserPage/Auth/AuthContext";
import { getUserData } from "../../../NewDesign/UserPage/Auth/UserDataManager";
import axios from "axios"; // Import Axios for making HTTP requests
import "./Video_Card.css";

const Video_Card = ({ title, description,videoId, video_id }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isAuthenticated) {
      const userData = getUserData();
      console.log(video_id)
      console.log(userData)

      if (userData) {
        axios.post(`http://localhost:3000/E-Grantha/user/subscribe/${video_id}`, null, {
          withCredentials: true,
          
        })
        .then(() => {
          console.log("User subscribed to the video successfully.");
        })
        .catch(error => {
          console.error("Error subscribing to the video:", error);
        });
      } else {
        console.error("User data not found.");
      }
    }
  };

  const handleViewDetail = () => {
    if (isAuthenticated) {
      navigate("/E-Grantha/coursedetail");
    } else {
      navigate("/E-Grantha/register");
    }
  };

  const getVideoIdFromLink = (link) => {
    const urlParams = new URLSearchParams(new URL(link).search);
    return urlParams.get("v");
  };

  // const videoId = getVideoIdFromLink(videoLink);

  return (
    <div className="card">
      <div className="video-thumbnail" onClick={handleViewDetail}>
        <iframe
          title={title}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <div className="rating-stars">
          {/* <span><FontAwesomeIcon icon={faStar} /></span>
                    <span><FontAwesomeIcon icon={faStar} /></span>
                    <span><FontAwesomeIcon icon={faStar} /></span>
                    <span><FontAwesomeIcon icon={faStar} /></span>
                    <span><FontAwesomeIcon icon={faStar} /></span> */}
        </div>
      </div>
      <h2 className="heading">{title}</h2>
      <p id="description">
        {description.split(" ").slice(0, 10).join(" ")}
        {description.split(" ").length > 10 ? (
          <a href="#" style={{ color: "black", textDecoration: "none" }}>
            ...{" "}
          </a>
        ) : (
          ""
        )}
      </p>
      <div className="stats"></div>
      <button onClick={handleAuth} className="buy-now-button">
        Subscribe Now
      </button>
      <a onClick={handleViewDetail} className="view-details-link">
        View Details
      </a>
    </div>
  );
};

export default Video_Card;
