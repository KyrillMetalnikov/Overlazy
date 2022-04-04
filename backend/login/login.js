const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
var app = express();
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());
const port = 4000;

const connection = mysql.createConnection({
    host     : 'localhost',
    database : 'tokezpuu_overlazy',
    user     : 'tokezpuu_admin',
    password : 'U5{oBRo#tZ4S',
    port: 3306
});


app.post('/4537/API/V1/login/', function(req, res) {
	connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "login_post";', function (error, results, fields) {
		if (error)
			throw error;
	});

	let username = req.body.username;
	let password = req.body.password;

	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ?', [username], function(error, results, fields) {
			if (error) {
				res.status(401);
				res.send("Wrong username/password combo");
				return;
			}

			if (results.length < 1) {
				res.status(401);
				res.send("Wrong username/password combo");
				return;
			}

			bcrypt.compare(password, results[0].password, function (err, result) {
				if (result == true) {
					if (results.length == 1) {
						res.status(200);
						res.send("Login successful")
					} else {
						res.status(401);
						res.send('Login failed');
					}
				} else {
					res.status(401);
					res.send('Wrong username/password combo');
				}
			})
		});
	} else {
		res.status(400);
		res.send('Username or Password are empty');
	}
});

app.delete("/4537/API/V1/login/", function(req, res) {
	connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "login_delete";', function (error, results, fields) {
		if (error)
			throw error;
	});

	let username = req.body.username;
	let password = req.body.password;

	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ?', [username], function(error, results, fields) {
			if (error) throw error;

			if (results.length < 1) {
				res.status(401);
				res.send("Account not found to delete");
				return;
			}

			bcrypt.compare(password, results[0].password, function (err, result) {
				if (result == true) {
					if (results.length == 1) {
						connection.query('DELETE FROM accounts WHERE username = ? AND password = ?', [username, results[0].password], function(error, results, fields) {
							if (error) throw error;
				
							res.status(200);
							res.send("Account deleted. Cya l8r Nurd!");
						})
					} else {
						res.status(401);
						res.send('Account not found to delete');
					}
				} else {
					res.status(401);
					res.send('Delete failed');
				}
			})
		})
	} else {
		res.status(400);
		res.send('Username or Password are empty');
	}
});


app.listen(port, () => {
	console.log(`Server running at port: ${port}`);
})
  