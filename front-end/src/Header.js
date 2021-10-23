import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header(props) {
    return (
        <table className="Header">
            <tr>
                <td className='LogoHolder'>
                    <NavLink to='/'>
                        <img className='Logo' src={'../logo.png'} alt={'logo'} />
                    </NavLink>
                </td>
                <td>
                    <NavLink className='Title noUnderline glowing' to='/'>
                        All In Poker
                    </NavLink>
                </td>
                <td className='UserProfileButtonHolder'>
                    {/* conditionally rendering user profile button */}
                    { props.showUserProfileButton === true &&
                        <NavLink className='UserProfileButton noUnderline' to='/user'>
                            {props.isLoggedIn
                                ? <span className='button'>Profile</span>
                                : <span className='button'>Sign In</span>
                            }
                        </NavLink>
                    }
                </td>
            </tr>
        </table>
    );
}

export default Header;
