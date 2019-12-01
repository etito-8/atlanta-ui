import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Input,
    CustomInput,
    Container,
    Row,
    Col,
    Collapse,
    Card,
    CardDeck,
    CardBody,
    CardHeader,
    CardFooter,
    CardTitle,
    CardText,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Jumbotron, Button
} from 'reactstrap';

import {connect} from 'react-redux';
import axios from 'axios';

import {
    resetState,
    userName,
    password,
}
    from '../../store/actions/actions.js';


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            passwordError: ''
        }
    }

    componentDidMount() {
        localStorage.removeItem('currData');
        this.props.dispatch(resetState())
    }

    notify = () => toast('This user has signed in!', {
        type: 'success',
        position: 'top-right'
    })

    badRequest = () => toast('Invalid fields here', {
        type: 'error',
        position: 'top-right'
    })

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.jsonGen(), '----->')
        return axios.post('http://localhost:8080/api/v1/auth/signin', this.jsonGen())
            .then(res => {
                localStorage.setItem('currData', res.data.accessToken);
                this.notify()
                console.log(res.data);
                setTimeout(() =>  this.props.history.push('/user-func'), 3000)
                console.log('The customer has been successfully signed in!')
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
            "password": (this.props.password).trim(),
            "username": (this.props.userName).trim(),
        }
    }


    render() {
        console.log(this.props, 'props');

        return (
                <Container style={{margin:"50px auto"}}>
                <Row >
                    <Col>
                <div className="card card-flat" >
                    <div className="card-header text-center bg-dark">
                    </div>
                    <div className="card-body">
                        <ToastContainer />
                        <h3><p className="text-center py-2"> Atlanta Movie Login </p></h3>
                        <form className="mb-3" name="formLogin" method="post" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="text"
                                        name="use-name"
                                        className="border-right-0"
                                        placeholder="Enter username"
                                        onChange={(e) => this.props.dispatch(userName(e.target.value))}
                                        />
                                        {/*// value={this.state.formLogin.email}/>*/}
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-envelope"></em>
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="password"
                                        id="id-password"
                                        name="password"
                                        className="border-right-0"
                                        placeholder="Password"
                                        onChange={(e) => this.props.dispatch(password(e.target.value))}
                                        //value={this.state.formLogin.password}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock"></em>
                                        </span>
                                    </div>
                                    <span className="invalid-feedback">Field is required</span>
                                </div>
                            </div>
                            <div className="clearfix">
                                <CustomInput type="checkbox" id="rememberme"
                                    className="float-left mt-0"
                                    name="remember"
                                    label="Remember Me">
                                </CustomInput>
                                <div className="float-right">
                                    <Link to="login" className="text-muted">Forgot your password?</Link>
                                </div>
                            </div>

                            {/*//THIS IS how onSubmit knows it's called.*/}
                            <button className="btn btn-block btn-primary mt-3" type="submit">Login</button>
                        </form>
                        <p className="pt-3 text-center">Need to Signup?</p>

                    </div>
                </div>
                    </Col>

                    <Col >
                        <div>
                            <Card outline color="primary" className="wd-md" >
                                <CardHeader className="text-white bg-primary"><h4>Register Navigation</h4></CardHeader>
                                <CardBody>

                                    <CardTitle>Register here</CardTitle>
                                    <Link to="userRegister" className="btn btn-block btn-primary">User Only</Link>
                                    <Link to="customerRegister" className="btn btn-block btn-primary">Customer Only</Link>
                                    <Link to="managerOnly" className="btn btn-block btn-primary">Manager Only</Link>
                                    <Link to="managerCustomer" className="btn btn-block btn-primary">Manager-Customer Only</Link>
                                    <Link to="login" className="btn btn-block btn-primary">Back</Link>

                                </CardBody>
                            </Card>
                        </div>
                    </Col>

                </Row>
                </Container>

        );
    }
}

// This function is essentially creating new key(s) that will become props on this component
const mapStateToProps = (state) => {
    console.log(state, 'state');
    return {
        userName: state.names.userName,
        password: state.passwords.password
    }
}

export default connect(mapStateToProps)(Login);
