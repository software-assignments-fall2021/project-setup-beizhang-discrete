import React from 'react'
import './Tablelist.css'
import Container from 'react-bootstrap/Container'
import { Col, Form, Row } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'

// import TableBlock from './TableBlock'



const Tablecreate = () => {
    return (

        <Container className="bg-white border" fluid="md">

            <h1> Create Table</h1>
            <h4> # of Players</h4>

            <Row>
                <Col className="bg-gray border">
                    <Button className="bg-white no border">2</Button>
                </Col>
                <Col className="bg-gray border">
                    <Button className="bg-white no border">3</Button>
                </Col>
                <Col className="bg-gray border">
                    <Button className="bg-white no border">4</Button>
                </Col>
                <Col className="bg-gray border">
                    <Button className="bg-white no border">5</Button>
                </Col>
                <Col className="bg-gray border">
                    <Button className="bg-white no border">6</Button>
                </Col>
                <Col className="bg-gray border">
                    <Button className="bg-white no border">7</Button>
                </Col>
            </Row>

            <h4>Table Name</h4>

            <Form className="mb-3">
                <Row>
                    <Form.Control placeholder="Enter Table Name"> 
                    
                    
                    </Form.Control>
                    
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Starting Value</Form.Label>
                        <Form.Control placeholder="Starting Value" />
                    </Col>
                    <Col>
                        <Form.Label>Small Blind</Form.Label>
                        <Form.Control placeholder="Small Blind" />
                    </Col>
                    <Col>
                        <Form.Label>Big Blind</Form.Label>
                        <Form.Control placeholder="Big Blind" />
                    </Col>
                </Row>
            </Form>

            <Button>
                Create Table
            </Button>


        </Container>
    )
}

export default Tablecreate
