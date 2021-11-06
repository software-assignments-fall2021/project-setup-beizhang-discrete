import React, { useEffect, useState } from 'react'
import '../css/Tablelist.css'
import Container from 'react-bootstrap/Container'
import { Col, Form, Row, Modal } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'

// import TableBlock from './TableBlock'

const FriendListItem= (props) => {
    return(
        <div className='FriendItem'>
            <img className='FriendPhoto' src={'./profileicon.png'} alt={'Friend'} />
            <p className='FriendName'>{props.name}</p>
            <p className='FriendStatus'>{props.status}</p>
            <div className='Invitablility'>
                {props.status==='Online'
                ? <Button>Invite</Button>
                : <p>Unavailable</p>}
            </div>
        </div>
    )
}

const Tablecreate = (props) => {
    useEffect(() => {
        props.updateUserProfileButton(true);
    }, [props]);

    const friendList = props.friendList;

    const [showModal, setModal] = useState(false)
    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    return (       
        <div>

        <Container className="bg-white border" fluid="md">
            <h1> Create Table</h1>
            <h4> # of Players</h4>

            <h1 className="text-center"> Create Table</h1>
            <h4 className="text-center"> # of Players</h4>
            
            <Form onSubmit={handleCreateTable}>
                <Row className="align-items-center">
                        <Form.Select className="me-sm-2" 
                        id="inlineFormCustomSelect"
                        name="numPlayers">
                            <option value="0">Choose # of Players</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </Form.Select>
                </Row>
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
            <a href='/game'>
                <Button>
                    Create Table
                </Button>
            </a>

            <Button onClick={()=>openModal()}>
                Invite Friend
            </Button>

        </Container>

        <Modal show={showModal} onHide={() => closeModal()} >
                <Modal.Header>
                <Modal.Title>
                <p>
                Invite Friends to Your Table
                </p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Body>
                {friendList.map(friendInfo => (
                    <FriendListItem key={friendInfo.id} name={<Button>{friendInfo.name}</Button>} avatar={friendInfo.avatar} status={friendInfo.status}/>
                ))}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>
                Close
                </Button>
                </Modal.Footer>
        </Modal>

        </div>
    )
}

export default Tablecreate
