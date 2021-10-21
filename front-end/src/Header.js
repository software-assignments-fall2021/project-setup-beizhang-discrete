import React from 'react'
import { NavLink } from 'react-router-dom';
import './Header.css'

function Header(props) {
    return (
        <table className="Header">
            <tr>
                <td>
                    <NavLink className='Logo noUnderline' to='/'>
                        [Logo]
                    </NavLink>
                </td>
                <td>
                    <NavLink className='Title noUnderline glowing' to='/'>
                        All In Poker
                    </NavLink>
                </td>
                <td>
                    {/* conditionally rendering user profile button */}
                    { props.showUserProfileButton === true &&
                        <NavLink className='UserProfileButton noUnderline' to='/user'>
                            User Profile
                        </NavLink>
                    }
                </td>
            </tr>
        </table>
    );
}



export default Header;