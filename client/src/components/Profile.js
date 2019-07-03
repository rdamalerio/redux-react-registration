import React, { Component } from 'react'
import {
    Container,
    Button
  } from 'reactstrap';

import { connect } from 'react-redux';
import { clearErrors } from '../actions/errorActions';


class Profile extends Component {

  updateProfile = () =>{
    this.props.history.push('/update',this.props.profile);
  }

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
                    <h2>Profile</h2>
                    <p>Name: {(this.props.profile) ? this.props.profile.fname +' '+ this.props.profile.lname : null}</p>
                    <p>Phone: {(this.props.profile) ? this.props.profile.phone : null}</p>
                    <p>Country: {(this.props.profile) ? this.props.profile.country : null}</p> 
                    <p>Birthday: {(this.props.profile) ? this.props.bday : null}</p>   
                    <p>Email: {(this.props.profile) ? this.props.profile.email : null}</p>   
                    <p>Question: {(this.props.profile) ? this.props.profile.question : null}</p>   
                    <p>Answer:{(this.props.profile) ? this.props.profile.ans : null}</p>   
                    <Button color="primary" onClick={this.updateProfile}>Update Profile</Button>{' '}
                </Container>
                
            </div>
        )
        
    }
}


const mapStateToProps = state => ({
    payload: state.reg.payload,
    error: state.error,
    isAuthenticated: state.reg.isAuthenticated,
    isRegister: state.reg.isRegister,
    profile: state.reg.user,
  });


export default connect(
    mapStateToProps,
    {clearErrors }
)(Profile);