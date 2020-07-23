const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'dev';

const viewPlaylist = (req, res) => {
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

            songCollection.find({}).toArray((err, docs) => {
                if (err) {
                    return res.json({
                        status: 500,
                        message: "Cannot establish connection to database"
                    });
                } else {
                    res.json(docs);
                }
            });
        });
}

export default viewPlaylist;