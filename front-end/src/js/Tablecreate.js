import React, { useEffect, useState } from 'react'
import '../css/Tablelist.css'
import Container from 'react-bootstrap/Container'
import { Col, Form, Row, Modal } from 'react-bootstrap'
//import Button from '@restart/ui/esm/Button'
import Button from 'react-bootstrap/Button'
import useHistory from 'react-router'
const axios = require('axios');


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
    //const history = useHistory();



    useEffect(() => {
        props.updateUserProfileButton(true);
    }, [props]);

    const friendList = props.friendList;

    const [showModal, setModal] = useState(false)
    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    const [status, setStatus] = useState({});


    const handleCreateTable = async e => {
        e.preventDefault()
    
        // get the table info from the form fields
        
        const numPlayers = e.target.numPlayers.value;
        const tableName = e.target.tableName.value;
        const startingValue = e.target.startingValue.value;
        const smallBlind = e.target.smallBlind.value;
        const bigBlind = e.target.bigBlind.value;

        const formInput = {
            numPlayers: e.target.numPlayers.value,
            tableName: e.target.tableName.value,
            startingValue: e.target.startingValue.value,
            smallBlind: e.target.smallBlind.value,
            bigBlind: e.target.bigBlind.value,
        }

        console.log("players", numPlayers)
        console.log("name", tableName)
        console.log("value", startingValue)
        console.log("small blind", smallBlind)
        console.log("big blind", bigBlind)

        if (formInput.numPlayers == 0) {
            console.log("players empty")
        }
        else if (tableName === "") {
            console.log("name empty")
        }
        else if (!startingValue) {
            console.log("value empty")
        }
        else if (!smallBlind) {
            console.log("small empty")
        }
        else if (!bigBlind) {
            console.log("big empty")
        }
        else {
            // this.props.history.push('/Game')
            console.log("Info filled")


            //send form data to API to authenticate
            // const formData = new FormData()
            // formData.append("numPlayers", numPlayers)
            // formData.append("tableName", tableName)
            // formData.append("startingValue", startingValue)
            // formData.append("smallBlind", smallBlind)
            // formData.append("bigBlind", bigBlind)
            
            try {
              // send the request to the server api to authenticate
              const response = await axios({
                method: "post",
                url: "/createTable",
                data: formInput,
                headers: { "Content-Type": "multipart/form-data" },
              });
              // store the response data into the data state variable
              console.log(response.data);
              setStatus(response.data);
            } catch (err) {
                throw new Error(err);
            }

            this.context.history.push('/Game')

            //history.push("/Game")

            // history.push({
            //     pathname: "/Game",
            //     state: formInput
            // });

            // this.props.history.push({
            //     pathname: '/Game',
            //     state: formData
            // })
            
        }    
      }
    return (       
        <div>
        <Container className="bg-white border" fluid="md">
            
            <h1 className="text-center"> Create Table</h1>
            <h4 className="text-center"> # of Players</h4>

            <Form onSubmit={handleCreateTable}>
                <Row className="align-items-center">
                    <Col>
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
                    </Col>
                </Row>
                <Row>
                    <h4 className="text-center">Table Name</h4>
                </Row>
                <Row>
                    <Col>
                    <Form.Control type="text" 
                    placeholder="Enter Table Name"
                    name="tableName">      
                    </Form.Control>
                    </Col>
                    
                </Row>
                <Row className="align-items-center">
                    <Col>
                        <Form.Label>Starting Value</Form.Label>
                        <Form.Control placeholder="Starting Value" 
                        type="number"
                        name = "startingValue" />
                    </Col>
                    <Col>
                        <Form.Label>Small Blind</Form.Label>
                        <Form.Control placeholder="Small Blind" 
                        type="number"
                        name="smallBlind"/>
                    </Col>
                    <Col>
                        <Form.Label>Big Blind</Form.Label>
                        <Form.Control placeholder="Big Blind" 
                        type="number"
                        name="bigBlind"/>
                    </Col>

                    
                </Row>
                
                <Row className = "align-items-center">
                    <Col className = "align-items-center">
                    <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Private"
                    />
                    </Col>
                </Row>
                
                <Row>
                        <a href='/game' className = "text-center">
                            <Button variant="primary" type="submit">
                                Create Table
                            </Button>
                        </a>
                        {/* <Button className = "text-center" 
                        variant="primary" type="submit">
                            Create Table
                        </Button> */}
                </Row>
                    
                   
            </Form>
                <Button onClick={() => openModal()}>
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
