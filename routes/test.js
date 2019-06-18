var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017';

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.render('testShowProduct');
});*/

router.get('/', function (req, res, next) {
  var resultArray = [];
  mongo.connect(url, { useNewUrlParser: true }, function (err, client) {
    assert.equal(null, err);
    var db = client.db('projeto2Web');
    var cursor = db.collection('products').find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function () {
      client.close();
      res.render('index', { products: resultArray });
    });
  });
});

module.exports = router;
