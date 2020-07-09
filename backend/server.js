import express from 'express';
import path from 'path';
import playlist from './routes/playlist';
import spotifyToken from './routes/spotifyToken';
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

app.post('/add-song', (req, res) => playlist(req, res));

app.get('/spotifyToken', (req, res) => spotifyToken(req, res));