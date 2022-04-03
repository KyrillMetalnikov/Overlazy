const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');

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

app.post('/4537/API/V1/signup/', function(req, res) {
	connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "signup";', function (error, results, fields) {
		if (error)
			throw error;
	});

	let username = req.body.username;
	let password = req.body.password;

	if (username && password) {
        bcrypt.hash(password, 5, function (err, hash) {
            connection.query('SELECT * FROM accounts WHERE username = ?', [username], function(error, results, fields) {
                if (error) throw error;
    
                if (results.length == 0) {
    
                    connection.query('INSERT INTO accounts(username, password) VALUES (?, ?)', [username, hash], function(error, results, fields) {
                        if (error) {
                            throw error;
                            // res.status(401);
                            // res.send('signup failed');
                            // return;
                        }
                        res.status(200);
                        res.send('signup successful');
                    })
                } else {
                    res.status(401);
                    res.send('signup failed');
                }
        })
		});
	} else {
		res.status(400);
		res.send('Username or Password are empty');
	}
});


app.listen(port, () => {
	console.log(`Server running at port: ${port}`);
})
  