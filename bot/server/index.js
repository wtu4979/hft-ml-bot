const express = require('express') 
const app = express()
const mysql = require('mysql');
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Yeyo!535',
    database: 'nerds'
});

app.listen(3001, () => {
    console.log('running on port 3001');
});[]