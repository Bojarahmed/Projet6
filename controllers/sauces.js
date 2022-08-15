const Sauces = require("../models/Sauces");
const fs = require('fs');

exports.createSauces = (req, res, next) => {
    console.log("req.body.sauce");
    console.log(req.body.sauce);
    const userSauces = JSON.parse(req.body.sauce)

    const sauces = new Sauces({
        ...userSauces,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    console.log("userSauces");
    console.log(userSauces);

    sauces.save()
        .then(() => {
            res.status(200).json({
                message: "sauces enregistré dans la base de données",
                contenu: req.body
            })
        })
        .catch((error) =>
            res.status(400).json({ error }))
}
exports.getAllSauces = (req, res, next) => {
    Sauces.find()
        .then((allSauces) => { res.status(200).json(allSauces) })
        .catch((error) => res.status(400).json({ error }))
}
exports.getOneSauces = (req, res, next) => {
    console.log('----------------->log de req ');
    console.log(req.params.id)
    console.log({ _id: req.params.id })

    Sauces.findOne({ _id: req.params.id })
        .then((objet) => res.status(200).json(objet))
        .catch((error) => res.status(404).json({ error }))
}
exports.modifSauces = (req, res, next) => {
    console.log('----------------->log de req modif ');
    console.log(req.params.id)
    console.log({ _id: req.params.id })
    console.log("req.body");
    console.log(req.body.sauce);

    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    Sauces.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({
            message: "modif reussie"
        }))
        .catch((error) => res.status(404).json({ error }))
}

exports.deleteSauces = (req, res, next) => {

    Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({
            message: "delete reussie"
        }))
        .catch((error) => res.status(404).json({ error }))
}

exports.likeSauce = (req, res, next) => {

    switch (req.body.like) {
        
        //Vérifie si lm'utilisateur a like ou dislike
        //mise a jour de la sauce ou envoyer message d'erreur
        case 0:
            Sauces.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.find(user => user === req.body.userId)) {
                        Sauces.updateOne({ _id: req.params.id }, {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId },
                                _id: req.params.id
                            })
                            .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
                            .catch((error) => { res.status(400).json({ error: error }); });

                    }
                    if (sauce.usersDisliked.find(user => user === req.body.userId)) {
                        Sauces.updateOne({ _id: req.params.id }, {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId },
                                _id: req.params.id
                            })
                            .then(() => { res.status(201).json({ message: 'ok...' }); })
                            .catch((error) => { res.status(400).json({ error: error }); });
                    }
                })
                .catch((error) => { res.status(404).json({ error: error }); });
            break;
            //si like = 1
            //maj sauces
        case 1:
            Sauces.updateOne({ _id: req.params.id }, {
                    $inc: { likes: 1 },
                    $push: { usersLiked: req.body.userId },
                    _id: req.params.id
                })
                .then(() => { res.status(201).json({ message: 'Like added!' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            break;
            //likes = -1
            //uptade the sauce, send message/error
        case -1:
            Sauces.updateOne({ _id: req.params.id }, {
                    $inc: { dislikes: 1 },
                    $push: { usersDisliked: req.body.userId },
                    _id: req.params.id
                })
                .then(() => { res.status(201).json({ message: 'Ok... it\'\s your right...' }) })
                .catch((error) => { res.status(400).json({ error: error }) });
            break;
        default:
            console.error('Bad request')
    }
};