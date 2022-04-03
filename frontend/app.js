var express = require('express');
var path = require('path');
//var swaggerUi = require('swagger-ui-express');

var app = express();
app.use(express.static('public'));

const hostname = 'localhost';
const port = 3000;

app.get('/COMP4537/termproject/API/V1/documentation',  function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'swagger.html'))
});

//swaggerDocument = require('./public/swagger.json');

// app.use('/COMP4537/termproject/API/V1/documentation',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument)  
// )

app.get('/COMP4537/termproject/API/V1/admin.html',  function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'admin/admin.html'))
});

app.get('/COMP4537/termproject/API/V1/login.html',  function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'login/login.html'))
});

app.get('/COMP4537/termproject/API/V1/images.html',  function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'images/images.html'))
});

app.get('/COMP4537/termproject/API/V1/overlay', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'overlay/overlay.html'))
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
