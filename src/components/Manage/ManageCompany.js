import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Container, Card, CardHeader, CardBody, CardTitle, Col, Row} from 'reactstrap';
import $ from 'jquery';
import _ from 'lodash';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import ContentWrapper from '../Layout/ContentWrapper';
import {company} from '../../store/actions/actions';

const token = localStorage.getItem('currData');

class ManageCompany extends Component {
    constructor(props){
        super(props)
        this.state = {
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
            companies: [],
            companiesCopy: [],
            managers: [],
            nameFilter: '',
            minCities: '',
            maxCities: '',
            minEmployees: '',
            maxEmployees: '',
            minTheaters: '',
            maxTheaters: '',
            selectedCompany: null
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


    async componentDidMount() {
        //chained axios get call here, second call is attached as a callback
        //const token = localStorage.getItem('currData');
        axios.get('http://localhost:8080/api/v1/company/all')
            .then(async res => {
                 let companies = res.data;
                try {
                    const employees = await Promise.all(companies.map(c => axios.get(`http://localhost:8080/api/v1/company/${c}/employees`, { 'headers': {'Authorization': `Bearer ${token}`} }).then(res => res.data)))
                    const theaters = await Promise.all(companies.map(c => axios.get(`http://localhost:8080/api/v1/company/${c}/theaters`, { 'headers': {'Authorization': `Bearer ${token}`} }).then(res => res.data)))
                    const uniqueCitiesStates = employees.map(e => _.uniqBy(e, v => [v.city, v.state].join()));
                    companies = companies.map((c, i) => ({company: c, numEmployees: employees[i].length, numTheaters: theaters[i].length, numCitiesCovered: uniqueCitiesStates[i].length}));
                    this.setState({
                        companies, companiesCopy: companies
                    });
                } catch (err) {

                }
            })
    }

    updateRange = e => this.setState({[e.target.name]: e.target.value});

    filterCompanyName = e => {
        const filterQuery = e.target.value;
        this.setState(prevState => ({nameFilter: filterQuery, companies: prevState.companiesCopy.filter(c => c.company.includes(filterQuery))}))
    }

    filterRanges = () => {
        const {minCities, maxCities, minEmployees, maxEmployees, minTheaters, maxTheaters} = this.state;
        const queries = new URLSearchParams({
            minCities, maxCities, minEmployees, maxEmployees, minTheaters, maxTheaters
        });
        axios.get(`http://localhost:8080/api/v1/company/search/findBy?${queries.toString()}`, { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                this.setState({companies: res.data});
            }).catch(err => console.log('errrrrrr', err));
    }

    goToDetailPage = () => {
        const {selectedCompany} = this.state;
        const {company, history} = this.props;
        company(selectedCompany.company);
        history.push('/admin-company-detail');
    }

    render() {
        console.log('the stateeeee', this.state)
        const {nameFilter, minCities, maxCities, minEmployees, maxEmployees, minTheaters, maxTheaters, companies, companiesCopy, selectedCompany} = this.state;
        const columns = [{
            dataField: 'company',
            text: 'Company',
            sort: true
        },
            {
                dataField: 'numCitiesCovered',
                text: 'No of Cities Covered',
                sort: true
            },
            {
                dataField: 'numEmployees',
                text: 'No of Employees',
                sort: true
            },
            {
                dataField: 'numTheaters',
                text: 'No of Theaters',
                sort: true
            }];
        const defaultSort = [{
            dataField: 'company',
            order: 'desc'
        }];
        const selectRow = {
                mode: 'radio',
                clickToSelect: true,
                onSelect: selectedRow => this.setState({selectedCompany: selectedRow})
            };
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Admin Manage Company
                        <small>Supports sorting based on single keyword</small>
                    </div>
                </div>
                <Container fluid>
                    {/* DATATABLE DEMO 1 */}
                    <Card>
                        <CardHeader>
                            <CardTitle><h3>Manage Company</h3></CardTitle>
                        </CardHeader>
                        <CardBody>
                            {/*put buttons and shit here*/}
                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <div className="form-group">
                                        <label>Name*</label>
                                        <div className="col-md-10">
                                            <select value={nameFilter} className="custom-select custom-select-sm"
                                                    onChange={this.filterCompanyName}>
                                                <option value="">All</option>
                                                {companiesCopy.map(c => <option value={c.company}>{c.company}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6}>
                                    <div>
                                        <label>City Covered*</label>
                                        <input placeholder="Min Cities" value={minCities} name="minCities" onChange={this.updateRange} /> - <input placeholder="Max Cities" value={maxCities} name="maxCities" onChange={this.updateRange} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <div>
                                        <label>Theaters*</label>
                                        <input placeholder="Min Theaters" value={minTheaters} name="minTheaters" onChange={this.updateRange} /> - <input placeholder="Max Theaters" value={maxTheaters} name="maxTheaters" onChange={this.updateRange} />
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6}>
                                    <div>
                                        <label>Employees*</label>
                                        <input placeholder="Min Employees" value={minEmployees} name="minEmployees" onChange={this.updateRange} /> - <input placeholder="Max Employees" value={maxEmployees} name="maxEmployees" onChange={this.updateRange} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <button className="btn btn-primary ml-3"
                                            onClick={this.filterRanges}
                                    >
                                        Filter
                                    </button>
                                </Col>
                                <Col sm={3} lg={3} md={3}>
                                    <Link className="btn btn-primary ml-3"
                                            to="/create-theater"
                                    >
                                        Create Theater
                                    </Link>
                                </Col>
                                <Col sm={3} lg={3} md={3}>
                                    {selectedCompany && <button className="btn btn-primary ml-3"
                                            onClick={this.goToDetailPage}
                                    >
                                        Details
                                    </button>}
                                </Col>
                            </Row>

                            <BootstrapTable
                                bootstrap4
                                keyField="company"
                                data={companies}
                                columns={columns}
                                defaultSorted={ defaultSort }
                                selectRow={selectRow}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default connect(null, {company})(ManageCompany);