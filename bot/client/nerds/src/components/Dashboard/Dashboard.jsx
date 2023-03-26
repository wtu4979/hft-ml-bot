import React from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const { apiKey, secretApiKey } = location.state;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>API Key</h2>
        <p>{apiKey}</p>
      </div>
      <div>
        <h2>Secret API Key</h2>
        <p>{secretApiKey}</p>
      </div>
    </div>
  );
};

export default Dashboard;
