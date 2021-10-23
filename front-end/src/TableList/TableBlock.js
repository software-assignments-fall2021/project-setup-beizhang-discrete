import React from 'react'
import { Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

// import Stack from 'react-bootstrap/Stack'

const TableBlock = ( {table} ) => {
    return (
        // <Stack direction = "horizontal" gap={3}  style={{"border": "1px solid"}}>
            
        //     <div className="bg-light border">props.name</div>
        //     <div className="bg-light border">props.curPlayers/props.numPlayers</div>
        //     <div className="bg-light border">props.gameType</div>
        //     <div className="bg-light border">props.status</div>

        // </Stack>

        <Container className = "bg-gray border">
            <Row>
                <Col className="bg-white border"> table.name </Col>
                <Col className="bg-white border"> table.curPlayers/table.totalPlayers </Col>
                <Col className="bg-white border"> table.gameType </Col>
                <Col className="bg-white border"> table.status </Col>
                
            </Row>
        </Container>


    )
}

export default TableBlock
