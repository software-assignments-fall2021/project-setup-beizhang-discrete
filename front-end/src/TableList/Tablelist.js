import React from 'react'
import { NavLink } from 'react-router-dom';
import TableBlock from './TableBlock';
import './Tablelist.css';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
// import Header from '../Header'

const Tablelist = ( {tables}) => {
    return (
        <div className='container'>
            
                
            <h1>Tables List</h1>

            <Button> Search for a Game </Button>

            
            {/* <Button> */}
            <NavLink className = "bg-dark" to='/tablecreate'>
                <h2 class = 'text-center'>Create a Table</h2>
            </NavLink>
            {/* </Button> */}

            <Container className = "bg-gray border">
                {tables.map((table) => (
                    <TableBlock table = {table}> </TableBlock>
                ))}


            </Container>
            {/* <TableBlock tables = {tables}></TableBlock> */}
        </div>
    )
}

export default Tablelist
