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

class AdminCustomerfunc extends Component {

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
                            <CardHeader className="text-white bg-primary"><h4>Admin-Customer Functionality</h4></CardHeader>
                            <CardBody>
                                <Row style={{padding:"5px"}}>
                                    <Col>
                                        <Link to="manage-user" className="btn btn-block btn-primary">Manage User</Link>
                                    </Col>
                                    <Col>
                                        <Link to="explore-movie" className="btn btn-block btn-primary">Explore Movie</Link>
                                    </Col>
                                </Row>

                                <Row style={{padding:"5px"}}>
                                    <Col>
                                        <Link to="manage-company" className="btn btn-block btn-primary">Manage Company</Link>
                                    </Col>
                                    <Col>
                                        <Link to="explore-theater" className="btn btn-block btn-primary">Explore Theater</Link>
                                    </Col>
                                </Row>

                                <Row style={{padding:"5px"}}>
                                    <Col>
                                        <Link to="create-movie" className="btn btn-block btn-primary">Create Movie</Link>
                                    </Col>
                                    <Col>
                                        <Link to="view-history" className="btn btn-block btn-primary">View History</Link>
                                    </Col>
                                </Row>

                                <Row style={{padding:"5px"}}>
                                    <Col>
                                        <Link to="visit-history" className="btn btn-block btn-primary">Visit History</Link>
                                    </Col>
                                    <Col>
                                        <Link to="user-func" className="btn btn-block btn-primary">Back</Link>
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

export default AdminCustomerfunc;
