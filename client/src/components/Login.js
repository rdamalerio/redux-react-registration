import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
    Container
  } from 'reactstrap';

class Login extends Component {
    render() {
        return (
            <div>
                <Container>
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


export default Login;