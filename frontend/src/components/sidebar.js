import React from "react";
import "./sidebar.css";
import { FaCoins } from "react-icons/fa";
import { GiBassetHoundHead } from "react-icons/gi";
import { IoMdAnalytics } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Outlet, Link } from "react-router-dom";




export default function Sidebar() {
    const [active, setActive] = React.useState(0);
    const navItems = [
        {
            name: "Invest",
            icon: <FaCoins />,
            link: "/",
            background: "rgba(69,255,255,0.5)"
        },
        {
            name: "Portfolio",
            icon: <IoMdAnalytics />,
            link: "/portfolio",
            background: "rgba(255,69,255,0.5)"
        },
        {
            name: "Profile",
            icon: <CgProfile />,
            link: "/profile",
            background: "rgba(255,255,69,0.5)"
        },
        {
            name: "Settings",
            icon: <CgProfile />,
            link: "/settings",
            background: "rgba(255,179,25,0.5)"
        } 
    ];

    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">
                <GiBassetHoundHead  size={50} color="orange"/>
                <h3>Asset Distibutor</h3>
            </div>
            <div className="sidebar-nav">
                {navItems.map((item, index) => (
                    <Link to={item.link} style={{textDecoration: "none"}}>
                    <div key={index} onClick={()=>{
                        setActive(index);
                    }} className={`sidebar-nav-item ${index == active && "sidebar-nav-item-active"} `} style={{backgroundColor: item.background}}>
                        <div className="sidebar-nav-item-icon">
                            {item.icon}
                        </div>
                        <h5>{item.name}</h5>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}