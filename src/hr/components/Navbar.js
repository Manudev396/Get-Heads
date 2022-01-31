import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";

import * as FcIcons from "react-icons/fc";
import {Link} from 'react-router-dom';
import {SidebarData} from './Sidebardata';
import './Navbar.css';
import {IconContext} from 'react-icons';

function Navbar(props) {
    const [Sidebar,setSidebar]= useState(false);
    const showSidebar=() =>setSidebar(!Sidebar);

    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
          <div className="navbar">
              <Link path="#" className="menu-bars">
                  <FaIcons.FaBars onClick={showSidebar}/>
              </Link>
              <h2 className="logo">Get Heads</h2>
        </div>  
        <nav className={Sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                        <FcIcons.FcPrevious/>
                    </Link>
                </li>
                {SidebarData.map((item,index)=>{
                    console.log(`[navbar]${props.data}`);
                    return(
                        <li key={index} className={item.cName}>
                            <Link to={item.path.toString()}>
                                {item.icon}
                                <span className="span">
                                    {item.title}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
        </IconContext.Provider>
        </>
    )
}

export default Navbar
