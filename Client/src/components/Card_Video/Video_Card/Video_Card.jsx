import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faStar, faClock} from '@fortawesome/free-solid-svg-icons'

const Video_Card = ({description}) => {
  return (
    <>
      <div className="card">
        <div className="video-thumbnail">
          <img src="/Video1.png" alt="Video Thumbnail" />
          <div className="rating-stars">
            <span>
              {" "}
              <FontAwesomeIcon icon={faStar} />{" "}
            </span>
            <span>
              {" "}
              <FontAwesomeIcon icon={faStar} />{" "}
            </span>
            <span>
              {" "}
              <FontAwesomeIcon icon={faStar} />{" "}
            </span>
            <span>
              {" "}
              <FontAwesomeIcon icon={faStar} />{" "}
            </span>
            <span>
              {" "}
              <FontAwesomeIcon icon={faStar} />{" "}
            </span>
          </div>
        </div>

        <h2 className="heading">Tabala For Begginer</h2>
        <p className="description">
          {description.split(" ").slice(0, 10).join(" ")}
          {description.split(" ").length > 10 ? (
            <a href="" style={{ color: "black", textDecoration: "none" }}>
              ...... See More{" "}
            </a>
          ) : (
            ""
          )}
        </p>
        <div className="stats">
          <div className="user-info">
            <FontAwesomeIcon icon={faUser} />
            <span className="user-count">100</span>
          </div>
          <div className="duration-info">
            <FontAwesomeIcon icon={faClock} />
            <span className="duration">2h 30m</span>
          </div>
        </div>
        <button className="buy-now-button">Buy Now</button>
        <a href="#" className="view-details-link">
          View Details
        </a>
      </div>
    </>
  );
};

export default Video_Card;
