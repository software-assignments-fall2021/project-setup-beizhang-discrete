import React from 'react'
import { NavLink } from 'react-router-dom';
import TableBlock from './TableBlock';
import './Tablelist.css';
import Button from 'react-bootstrap/Button';

// import Header from '../Header'

const Tablelist = () => {
    return (
        <div className='container'>
            
                
            <h1>Tables List</h1>

            <Button> Search for a Game </Button>

            

            <NavLink className='Button' to='/tablecreate'>
                <h2 class = 'text-center'>Create a Table</h2>
            </NavLink>

            <TableBlock></TableBlock>
            <TableBlock></TableBlock>
        </div>
    )
}

export default Tablelist
