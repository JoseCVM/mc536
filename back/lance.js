var lanceDAO = require('./query/lanceDAO')

var get = function (req, res) {
  var promise = lanceDAO.findAll();
  promise.then(function(lances) {
    res.json(lances);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

module.exports = {
  get: get
}
