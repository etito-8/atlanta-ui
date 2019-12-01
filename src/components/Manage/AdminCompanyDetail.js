import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import ContentWrapper from '../Layout/ContentWrapper';

const token = localStorage.getItem('currData');

class AdminCompanyDetail extends Component {
    state = {
        theaters: [],
        employees: []
    }

    async componentDidMount() {
        this.companyName = this.props.companyName;
        if (this.companyName) {
            try {
                const theatersRes = await axios.get(`http://localhost:8080/api/v1/company/${this.companyName}/theaters`, { 'headers': {'Authorization': `Bearer ${token}`} });
                const {data} = await axios.get(`http://localhost:8080/api/v1/company/${this.companyName}/employees`, { 'headers': {'Authorization': `Bearer ${token}`} });
                this.setState({theaters: theatersRes.data, employees: data});
            } catch (err) {
                console.log('errrrrrr', err)
            }
        } else {
            this.props.history.push('/manage-company');
        }
    }

    render() {
        //theaterName: "Main Movies", managerUsername: "fatherAI", city: "New York", state: "NY", capacity: 3
        console.log('stateeeee', this.state);
        const {theaters, employees} = this.state;
        const columns = [
            {
                dataField: 'theaterName',
                text: 'Name',
                sort: true
            },
            {
                dataField: 'managerUsername',
                text: 'Manager',
                sort: true
            },
            {
                dataField: 'city',
                text: 'City',
                sort: true
            },
            {
                dataField: 'state',
                text: 'State',
                sort: true
            },
            {
                dataField: 'capacity',
                text: 'Capacity',
                sort: true
            },
        ]
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Company Detail
                        <small>Please input company name to get details</small>
                    </div>
                </div>
                {/* START row */}
                <Row>
                    <Col >
                        {/* START card */}
                        <Card className="card-default">
                            <CardHeader>Input here</CardHeader>
                            <Row>
                                <Col>
                                    <div>
                                        <label className="ml-3">Name</label>
                                        <div>{this.companyName}</div>
                                    </div>
                                </Col>

                                <Col>
                                    <div>
                                        <label className="ml-3">Employees</label>
                                        <div>{employees.map(e => `${e.firstName} ${e.lastName}`).join(', ')}</div>
                                    </div>
                                </Col>

                                {/*<Col>*/}
                                {/*    <div className="form-group">*/}
                                {/*    <label>Employees</label>*/}
                                {/*    <textarea style={{width:"30%", height:"30%"}}/>*/}
                                {/*    </div>*/}
                                {/*</Col>*/}
                            </Row>



                            <CardBody>
                                <BootstrapTable
                                    bootstrap4
                                    keyField="company"
                                    data={theaters}
                                    columns={columns}
                                />

                                <div  style={{margin:"20px auto"}}>
                                    <Link to="login" className="btn btn-primary mr-4">Back</Link>
                                </div>

                            </CardBody>
                        </Card>
                        {/* END card */}
                    </Col>

                </Row>
                {/* END row */}
                {/* START row */}
                {/* END row */}
            </ContentWrapper>
        );
    }

}

export default connect(({names}) => ({companyName: names.companyName}))(AdminCompanyDetail);
