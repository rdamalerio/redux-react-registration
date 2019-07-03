import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input,Container,Alert } from 'reactstrap';
import ReactPhoneInput from 'react-phone-input-2'
import { CountryDropdown} from 'react-country-region-selector';

import 'react-phone-input-2/dist/style.css'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/authAction';
import { clearErrors } from '../actions/errorActions';


class Singup extends Component {
    state = {
        modal: false,
        fname: '',
        lname: '',
        phone: '',
        country: '',
        bday: '',
        email: '',
        pass: '',
        question: '',
        ans: '',
        msg: null,
        error: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          // Check for register error
          if (error.id === 'REGISTER_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }         
        }

        if(this.props.isAuthenticated || this.props.isRegister){       
            this.props.history.push("/profile");
        }
          
    }

    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    phoneOnChange = e => {
        this.setState({
            phone: e
         });
    };
    countryOnChange = e => {
        this.setState({
            country: e
         });
    }; 


    onSubmit = e => {
        e.preventDefault();

        const { fname,lname,phone,country,bday,email,pass,question,ans} = this.state;

        // Create user object
        const newUser = {
            fname,lname,phone,country,bday,email,pass,question,ans
        };
        // Attempt to register
        this.props.register(newUser);
   
    };

    
    render() {
        
        return (
            <div>
                <Container>
                    {this.state.msg ? (
                    <Alert color='danger'>{this.state.msg}</Alert>
                    ) : null}
                    <h2>Signup Form</h2><br />
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                        <Label for="fname">Firstname</Label>
                        <Input type="input" name="fname" id="fname" placeholder="First name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="lname">Lastname</Label>
                        <Input type="input" name="lname" id="lname" placeholder="Last name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="phone">Phone</Label>
                        <ReactPhoneInput
                            value={this.state.phone}
                            onChange={this.phoneOnChange}
                            inputExtraProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true
                            }}                         
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="country">Country</Label><br />
                            <CountryDropdown
                                name='country'
                                id='country'
                                value={this.state.country}
                                onChange={this.countryOnChange}
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="bday">Birthdate</Label><br />
                            <Input
                                type="date"
                                name="bday"
                                id="bday"
                                placeholder="Birthdate"
                                onChange={this.onChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Valid Email is required"
                                onChange ={this.onChange}
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="pass">Password</Label>
                        <Input type="password" name="pass" id="pass" placeholder="Password" onChange={this.onChange}/>
                        </FormGroup>
                        <br />
                        <FormGroup>
                        <Label for="question">Question</Label>
                        <Input type="select" name="question" id="question" onChange={this.onChange}>
                            <option value="What is your favorate fet">What is your favorate pet</option>
                            <option value="Who is your favorate teacher in grade school">Who is your favorate teacher in grade school</option>
                            <option value="What is your favorate sports">What is your favorate sports</option>
                            <option value="Who is your childhood friend">Who is your childhood friend</option>
                            <option value="What is your favorate music">What is your favorate music</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="ans">Answer</Label>
                        <Input type="input" name="ans" id="ans" placeholder="Answer" onChange={this.onChange}/>
                        </FormGroup>

                        <Button>Submit</Button>
                    </Form>
                    <br />
                   </Container>  
            </div>
        ) 
    }
}

  const mapStateToProps = state => ({
    isRegister: state.reg.isRegister,
    isAuthenticated: state.reg.isAuthenticated,
    error: state.error
  });

  export default connect(
    mapStateToProps,
    { register, clearErrors }
  )(Singup);