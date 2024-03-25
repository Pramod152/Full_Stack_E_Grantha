import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthContext";
import { getUserData } from "../../../Auth/UserDataManager";
import axios from "axios";
import "./ComponentCSS/Detail_Video_Card.css";

const Detail_Video_Card = ({ title, description, _id, videoId }) => {
  console.log(description)
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(
            `http://localhost:3000/E-Grantha/user/checksubscribe/${_id}`,
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
  }, [isAuthenticated, _id]);
  const handleSubscribe = () => {
    if (isAuthenticated) {
      const userData = getUserData();
      if (userData) {
        axios
          .post(`http://localhost:3000/E-Grantha/user/subscribe/${_id}`, null, {
            withCredentials: true,
          })
          .then(() => {
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
    const confirmUnsub = window.confirm(
      "Please Log in before Unsubscribing. Do you want to proceed?"
    );
    if (confirmUnsub) {
      if (isAuthenticated) {
        const userData = getUserData();
        if (userData) {
          axios
            .post(
              `http://localhost:3000/E-Grantha/user/unsubscribe/${_id}`,
              null,
              {
                withCredentials: true,
              }
            )
            .then(() => {
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
    }
  };

  return (
    <>
      <div className="card">
        <iframe
          width="100%"
          height="450px"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <h2 id="heading">{title}</h2>
        <p id="description">
          {description}
        </p>

        {isAuthenticated && subscribed ? (
          <button onClick={handleUnsub} className="buy-now-button UnSub">
            Unsubscribe
          </button>
        ) : (
          <button onClick={handleSubscribe} className="buy-now-button UnSub">
            Subscribe
          </button>
        )}
      </div>
    </>
  );
};

export default Detail_Video_Card;
