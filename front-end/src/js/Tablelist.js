import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TableBlock from './TableBlock';
import '../css/Tablelist.css';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import Header from '../Header'

class Tablelist extends Component {
    // useEffect(() => {
    //     props.updateUserProfileButton(true);
    // }, [props]);

    


    /*fetch table list */


    constructor() {
        super();
        this.state = {tables: []};
    }

    componentDidMount() {
        fetch('/tableList')
        .then(res=> {
            console.log(res);
            return res.json()
        })
        .then(tables => {
            console.log(tables);
            this.setState({ tables })
        })
    }

    
    // const mockTableListAPI = "tableList.json";
    // const [tableList, modifyTableList] = useState([]);
    // useEffect(() => {
    //   fetchData(mockTableListAPI, modifyTableList);
    // }, []);
    render() {
        return (
        <Container>
                
            <h1 className = "text-center">Tables List</h1>
            <div className="search-container">
                <Button> Search for a Game </Button>
                <NavLink to='/tablecreate'>
                    <h2 className = 'text-center'>Create a Table</h2>
                </NavLink>
            </div>

            <Container>
                <Row>
                    <Col className="table-header table-border">
                        Name </Col>
                    <Col className="table-header table-border">
                        Players </Col>
                    <Col className="table-header table-border">
                        Start Value </Col>
                    <Col className="table-header table-border">
                        Status </Col>
                    <Col className="table-header table-border">
                        ?
                    </Col>
                </Row>
                {this.state.tables.map((table) => (
                    <TableBlock key={table._id} table={table}> </TableBlock>
                ))}

            </Container>
            {/* <TableBlock tables = {tables}></TableBlock> */}
        </Container>
    )
    }
    
}

export default Tablelist;
