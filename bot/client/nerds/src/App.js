import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, { Component } from 'react';
import './App.css';
import Lscontainer from "./components/LoginSignupContainer/Lscontainer.jsx";
import Dashboard from "./components/Dashboard/Dashboard";
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous"></link>

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
