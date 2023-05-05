import React from "react";
//import "./Dashboard.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import dogeImage from './doge.png'



const Dashboard = () => {
  const location = useLocation();
  const { apiKey, secretApiKey } = location.state;

  const [account, setAccount] = useState(null);
  const [assets, setAssets] = useState([]);
  const [positions, setPositions] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch("https://paper-api.alpaca.markets/v2/account", {
        method: "GET",
        headers: {
          "APCA-API-KEY-ID": apiKey,
          "APCA-API-SECRET-KEY": secretApiKey,
        },
      });
      const accountInfo = await response.json();
      setAccount(accountInfo);
      console.log(accountInfo);
    };

    const fetchAssets = async () => {
      const response = await fetch("https://paper-api.alpaca.markets/v2/assets?status=active", {
        method: "GET",
        headers: {
          "APCA-API-KEY-ID": apiKey,
          "APCA-API-SECRET-KEY": secretApiKey,
        },
      });
      const assetsInfo = await response.json();
      setAssets(assetsInfo);
    };


    const fetchPositions = async () => {
      const alpacaEndpoint = 'https://paper-api.alpaca.markets';
      const headers = {
        'APCA-API-KEY-ID': apiKey,
        'APCA-API-SECRET-KEY': secretApiKey,
      };

      try {
        const positionsResponse = await axios.get(`${alpacaEndpoint}/v2/positions`, { headers });
        setPositions(positionsResponse.data);
        //console.log(positionsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchTrades = async () => {
      const response = await fetch("https://paper-api.alpaca.markets/v2/orders?status=all&limit=15", {
        method: "GET",
        headers: {
          "APCA-API-KEY-ID": apiKey,
          "APCA-API-SECRET-KEY": secretApiKey,
        },
      });
      const tradesInfo = await response.json();
      console.log(tradesInfo);
      setTrades(tradesInfo);
    };






    fetchTrades();
    fetchPositions();
    fetchAccount();
    fetchAssets();
    // generateChartData();
  }, []);

  const dogePosition = positions.find(position => position.symbol === 'DOGEUSD');


  const generateChartData = () => {
    let chartData = [];
    let totalDoge = 0;

    // Get the last 5 trades
    const lastFiveTrades = trades.slice(-15);

    lastFiveTrades.forEach((trade) => {
      if (trade.symbol === "DOGE") {
        totalDoge += trade.side === "buy" ? parseInt(trade.qty) : -parseInt(trade.qty);
      }
      chartData.push({ time: new Date(trade.filled_at).toLocaleString(), totalDoge });
    });

    return chartData;
  };






  return (



    <div class="parent">
<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/dashboard">Nerds Of WallStreet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
           
            <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about">About</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Contact us
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://app.alpaca.markets/login?amp_device_id=C5NudxAN0ne1ACqwaxz6iU">
                alpaca account
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/Dashboard">Username </Nav.Link>
          </Nav>
          
          <Nav.Link href="/"> Logout</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>



      <div class="div2">
        <h1>Dashboard</h1>
      </div>
      <div class="div3">
        <h2>{account ? `$${account.cash}` : 'Loading...'}</h2>
      </div>

//////////////////////////////
      <div className="container text-center" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="col-6" style={{flex: 1}}>
          <table className="table">

            <thead>
            <tr className="table bg-warning">
              <td colSpan="5">Recent Trades</td>
            </tr>
            <tr className="table-dark">
              <th scope="col">Symbol</th>
              <th scope="col">Trade</th>
              <th scope="col">Shares</th>
              <th scope="col">Share Price</th>
              <th scope="col">Last Trade time</th>
            </tr>
            </thead>


            {trades ? (
                <tbody id="assets">
                {trades.map((trade, index) => (
                    <tr key={index}>
                      <td>{trade.symbol}</td>
                      <td>{trade.side}</td>
                      <td>{trade.qty}</td>
                      <td>${trade.filled_avg_price}</td>
                      <td>{formatTimestamp(trade.submitted_at)}</td>
                    </tr>
                ))}
                </tbody>
            ) : 'Loading...'}


          </table>
        </div>

        <div className="col-6">
          <div className="col-12">
             <table className="table">
            <thead>
            <tr className="table bg-warning">
              <td colSpan="7">Account Info</td>
            </tr>
            <tr className="table-dark">
              <th scope="col"></th>
              <th scope="col">Symbol</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cost Basis</th>
              <th scope="col">Current Price</th>
              <th scope="col">Last Day Price</th>
              <th scope="col">Change Today</th>
            </tr>
            </thead>
            <tbody id="AssetCall">
            {dogePosition ? (
                <tr>
                  <td>
                    <im src="doge.png"/>
                  </td>
                  <td> {dogePosition.symbol}</td>
                  <td>{dogePosition.qty}</td>
                  <td>${dogePosition.cost_basis}</td>
                  <td> ${dogePosition.current_price}</td>
                  <td> ${dogePosition.lastday_price}</td>
                  <td>{dogePosition.change_today}</td>
                </tr>
            ) : (<tr>
              <th scope="row">1</th>
              <td> Loading</td>
            </tr>)}
            </tbody>
          </table>
          </div>
          <div className="col-12">
            <img src={dogeImage} className="img-fluid" alt="Responsive image"/>
          </div>
        </div>


</div>










 

    </div>
  );

};



function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  const formattedTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedTime;
}

export default Dashboard;
