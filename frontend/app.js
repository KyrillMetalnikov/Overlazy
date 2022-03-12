var express = require('express');
var path = require('path');

var app = express();
app.use(express.static('public'));

const hostname = 'localhost';
const port = 3000;

app.get('/COMP4537/termproject/API/V1/admin.html',  function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'))
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
