import React, { Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';

  import { connect } from 'react-redux';
  import PropTypes from 'prop-types';
  import { logout } from '../actions/authAction';

  class AppNavbar extends Component{
      state = {
          isOpen:false
      }

      static propTypes ={
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
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
                        
                        {this.props.isAuthenticated ? (
                         <NavLink onClick={this.props.logout} href='/'>Logout</NavLink>
                        ) : <NavLink href='/signup'>Signup</NavLink>}
                      
                    </NavItem>
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
          </div>
        );
      }
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.reg.isAuthenticated,
    error: state.error
  });

  export default connect(
    mapStateToProps,
    {logout}
  )(AppNavbar);
  