const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  const directoryPath = __dirname.substring(0, __dirname.indexOf("/backend")) + "/frontend";
  res.sendFile(path.join(directoryPath, 'build', 'index.html'));
});

app.listen(port, function() { console.log("server is running on", port)});

const clientObject = {
  id: "375fa4cd18df42d6a1a0e4204620ea80",
  secret: "ae64e89eb0834af68e4c707cf977ed56"
};

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
      username: clientObject.id,
      password: clientObject.secret
    }
  }).then((results) => {
    if (results.status === 200) {
      return res.send(results.data.access_token);
    }
  }).catch((error) => {
    console.log(error);
  });
});