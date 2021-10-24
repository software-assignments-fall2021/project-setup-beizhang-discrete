import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import TableBlock from './TableBlock';
import './Tablelist.css';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
// import Header from '../Header'

const Tablelist = (props) => {
    useEffect(() => {
        props.updateUserProfileButton(true);
    }, [props]);
    return (
        <div className='container'>
                
            <h1>Tables List</h1>

            <Button> Search for a Game </Button>
            
            {/* <Button> */}
            <NavLink className = "bg-dark" to='/tablecreate'>
                <h2 className = 'text-center'>Create a Table</h2>
            </NavLink>
            {/* </Button> */}

            <Container className = "bg-gray border">
                {props.tables.map((table) => (
                    <TableBlock key={table.id} table={table}> </TableBlock>
                ))}

            </Container>
            {/* <TableBlock tables = {tables}></TableBlock> */}
        </div>
    )
}

export default Tablelist
