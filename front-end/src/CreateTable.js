import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './CreateTable.css';

function CreateTable(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    return (
        <div>
            Create table content
        </div>
    )
}

export default CreateTable;