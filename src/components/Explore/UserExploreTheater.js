import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {Container, Card, CardHeader, CardBody, CardTitle, Col, Row} from 'reactstrap';
import $ from 'jquery';
import _ from 'lodash';
import decode from 'jwt-decode';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import ContentWrapper from '../Layout/ContentWrapper';
import {company, state} from '../../store/actions/actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const token = localStorage.getItem('currData');

class UserExploreTheater extends Component {
    constructor(props){
        super(props)
        this.state = {
            companies: [],
            companiesCopy: [],
            theaters: [],
            theatersCopy: [],

            filter: {
                city: '',
                companyName: '',
                theaterName: '',
                state: ''
            },
            visitDate: new Date(),
            currentUser:"",

            selectedTheater: null
        }
    }

    // async componentDidMount() {
    //     //chained axios get call here, second call is attached as a callback
    //     //const token = localStorage.getItem('currData');
    //     axios.get()
    //         .then(async res => {
    //             let theaters = res.data;
    //             console.log(theaters, "local theater object in comp did mount")
    //             try {
    //                 const companies = await axios.get('http://localhost:8080/api/v1/company/all', { 'headers': {'Authorization': `Bearer ${token}`} })
    //                 // theaters = _.uniqBy(theaters, function (e) {
    //                 //     return e.theaterName;
    //                 // });
    //
    //                 const theaters = await axios.get('http://localhost:8080/api/v1/theater/search/findBy', { 'headers': {'Authorization': `Bearer ${token}`} })
    //               //  console.log(theaters, 'CORRECT_LIST');
    //                 // const theatersInfo = await Promise.all(theaters.map(t => axios.get(`http://localhost:8080/api/v1/theater/search/findBy`, { 'headers': {'Authorization': `Bearer ${token}`} }).then(res => {
    //                 //     console.log(res.data)
    //                 //     return res.data;
    //                 // })))
    //                 // console.log(theatersInfo, 'THEATER_INFO');
    //                 // console.log(theaters, '====');
    //                 this.setState({
    //                     theaters: theaters.data.data,
    //                     theatersCopy: theaters.data.data,
    //                     companies: companies.data.data,
    //                     companiesCopy: companies.data.data
    //                 }, () => {
    //                     console.log(this.state, 'my state')
    //                     console.log(theaters.data, 'hhhhhhhh')
    //                 });
    //                 console.log(companies, "local caompaniesr object in comp did mount")
    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         })
    // }

    async componentDidMount() {
        const token = localStorage.getItem('currData');
        console.log(token,"TOKEN")
        const theaters = await axios.get('http://localhost:8080/api/v1/theater/search/findBy',
            { 'headers': {'Authorization': `Bearer ${token}`} });
        const companies = await axios.get('http://localhost:8080/api/v1/company/all', { 'headers': {'Authorization': `Bearer ${token}`} })

        this.setState({
            theaters: theaters.data,
            theatersCopy: theaters.data,
            companies: companies.data,
            companiesCopy: companies.data,
        }, () =>  console.log(this.state));
    }

    notify = () => toast('Visit Recorded!', {
        type: 'success',
        position: 'top-right'
    })

    badRequest = () => toast('Invalid fields here', {
        type: 'error',
        position: 'top-right'
    })

    handleDateChange = (date) => {
        this.setState({
            visitDate: date
        });
    };

    updateCity = (value) => {
        this.setState({
            filter: {
                ...this.state.filter,
                city: value
            }
        })
    };

    updateState = (value) => {
        this.setState({
            filter: {
                ...this.state.filter,
                state: value
            }
        })
    };

    filterCompanyName = e => {
        const companyName = e.target.value;
        this.setState({
            filter: {
                ...this.state.filter,
                companyName
            }
        })
    }

    filterTheaterName = e => {
        const theaterName = e.target.value;
        this.setState({
            filter: {
                ...this.state.filter,
                theaterName
            }
        }, () => console.log(this.state))
    }

    //filter button update so table can re render
    filterRanges = () => {
        const {city, state, companyName, theaterName} = this.state.filter;
           const queries = new URLSearchParams({
            city, state, companyName, theaterName
        });
        axios.get(`http://localhost:8080/api/v1/theater/search/findBy?${queries.toString()}`, { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
               console.log(res.data, '======')
                this.setState(({
                    theaters: res.data
                }))
            }).catch(err => console.log('errrrrrr', err));
    }

    visitPost = () => {
        //history.push('/admin-company-detail');
        return axios.post('http://localhost:8080/api/v1/user/visit', this.jsonGen(),
            { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                this.notify()
                setTimeout(() =>  this.props.history.push('/visit-history'), 2000)
                console.log('The Manager-Customer has been registered!')
                // console.log(res);
                // console.log(res.data);
            })
            .catch((error) => {
                // const errorMessage = error.response ? error.response.message : error.response.data.message;
                this.badRequest();
            });
    }

    jsonGen = () => {
       const token = localStorage.getItem('currData');
       const decodedToken = decode(token);
       console.log(decodedToken, 'token decoded')


        return   {
            "companyName": this.state.selectedTheater.companyName,
            "theaterName": this.state.selectedTheater.theaterName,
            "username": decodedToken.sub,
            "visitDate": this.state.visitDate
        }
    }

    render() {
        console.log('the stateeeee', this.state)
        const {theaterFilter, companyFilter, theaters, theatersCopy, companies, companiesCopy, selectedCompany} = this.state;
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
                text: 'Company Name',
                sort: true
            },
            ];
        const defaultSort = [{
            dataField: 'company',
            order: 'desc'
        }];
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: selectedRow => this.setState({selectedTheater: selectedRow}, ()=> console.log(this.state))
        };
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>User Explore Theater
                        <small>Sort the columns by clicking on them</small>
                    </div>
                </div>
                <Container fluid>
                    {/* DATATABLE DEMO 1 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Explore Theater</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ToastContainer/>
                            {/*put buttons and shit here*/}
                            <Row>

                                <Col sm={6} lg={6} md={6}>
                                    <div className="form-group">
                                        <label>Theater Name</label>
                                        <div className="col-md-10">
                                            <select value={this.state.filter.theaterName} className="custom-select custom-select-sm"
                                                    onChange={this.filterTheaterName}>
                                                <option value="">All</option>
                                                {theatersCopy && theatersCopy.map((c, i) => <option key={`t_${i}`} value={c.theaterName}>{c.theaterName}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6}>
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <div className="col-md-10">
                                            <select value={this.state.filter.companyName} className="custom-select custom-select-sm"
                                                    onChange={this.filterCompanyName}>
                                                <option value="">Select Company</option>
                                                {companiesCopy && companiesCopy.map((c, i) => <option key={`t_${i}`} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </Col>

                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6} >
                                    <div>
                                        <label>City</label>
                                        <input value={this.state.filter.city} name="city" onChange={(e) => this.updateCity(e.target.value)} />
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6} style={{width:'30%'}}>
                                    <div style={{width:'80%'}}>
                                        <label>State</label>
                                        <select value={this.state.filter.state} className="custom-select custom-select-sm"
                                                onChange={(e) => this.updateState(e.target.value)}>
                                            <option value="">Select State</option>
                                            <option value="Alabama">AL</option>
                                            <option value="Alaska">AK</option>
                                            <option value="Arizona">AZ</option>
                                            <option value="Arkansas">AR</option>
                                            <option value="California">CA</option>
                                            <option value="Colorado">CO</option>
                                            <option value="Connecticut">CT</option>
                                            <option value="Delaware">DE</option>
                                            <option value="Florida">FL</option>
                                            <option value="Georgia">GA</option>
                                            <option value="Hawaii">HI</option>
                                            <option value="Idaho">ID</option>
                                            <option value="Illinois">IL</option>
                                            <option value="Indiana">IN</option>
                                            <option value="Iowa">IA</option>
                                            <option value="Kansas">KS</option>
                                            <option value="Kentucky">KY</option>
                                            <option value="Louisiana">LA</option>
                                            <option value="Maine">ME</option>
                                            <option value="Maryland">MD</option>
                                            <option value="Massachusetts">MA</option>
                                            <option value="Michigan">MI</option>
                                            <option value="Minnesota">MN</option>
                                            <option value="Mississippi">MS</option>
                                            <option value="Missouri">MO</option>
                                            <option value="Montana">MT</option>
                                            <option value="Nebraska">NE</option>
                                            <option value="Nevada">NV</option>
                                            <option value="New Hampshire">NH</option>
                                            <option value="New Jersey">NJ</option>
                                            <option value="New York">NY</option>
                                            <option value="North Dakota">ND</option>
                                            <option value="Ohio">OH</option>
                                            <option value="Oklahoma">OK</option>
                                            <option value="Oregon">OR</option>
                                            <option value="Pennsylvania">PA</option>
                                            <option value="Rhode Island">RI</option>
                                            <option value="South Carolina">SC</option>
                                            <option value="Tennessee">TN</option>
                                            <option value="Texas">TX</option>
                                            <option value="Utah">UT</option>
                                            <option value="Vermont">VT</option>
                                            <option value="Virginia">VA</option>
                                            <option value="Washington">WA</option>
                                            <option value="West Virginia">WV</option>
                                            <option value="Wisconsin">WI</option>
                                            <option value="Wyoming">WY</option>
                                        </select>
                                    </div>
                                </Col>


                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <button className="btn btn-primary ml-3 mb-2"
                                            onClick={this.filterRanges}
                                    >
                                        Filter
                                    </button>
                                </Col>


                            </Row>
                            {console.log(theaters, '======[[][[')}

                            {
                                theaters && (
                                    <BootstrapTable
                                        bootstrap4
                                        keyField="theaterName"
                                        data={theaters}
                                        columns={columns}
                                        defaultSorted={ defaultSort }
                                        selectRow={selectRow}
                                    />
                                )
                            }


                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <Link to="user-func" className="btn btn-primary mr-4 mt-3">Back</Link>
                                </Col>


                                <Col>
                                    <div className="form-group">
                                        <label>Visit Date</label>
                                        <Row style={{marginLeft:"2px"}}>
                                            <DatePicker
                                                selected={this.state.visitDate}
                                                onChange={this.handleDateChange}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </Row>
                                    </div>
                                </Col>

                                <Col sm={3} lg={3} md={3}>
                                    {this.state.selectedTheater && <button className="btn btn-primary ml-3"
                                                                onClick={this.visitPost}
                                    >
                                        Log Visit
                                    </button>}
                                </Col>
                            </Row>


                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default (UserExploreTheater);