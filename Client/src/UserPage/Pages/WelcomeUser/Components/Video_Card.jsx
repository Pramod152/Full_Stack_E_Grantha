import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthContext";
import { getUserData } from "../../../Auth/UserDataManager";
import axios from "axios"; // Import Axios for making HTTP requests
import "./ComponentCSS/Video_Card.css";

const Video_Card = ({ title, description,videoId, video_id, thumbnail }, index) => {

  console.log(title, description, videoId, video_id, thumbnail, index)
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(
            `http://localhost:3000/E-Grantha/user/checksubscribe/${video_id}`,
            {
              withCredentials: true,
            }
          );
          setSubscribed(response.data.subscribed);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    checkSubscription();
  }, [isAuthenticated, video_id]);

  const handleAuth = () => {
    if (isAuthenticated) {
      const userData = getUserData();

      if (userData) {
        axios
          .post(
            `http://localhost:3000/E-Grantha/user/subscribe/${video_id}`,
            null,
            {
              withCredentials: true,
            }
          )
          .then(() => {
            alert("Subscribed to the video successfully.");
            // console.log("User subscribed to the video successfully.");
            setSubscribed(true);
          })
          .catch((error) => {
            console.error("Error subscribing to the video:", error);
          });
      } else {
        console.error("User data not found.");
      }
    } else {
      const confirmUnsub = window.confirm(
        "Please Log in before Unsubscribing. Do you want to proceed?"
      );
      if (confirmUnsub) {
        navigate("/E-Grantha/register");
      }
    }
  };

  const handleUnsub = () => {
    if (isAuthenticated) {
      const userData = getUserData();
      if (userData) {
        axios
          .post(
            `http://localhost:3000/E-Grantha/user/unsubscribe/${video_id}`,
            null,
            {
              withCredentials: true,
            }
          )
          .then(() => {
            // console.log("User unsubscribed to the video successfully.");
            setSubscribed(false);
          })
          .catch((error) => {
            console.error("Error unsubscribing to the video:", error);
          });
      } else {
        console.error("User data not found.");
      }
    } else {
      const confirmUnsub = window.confirm(
        "Please Log in before Unsubscribing. Do you want to proceed?"
      );
      if (confirmUnsub) {
        navigate("/E-Grantha/register");
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

  return (
    <div className="card">
      {index === 0 ? (
        {/* <div className="video-thumbnail" onClick={handleViewDetail}>
        <iframe
  title={title}
  width="100%"
  height="100%"
  src={`https://www.youtube.com/embed/${videoId}`}
  frameBorder="0"
  allowFullScreen
></iframe>
        </div> */}
      ) : (
        <div id="card">
          <div id="video_thumbnail" onClick={handleViewDetail}>
            <img id="thumbnail_topsubscribed" src={thumbnail} alt="thumbnail" />
          </div>
          <h2 id="heading">{title}</h2>
          <p id="description">
            {description && description.split(" ").slice(0, 10).join(" ")}
          </p>

          <a id="view_details_link" onClick={handleViewDetail}>
            View Details
          </a>
        </div>
      )}
      {isAuthenticated && subscribed ? (
        <button onClick={handleUnsub} className="buy-now-button">
          Unsubscribe
        </button>
      ) : (
        <button onClick={handleAuth} className="buy-now-button">
          Subscribe
        </button>
      )}
    </div>
  );
};

export default Video_Card;
