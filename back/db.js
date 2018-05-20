var mysql = require('mysql');

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

var query = function (query) {

  var promise = new Promise(function (resolve, reject) {

    var queryCallback = function(error, results, fields) {
      if (error) throw error;

      console.log('Got from mysql: ', results[0]);

      resolve(results);
    };

    connection.query(query, queryCallback);
  });

  return promise
}

module.exports = {
  connection: connection,
  query: query
};
