import React, { Component } from 'react'
import {
    Container,
    Button,
    Row,
    Col
  } from 'reactstrap';
import ico from '../../src/icons8-user-64.png';
import { connect } from 'react-redux';
import { upload } from '../actions/imageAction';
import { clearErrors } from '../actions/errorActions';


class Profile extends Component {

  state = {
    file: '',
    imagePreviewUrl: ''
  };

  imgStyle = {
    height: '100%',   
  };
  centerDiv = {
    textAlign: 'center',
    height: '80%',  
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('file', this.state.file);
    data.append('filename', this.state.file.name.value);
    
    //Attempt to upload image
    this.props.upload(this.state.file);

  }

  _handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file);
  };

  updateProfile = () =>{
    this.props.history.push('/update',this.props.profile);
  }

  updateProfile = () => {
    console.log("upload please");
  }

    render() {
        if(!this.props.isAuthenticated){       
            try{
              this.props.history.push("/");  
            }catch(e){
              console.log(e);
            }
            
        }

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} style={this.imgStyle} alt='img-profile'/>);
        }else{
          $imagePreview = (<img src={ico} style={this.imgStyle} alt='img-profile'/>);
        }
  
        return (
            <div>
                <Container>                                 
                    <Row>
                      <Col xs="6">
                      <h2>Profile</h2>
                          <p>Name: {(this.props.profile) ? this.props.profile.fname +' '+ this.props.profile.lname : null}</p>
                          <p>Phone: {(this.props.profile) ? this.props.profile.phone : null}</p>
                          <p>Country: {(this.props.profile) ? this.props.profile.country : null}</p> 
                          <p>Birthday: {(this.props.profile) ? this.props.bday : null}</p>   
                          <p>Email: {(this.props.profile) ? this.props.profile.email : null}</p>   
                          <p>Question: {(this.props.profile) ? this.props.profile.question : null}</p>   
                          <p>Answer:{(this.props.profile) ? this.props.profile.ans : null}</p>   
                      <Button color="primary" onClick={this.updateProfile}>Update Profile</Button>{' '}
                    </Col>
                    <Col xs="6">
                          <div style={this.centerDiv}> 
                            {$imagePreview}
                          </div>
                          <br />
                          <div style={this.centerDiv}>
                            <form onSubmit={this._handleSubmit}>
                              <input type="file" name="avatar" onChange={this._handleImageChange} />
                              <button type="submit" onClick={this._handleSubmit}>Update Profile Image</button>
                            </form>
                          </div>
                    </Col>
                  </Row>
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
    img: state.reg.imgage,
  });


export default connect(
    mapStateToProps,
    {upload,clearErrors }
)(Profile);