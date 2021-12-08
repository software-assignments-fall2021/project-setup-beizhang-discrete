import Button from '@restart/ui/esm/Button'
import React, {useState} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router';

const axios = require('axios');


// import Stack from 'react-bootstrap/Stack'

const TableBlock = (props) => {
    const [joined, setJoined] = useState(false);
    //const [status, setStatus] = useState({});
    const joinTable = () => {
        setJoined(true);
        return <Redirect to={`/game/${props.table._id}`}></Redirect>
    }

    const deleteTable = async e => {
        console.log("Delete Table", props.table._id)

        try {
            axios.delete("/api/tableDelete/" + props.table._id)

            // const response = await axios({
            //     method: "delete",
            //     url: "/api/tableDelete/" + props.table._id,
                
            //     // headers: { "Content-Type": "multipart/form-data" },
            // });
            // // store the response data into the data state variable
            // console.log(response.data);
            // setStatus(response.data);
        } catch (err) {
            throw new Error(err);
        }
    }
    if(joined) {
        return <Redirect to={`/game/${props.table._id}`}></Redirect>
    }
    else if (props.table.status === "private") {
        return (
            <></>
        )
    }
    else {
        return (
        <Row>
            <Col className="table-border">
                <a href="#" onClick={() => joinTable()}><strong>{props.table.tableName}</strong></a> </Col>
            <Col className="table-border">
                {props.table.curPlayers}/{props.table.numPlayers} </Col>
            <Col className="table-border">
                {props.table.startingValue} </Col>
            <Col className="table-border">
                {props.table.status} </Col>
            {/*<Col className="table-border">
                <Button onClick={deleteTable}>delete</Button>
            </Col>*/}
        </Row>
    )
    }
}
export default TableBlock
