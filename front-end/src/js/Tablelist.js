import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import TableBlock from './TableBlock';
import '../css/Tablelist.css';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
// import Header from '../Header'

class Tablelist extends Component {
    // useEffect(() => {
    //     props.updateUserProfileButton(true);
    // }, [props]);

    


    /*fetch table list */


    constructor() {
        super();
        this.state = {tables: []};
    }

    componentDidMount() {
        fetch('/tableList')
        .then(res=> {
            console.log(res);
            return res.json()
        })
        .then(tables => {
            console.log(tables);
            this.setState({ tables })
        })
    }

    
    // const mockTableListAPI = "tableList.json";
    // const [tableList, modifyTableList] = useState([]);
    // useEffect(() => {
    //   fetchData(mockTableListAPI, modifyTableList);
    // }, []);
    render() {
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
                {this.state.tables.map((table) => (
                    <TableBlock key={table.id} table={table}> </TableBlock>
                ))}

            </Container>
            {/* <TableBlock tables = {tables}></TableBlock> */}
        </div>
    )
    }
    
}

export default Tablelist;
