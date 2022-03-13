const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());

const port = 4000;

const connection = mysql.createConnection({
    host     : 'localhost',
    database : 'tokezpuu_overlazy',
    user     : 'tokezpuu_admin',
    password : 'U5{oBRo#tZ4S',
    port: 3306
});


app.get('/4537/API/V1/admin/', function(req, res) {
    if (req.query.auth) {
        connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "admin";', function (error, results, fields) {
            if (error)
                throw error;
        });

        connection.query('SELECT * FROM requests', function (error, results, fields) {
            if (error)
                throw error;
        
            res.send(results);
        });
    } else {
        res.status(418);
        res.send("Why are you reading my response Luke?");
    }
})

app.listen(port, () => {
	console.log(`Server running at port: ${port}`);
})
