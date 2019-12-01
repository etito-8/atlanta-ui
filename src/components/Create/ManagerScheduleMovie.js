import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Input, CustomInput, Row, Col, CardBody, FormGroup} from 'reactstrap';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
    playDate,
    releaseDate,
    movieName
}
    from '../../store/actions/actions.js';

import {connect} from 'react-redux';
import axios from "axios";
import {userName} from "../../store/actions/actions";

class ManagerScheduleMovie extends Component {

    constructor(props){
        super(props)
        this.state = {
            relDate: new Date(),
            playDate: new Date(),
            movies:[]
        }
    }

    notify = () => toast('Movie scheduled successfully!', {
        type: 'success',
        position: 'top-right'
    })

    badRequest = () => toast('Invalid fields here', {
        type: 'error',
        position: 'top-right'
    })

    onSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('currData');
        console.log(token,"F'IN TOKEN!")
        console.log(this.jsonGen(), '----->')
        return axios.post('http://localhost:8080/api/v1/movie/schedule', this.jsonGen(),
            { 'headers': {'Authorization': `Bearer ${token}`} })
        //{'Authorization': "bearer " + token})
            .then(res => {
                this.notify()
                setTimeout(() =>  this.props.history.push('/user-func'), 2000)
                console.log('The movie has been scheduled')
            })
            .catch((error) => {
                this.badRequest();
            });
    }

    //react date picker method handler
    handleRelease= (date) => {
        this.setState({
            relDate: date
        });
        this.props.dispatch(releaseDate(this.state.relDate))
    };

    //react date picker method handler
    handlePlay= (date) => {
        this.setState({
            playDate: date
        });
        this.props.dispatch(playDate(this.state.playDate))
    };

    componentDidMount() {
        const token = localStorage.getItem('currData');
        axios.get('http://localhost:8080/api/v1/movie/all',
            { 'headers': {'Authorization': `Bearer ${token}`} })
            .then(res => {
                this.setState({
                    movies: res.data
                }, () =>  console.log("it worked"));
            }).catch((error) => {
            //this.badRequest();
            console.log("not working");
        });

        //chained axios get call here, second call is attached as a callback
        this.props.dispatch(releaseDate(this.state.relDate))
        this.props.dispatch(playDate(this.state.playDate))
    }

    jsonGen = () => {
        return   {
            "movieName": (this.props.movieName).trim(),
            "releaseDate": (this.props.releaseDate),
            "playDate": (this.props.playDate),
        }
    }



    render() {
        return (
            <div className="block-center mt-4" style={{width:"800px"}}>
                {/* START card */}
                <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                    </div>
                    <div className="card-body">
                        <ToastContainer />
                        <h3><p className="text-center py-2">SCHEDULE MOVIE</p></h3>
                        <form name="formRegister" method="post" onSubmit={this.onSubmit}>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <div >
                                                <select required defaultValue="Select Movie"
                                                        className="custom-select custom-select-sm"
                                                        onChange={(e) => this.props.dispatch(movieName(e.target.value))}>
                                                    <option value="Select Movie">Select Movie</option>
                                                    {this.state.movies.map(e =>
                                                        <option value={e}>{e}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div className="form-group">
                                            <label>Release Date</label>
                                            <Row style={{marginLeft:"2px"}}>
                                                <DatePicker
                                                    selected={this.state.relDate}
                                                    onChange={this.handleRelease}
                                                />
                                            </Row>
                                        </div>
                                    </Col>

                                </Row>


                                {/*Street Address row*/}
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Play Date</label>
                                            <Row style={{marginLeft:"2px"}}>
                                                <DatePicker
                                                    selected={this.state.playDate}
                                                    onChange={this.handlePlay}
                                                />
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="pt-2 clearfix">
                                    <p className="float-right text-sm">
                                        <i>All fields are required here</i>
                                    </p>
                                    <div className="float-left">
                                        <Link to="login" className="btn btn-primary mr-4">Back</Link>
                                        <button className="btn btn-primary" type="submit">Add</button>
                                    </div>
                                </div>

                            </CardBody>

                        </form>

                    </div>
                </div>
                {/* END card */}

            </div>
        );
    }
}

// This function is essentially creating new key(s) that will become props on this component
const mapStateToProps = (state) => {
    console.log(state, 'state');
    return {
        movieName: state.names.movieName,
        playDate: state.dates.playDate,
        releaseDate: state.dates.releaseDate
    }
}

export default connect(mapStateToProps)(ManagerScheduleMovie);

