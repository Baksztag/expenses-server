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
const env = require('node-env-file');
env(__dirname + '/.env');
db_user = process.env.db_user;
db_password = process.env.db_password;
var db;
const db_link = 'mongodb://' + db_user + ':' + db_password + '@ds161041.mlab.com:61041/simple_crud_db';
MongoClient.connect(db_link, function(err, database)  {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(3001, function() {
        console.log('listening on 3001')
    })
});
