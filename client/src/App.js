import React,{ Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Singup from './components/Singup';
import Login from './components/Login';
import Profile from './components/Profile';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authAction';


class App extends Component {
  
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
      return (
        <Provider store={store}>
        <div className="App">     
          <AppNavbar />
            <Router>
                <Switch>
                      <Route exact path='/' component={Login} />
                      <Route path='/signup' component={Singup} />
                      <Route path='/profile' component={Profile} />
                </Switch>
            </Router>
        </div>
        </Provider>       
    );
  }
  
}

export default App;
