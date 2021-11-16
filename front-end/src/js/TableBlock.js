import React from 'react'
import { Row } from 'react-bootstrap'
//import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

// import Stack from 'react-bootstrap/Stack'

const TableBlock = (props) => {
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
        </Row>
        // </Container>
    )
}

export default TableBlock
