/**
 * Created by jkret on 03/06/2017.
 */
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
var db;
MongoClient.connect(process.env.MONGODB_URI, function(err, database)  {
    if (err) {
        return console.log(err);
    }
    db = database;
    var server = app.listen(process.env.PORT || 8080, function() {
        const port = server.address().port;
        console.log("App now running on port", port);
        // console.log('listening on 3001')
    })
});


app.get('/', (req, res) => {
    res.send({status: 'ok'})
});

app.get('/v1/expenses', (req, res) => {
    db.collection('expenses').find().toArray((err, result) => {
        if (err) {
            res.send({error: err})
        }
        res.send(result)
    });
});

app.get('/v1/expenses/:id', (req, res) => {
    db.collection('expenses').find(ObjectId(req.params.id)).toArray((err, result) => {
        if (err) {
            res.send({error: err})
        }
        console.log(result[0]);
        res.send(result[0])
    });
});

app.post('/v1/expenses', (req, res) => {
    console.log(req.body);
    try {
        db.collection('expenses').insertOne(req.body);
        res.send({status: "ok"})
    } catch (e) {
        res.send({error: e})
    }
});
