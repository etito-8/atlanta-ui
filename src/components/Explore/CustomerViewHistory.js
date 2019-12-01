import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Container, Card, CardHeader, CardBody, CardTitle, FormGroup, Label, Input} from 'reactstrap';
import $ from 'jquery';

//import Datatable from '../Tables/Datatable';
import {Link} from "react-router-dom";
import axios from "axios";
import {state} from "../../store/actions/actions";

class CustomerViewHistory extends Component {

    constructor(props){
        super(props)
        this.state = {
            test:[ {
                "companyName": "string",
                "creditCardNum": "string",
                "movieName": "string",
                "theaterName": "string",
                "viewDate": "2019-11-30T16:30:25.340Z"
            }],
            customers: [],
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
            }
        }
        console.log(this.state, "customer view history state")
    }

    componentDidMount() {
        const token = localStorage.getItem('currData');
        console.log(token,"TOKEN")
        axios.get('http://localhost:8080/api/v1/customer/view/history',
            { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                console.log(res.data, "VIEW HISTORY")
                this.setState({
                    customers: res.data
                }, () =>  console.log("it worked"));
            }).catch((error) => {
            //this.badRequest();
            console.log("not working");
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

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Customer View History
                        <small>Supports sorting based on single keyword</small>
                    </div>
                </div>
                <Container fluid>
                    {/* DATATABLE DEMO 1 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>View History</CardTitle>
                        </CardHeader>

                        <CardBody>
                            {/*<Datatable options={this.state.dtOptions1}>*/}
                                <table className="table table-striped my-4 w-100">
                                    <thead>
                                    <tr>
                                        <th data-priority="1">Movie</th>
                                        <th className="sort-alpha">Theater</th>
                                        <th className="sort-alpha">Company</th>
                                        <th className="sort-numeric">Card#</th>
                                        <th className="sort-numeric">View Date</th>
                                        {/*<th className="sort-alpha" data-priority="2">CSS grade</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {this.state.customers.map((customer, i) => (
                                        <tr key={i} className="gradeX">
                                            <td>{customer.movieName}</td>
                                            <td>{customer.theaterName}</td>
                                            <td>{customer.companyName}</td>
                                            <td>{customer.creditCardNum}</td>
                                            <td>{customer.viewDate}</td>
                                        </tr>
                                    ))
                                    }

                                    </tbody>
                                </table>
                            {/*</Datatable>*/}

                            <div className="float-left">
                                <Link to="user-func" className="btn btn-primary mr-4">Back</Link>
                            </div>

                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }

}

export default CustomerViewHistory;
