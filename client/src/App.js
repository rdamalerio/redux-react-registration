import React,{ Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Singup from './components/Singup';
import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
      <Provider store={store}>
      <div className="App">
        
        <AppNavbar />
        <BrowserRouter>
          <Router>
              <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/signup' component={Singup} />
              </Switch>
          </Router>
        </BrowserRouter>
      </div>
      </Provider>       
  );
}

export default App;
