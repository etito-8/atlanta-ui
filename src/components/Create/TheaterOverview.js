import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Container, Card, CardHeader, CardBody, CardTitle, Col, Row} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import ContentWrapper from '../Layout/ContentWrapper';

const token = localStorage.getItem('currData');

class TheaterOverview extends Component {
    constructor(props){
        super(props)
        this.state = {
            movies: [],
            moviesCopy: [],
            notPlayed: false,
            minDuration: '',
            maxDuration: '',
            releasedBefore: '',
            releasedAfter: '',
            movieName: '',
            playedAfter: '',
            playedBefore: ''
        }
    }

    async componentDidMount() {
        const {notPlayed} = this.state;
        const {data} = await axios.get(`http://localhost:8080/api/v1/theater/mytheater/search?notPlayed=${notPlayed}`,
            {'headers': {'Authorization': `Bearer ${token}`}});
        this.setState({movies: data, moviesCopy: data});
    }

    filterTheaterName = e => {
        const movieName = e.target.value;
        this.setState(prevState => ({movieName, movies: prevState.moviesCopy.filter(t => t.movieName.toLowerCase().includes(movieName.toLowerCase()))}))
    }

    filterRanges = () => {
        const {notPlayed, movieName, minDuration, maxDuration, releasedAfter, releasedBefore, playedAfter, playedBefore} = this.state;
        const query = {notPlayed, movieName, minDuration, maxDuration,
            releasedAfter: releasedAfter ? moment(releasedAfter).format('YYYY-MM-DD') : '',
            releasedBefore: releasedBefore ? moment(releasedBefore).format('YYYY-MM-DD') : ''};
        if (!notPlayed) {
            query.playedAfter = playedAfter ? moment(playedAfter).format('YYYY-MM-DD') : '';
            query.playedBefore = playedBefore ? moment(playedBefore).format('YYYY-MM-DD') : '';
        }
        const queries = new URLSearchParams(query);
        axios.get(`http://localhost:8080/api/v1/theater/mytheater/search?${queries.toString()}`, { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                console.log('dataaaaaa', res.data)
                this.setState({movies: res.data});
            }).catch(err => console.log('errrrrrr', err));
    }

    handleCheckboxChange = e => {
        e.persist()
        this.setState(prevState => ({[e.target.name]: !prevState.notPlayed}));
    }

    handleInputChange = e => this.setState({[e.target.name]: e.target.value});

    handleDateChange = (type, date) => this.setState({[type]: date});

    render() {
        console.log('the stateeeee', this.state)
        const { movies, notPlayed, releasedAfter, releasedBefore } = this.state;
        const columns = [
            {
                dataField: 'movieName',
                text: 'Movie Name',
                //sort: true
            },
            {
            dataField: 'duration',
            text: 'Duration',
            //sort: true
        },
            {
                dataField: 'playDate',
                text: 'Play Date',
                //sort: true
            },
            {
                dataField: 'releaseDate',
                text: 'Release Date',
                //sort: true
            },
        ];
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Manager Theater Overview
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
                                        <input name="movieName" onChange={this.filterTheaterName} />
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6}>
                                    <div className="form-group">
                                        <label>Movie Duration</label>
                                        <input type="number" name="minDuration" onChange={this.handleInputChange} /> - <input type="number" name="maxDuration" onChange={this.handleInputChange} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6} >
                                    <div>
                                        <label>Movie Release Date: </label>
                                        <DatePicker
                                            name="releasedAfter"
                                            selected={releasedAfter}
                                            onChange={d => this.handleDateChange("releasedAfter", d)}
                                            dateFormat="yyyy-mm-dd"
                                        />
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6} style={{width:'30%'}}>
                                    <div style={{width:'80%'}}>
                                        <DatePicker
                                            name="releasedBefore"
                                            selected={releasedBefore}
                                            onChange={d => this.handleDateChange("releasedBefore", d)}
                                            dateFormat="yyyy-mm-dd"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6} lg={6} md={6} >
                                    <div>
                                        <label>Movie Play Date: </label>
                                        <DatePicker
                                            name = "startDate"
                                            selected={this.state.startDate}
                                            onChange={this.handleStartChange}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                    </div>
                                </Col>

                                <Col sm={6} lg={6} md={6} style={{width:'30%'}}>
                                    <div style={{width:'80%'}}>
                                        <DatePicker
                                            name = "startDate"
                                            selected={this.state.startDate}
                                            onChange={this.handleStartChange}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <input type="checkbox" name="notPlayed" checked={notPlayed} onChange={this.handleCheckboxChange} />
                                Only Include Not Played Movies
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

                                    <BootstrapTable
                                        bootstrap4
                                        keyField="theaterName"
                                        data={movies}
                                        columns={columns}
                                    />


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

                            </Row>


                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default (TheaterOverview);