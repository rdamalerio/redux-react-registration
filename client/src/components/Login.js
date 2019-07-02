import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/authAction';
import { clearErrors } from '../actions/errorActions';

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Alert
  } from 'reactstrap';


class Login extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isRegister: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };


    render() {

        return (
            <div>
                <Container>
                    {this.props.isRegister ? (
                    <Alert color='success'>Register account success, check your email in {this.props.payload.user.email} to activate your account </Alert>
                    ) : null}

                    <h2>Login</h2><br />
                    <Form>                    
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="pass">Password</Label>
                        <Input type="password" name="pass" id="pass"/>
                        </FormGroup>
                       

                        <Button>Login</Button>
                    </Form>
                   </Container>  
            </div>
        )
    }
}



const mapStateToProps = state => ({
    isRegister: state.reg.isRegister,
    payload: state.reg.payload,
    error: state.error
  });


  export default connect(
    mapStateToProps,
    { register, clearErrors }
  )(Login);