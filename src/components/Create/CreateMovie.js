import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Input, CustomInput, Row, Col, CardBody, FormGroup} from 'reactstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {connect} from 'react-redux';
import axios from 'axios';

import {
    movieName,
    movieDuration,
    releaseDate
}
    from '../../store/actions/actions.js';


class CreateMovie extends Component {
    constructor(props){
        super(props)
        this.state = {
            startDate: new Date()
        }
    }

    notify = () => toast('Movie registered successfully!', {
        type: 'success',
        position: 'top-right'
    })

    badRequest = () => toast('Invalid fields here', {
        type: 'error',
        position: 'top-right'
    })

    //react date picker method handler
    handleChange = (date) => {
        this.setState({
            startDate: date
        });
        this.props.dispatch(releaseDate(this.state.startDate))
    };

    componentDidMount() {
        //chained axios get call here, second call is attached as a callback
        this.props.dispatch(releaseDate(this.state.startDate))
    }

    onSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('currData');
        console.log(token,"F'IN TOKEN!")
        console.log(this.jsonGen(), '----->')
        return axios.post('http://localhost:8080/api/v1/movie/new', this.jsonGen(),
            { 'headers': {'Authorization': `Bearer ${token}`} })
        //{'Authorization': "bearer " + token})
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

    jsonGen = () => {
        return   {
            "duration": this.props.movieDuration,
            "movieName": (this.props.movieName).trim(),
            "releaseDate": (this.props.releaseDate),
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
                        <h3><p className="text-center py-2">ADMIN CREATE MOVIE</p></h3>
                        <form name="formRegister" method="post" onSubmit={this.onSubmit}>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="theater-name"
                                                   onChange={(e) => this.props.dispatch(movieName(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div className="form-group">
                                            <label>Duration</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="duration"
                                                   onChange={(e) => this.props.dispatch(movieDuration(e.target.value))}
                                                   required
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                {/*Street Address row*/}
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Release Date</label>
                                            <Row style={{marginLeft:"2px"}}>
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                                dateFormat="yyyy-MM-dd"
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
                                        <button className="btn btn-primary" type="submit">Create</button>
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
        movieDuration: state.dates.movieDuration,
        releaseDate: state.dates.releaseDate
    }
}

export default connect(mapStateToProps)(CreateMovie);

