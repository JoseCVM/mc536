var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dinamarca1029',
  database : 'trab'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var sql = "INSERT INTO pessoa (id_pessoa, tipo_documento, documento, nome) VALUES (1, 'CPF', '3123123', 'joao')";
connection.query(sql, function (err, result) {
if (err) throw err;
console.log("1 record inserted");
});


connection.query('SELECT * FROM pessoa', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
});


connection.end();
