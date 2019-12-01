import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Container, Card, CardHeader, CardBody, CardTitle, Col, Input, Row} from 'reactstrap';
import $ from 'jquery';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import {connect} from 'react-redux';
import axios from "axios";
import {Link} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {state} from "../../store/actions/actions";

const selectOptions = {
    Approved: 'Approved',
    Pending: 'Pending',
    Declined: 'Declined'
};

class ManageUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            users: [],
            status: "ALL",
            selectedUser: null,
            boxChecked: false,
            dtOptions1: {
                'paging': true, // Table pagination
                'ordering': true, // Column ordering
                'info': true, // Bottom left status text
                responsive: true,
                // Text translation options
                // Note the required keywords between underscores (e.g _MENU_)
                oLanguage: {
                    sSearch: '<em class="fa fa-search"></em>',
                    sLengthMenu: '_MENU_ records per page',
                    info: 'Showing page _PAGE_ of _PAGES_',
                    zeroRecords: 'Nothing found - sorry',
                    infoEmpty: 'No records available',
                    infoFiltered: '(filtered from _MAX_ total records)',
                    oPaginate: {
                        sNext: '<em class="fa fa-caret-right"></em>',
                        sPrevious: '<em class="fa fa-caret-left"></em>'
                    }
                }
            },
            columns: [{
                dataField: 'username',
                text: 'Username',
                sort: true,
                filter: textFilter()
            },
            {
                dataField: 'creditCardCount',
                text: 'Credit Card Count',
                sort: true
            },
            {
                dataField: 'userType',
                text: 'User Type',
                sort: true
            },
            {
                dataField: 'status',
                text: 'Status',
                sort: true,
                filter: selectFilter({
                    options: selectOptions
                })
            }],
            defaultSorted : [{
                dataField: 'name',
                order: 'desc'
            }],
            selectRow: {
                mode: 'radio',
                clickToSelect: true,
                onSelect: selectedRow => this.setState({selectedUser: selectedRow})
            },
            dataFeed: [
                {
                    // "username": 0,
                    // "ccCount": "test0",
                    // "userType": "$0",
                    // "status":""
                }
            ]
        }

        console.log(state, "manager user state")
    }

    notify = () => toast('Successful update!', {
        type: 'success',
        position: 'top-right'
    })

    badRequest = () => toast('Invalid attempt', {
        type: 'error',
        position: 'top-right'
    })

    // handleCheck = (value) => {
    //     this.setState({boxChecked: !this.state.boxChecked, selectedUser: value}, () => console.log("user",value))
    //     console.log(this.state, "manager user state")
    // }

    approveSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('currData');
        console.log(token,"F'IN TOKEN!")
    console.log(this.state.selectedUser)
        return axios.post(`http://localhost:8080/api/v1/user/approve/${this.state.selectedUser.username}`,"",
            { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                this.notify()
                setTimeout(() =>  this.props.history.push('/admin-only-func'), 2000)
                console.log('Update successful!')
                // console.log(res);
                // console.log(res.data);
            })
            .catch((error) => {
                // const errorMessage = error.response ? error.response.message : error.response.data.message;
                this.badRequest();
            });
    }
    //
    declineSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('currData');
        console.log(token,"F'IN TOKEN!")
        return axios.post(`http://localhost:8080/api/v1/user/decline/${this.state.selectedUser.username}`,"",
            { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                this.notify()
                setTimeout(() =>  this.props.history.push('/admin-only-func'), 3000)
                console.log('The theater has been created')
                // console.log(res);
                // console.log(res.data);
            })
            .catch((error) => {
                // const errorMessage = error.response ? error.response.message : error.response.data.message;
                this.badRequest();
            });
    }


    // Access to internal datatable instance for customizations
    dtInstance = dtInstance => {
        const inputSearchClass = 'datatable_input_col_search';
        const columnInputs = $('tfoot .' + inputSearchClass);
        // On input keyup trigger filtering
        columnInputs
            .keyup(function() {
                dtInstance.fnFilter(this.value, columnInputs.index(this));
            });
    }

    componentDidMount() {
        const token = localStorage.getItem('currData');
        console.log(token,"TOKEN")
        axios.get('http://localhost:8080/api/v1/user/search/findBy',
            { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                console.log(res.data)
                this.setState({
                    users: res.data
                }, () =>  console.log("it worked"));
            }).catch((error) => {
            //this.badRequest();
            console.log("not working");
        });
    }

    render() {
        console.log('this.stateeeeee', this.state)
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Admin Manage User
                        <small>Supports all-inclusive filtering based on single keyword</small>
                    </div>
                </div>
                <Container fluid>
                    {/* DATATABLE DEMO 1 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage User</CardTitle>
                        </CardHeader>

                        <CardBody>
                            {/*Approve and decline options*/}
                            <Row className="p-3">
                                <Col sm={3} lg={3} md={3}>
                                    <form className="mb-3" name="formLogin" >
                                    <div>
                                        <button className="btn btn-primary ml-3"
                                                onClick={this.approveSubmit}
                                        >
                                            Approve
                                        </button>
                                        <button className="btn btn-primary ml-3"
                                                onClick={this.declineSubmit}
                                        >
                                            Decline
                                        </button>
                                    </div>
                                    </form>
                                </Col>
                            </Row>

                            <ToastContainer/>
                            <BootstrapTable
                                bootstrap4
                                keyField="username"
                                data={this.state.users}
                                columns={this.state.columns}
                                defaultSorted={ this.state.defaultSorted }
                                selectRow={this.state.selectRow}
                                filter={ filterFactory() }
                            />

                            {/*<table className="table table-striped my-4 w-100">
                                    <thead>
                                    <tr>
                                        <th data-priority="1">Username</th>
                                        <th className="sort-numeric">Credit Card Count</th>
                                        <th className="sort-alpha" data-priority="2">User Type</th>
                                        <th>Status</th>
                                        <th className="sort-alpha" data-priority="2">CSS grade</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.users.map((user, i) => (
                                                <tr key={i} className="gradeX">
                                                    <td>
                                                        <input type="checkbox" defaultChecked={this.state.boxChecked} onChange={() => this.handleCheck(user.username)}/> {user.username}
                                                    </td>
                                                    <td>{user.creditCardCount}</td>
                                                    <td>{user.userType}</td>
                                                    <td>{user.status}</td>
                                                </tr>
                                        ))
                                    }

                                    </tbody>
                                </table>*/}
                            <Link to="user-func" className="btn btn-primary mr-4">Back</Link>
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }

}

// This function is essentially creating new key(s) that will become props on this component
const mapStateToProps = (state) => {
    console.log(state, 'state');
    return {
        userName: state.names.userName,
    }
}

export default connect(mapStateToProps)(ManageUser);

