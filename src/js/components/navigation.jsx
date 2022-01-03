import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../store/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import { render } from 'react-dom';
import ReactTooltip from "react-tooltip";
import { AiOutlineHome, AiOutlineSearch, AiOutlineLogin, AiOutlineUserAdd, AiOutlineLogout, AiTwotoneUpCircle} from 'react-icons/ai';

function Navigation (props) {
    const dispatch = useDispatch();
    const { toggleTheme } = props;

    return (
        <div className="nav-container">
            {/* <div className="icon-container"> */}
            <Link to="/dashboard" className="icon-container" data-tip={ `Home` }>
                <AiOutlineHome className="nav-icon"/>
            </Link>
            <Link to="/login" className="icon-container"  data-tip={ `Login` }>
                <AiOutlineLogin className="nav-icon"/>
            </Link>
            <div className="icon-container" onClick={ () => dispatch(logout()) } data-tip={ `Logout` }>
                <AiOutlineLogout className="nav-icon"/>
            </div>
            <Link to="/register" className="icon-container" data-tip={ `Register` }>
                <AiOutlineUserAdd className="nav-icon"/>
            </Link>

            <div className="icon-container theme" onClick={ toggleTheme }>
                <AiTwotoneUpCircle className="nav-icon"/>
            </div>
        </div>    
    )
};

export default Navigation;
