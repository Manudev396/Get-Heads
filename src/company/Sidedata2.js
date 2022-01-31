import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";


export const SidebarData = [{
        title: 'Home',
        path: '/company',
        icon: < AiIcons.AiFillHome / > ,
        cName: 'nav-text'
    },
    {
        title: 'Application',
        path: '/company/application',
        icon: < FaIcons.FaFileAlt / > ,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/company/profile',
        icon: < FaIcons.FaUserCheck / > ,
        cName: 'nav-text'
    },
    {
        title: 'About',
        path: '/company/about',
        icon: < FaIcons.FaUsers / > ,
        cName: 'nav-text'
    },
]