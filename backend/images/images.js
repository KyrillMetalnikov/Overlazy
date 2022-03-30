const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
var app = express();

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


app.post('/4537/API/V1/images/', function(req, res) {
	connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "images_post";', function (error, results, fields) {
		if (error)
			throw error;
	});

	let imageLink = req.body.imageLink;
    let imageYear = req.body.imageYear;
    let imageMonth = req.body.imageMonth;
    let imageDay = req.body.imageDay;
    let imageUserId = req.body.userId;

    let imageDate = new Date(imageYear, imageMonth, imageDay).toJSON().slice(0, 10);

	if (imageLink && imageDate && imageUserId) {
		connection.query('INSERT INTO images VALUES ("?", "?", "?");', [imageUserId, imageDate, imageLink], function(error, results, fields) {
			if (error) {
                throw error;
            }

			if (results) {
				res.status(200);
				res.send('Success');
			} else {
                res.status(401);
                res.send("invalid format or image already exists")
            }

		});
	} else {
		res.status(400);
		res.send('imageLink, imageDate, or imageUserId are empty');
	}
});

app.get('/4537/API/V1/images/', function(req, res) {
	connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "images_get";', function (error, results, fields) {
		if (error)
			throw error;
	});

	let userId = req.query.userId;

	if (userId) {
		connection.query('SELECT * FROM images WHERE images.id = ?;', [userId], function(error, results, fields) {
			if (error) {
                throw error;
            }

			if (results.length > 0) {
				res.status(200);
				res.send(results);
			} else {
				res.status(204);
				res.send('No images found');
			}

		});
	} else {
		res.status(400);
		res.send('userId is empty');
	}
});

// app.patch('/4537/API/V1/images/', function(req, res) {
// 	connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "images_post";', function (error, results, fields) {
// 		if (error)
// 			throw error;
// 	});

// 	let imageLink = req.body.imageLink;
//     let imageDate = req.body.imageDate;
//     let imageUserId = req.body.userId;

// 	if ((imageLink || imageDate) && imageUserId) {
//         if (imageLink) {
//             connection.query('UPDATE images SET (images_link = ? AND images_date = ? AND id = ?);', [imageLink, imageDate, imageUserId], function(error, results, fields) {
//                 if (error) {
//                     throw error;
//                 }

//                 if (results.length == 1) {
//                     res.status(200);
//                     res.send('login successful');
//                 } else {
//                     res.status(401);
//                     res.send('login failed');
//                 }

//             });
//         }
// 	} else {
// 		res.status(400);
// 		res.send('imageUserId must not be empty along with either imageLink or imageDate');
// 	}
// });

app.listen(port, () => {
	console.log(`Server running at port: ${port}`);
})
