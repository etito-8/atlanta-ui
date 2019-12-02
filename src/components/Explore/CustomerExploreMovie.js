import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Container, Card, CardHeader, CardBody, CardTitle, Col, Row} from 'reactstrap';
import _ from 'lodash';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from 'moment';
import decode from "jwt-decode";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentWrapper from '../Layout/ContentWrapper';

const token = localStorage.getItem('currData');
const decodedToken = decode(token);
const username = decodedToken.sub;
console.log('hey decodeddddd', username)

class CustomerExploreMovie extends Component {
    constructor(props){
        super(props)
        this.state = {
            movies:[],
            moviesCopy:[],
            playedAfter: '',
            playedBefore: '',
            movieName: '',
            companyName: '',
            city: '',
            state: '',
            cards: [],
            creditCardId: '',
            selectedMovie: null
        }
    }

    notify = () => toast('This view has been recorded!', {
        type: 'success',
        position: 'top-right'
    })

    badRequest = () => toast('Invalid fields here', {
        type: 'error',
        position: 'top-right'
    })

    async componentDidMount() {
        try {
            let {data} = await axios.get(`http://localhost:8080/api/v1/movie/playing/search`,
                {'headers': {'Authorization': `Bearer ${token}`}});
            const cardsRes = await axios.get(`http://localhost:8080/api/v1/customer/mycards`,
                {'headers': {'Authorization': `Bearer ${token}`}});
            data = data.map((d, i) => ({...d, id: i}));
            this.setState({movies: data, moviesCopy: data, cards: cardsRes.data});
        } catch  (err) {

        }
    }

    filterRanges = () => {
        const {movieName, companyName, city, state, playedAfter, playedBefore} = this.state;
        const query = {movieName, companyName, city, state,
            playedAfter: playedAfter ? moment(playedAfter).format('YYYY-MM-DD') : '',
            playedBefore: playedBefore ? moment(playedBefore).format('YYYY-MM-DD') : ''};
        let filteredQuery = {};
        Object.entries(query).filter(([k,v]) => v.trim()).forEach(([k,v]) => filteredQuery[k] = v)
        filteredQuery = new URLSearchParams(filteredQuery);
        console.log('yooooo', filteredQuery.toString())
        axios.get(`http://localhost:8080/api/v1/movie/playing/search?${filteredQuery.toString()}`, { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                this.setState({movies: res.data.map((d, i) => ({...d, id: i}))});
            }).catch(err => console.log('errrrrrr', err));
    }

    handleInputChange = e => this.setState({[e.target.name]: e.target.value});

    handleDateChange = (type, date) => this.setState({[type]: date});

    handleView = () => {
        const {selectedMovie, creditCardId} = this.state;
        delete selectedMovie.id;
        delete selectedMovie.address;
        axios.post('http://localhost:8080/api/v1/customer/view', {...selectedMovie, creditCardId, username}, { 'headers': {'Authorization': `Bearer ${token}`} }).then(res => {
            console.log('ressssss', res.data)
            this.notify()
        }).catch(err => {
            console.log('errrrrrr', err)
            this.badRequest();
        });
    }

    render() {
        const {playedAfter, playedBefore, moviesCopy, movies, cards} = this.state;
        console.log('the moviesmovies', this.state)
        const columns = [{
            dataField: 'movieName',
            text: 'Movie Name',
            sort: true
        },
            {
                dataField: 'theaterName',
                text: 'Theater Name',
                sort: true
            },
            {
                dataField: 'companyName',
                text: 'Company Name',
                sort: true
            },
            {
                dataField: 'address',
                text: 'Address',
                sort: true
            },
            {
                dataField: 'playDate',
                text: 'Play Date',
                sort: true
            }];
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: selectedRow => this.setState({selectedMovie: selectedRow})
        };
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Customer Explore Movie
                        <small>Sort the columns by clicking on them</small>
                    </div>
                </div>
                <Container fluid>
                    {/* DATATABLE DEMO 1 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Explore </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ToastContainer/>
                            {/*put buttons and shit here*/}
                            {/*Need to use a visits copy array here because the drop down has to render an original instance*/}
                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <div className="form-group">
                                        <label>Movie Name</label>
                                        <div className="col-md-10">
                                            <select name="movieName" className="custom-select custom-select-sm"
                                                    onChange={this.handleInputChange}>
                                                <option value="">All</option>
                                                {_.uniqBy(moviesCopy, 'movieName').map(v => <option value={v.movieName}>{v.movieName}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6}>
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <div className="col-md-10">
                                            <select name="companyName" className="custom-select custom-select-sm"
                                                    onChange={this.handleInputChange}>
                                                <option value="">All</option>
                                                {_.uniqBy(moviesCopy, 'companyName').map(v => <option value={v.companyName}>{v.companyName}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <label>City</label>
                                    <input name="city" onChange={this.handleInputChange} />
                                </Col>

                                <Col sm={6} lg={6} md={6}>
                                    <label>State</label>
                                    <select name="state" className="custom-select custom-select-sm" onChange={this.handleInputChange}>
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
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6} >
                                    <div>
                                        <label>Movie Play Date: </label>
                                        <DatePicker
                                            selected={playedAfter}
                                            onChange={d => this.handleDateChange("playedAfter", d)}
                                            dateFormat="yyyy-mm-dd"
                                        />
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6} style={{width:'30%'}}>
                                    <div style={{width:'80%'}}>
                                        <DatePicker
                                            selected={playedBefore}
                                            onChange={d => this.handleDateChange("playedBefore", d)}
                                            dateFormat="yyyy-mm-dd"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6}>
                                    <button className="float-right btn btn-primary ml-3"
                                            onClick={this.filterRanges}
                                    >
                                        Filter
                                    </button>
                                </Col>

                            </Row>

                            <Row>
                                <BootstrapTable
                                    bootstrap4
                                    keyField="id"
                                    data={movies}
                                    columns={columns}
                                    selectRow={selectRow}
                                />
                            </Row>

                            <Row>
                                <Col sm={3} lg={3} md={3}>
                                    <div className="float-left mt-4">
                                        <Link to="user-func" className="btn btn-primary mr-4">Back</Link>
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6}>
                                    <select name="creditCardId" className="custom-select custom-select-sm"
                                            onChange={this.handleInputChange}>
                                        <option>Select Credit Card</option>
                                        {cards.map(c => <option value={c.creditCardId}>{c.creditCardNum}</option>)}
                                    </select>
                                </Col>

                                <Col sm={3} lg={3} md={3}>
                                    <div className="float-right mt-4">
                                        <button onClick={this.handleView} className="btn btn-primary mr-4">View</button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default (CustomerExploreMovie);