const express = require("express");

//importation de ma fonction signup de mon dossier controllers/user.js
const saucesControllers = require("../controllers/sauces")
console.log("CONTROLL --->saucesControllers");
console.log(saucesControllers);

//On importe la fonction router de express
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")

//On importe la fonction router de express
const router = express.Router();

//la route sauce
router.post("/", auth, multer, saucesControllers.createSauces);
router.get("/", auth, saucesControllers.getAllSauces);
router.get("/:id", auth, saucesControllers.getOneSauces);
router.put("/:id", auth, multer, saucesControllers.modifSauces);
router.delete("/:id", auth, saucesControllers.deleteSauces);
router.post("/:id/like", auth, saucesControllers.likeSauce);

//exportation du module
module.exports = router;