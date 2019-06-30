import React, { Component } from 'react'
import { Button,Modal,
    ModalHeader,
    ModalBody, Form, FormGroup, Label, Input,Container } from 'reactstrap';
import ReactPhoneInput from 'react-phone-input-2'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import 'react-phone-input-2/dist/style.css'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SingupModal extends Component {
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
        ans: ''
    };

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
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
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                <ModalBody>

                    <h2>Signup Form</h2><br />
                    <Form>
                        <FormGroup>
                        <Label for="fname">Firstname</Label>
                        <Input type="input" name="fname" id="fname" placeholder="First name" />
                        </FormGroup>
                        <FormGroup>
                        <Label for="lname">Lastname</Label>
                        <Input type="input" name="lname" id="lname" placeholder="Last name" />
                        </FormGroup>
                        <FormGroup>
                        <Label for="phone">Phone</Label>
                        <ReactPhoneInput
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
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="bday">Birthdate</Label><br />
                            <Input
                                type="date"
                                name="bday"
                                id="bday"
                                placeholder="Birthdate"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Valid Email is required"
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="pass">Password</Label>
                        <Input type="password" name="pass" id="pass" placeholder="Password" />
                        </FormGroup>
                        <br />
                        <FormGroup>
                        <Label for="question">Question</Label>
                        <Input type="question" name="question" id="question">
                            <option value="What is your favorate fet">What is your favorate fet</option>
                            <option value="Who is your favorate teacher in grade school">Who is your favorate teacher in grade school</option>
                            <option value="What is your favorate sports">What is your favorate sports</option>
                            <option value="Who is your childhood friend">Who is your childhood friend</option>
                            <option value="What is your favorate music">What is your favorate music</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="ans">Answer</Label>
                        <Input type="input" name="ans" id="ans" placeholder="Answer" />
                        </FormGroup>

                        <Button>Submit</Button>
                    </Form>
                </ModalBody>
                </Modal>
                   </Container>  
            </div>
        ) 
    }
}

export default SingupModal;