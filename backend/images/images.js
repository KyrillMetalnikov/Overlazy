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

    const imageLink = req.body.imageLink;
    const imageDate = req.body.imageDate;
    const imageUserId = req.body.userId;

	if (imageLink && imageDate && imageUserId) {
		connection.query("INSERT INTO images VALUES (?, ?, ?);", [imageUserId, imageDate, imageLink], function(error, results, fields) {
			if (error) {
                res.status(401);
                res.send("invalid format or image already exists")
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
		if (error){
		res.status(400);
		res.send('userId is empty');
		}
	});

	let userId = req.query.userId;

	if (userId) {
		connection.query('SELECT * FROM images WHERE images.id = ?;', [userId], function(error, results, fields) {
			if (error) {
                res.status(500);
				res.send("Unknown server error occured")
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

app.delete("/4537/API/V1/images/", function(req, res) {
	connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "images_delete";', function (error, results, fields) {
		if (error)
			throw error;
	});

	const imageLink = req.body.imageLink;
    const imageDate = req.body.imageDate;
    const imageUserId = req.body.userId;

	if (imageLink && imageDate && imageUserId) {
		connection.query("DELETE FROM images WHERE images.id=? AND images_date=? AND images_link=?;", [imageUserId, imageDate, imageLink], function(error, results, fields) {
			if (error) {
                res.status(401);
                res.send("invalid format or image doesn't exist");
				return;
            }

			if (results) {
				res.status(200);
				res.send('Success');
			} else {
                res.status(401);
                res.send("invalid format or image doesn't exist");
            }

		});
	} else {
		res.status(400);
		res.send('imageLink, imageDate, or imageUserId are empty');
	}
});


app.patch('/4537/API/V1/images/', function(req, res) {
	connection.query('UPDATE requests SET req_amount = req_amount + 1 WHERE req_name = "images_patch";', function (error, results, fields) {
		if (error)
			throw error;
	});

	let imageLink = req.body.imageLink;
    let imageDate = req.body.imageDate;
    let imageUserId = req.body.userId;
	let newImageLink = req.body.newImageLink;
	let newImageDate = req.body.newImageDate;

	const query = (column, newValue) => {
		return "UPDATE images SET " + column + "='" + newValue + "' WHERE images_link='" + imageLink + "' AND images_date='" + imageDate + "' AND id=" + imageUserId + ";";
	}

	console.error(query("images_date", newImageDate));
	if ((!(newImageLink == undefined) || !(newImageDate == undefined)) && !(imageUserId== undefined)) {
        if (!(newImageLink == undefined)) {
            connection.query(query("images_link", newImageLink), function(error, results, fields) {
                if (error) {
                    throw error;
                }

                if (results) {
                    res.status(200);
                    res.send('Update successful');
                } else {
                    res.status(401);
                    res.send('Update failed');
                }
				return;
            });
        } else if (!(newImageDate == undefined)) {
			connection.query(query("images_date", newImageDate), function(error, results, fields) {
                if (error) {
                    throw error;
                }

                if (results) {
                    res.status(200);
                    res.send('Update successful');
                } else {
                    res.status(401);
                    res.send('Update failed');
                }
				return;
            });
		}
	} else {
		res.status(400);
		res.send('UserId must not be empty along with either imageLink or imageDate');
	}
});

app.listen(port, () => {
	console.log(`Server running at port: ${port}`);
})
