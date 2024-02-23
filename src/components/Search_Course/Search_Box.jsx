import "./Search_Box.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SearchBox = ({ size, iconName }) => {
    const getSizeClassName = () => {
        switch (size) {
            case "small":
                return "search-box-small";
            case "medium":
                return "search-box-medium";
            case "large":
                return "search-box-large";
            default:
                return "";
        }
    };

    return (
        <>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search Courses"
                    id={`${getSizeClassName()}`}
                />
                
                <span className="icon">
                    <FontAwesomeIcon icon={iconName} />
                </span>
            </div>
        </>
    );
};

SearchBox.propTypes = {
    size: PropTypes.string,
    iconName: PropTypes.object.isRequired,
};


export default SearchBox;
