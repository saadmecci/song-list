const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const axios = require('axios');
require('dotenv').config();
const port = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, 'build')));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'dev';


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


function addSong(body) {
  console.log(body)
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    addData(body, db, function() {
      client.close();
    })
  });
}

const addData = function (body, db, callback) {
  const songCollection = db.collection("playlist");
  songCollection.insertOne(
      {body},
      function (err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      assert.equal(1, result.ops.length);
      console.log("inserted a song");
      callback(result);
    }
  );
}

app.post('/add-song', async (req, res) => {
  addSong(req.body)
  res.json({
    status: 200,
    data: req.body
  })
})

app.get('/', function (req, res) {
  const directoryPath = __dirname.substring(0, __dirname.indexOf("/backend")) + "/frontend";
  res.sendFile(path.join(directoryPath, 'build', 'index.html'));
});

app.listen(port, function() { console.log("server is running on", port)});

app.get('/token', function (req, res) {
  axios({
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    params: {
      grant_type: "client_credentials"
    },
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
      username: process.env.SPOTIFY_CLIENT_ID,
      password: process.env.SPOTIFY_CLIENT_SECRET
    }
  }).then((results) => {
    if (results.status === 200) {
      return res.send(results.data.access_token);
    }
  }).catch((error) => {
    console.log(error);
  });
});