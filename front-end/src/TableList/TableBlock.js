import React from 'react'
import { Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

// import Stack from 'react-bootstrap/Stack'

const TableBlock = ( {table} ) => {
    return (
        <Row>
            <Col className="bg-gray border" key={table.id}>
                {table.name} </Col>
            <Col className="bg-gray border" key={table.id}>
                {table.curPlayers}/{table.numPlayers} </Col>
            <Col className="bg-gray border" key={table.id}>
                {table.startingValue} </Col>
            <Col className="bg-gray border" key={table.id}>
                {table.status} </Col>
        </Row>
        // </Container>


    )
}

export default TableBlock
