import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

function Home(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    return (
        <div>
            <div className='cardButtonWrapper'>
                <NavLink className="cardButton spades" to='/tablelist'>
                    Join Table
                </NavLink>
            </div>
            <div className='cardButtonWrapper'>
                <NavLink className="cardButton hearts" to='/tablecreate'>
                    Create Table
                </NavLink>
            </div>
        </div>
    )
}

export default Home;