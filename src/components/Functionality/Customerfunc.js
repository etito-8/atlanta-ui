import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
} from 'reactstrap';

class Customerfunc extends Component {

    state = {
        formLogin: {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Card outline color="primary" className="wd-lg" style={{margin:"50px auto", width:"40%"}}>
                            <CardHeader className="text-white bg-primary"><h4>Customer Functionality</h4></CardHeader>
                            <CardBody>
                                <Row style={{padding:"5px"}}>
                                    <Col>
                                        <Link to="explore-movie" className="btn btn-block btn-primary">Explore Movie</Link>
                                    </Col>
                                    <Col>
                                        <Link to="view-history" className="btn btn-block btn-primary">View History</Link>
                                    </Col>
                                </Row>

                                <Row style={{padding:"5px"}}>
                                    <Col>
                                        <Link to="explore-theater" className="btn btn-block btn-primary">Explore Theater</Link>
                                    </Col>
                                    <Col>
                                        <Link to="visit-history" className="btn btn-block btn-primary">Visit History</Link>
                                    </Col>
                                </Row>

                                <Row style={{padding:"5px"}}>
                                    <Col>
                                        <Link to="user-func" className="btn btn-block btn-primary"
                                              style={{margin:"0px auto", width:"40%"}}>Back</Link>
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Customerfunc;
