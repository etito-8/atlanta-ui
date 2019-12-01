import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Input, CustomInput, Row, Col, CardBody, FormGroup} from 'reactstrap';

import axios from "axios";
import {connect} from 'react-redux';

import {
    firstName,
    lastName,
    userName,
    company,
    password,
    confPassword,
    streetAddress,
    city,
    state,
    zip,
    creditOne,
    creditTwo,
    creditThree,
    creditFour,
    creditFive
}
    from '../../store/actions/actions.js';

class ManagerCustomer extends Component {
    constructor(props){
        super(props)
        this.state = {
            passwordError: ''
        }
    }

    notify = () => toast('This manager has been successfully registered!', {
        type: 'success',
        position: 'top-right'
    })

    badRequest = () => toast('Invalid fields here', {
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
                passwordError: 'The passwords must be more than eight characters'
            }))
        } else {
            console.log(this.jsonGen(), '----->')
            return axios.post('http://localhost:8080/api/v1/auth/signup/manager-customer', this.jsonGen())
                .then(res => {
                    this.notify()
                    setTimeout(() =>  this.props.history.push('/login'), 3000)
                    console.log('The Manager-Customer has been registered!')
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
        let valids = [];
        if(this.props.creditOne.trim() !== "") valids.push(this.props.creditOne);
        if(this.props.creditTwo.trim() !== "") valids.push(this.props.creditTwo);
        if(this.props.creditThree.trim() !== "") valids.push(this.props.creditThree);
        if(this.props.creditFour.trim() !== "") valids.push(this.props.creditFour);
        if(this.props.creditFive.trim() !== "") valids.push(this.props.creditFive);

        return   {
            "city": (this.props.city).trim(),
            "companyName": (this.props.companyName).trim(),
            "creditCards": valids,
            "firstName": (this.props.firstName).trim(),
            "lastName": (this.props.lastName).trim(),
            "password": (this.props.password).trim(),
            "state": (this.props.state).trim(),
            "streetAddress": (this.props.streetAddress).trim(),
            "username": (this.props.userName).trim(),
            "zipcode": (this.props.zip).trim()
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
                        <h3><p className="text-center py-2">MANAGER-CUSTOMER REGISTRATION</p></h3>
                        <form name="formRegister" method="post" onSubmit={this.onSubmit}>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>First Name*</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="first-name"
                                                   onChange={(e) => this.props.dispatch(firstName(e.target.value))}
                                                   required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Username*</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="user-name"
                                                   onChange={(e) => this.props.dispatch(userName(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label>Last Name*</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="last-name"
                                                   onChange={(e) => this.props.dispatch(lastName(e.target.value))}
                                                   required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Company*</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="company"
                                                   onChange={(e) => this.props.dispatch(company(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Password*</label>
                                            <input className="form-control"
                                                   type="password"
                                                   name="password"
                                                   onChange={(e) => this.props.dispatch(password(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group" >
                                            <label>Confirm Password*</label>
                                            <input className="form-control"
                                                   type="password"
                                                   name="conf-password"
                                                   onChange={(e) => this.props.dispatch(confPassword(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>
                                </Row>


                                {/*Street Address row*/}
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Street Address*</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="street-address"
                                                   onChange={(e) => this.props.dispatch(streetAddress(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>
                                </Row>

                                {/*City, state and zipcode row*/}
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>City*</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="city"
                                                   onChange={(e) => this.props.dispatch(city(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div className="form-group">
                                            <label>State*</label>
                                            <div className="col-md-10">
                                                <select defaultValue="" className="custom-select custom-select-sm"
                                                        onChange={(e) => this.props.dispatch(state(e.target.value))}>
                                                    <option defaultValue="Alabama">AL</option>
                                                    <option defaultValue="Alaska">AK</option>
                                                    <option defaultValue="Arizona">AZ</option>
                                                    <option defaultValue="Arkansas">AR</option>
                                                    <option defaultValue="California">CA</option>
                                                    <option defaultValue="Colorado">CO</option>
                                                    <option defaultValue="Connecticut">CT</option>
                                                    <option defaultValue="Delaware">DE</option>
                                                    <option defaultValue="Florida">FL</option>
                                                    <option defaultValue="Georgia">GA</option>
                                                    <option defaultValue="Hawaii">HI</option>
                                                    <option defaultValue="Idaho">ID</option>
                                                    <option defaultValue="Illinois">IL</option>
                                                    <option defaultValue="Indiana">IN</option>
                                                    <option defaultValue="Iowa">IA</option>
                                                    <option defaultValue="Kansas">KS</option>
                                                    <option defaultValue="Kentucky">KY</option>
                                                    <option defaultValue="Louisiana">LA</option>
                                                    <option defaultValue="Maine">ME</option>
                                                    <option defaultValue="Maryland">MD</option>
                                                    <option defaultValue="Massachusetts">MA</option>
                                                    <option defaultValue="Michigan">MI</option>
                                                    <option defaultValue="Minnesota">MN</option>
                                                    <option defaultValue="Mississippi">MS</option>
                                                    <option defaultValue="Missouri">MO</option>
                                                    <option defaultValue="Montana">MT</option>
                                                    <option defaultValue="Nebraska">NE</option>
                                                    <option defaultValue="Nevada">NV</option>
                                                    <option defaultValue="New Hampshire">NH</option>
                                                    <option defaultValue="New Jersey">NJ</option>
                                                    <option defaultValue="New York">NY</option>
                                                    <option defaultValue="North Dakota">ND</option>
                                                    <option defaultValue="Ohio">OH</option>
                                                    <option defaultValue="Oklahoma">OK</option>
                                                    <option defaultValue="Oregon">OR</option>
                                                    <option defaultValue="Pennsylvania">PA</option>
                                                    <option defaultValue="Rhode Island">RI</option>
                                                    <option defaultValue="South Carolina">SC</option>
                                                    <option defaultValue="Tennessee">TN</option>
                                                    <option defaultValue="Texas">TX</option>
                                                    <option defaultValue="Utah">UT</option>
                                                    <option defaultValue="Vermont">VT</option>
                                                    <option defaultValue="Virginia">VA</option>
                                                    <option defaultValue="Washington">WA</option>
                                                    <option defaultValue="West Virginia">WV</option>
                                                    <option defaultValue="Wisconsin">WI</option>
                                                    <option defaultValue="Wyoming">WY</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div className="form-group">
                                            <label>Zipcode*</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="zip"
                                                   onChange={(e) => this.props.dispatch(zip(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Credit Card #1</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="credit-one"
                                                   onChange={(e) => this.props.dispatch(creditOne(e.target.value))}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Credit Card #3</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="credit-three"
                                                   onChange={(e) => this.props.dispatch(creditThree(e.target.value))}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label>Credit Card #2</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="credit-two"
                                                   onChange={(e) => this.props.dispatch(creditTwo(e.target.value))}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Credit Card #4</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="credit-four"
                                                   onChange={(e) => this.props.dispatch(creditFour(e.target.value))}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col >
                                        <div className="form-group" style={{width:'48%'}}>
                                            <label>Credit Card #5</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="credit-five"
                                                   onChange={(e) => this.props.dispatch(creditFive(e.target.value))}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <div className="pt-2 clearfix">
                                    <p className="float-right text-sm">
                                        <i>All fields with * are required here and at least one </i>
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
        companyName: state.names.companyName,
        password: state.passwords.password,
        confPassword: state.passwords.confPassword,
        streetAddress: state.addresses.streetAddress,
        city: state.addresses.cityName,
        state: state.addresses.stateName,
        zip: state.addresses.zipCode,
        creditOne: state.creditCards.creditOne,
        creditTwo: state.creditCards.creditTwo,
        creditThree: state.creditCards.creditThree,
        creditFour: state.creditCards.creditFour,
        creditFive: state.creditCards.creditFive,
    }
}

export default connect(mapStateToProps)(ManagerCustomer);
