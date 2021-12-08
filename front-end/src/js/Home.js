import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Home.css';

function Home(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    useEffect(() => {
        props.updateUserProfileButton(true);
    }, [props]);
    return (
        <div>
            {/*temp link for testing chat*/}
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
    );
}

export default Home;