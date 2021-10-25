import React, { useEffect, ReactDOM  } from 'react'
import './Tablelist.css'
import Container from 'react-bootstrap/Container'
import { Col, Form, Row } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'

// import TableBlock from './TableBlock'

const FriendListItem= (props) => {
    return(
        <div className='FriendItem'>
            <img className='FriendPhoto' src={'./profileicon.png'} alt={'Friend Photo'} />
            <p className='FriendName'>{props.name}</p>
            <p className='FriendStatus'>{props.status}</p>
            <Button>Invite</Button>
        </div>
    )
}

const Tablecreate = (props) => {

    useEffect(() => {
        props.updateUserProfileButton(true);
    }, [props]);

    function openOverlay() {
        ReactDOM.render(<InviteFriendOverlay/>, document.getElementById('root'))
    }
      
    function closeOverlay() {
        
    }

    const InviteFriendOverlay = (props) =>{
        return(
            <div className="InviteOverlay">
                <a href="javascript:void(0)" className="closebtn" onClick={closeOverlay}>&times;</a>
                <div className="FriendsToInvite">
                    <FriendListItem name={<Button>Owen</Button>} status='Playing'/>
                    <FriendListItem name={<Button>Thomas</Button>} status='Online'/>
                    <FriendListItem name={<Button>Eric</Button>} status='Away'/>
                    <FriendListItem name={<Button>Ben</Button>} status='Offline'/>
                    <FriendListItem name={<Button>Oscar</Button>} status='Offline'/>
                </div>
            </div>
        )
    }

    return (       
        <div id='root'>

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
            <a href='/game'>
                <Button>
                    Create Table
                </Button>
            </a>

            <button onClick={openOverlay}>
                Invite Friend
            </button>

        </Container>


        </div>
    )
}

export default Tablecreate
