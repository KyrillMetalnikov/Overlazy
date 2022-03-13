const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

const connection = mysql.createConnection({
    host     : 'localhost',
    database : 'tokezpuu_overlazy',
    user     : 'tokezpuu_admin',
    password : 'U5{oBRo#tZ4S',
    port: 3306
});

const port = 4000;

app.get('/4537/API/V1/admin', function(req, res) {
    let auth = req.body.auth;

    if (auth) {
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        
            console.log('Connected as id ' + connection.threadId);
        });

        connection.query('UPDATE requests.admin SET req_amount = req_amount + 1;', function (error, results, fields) {
            if (error)
                throw error;
        });

        connection.query('SELECT * FROM requests', function (error, results, fields) {
            if (error)
                throw error;
        
            res.send(results);
        });
    
        connection.end();
    }
})