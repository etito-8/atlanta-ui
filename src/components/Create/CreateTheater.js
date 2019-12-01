import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Input, CustomInput, Row, Col, CardBody, FormGroup} from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {connect} from 'react-redux';
import axios from 'axios';

import {
    theaterName,
    company,
    streetAddress,
    city,
    state,
    zip,
    capacity,
    managerName
}
    from '../../store/actions/actions.js';


class CreateTheater extends Component {
    constructor(props){
        super(props)
        this.state = {
            companies: [],
            managers: [],
            chosenComp:""
        }

    }

    notify = () => toast('Theater registered successfully!', {
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
        return axios.post('http://localhost:8080/api/v1/theater/new', this.jsonGen(),
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

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/company/all')
            .then(res => {
                this.setState({
                    companies: res.data
                }, () =>  console.log("it worked"));
            }).catch((error) => {
            // const errorMessage = error.response ? error.response.message : error.response.data.message;
            //this.badRequest();
            console.log("not working");
        });
    }

    handleCompanyChange = (e) => {
        const token = localStorage.getItem('currData');
        console.log(e.target.value, 'value ===>');
        axios.get(`http://localhost:8080/api/v1/company/${e.target.value}/eligible`,
            { 'headers': {'Authorization': `Bearer ${token}`} })
            //{'Authorization': "bearer " + token}
            .then(res => {
                this.setState({
                    managers: res.data
                }, () =>  console.log(this.state.managers, 'managers'));

            })
        //actual action creator is called from here
      this.props.dispatch(company(e.target.value));
    }

    jsonGen = () => {
        return   {
            "capacity": this.props.capacity,
            "city": (this.props.city).trim(),
            "companyName": (this.props.companyName).trim(),
            "managerUsername": (this.props.managerUserName).trim(),
            "state": (this.props.state).trim(),
            "streetAddress": (this.props.streetAddress).trim(),
            "theaterName": (this.props.theaterName).trim(),
            "zipcode": (this.props.zipcode).trim()
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
                        <h3><p className="text-center py-2">ADMIN CREATE THEATER</p></h3>
                        <form name="formRegister" method="post" onSubmit={this.onSubmit}>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="theater-name"
                                                   onChange={(e) => this.props.dispatch(theaterName(e.target.value))}
                                                   required/>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div className="form-group">
                                            <label>Company*</label>
                                            <div className="col-md-10">
                                                <select onChange={this.handleCompanyChange} defaultValue="" className="custom-select custom-select-sm"
                                                       >
                                                    <option value="">Select Company</option>
                                                    {this.state.companies.map(e =>
                                                    <option value={e}>{e}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>


                                {/*Street Address row*/}
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Street Address</label>
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
                                                   required
                                            />
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
                                            <label>Zipcode</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="zipcode"
                                                   onChange={(e) => this.props.dispatch(zip(e.target.value))}
                                                   required
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row >

                                    <Col style={{width:"50% !important"}}>
                                        <div className="form-group" style={{width:"50%"}}>
                                            <label>Capacity</label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="capacity"
                                                   onChange={(e) => this.props.dispatch(capacity(e.target.value))}
                                                   required
                                            />
                                        </div>
                                    </Col>

                                    <Col style={{justifyContent:"left"}}>
                                        <div className="form-group float-left" style={{width:"70%"}}>
                                            <label>Manager</label>
                                            <select defaultValue="" className="custom-select custom-select-sm "
                                                    onChange={(e) => this.props.dispatch(managerName(e.target.value))}>
                                                    <option value="">Select Manager</option>
                                                {
                                                    this.state.managers.map((manager) => {
                                                        return (
                                                            <option value={manager.username}>
                                                                {`${manager.firstName} ${manager.lastName}`}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </Col>

                                    <Col/>

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
        theaterName: state.names.theaterName,
        companyName: state.names.companyName,
        streetAddress: state.addresses.streetAddress,
        city: state.addresses.cityName,
        state: state.addresses.stateName,
        zipcode: state.addresses.zipCode,
        capacity: state.names.theaterCap,
        managerUserName: state.names.managerUserName,
    }
}

export default connect(mapStateToProps)(CreateTheater);
