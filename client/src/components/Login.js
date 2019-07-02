import React, { Component } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authAction';
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

    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isRegister: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
          // Check for register error
          if (error.id === 'LOGIN_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }
        }
        
      }

    onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    };
      
    onSubmit = e => {
        e.preventDefault();
    
        const { email, password } = this.state;
    
        const user = {
          email,
          password
        };
    
        // Attempt to login
        this.props.login(user);
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
                                placeholder='Email'
                                className='mb-3'
                                onChange={this.onChange}
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="pass">Password</Label>
                        <Input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            className='mb-3'
                            onChange={this.onChange}
                            />
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
    { clearErrors }
  )(Login);