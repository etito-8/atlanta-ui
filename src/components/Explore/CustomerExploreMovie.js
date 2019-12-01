import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Container, Card, CardHeader, CardBody, CardTitle, FormGroup, Label, Input} from 'reactstrap';
import $ from 'jquery';

//import Datatable from '../Tables/Datatable';
import {Link} from "react-router-dom";

class CustomerExploreMovie extends Component {

    state = {
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
        dtOptions2: {
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
            },
            // Datatable Buttons setup
            dom: 'Bfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-info' },
                { extend: 'csv', className: 'btn-info' },
                { extend: 'excel', className: 'btn-info', title: 'XLS-File' },
                { extend: 'pdf', className: 'btn-info', title: $('title').text() },
                { extend: 'print', className: 'btn-info' }
            ]
        },
        dtOptions3: {
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
            },
            // Datatable key setup
            keys: true
        }
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
                    <div>Customer Explore Movie
                        <small>Supports sorting based on single keyword</small>
                    </div>
                </div>
                <Container fluid>
                    {/* DATATABLE DEMO 1 */}
                    <Card>
                        <CardHeader>
                            <CardTitle><h3>Explore Movie</h3></CardTitle>
                        </CardHeader>

                        <FormGroup>
                                <span>
                                <label className="col-md-4 col-form-label">Only include not played movies</label>
                                <div className="col-md-10">
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </div>
                            </span>
                        </FormGroup>



                        <CardBody>
                            {/*<Datatable options={this.state.dtOptions1}>*/}
                                <table className="table table-striped my-4 w-100">
                                    <thead>
                                    <tr>
                                        <th data-priority="1">Movie</th>
                                        <th className="sort-alpha">Theater</th>
                                        <th className="sort-alpha">Address</th>
                                        <th className="sort-alpha">Company</th>
                                        <th className="sort-alpha">Play Date</th>
                                        {/*<th className="sort-alpha" data-priority="2">CSS grade</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="gradeX">
                                        <td>cwilson</td>
                                        <td>0</td>
                                        <td>2</td>
                                        <td>4</td>
                                        <td>2019/01/02</td>
                                    </tr>
                                    <tr className="gradeC">
                                        <td>jasonlee</td>
                                        <td>3</td>
                                        <td>1</td>
                                        <td>5</td>
                                        <td>2019/01/03</td>
                                    </tr>
                                    <tr className="gradeA">
                                        <td>jjohnson</td>
                                        <td>4</td>
                                        <td>2</td>
                                        <td>5</td>
                                        <td>2019/01/04</td>
                                    </tr>
                                    </tbody>
                                </table>
                            {/*</Datatable>*/}

                            <div className="float-left">
                                <Link to="login" className="btn btn-primary mr-4">Back</Link>
                            </div>

                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }

}

export default CustomerExploreMovie;
