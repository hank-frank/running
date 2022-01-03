import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateUserData } from '../store/userSlice'

function Header() {
    const state = useSelector((state) => state);
    const { userData } = state.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleHeader = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <nav className={`navbar  ${isMenuOpen ? '' : 'active'}`} onClick={ toggleHeader }>
                <div className="nav-toggle "></div>
                <div className="nav-contents bg-yellow-200">
                    {userData
                        ?
                        <p>{userData.firstName}</p>
                        : ""
                    }
                    {userData
                        ?
                        <p>{userData.lastName}</p>
                        : ""
                    }
                </div>
            </nav>
        </>
    )
}

export default Header;


