var pessoaDAO = require('./query/pessoaDAO')

var get = function (req, res) {
  var promise = pessoaDAO.findAll();
  
  promise.then(function(result) {
    res.json(result);
  }).catch(function(error) {
    res.status(500).send('internal server error');
  })
};

module.exports = {
  get: get
};
