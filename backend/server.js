import express from 'express';
import path from 'path';
import spotifyToken from './routes/spotifyToken';
import addToPlaylist from './routes/addToPlaylist';
import viewPlaylist from './routes/viewPlaylist';
const port = process.env.PORT || 8000;

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
  const directoryPath = __dirname.substring(0, __dirname.indexOf("/backend")) + "/frontend";
  res.sendFile(path.join(directoryPath, 'build', 'index.html'));
});

app.listen(port, function() { console.log("server is running on", port)});

app.get('/token', (req, res) => spotifyToken(req, res));

app.post('/add-song', (req, res) => addToPlaylist(req, res));

app.get('/playlist', (req, res) => viewPlaylist(req ,res));