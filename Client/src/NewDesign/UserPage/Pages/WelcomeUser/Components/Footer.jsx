import { Link } from "react-router-dom";
import "./ComponentCSS/Footer.css";
import { FaFacebook, FaInstagram , FaYoutube, FaTwitter, FaTiktok} from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div>
                        <img src="/Logo_.png" alt="Logo" />
                    </div>
                    <div>
                        <h3>About</h3>
                        <ul>
                            <li>
                                <Link to="/E-Grantha/course">Courses</Link>
                            </li>
                            <li>
                                <Link to="/E-Grantha/contact">Contact</Link>
                            </li>
                            <li>
                                <Link to="/E-Grantha/about">About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Follow us</h3>
                        <ul>
                            <li>
                                <Link to="#">Facebook</Link>
                            </li>
                            <li>
                                <Link to="#">Youtube</Link>
                            </li>
                            <li>
                                <Link to="#">Instagram</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Legal</h3>
                        <ul>
                            <li>
                                <Link to="#">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="#">Terms &amp; Conditions</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="copyright_container">
                        <p>&copy; E-Grantha™ 2024</p>
                        <div className="social-icons">
                            <Link to="#"> <FaFacebook /> </Link>
                            <Link to="#"> <FaInstagram /></Link>
                            <Link to="#"><FaYoutube /></Link>
                            <Link to="#"><FaTwitter /></Link>
                            <Link to="#"><FaTiktok /></Link>
                        </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
