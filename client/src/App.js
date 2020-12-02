import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const socket = io('http://localhost:3001');

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
