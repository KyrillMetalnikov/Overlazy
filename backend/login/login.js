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

app.post('/4537/API/V1/login/', function(req, res) {
	connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    
        console.log('Connected as id ' + connection.threadId);
    });

	connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "login";', function (error, results, fields) {
		if (error)
			throw error;
	});

	let username = req.body.username;
	let password = req.body.password;

	if (username && password) {
		connection.query('SELECT * FROM ACCOUNTS WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;

			if (results.length == 1) {
				res.status(200);
				res.send('login successful');
			} else {
				res.status(401);
				res.send('login failed');
			}

		});
	}

	connection.end();
});

app.listen(port, () => {
	console.log(`Server running at port: ${port}`);
})
  