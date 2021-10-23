import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

function Home(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    return (
        <div className="Home">
            <NavLink to='/join'>
                <div className="cardButton">
                    Join Table
                </div>
            </NavLink>
            <NavLink to='/create'>
                <div className="cardButton">
                    Create Table
                </div>
            </NavLink>
        </div>
    )
}

export default Home;