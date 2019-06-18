/*
var express = require('express');
var router = express.Router();
var userController = require(/controllers/userController);

// GET users listing. 
router.get(userController);

module.exports = router;
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Express' });
});

module.exports = router;
