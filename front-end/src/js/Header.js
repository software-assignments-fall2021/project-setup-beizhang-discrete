import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';

function Header(props) {
    return (
        <table className="Header">
            <tbody>
                <tr>
                    <td className='LogoHolder'>
                        <NavLink to='/'>
                            <img className='Logo' src={'./logo.png'} alt={'logo'} />
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
                            <div>
                                {props.isLoggedIn
                                    ? <NavLink className='UserProfileButton noUnderline' to='/user'>
                                        <span className='button'>Profile</span>
                                    </NavLink>
                                    : <NavLink className='UserProfileButton noUnderline' to='/login'>
                                        <span className='button'>Sign In</span>
                                    </NavLink>
                                }
                            </div>
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Header;
