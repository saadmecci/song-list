const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'dev';

const playlist = ({body}, res) => {
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
        const songData = {name: body.name, 
            something: body.something};

        songCollection.insertOne(
            songData,
            (err) => {
                if (err) {
                    return res.json({
                        status: 500,
                        message: "Cannot add song information to database"
                    });
                }
            }
        );
    });
};

export default playlist;