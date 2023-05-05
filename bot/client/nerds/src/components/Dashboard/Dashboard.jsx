import React from "react";
//import "./Dashboard.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';





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
      <ul class="nav navbar-dark bg-dark">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page">NOWS</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Logout</a>
        </li>
      </ul>




      <div class="div2">
        <h1>Dashboard</h1>
      </div>
      <div class="div3">
        <h3>Username</h3>
        <h2>{account ? `$${account.cash}` : 'Loading...'}</h2>
      </div>


      <div class="container text-center">
  <div class="row">
    <div class="col">
    <table class="table">
     
     <thead>
     <tr className="table-dark">
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
    <div class="col">
    <table class="table">
        <thead>
        <tr className="table-dark">
                 <td colSpan="6">Account Info</td>
               </tr>
          <tr className="table-dark">
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

  const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedTime;
}

export default Dashboard;
