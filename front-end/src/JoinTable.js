import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './JoinTable.css';

function JoinTable(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    return (
        <div>
            Join table content
        </div>
    )
}

export default JoinTable;