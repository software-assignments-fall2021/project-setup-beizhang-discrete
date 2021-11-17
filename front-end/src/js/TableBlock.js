import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Row } from 'react-bootstrap'
//import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'

const axios = require('axios');


// import Stack from 'react-bootstrap/Stack'

const TableBlock = (props) => {

    const [status, setStatus] = useState({});
    
    const deleteTable = async e => {
        console.log("Delete Table", props.table._id)

        try {
            axios.delete("tableDelete/" + props.table._id)

            // const response = await axios({
            //     method: "delete",
            //     url: "/tableDelete/" + props.table._id,
                
            //     // headers: { "Content-Type": "multipart/form-data" },
            // });
            // // store the response data into the data state variable
            // console.log(response.data);
            // setStatus(response.data);
        } catch (err) {
            throw new Error(err);
        }
    }

    return (
        <Row>
            <Col className="bg-gray border">
                <a href='/game'>{props.table.tableName}</a> </Col>
            <Col className="bg-gray border">
                {props.table.curPlayers}/{props.table.numPlayers} </Col>
            <Col className="bg-gray border">
                {props.table.startingValue} </Col>
            <Col className="bg-gray border">
                {props.table.status} </Col>
            <Col className="bg-gray border">
                <Button onClick={deleteTable}>delete</Button>
            </Col>
        </Row>
        // </Container>
    )
}

export default TableBlock
