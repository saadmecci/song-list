const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'dev';

const addToPlaylist = ({body}, res) => {
    MongoClient.connect(
    dbUrl, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    (err, client) => {
        if (err) {
            return res.json({
                status: 500,
                message: "Cannot establish connection to database"
            });
        }
        const db = client.db(dbName);
        const songCollection = db.collection("playlist");
        const songData = {
            imageUrl: body.imageUrl, 
            songName: body.name,
            songArtist: body.artist,
            albumName: body.album
        };

        songCollection.insertOne(
            songData,
            (err) => {
                if (err) {
                    return res.json({
                        status: 500,
                        message: "Cannot add song information to database"
                    });
                } else {
                    res.json({
                        status: 200,
                        message: "Sucessfully added song to database"
                    });
                }
            }
        );
    });
};

export default addToPlaylist;