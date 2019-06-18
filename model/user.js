const mongoose = require('mongoose');

// Schema do usuário
const UserSchema = mongoose.Schema({
    endereco:{
        type: String,
        required: true
    },
    login:{
        type: String,
        unique : true,
        required: true
    },
    email:{
        type: String,
        unique : true,
        required: true
    },
    senha:{
        type: String,
        required: true
    }
});

// Exportando o usuário para ter acesso à ele
const User = module.exports = mongoose.model('User', UserSchema);