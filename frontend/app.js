var express = require('express');
var path = require('path');
var swaggerUi = require('swagger-ui-express');

var app = express();
app.use(express.static('public'));

const hostname = 'localhost';
const port = 3000;

swaggerDocument = require('./public/swagger.json');

app.use('/COMP4537/termproject/API/V1/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)  
)

app.get('/COMP4537/termproject/API/V1/admin.html',  function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'))
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
