import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Input, CustomInput, Row, Col, CardBody} from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {connect} from 'react-redux';
import axios from 'axios';
import {firstName, lastName, userName, password, confPassword} from '../../store/actions/actions.js';


class UserRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            passwordError: ''
        }

    }

    notify = () => toast('The user has been successfully registered!', {
    type: 'success',
    position: 'top-right'
    })

    badRequest = () => toast('This user is already registered', {
        type: 'error',
        position: 'top-right'
    })



    onSubmit = (e) => {
        e.preventDefault();
        if((this.props.confPassword).trim() !== (this.props.password).trim()) {
            console.log('The passwords must be the same')
            this.setState(({
                passwordError: 'The passwords must be the same'
            }))
        } else if (this.props.password.length < 8){
            this.setState(({
                passwordError: 'The passwords must be more than eight chracters'
            }))
        } else {
            console.log(this.jsonGen(), '----->')
            return axios.post('http://localhost:8080/api/v1/auth/signup/user', this.jsonGen())
                .then(res => {
                    this.notify()
                    setTimeout(() =>  this.props.history.push('/login'), 3000)
                    console.log('The user has been successfully registered!')
                    // console.log(res);
                    // console.log(res.data);
                })
                .catch((error) => {
                    // const errorMessage = error.response ? error.response.message : error.response.data.message;
                    this.badRequest();
                });
        }
    }

    jsonGen = () => {
     return   {
            "firstName": (this.props.firstName).trim(),
            "lastName": (this.props.lastName).trim(),
            "password": (this.props.password).trim(),
            "username": (this.props.userName).trim()
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
                        <p className="text-center py-2"><h3>USER REGISTRATION</h3></p>
                        <form name="formRegister" method="post" onSubmit={this.onSubmit}>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input className="form-control" type="text"
                                                   name="first-name"
                                                   onChange={(e) => this.props.dispatch(firstName(e.target.value))}
                                                   required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input className="form-control" type="text"
                                                   name="user-name"
                                                   onChange={(e) => this.props.dispatch(userName(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input className="form-control" type="text"
                                                   name="last-name"
                                                   onChange={(e) => this.props.dispatch(lastName(e.target.value))}
                                                   required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input className="form-control" type="password"
                                                   name="password"
                                                   onChange={(e) => this.props.dispatch(password(e.target.value))}
                                                   required/>
                                                   <span>{this.state.passwordError}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="form-group wd-md">
                                            <label>Confirm Password</label>
                                            <input className="form-control" type="password"
                                                   name="conf-password"
                                                   onChange={(e) => this.props.dispatch(confPassword(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="pt-2 clearfix">
                                    <p className="float-right text-sm">
                                        <i>All fields are required</i>
                                    </p>
                                    <div className="float-left">
                                        <Link to="login" className="btn btn-primary mr-4">Back</Link>
                                        <button className="btn btn-primary" type="submit">Register</button>

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
        firstName: state.names.firstName,
        lastName: state.names.lastName,
        userName: state.names.userName,
        password: state.passwords.password,
        confPassword: state.passwords.confPassword
    }
}

export default connect(mapStateToProps)(UserRegister);
