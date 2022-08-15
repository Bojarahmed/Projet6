//importation de mangoose
const mongoose = require('mongoose');

//Importation de unique validator :securité suplémentaire  sur mon email
const uniqueValidator = require('mongoose-unique-validator');

//le modéle de la base de donnée pour enregistrer un nouvelle utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    

});

//securité supp pour ne pas enrefgistrer 2 fois la meme adresse email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);