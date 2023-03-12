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
app.post('/Signup',(req, res) =>{

    const fullname = req.body.fullname;
    const password = req.body.password;
    const email = req.body.email;
    const confpassword = req.body.confpassword;
    const api_key = req.body.api_key

    db.query(
    "INSERT INTO login (fullname,email,pasword,confpassword,api_key) VALUES (?,?,?,?,?)" , 
    [fullname, email,password,confpassword,api_key],
    (err, result)=> {
        if (err) {
            res.send({err: err})
        }
        if (result) {
            res.send(result);
        } else{
            res.send({message: "Wrong email/password combination!"});
        }        
    
    }
    );
});

app.post('/Login', (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "Select * FROM login Where email = ? AND pasword = ?",
        [email, password],
        (err, result) => {
            console.log(err);
        }
    );
});
app.listen(3001, () => {
    console.log('running on port 3001');
});[]

