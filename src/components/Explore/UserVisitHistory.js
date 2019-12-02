import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Container, Card, CardHeader, CardBody, CardTitle, Col, Row} from 'reactstrap';
import $ from 'jquery';
import _ from 'lodash';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import ContentWrapper from '../Layout/ContentWrapper';
import {company, releaseDate} from '../../store/actions/actions';
import DatePicker from "react-datepicker";
import moment from 'moment';


const token = localStorage.getItem('currData');

class UserVisitHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            companies: [],
            companiesCopy: [],
            managers: [],
            minCities: '',
            maxCities: '',
            minEmployees: '',
            maxEmployees: '',
            minTheaters: '',
            maxTheaters: '',
            selectedCompany: null,

            startDate: new Date(),
            endDate: new Date(),
            visits:[],
            visitsCopy:[],
            nameFilter:""
        }
    }

    // async componentDidMount() {
    //     //chained axios get call here, second call is attached as a callback
    //     //const token = localStorage.getItem('currData');
    //     axios.get('http://localhost:8080/api/v1/company/all')
    //         .then(async res => {
    //             let companies = res.data;
    //             try {
    //                 const employees = await Promise.all(companies.map(c => axios.get(`http://localhost:8080/api/v1/company/${c}/employees`, { 'headers': {'Authorization': `Bearer ${token}`} }).then(res => res.data)))
    //                 const theaters = await Promise.all(companies.map(c => axios.get(`http://localhost:8080/api/v1/company/${c}/theaters`, { 'headers': {'Authorization': `Bearer ${token}`} }).then(res => res.data)))
    //                 const uniqueCitiesStates = employees.map(e => _.uniqBy(e, v => [v.city, v.state].join()));
    //                 companies = companies.map((c, i) => ({company: c, numEmployees: employees[i].length, numTheaters: theaters[i].length, numCitiesCovered: uniqueCitiesStates[i].length}));
    //                 this.setState({
    //                     companies, companiesCopy: companies
    //                 });
    //             } catch (err) {
    //
    //             }
    //         })
    // }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/user/visit/history',
            { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                this.setState({
                     visits: res.data,
                     visitsCopy: res.data
                });
            }).catch((error) => {
            console.log("not working");
        });
    }


    //updateRange = e => this.setState({[e.target.name]: e.target.value});

    //updating the filter for start date in the range filter
    handleStartChange = (date) => {
        this.setState({
            startDate: date
        });
    };

    //updating the filter for end date in the range filter
    // (Same function as update range in manage comp)
    handleEndChange = (date) => {
        this.setState({
            endDate: date
        });
    };

    filterCompanyName = (e) => {
        const filterQuery = e.target.value;
        this.setState(prevState => ({nameFilter: filterQuery, visits: prevState.visitsCopy.filter(v => v.companyName.includes(filterQuery))}))
    }

    filterRanges = () => {
        const {endDate, startDate} = this.state;
        const queries = new URLSearchParams({
            visitedBefore: moment(endDate).format('YYYY-MM-DD'), visitedAfter: moment(startDate).format('YYYY-MM-DD')
        });
        console.log(queries,'queries');
        axios.get(`http://localhost:8080/api/v1/user/visit/history?${queries.toString()}`, { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                this.setState({visits: res.data});
            }).catch(err => console.log('errrrrrr', err));
        console.log(this.state.visits, "does code reach here")
    }


    render() {
        console.log('the stateeeee', this.state)
        const {nameFilter, endDate, startDate, visits, visitsCopy} = this.state;
        const columns = [{
            dataField: 'theaterName',
            text: 'Theater',
            sort: true
        },
            {
                dataField: 'address',
                text: 'Address',
                sort: true
            },
            {
                dataField: 'companyName',
                text: 'Company',
                sort: true
            },
            {
                dataField: 'visitDate',
                text: 'Visit Date',
                sort: true
            }];
        const defaultSort = [{
            dataField: 'company',
            order: 'desc'
        }];
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>User Visit History
                        <small>Sort the columns by clicking on them</small>
                    </div>
                </div>
                <Container fluid>
                    {/* DATATABLE DEMO 1 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Visit History</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {/*put buttons and shit here*/}
                            {/*Need to use a visits copy array here because the drop down has to render an original instance*/}
                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <div className="col-md-10">
                                            <select value={nameFilter} className="custom-select custom-select-sm"
                                                    onChange={this.filterCompanyName}>
                                                <option value="">All</option>
                                                {_.uniqBy(visitsCopy, 'companyName').map(v => <option value={v.companyName}>{v.companyName}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </Col>

                                <Row sm={9} lg={9} md={9}>
                                    <div>
                                        <label>Visit Date</label>
                                        {/*<input placeholder="Min Cities" value={minCities} name="minCities" onChange={this.updateRange} /> - <input placeholder="Max Cities" value={maxCities} name="maxCities" onChange={this.updateRange} />*/}
                                            <DatePicker
                                                name = "startDate"
                                                selected={this.state.startDate}
                                                onChange={this.handleStartChange}
                                                dateFormat="yyyy-MM-dd"
                                            /> - <DatePicker
                                        name = "endDate"
                                        selected={this.state.endDate}
                                        onChange={this.handleEndChange}
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    </div>
                                </Row>
                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <button className="btn btn-primary ml-3"
                                            onClick={this.filterRanges}
                                    >
                                        Filter
                                    </button>
                                </Col>

                            </Row>

                            <BootstrapTable
                                bootstrap4
                                keyField="company"
                                data={visits}
                                columns={columns}
                                defaultSorted={ defaultSort }
                            />

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

export default (UserVisitHistory);