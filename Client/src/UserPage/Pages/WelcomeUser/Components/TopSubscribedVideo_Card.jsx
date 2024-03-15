// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ComponentCSS/TopSubscribedVideo_Card.css";

// const TopSubscribedVideo_Card = ({ title, description, thumbnail }) => {
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();

//   const handleViewDetails = async () => {
//     try {
//       if (isAuthenticated) {
//         const response = await fetch(
//           `http://localhost:3000/E-Grantha/user/recommendations/${title}`
//         );
//         const jsonData = await response.json();

//         // Navigate to "/E-Grantha/coursedetail" and pass the data as state
//         navigate("/E-Grantha/coursedetail", { state: { responseData: jsonData } });
//       } else {
//         navigate("/E-Grantha/register");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div id="card">
//       <div id="video_thumbnail" onClick={handleViewDetails}>
//         <img id="thumbnail_topsubscribed" src={thumbnail} alt="thumbnail" />
//       </div>
//       <h2 id="heading">{title}</h2>
//       <p id="description">{description && description.split(" ").slice(0, 10).join(" ")}</p>

//       <a id="view_details_link" onClick={handleViewDetails}>
//         View Details
//       </a>
//     </div>
//   );
// };

// export default TopSubscribedVideo_Card;


import React, { useState, useEffect , useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ComponentCSS/TopSubscribedVideo_Card.css";
import { AuthContext } from "../../../Auth/AuthContext";
import { getUserData } from "../../../Auth/UserDataManager";

const TopSubscribedVideo_Card = ({ title, description, thumbnail, video_id, subscribe }) => {
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

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

      {subscribe && (
        subscribed ? (
          <button onClick={handleUnsub} className="buy-now-button">
            Unsubscribe
          </button>
        ) : (
          <button onClick={handleAuth} className="buy-now-button">
            Subscribe
          </button>
        )
      )}

      <a id="view_details_link" onClick={handleViewDetails}>
        View Details
      </a>
    </div>
  );
};

export default TopSubscribedVideo_Card;
