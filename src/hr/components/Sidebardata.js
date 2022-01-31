import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";


export const SidebarData = [{
        title: 'Home',
        path: '/candidate',
        icon: < AiIcons.AiFillHome / > ,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/candidate/profile',
        icon: < FaIcons.FaUserAlt / > ,
        cName: 'nav-text'
    },
    {
        title: 'Status',
        path: '/candidate/status',
        icon: < FaIcons.FaUserCheck / > ,
        cName: 'nav-text'
    },
    {
        title: 'About',
        path: '/candidate/about',
        icon: < FaIcons.FaUsers / > ,
        cName: 'nav-text'
    },
]