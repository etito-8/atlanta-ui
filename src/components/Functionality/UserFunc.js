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

class UserFunc extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Card outline color="primary" className="wd-lg" style={{margin:"50px auto", width:"40%"}}>
                            <CardHeader className="text-white bg-primary"><h4>User Functionality</h4></CardHeader>
                            <CardBody>
                                <Row style={{padding:"5px"}}>
                                    <Link to="explore-theater" className="btn btn-block btn-primary">Explore Theater</Link>
                                </Row>

                                <Row style={{padding:"5px"}}>
                                    <Link to="visit-history" className="btn btn-block btn-primary">Visit History</Link>
                                </Row>

                                <Row style={{padding:"5px"}}>
                                    <Link to="explore-movie" className="btn btn-block btn-primary">Back</Link>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default UserFunc;
