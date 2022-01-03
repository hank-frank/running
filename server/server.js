const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const path = require('path');

const withAuth = require('./authCheck.js');

const Schedule = require("./models/Schedule.js");
const User = require("./models/User.js");
const secret = process.env.JWT_SECRET;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
const dotenv = require("dotenv");
dotenv.config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(express.static('dist'));

const { MongoClient } = require('mongodb');
const assert = require('assert');
// const uri = 'mongodb://localhost:27017';
// const uri = 'mongodb+srv://lambda:<password>@cluster0.gkcni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const uri = process.env.MONGODB_ATLAS_CLUSTER_URI;
const dbName = 'running';
const collection = 'users';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    console.log('accessing root');
})

app.get('/checkToken', withAuth, (req, res) => {
    res.status(200).send("it Worked")
})

app.post('/auth', (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) res.status(401);

    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("Auth route connected to DB");

        const db = client.db(dbName);
        const col = db.collection(collection);
        col.find({
            userName: userName,
            password: password
        }).toArray(function(err, result) {
            console.log(err);
            if (err) throw err;
            if (result.length > 0) {
                const person = result[0];

                const {password, id, ...userNoPassword} = person;

                const payload = { userName };
                const token = jwt.sign(payload, secret, { expiresIn: '96h'});

                res.cookie('token', token, { httpOnly: false }).status(200).send(userNoPassword);
            } else {
                console.log(`invalid search no result`);
                res.status(401).send({name: userName});
            }
        });
    });
})

app.get('/logout', (req, res) => {
    res.clearCookie('token').status(200).send({"logout": "success"});
})

app.post('/save', withAuth, (req, res) => {
    const { userData } = req.body;
    console.log('SAVE DATA: ', userData);

    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("/save route connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection(collection);

        let myQuery = { name: userData.userName };
        let newValues = { $set: { schedule: userData.schedule } };

        col.updateOne(myQuery, newValues, function(err, response) {
            if (err) throw err;
            // console.log(`res to update attempt: `, response.result);
            res.status(200).send(response.result);
        });
    });
})

app.post('/userData', withAuth, (req, res) => {
    console.log('AUTH ROUTE');
    try {
        const userName = req.body.userName;
        console.log("userNAME : ", userName);
        client.connect(function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            const col = db.collection(collection);

            col.find({userName: userName}).toArray(function (err, result) {
                if (err) throw err;
                const person = result[0];
                const {password, id, ...userNoPassword} = person;
                res.status(200).send(userNoPassword);
            });
        })
    } catch (e) {
        console.log("USER DATA ERR : ", e);
    }
// console.log('USER REQUEST');
//     const user = new User('h', 'henry', 'frank', new Schedule());
//
//     res.status(200).send(user);
})

app.post('/register', (req, res) => {
    const { userName, password, first, last } = req.body;
    if (!userName || !password) res.status(401);
console.log("REGISTER");
    const newUser = new User(userName, first, last, new Schedule());
    newUser.password = password;
console.log(newUser);
    client.connect(function(err, client) {
        console.log(err);
        assert.equal(null, err);

        const db = client.db(dbName);
        const col = db.collection(collection);

        //TODO check for existing before inserting, will allow duplicates...
        col.insertOne(newUser, (err, response) => {
            if (err) throw err;
            console.log('1 document inserted');

            console.log('response.ops : ', response);

            res.status(200).send(response.ops);
        })
    });

})


module.exports = app;
