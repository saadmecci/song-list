import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const spotifyToken = (req, res) => {
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
};

export default spotifyToken;