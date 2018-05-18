var mysql = require('mysql');
var express = require('express');
var app = express();


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'trab'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql");
});

app.get('/pessoa', function (req, res) {

	connection.query('SELECT * FROM pessoa', function (error, results, fields) {
		if (error) throw error;
	  	console.log('Got from mysql: ', results[0]);

		res.json(results[0]);
	});
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
