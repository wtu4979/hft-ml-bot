import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, { Component } from 'react';
import './App.css';
import Lscontainer from "./components/LoginSignupContainer/Lscontainer.jsx";
import Dashboard from "./components/Dashboard/Dashboard";
class App extends Component {
  render() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={ <Lscontainer />}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </Router>
    </div>
  );
}
}

export default App;
