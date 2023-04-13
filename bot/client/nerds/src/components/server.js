const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://dev-regal:NerdStreet@nerdsofwallstreet.rf2byhq.mongodb.net/test";

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("AlpacaUser");
    const users = db.collection("userData");

    const user = await users.findOne({ username: username, password: password });

    if (user) {
      res.status(200).json({
        apiKey: user.apiKey,
        secretApiKey: user.secretApiKey,
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }

    await client.close();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.error(err);
  }
});


app.post("/register", async (req, res) => {
  print("GOT TO REGISTER");
  const { username, password, apiKey, secretApiKey } = req.body;

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("AlpacaUser");
    const users = db.collection("userData");

    const existingUser = await users.findOne({ username: username });

    if (existingUser) {
      res.json({ success: false });
    } else {
      await users.insertOne({ username, password , apiKey, secretApiKey});
      res.json({ success: true });
    }

    await client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});


app.listen(3001, () => {
  console.log("Server running on port 3001");
});
