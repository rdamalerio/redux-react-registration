import React,{ Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Singup from './components/SingupModal';
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
      <Login />
      <Singup />
    </div>
    </Provider>
  );
}

export default App;
