import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, CustomInput, Container, Row, Col } from 'reactstrap';

import FormValidator from '../Forms/FormValidator.js';

class Register extends Component {

    state = {
        formRegister: {
            email: '',
            password: '',
            password2: '',
            terms: false
        }
    }

     /**
      * Validate input using onChange event
      * @param  {String} formName The name of the form in the state object
      * @return {Function} a function used for the event
      */
    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                [input.name]: value,
                errors: {
                    ...this.state[form.name].errors,
                    [input.name]: result
                }
            }
        });

    }

    onSubmit = e => {
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')

        e.preventDefault()
    }

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return  this.state[formName] &&
                this.state[formName].errors &&
                this.state[formName].errors[inputName] &&
                this.state[formName].errors[inputName][method]
    }

    render() {
        return (
            <Container style={{margin:"0px auto", width:"500px"}}>
           <Row>
               <Col>
                {/* START card */}
                <div className="card card-flat" style={{margin:"0px auto", height:"400px"}}>
                    <div className="card-header text-center bg-dark">
                        {/*<a href="">*/}
                        {/*    <img className="block-center" src="img/logo.png" alt="Logo"/>*/}
                        {/*</a>*/}
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2"><h3>Register Navigation</h3></p>

                        {/*will be updated with appropriate links>*/}
                        <Link to="login" className="btn btn-block btn-primary">User Only</Link>
                        <Link to="login" className="btn btn-block btn-primary">Customer Only</Link>
                        <Link to="login" className="btn btn-block btn-primary">Manager Only</Link>
                        <Link to="login" className="btn btn-block btn-primary">Manager-Customer Only</Link>
                        <Link to="login" className="btn btn-block btn-primary">Back</Link>
                    </div>
                </div>


                {/* END card */}

               </Col>

               </Row>
            </Container>
        );
    }
}

export default Register;
