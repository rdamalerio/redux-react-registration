import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
  } from 'reactstrap';

  class AppNavbar extends Component{
      state = {
          isOpen:false
      }

      toogle = () => {
          this.setState({
            isOpen: !this.state.isOpen
          });
      }

      openLoginModal = () => {
        this.refs.SignupModal.open();
      }

      render(){
        return(
          <div>
            <Navbar color='dark' dark expand='sm' className='mb-5'>
              <Container>
                <NavbarBrand href='/'>Simple Registration App</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href='/signup'>Register</NavLink>               
                    </NavItem>
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
          </div>
        );
      }
  }

  export default AppNavbar;