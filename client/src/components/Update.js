import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input,Container,Alert } from 'reactstrap';
import ReactPhoneInput from 'react-phone-input-2'
import { CountryDropdown} from 'react-country-region-selector';

import 'react-phone-input-2/dist/style.css'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { update} from '../actions/authAction';
import { clearErrors } from '../actions/errorActions';


class Update extends Component {
    state = {
        id: this.props.location.state._id,
        fname: this.props.location.state.fname,
        lname: this.props.location.state.lname,
        phone: this.props.location.state.phone,
        country: this.props.location.state.country,
        bday: this.props.location.state.bday,
        email: this.props.location.state.email,
        question: this.props.location.state.question,
        ans: this.props.location.state.ans,
        msg: null,
        error: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        update: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          // Check for register error
          if (error.id === 'UPDATE_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }         
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

        const { id,fname,lname,phone,country,bday,email,pass,question,ans} = this.state;

        // Create user object
        const newUser = {
            id,fname,lname,phone,country,bday,email,pass,question,ans
        };
        // Attempt to register
        this.props.update(newUser);
   
    };

    
    render() {  
        

       if(!this.props.isAuthenticated){       
            try{
              this.props.history.push("/");  
            }catch(e){
              console.log(e);
            }      
        }   
             
        return (
            <div>
                <Container>
                    {this.props.updateStatus ? (
                    <Alert color='success'>Update Success</Alert>
                    ) : null}
                    <h2>Update profile</h2><br />
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                        <Label for="fname">Firstname</Label>
                        <Input type="input" name="fname" id="fname" placeholder="First name" value={this.state.fname || this.props.location.state.fname} onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="lname">Lastname</Label>
                        <Input type="input" name="lname" id="lname" value={this.state.lname || this.props.location.state.lname} placeholder="Last name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="phone">Phone</Label>
                        <ReactPhoneInput
                            value={this.state.phone || this.props.location.state.phone}
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
                                value={this.state.country || this.props.location.state.country}
                                onChange={this.countryOnChange}
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="bday">Birthdate</Label><br />
                            <Input
                                type="date"
                                name="bday"
                                id="bday"
                                value={this.state.bday || this.props.location.state.bday}
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
                                value={this.state.email || this.props.location.state.email}
                                placeholder="Valid Email is required"
                                onChange ={this.onChange}
                            />
                        </FormGroup>
                        <br />
                        <FormGroup>
                        <Label for="question">Question</Label>
                        <Input type="select" name="question" value={this.state.question || this.props.location.state.question} id="question" onChange={this.onChange}>
                            <option value="What is your favorate fet">What is your favorate pet</option>
                            <option value="Who is your favorate teacher in grade school">Who is your favorate teacher in grade school</option>
                            <option value="What is your favorate sports">What is your favorate sports</option>
                            <option value="Who is your childhood friend">Who is your childhood friend</option>
                            <option value="What is your favorate music">What is your favorate music</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="ans">Answer</Label>
                        <Input type="input" name="ans" id="ans" value={this.state.ans || this.props.location.state.ans} placeholder="Answer" onChange={this.onChange}/>
                        </FormGroup>

                        <Button>Save Update</Button>
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
    updateStatus: state.reg.updateStatus,
    error: state.error
  });

  export default connect(
    mapStateToProps,
    { update, clearErrors }
  )(Update);