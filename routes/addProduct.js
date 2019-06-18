var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, 'public/images/')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({storage})

var url =  'mongodb://localhost:27017';

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('addProduct', { title: 'Express' });
});


// Método que faz a inserção no banco de dados
router.post('/insert', upload.single('image'), function(req, res, next){
    console.log(req.file.path);
    console.log(req.file);


    var product ={
        description: req.body.description,
        image:  String('/images/' + req.file.filename)
    };
    console.log('image é:' +product.image);

    mongo.connect(url,{ useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        var db = client.db('projeto2Web');
        db.collection('products').insertOne(product, function(err, result){
            assert.equal(null, err);
            console.log('Produto Adicionado, fechando o bando de dados')
            client.close();
            res.redirect('../');
        });
    });
});

module.exports = router;
