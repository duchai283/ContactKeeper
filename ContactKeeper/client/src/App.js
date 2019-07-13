import React from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home';
import About from './components/layout/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/alert/Alert';
import PrivateRoute from './components/routing/PrivateRoute';

import ContactState from './context/contact/ContactState.js';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <React.Fragment>
              <NavBar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </React.Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
