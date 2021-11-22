import React, { useEffect, useState } from 'react'
import '../css/Tablelist.css'
import Container from 'react-bootstrap/Container'
import { Col, Form, Row, Modal } from 'react-bootstrap'
//import Button from '@restart/ui/esm/Button'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
const axios = require('axios');


// import TableBlock from './TableBlock'




const FriendListItem = (props) => {
    return (
        <div className='FriendItem'>
            <img className='FriendPhoto' src={`data:image/png;base64,${Buffer.from(props.avatar.data).toString('base64')}`} alt={'Friend'} />
            <p className='FriendName'>{props.name}</p>
            <p className='FriendStatus'>{props.status}</p>
            <div className='Invitablility'>
                {props.status === 'Online'
                    ? <Button>Invite</Button>
                    : <p>Unavailable</p>}
            </div>
        </div>
    )
}

const Tablecreate = (props) => {
    //const history = useHistory();
    let history = useHistory();



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
        const status = e.target.status.value;

        // const formInput = {
        //     numPlayers: e.target.numPlayers.value,
        //     tableName: e.target.tableName.value,
        //     startingValue: e.target.startingValue.value,
        //     smallBlind: e.target.smallBlind.value,
        //     bigBlind: e.target.bigBlind.value,
        // }

        console.log("players", numPlayers)
        console.log("name", tableName)
        console.log("value", startingValue)
        console.log("small blind", smallBlind)
        console.log("big blind", bigBlind)
        console.log("status", status)

        // if (numPlayers === 0) {
        //     console.log("players empty")
        // }
        // else if (tableName === "") {
        //     console.log("name empty")
        // }
        // else if (!startingValue) {
        //     console.log("value empty")
        // }
        // else if (!smallBlind) {
        //     console.log("small empty")
        // }
        // else if (!bigBlind) {
        //     console.log("big empty")
        // }
        // else {
            console.log("Info filled")

            //send form data to API to authenticate
            // const formData = new FormData()
            // formData.append("numPlayers", numPlayers)
            // formData.append("tableName", tableName)
            // formData.append("startingValue", startingValue)
            // formData.append("smallBlind", smallBlind)
            // formData.append("bigBlind", bigBlind)
            // formData.append("status", status)

            try {
                // send the request to the server api to authenticate
                const response = await axios({
                    method: "post",
                    url: "/createTable",
                    data: {
                        numPlayers: numPlayers,
                        tableName: tableName,
                        startingValue: startingValue,
                        smallBlind: smallBlind,
                        bigBlind: bigBlind,
                        status: status,
                    },
                    // headers: { "Content-Type": "multipart/form-data" },
                });
                //manage invalid form data
                if(response.data.auth === false){
                    let errString =""
                    for (let i = 0; i < response.data.errors.length; i++){
                        let field = response.data.errors[i].param
                        switch(field){
                            case "numPlayers":
                                errString += "Select a # of players.\n"
                                break;
                            case "tableName":
                                errString += "Invalid Table Name.\n"
                                break;
                            case "startingValue":
                                errString += "Starting Value must be a positive integer.\n"
                                break;
                            case "smallBlind":
                                errString += "Small Blind must be a positive integer.\n"
                                break;
                            case "bigBlind":
                                errString += "Big Blind must be a positive integer.\n"
                                break;
                            case "status:":
                                errString += "Table Status invalid.\n"
                                break;
                        }
                    }
                    alert(errString)
                }
                // store the response data into the data state variable
                history.push('/game/'+response.data.Table._id)
                setStatus(response.data);
                
            } catch (err) {
                console.log(err)
                //alert(response.data)
                //throw new Error(err);
            }


            // this.context.history.push('/Game')

            //history.push("/Game")

            // history.push({
            //     pathname: "/Game",
            //     state: formInput
            // });

            // this.props.history.push({
            //     pathname: '/Game',
            //     state: formData
            // })
            //formData.push("/Game")
            // return (
            //     <Route exact path="/">
            //         <Redirect to="/Game"/>
            //     </Route>

            // )

    }
    return (
        <div>
            <Container fluid="md">

                <h1 className="text-center top-margin">Create Table</h1>

                <form onSubmit={handleCreateTable}>
                    <Row className="align-items-center">
                        <Col>
                            <div className='centered-container'>
                                <h4 className="text-center top-margin inline-block">Number of Players</h4>
                                &nbsp;&nbsp;
                                <select required className="me-sm-2 inline-block"
                                    id="inlineFormCustomSelect"
                                    name="numPlayers">
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option selected value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option selected value="7">7</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-center top-margin">Table Name</h4>
                    </Row>
                    <Row>
                        <Col>
                            <div className='centered-container'>
                                <input required type="text"
                                    placeholder="Enter Table Name..."
                                    name="tableName">
                                </input>
                            </div>
                        </Col>

                    </Row>
                    <Row className="align-items-center">
                        <Col>
                            <label className="top-margin">Starting Value</label><br/>
                            <input required className="small-input" placeholder="Enter a #..."
                                type="number"
                                name="startingValue" />
                        </Col>
                        <Col>
                            <label className="top-margin">Small Blind</label><br/>
                            <input required className="small-input" placeholder="Enter a #..."
                                type="number"
                                name="smallBlind" />
                        </Col>
                        <Col>
                            <label className="top-margin">Big Blind</label><br/>
                            <input required className="small-input" placeholder="Enter a #..."
                                type="number"
                                name="bigBlind" />
                        </Col>


                    </Row>
                    <Row className="align-items-center">
                        {/* <Col className = "align-items-center">
                    <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Private"
                    name="status"
                    value="private"
                    />
                    </Col> */}
                        <label className="top-margin">Table Status</label>
                        <Col>
                            <div className='centered-container'>
                                <select required className="me-sm-2"
                                    id="inlineFormCustomSelect"
                                    name="status">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <p>

                        </p>
                    </Row>

                    <Row>
                        <div className="bottom-buttons centered-container">
                            <div className="button-block button" onClick={() => openModal()}>
                                Invite Friend
                            </div>
                            <input className="button-block button" variant="primary" type="submit" value="Create Table"/>
                        </div>
                        {/* <Button className = "text-center" 
                        variant="primary" type="submit">
                            Create Table
                        </Button> */}
                    </Row>


                </form>

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
                        <FriendListItem key={friendInfo._id} name={<Button>{friendInfo.username}</Button>} avatar={friendInfo.avatar} status={friendInfo.status}/>
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
