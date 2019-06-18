const LocalStrategy = require('passport-local').Strategy;
const User = require("../model/user");
const config = require('../config/database');

module.exports = function(passport){
    passport.use(new LocalStrategy(function(login, senha, done){

        console.log("nem entra aqui (porque??)");

        // Verificando login
        let loginQuery = {login:login};
        
        // Apenas precisa achar um usuário
        User.findOne(loginQuery, function(err, user){
            if(err) throw err;
            
            // Se não existe usuário
            if(!user){
                console.log("NENHUM USUARIO ENCONTRADO")
                return done(null, false, {message: 'Nenhum usuário foi encontrado!'});
            }

            // Se existe usuário, verifico se a senha está correta            
            if(senha === user.senha){
                console.log("USUÁRIO ENCONTRADO!")
                return done(null, user);
            }else{
                console.log("Caiu no else da senha")
                return done(null, false, {message: 'Senha incorreta!'});
            }

        });
    }));

    // Convenção do uso do passport
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
}