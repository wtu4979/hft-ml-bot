import React from "react";
import "./Dashboard.css";

const Dashboard = () => {

  return (

    <div class="parent">
    <div class="div1">
      <nav>
        <a className="logo" href="/Dashboard">NOWS</a>
        <a className="logout" href="/">Logout</a>
      </nav> 
    </div>
    <div class="div2">
      <h1>Dashboard</h1>
    </div>
    <div class="div3">
      <h3>Username</h3>
      <h2>$$Cash</h2>
    </div>
    <div class="div4">
      <h5>Latest Trades</h5>
      <ol>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ol>
    </div>
    <div class="div5"> 
      <h5>Graph</h5>
    </div>
    <div class="div6">
      <h5>Assets</h5>  
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    </div>
  );
};

export default Dashboard;
