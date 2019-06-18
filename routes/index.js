var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url =  'mongodb://localhost:27017';
/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

router.post('/busca', function (req, res, next) {
  var searchText = req.body.search;
  console.log(searchText);
  var resultArray = [];
  mongo.connect(url, { useNewUrlParser: true }, function (err, client) {
    assert.equal(null, err);
    var db = client.db('projeto2Web');
    if(String(searchText) == ''){
      var cursor = db.collection('products').find();
    }else{
      var cursor = db.collection('products').find({"description": String(searchText)});
    }
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
