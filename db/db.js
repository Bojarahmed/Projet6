const mongoose = require('mongoose');
//Importer l'utilisation des variables d'environnement
const dotenv = require('dotenv');
const result = dotenv.config()

//connection a la base de donnée de façon securiser grace au variable d'environement
mongoose.connect(`mongodb+srv://Bojarahmed:Mercedes1234@cluster0.d4je5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

module.exports = mongoose;