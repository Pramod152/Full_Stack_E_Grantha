import React,{useState} from "react";
import "./U_Dashboard.css";
import Navbar_udashboard from "../../../components/NavBar/NavBar_User_Dashboard/Navbar_udashboard";

const U_Dashboard = () => {
    const [activeTab, setActiveTab] = useState("firstlist");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Profile":
                return <div>Content for fisstlist</div>;
            case "Settings":
                return <div>Content for secondlist</div>;
            case "Log Out":
                return <div>Content for thirdlist</div>;
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar_udashboard onClick={handleTabClick} activeTab={activeTab} />
            {renderContent()}
        </>
    );
}

export default U_Dashboard;