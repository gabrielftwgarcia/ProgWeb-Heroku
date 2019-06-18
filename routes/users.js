var express = require('express');
var router = express.Router();

const passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

// Referenciando o model de usuário
let User = require('../model/user');

// Registrando formulário
router.get('/registerUser', function (req, res) {
  // Renderizando para a view register  
  res.render('registerUser');
});

// Determinando se o usuário está cadastrado no sistema no ato de login
// router.post('/', function (req, res) {
//   var login = req.body.login;
//   var senha = req.body.senha;

//   User.findOne({ login: login, senha: senha }, function (err, user) {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     // Se o usuário não foi encontrado
//     if (!user) {
//       console.log("USUARIO NAO CADASTRADO NO SISTEMA")
//       return res.status(404).send();
//     }

//     // Se o usuário está cadastrado no sistema (login e senha conforme o que está no banco)
//     alert("Usuário cadastrado no sistema!");
//     return res.send(user);
//   });
// });

// Processo de cadastro
router.post('/registerUser', function (req, res) {
  const endereco = req.body.endereco;
  const email = req.body.email;
  const login = req.body.login;
  const senha = req.body.senha;

  // A verificação dos erros é feita em registerUser.hbs (o ideal era verificar aqui)
  // Se tudo estiver ok, crio um novo usuário
  let novoUsuario = new User({
    endereco: endereco,
    email: email,
    login: login,
    senha: senha
  });

  // FIXME: se email ou login já existem, não insere (fica um load infinito {tratar isso melhor})
  User.find({ email: email.email }, function (error, docs) {
    if (docs.length) {
      alert("Email já cadastrado!!");
    } else {
      novoUsuario.save(function (err) {
        if (err) {
          console.log(err);
          return;
        } else {
          // alert("É pra redirecionar pra algum lugar")
          res.redirect('/')
        }
      });
    }
  })


});

// Processo de login
router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function(req, res, next){
  console.log("passou pelo autenticate")

  passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;