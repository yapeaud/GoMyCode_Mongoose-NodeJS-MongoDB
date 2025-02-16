// Importation du module Express pour créer des routes
const express = require('express');
// Création d'un routeur Express pour gérer les routes
const router = express.Router();

// Importation des fonctions du contrôleur "personController"
const { 
    addPerson,
    addManyPersons,
    findPersonsByName, 
    findOnePersonByName, 
    findOnePersonByFavoriteFood,
    findOnePersonById,
    updatePersonById, 
    addFavoriteFood, 
    updatePersonAge, 
    setAgeToTwenty,
    deletePersonById,
    deleteManyPeople,
    deletePeopleNamedMary,
    searchPeopleByFood,
    findBurritoLovers
} = require('../controllers/personController');

// Route POST pour ajouter une personne
// Exemple d'URL : POST /add-person
router.post('/add-person', addPerson);

// Route POST pour ajouter plusieurs personnes
// Exemple d'URL : POST /add-many
router.post('/add-many', addManyPersons);

// Route GET pour trouver des personnes par nom
// Exemple d'URL : GET /find-by-name/John
router.get('/find-by-name/:name', findPersonsByName);

// Route GET pour trouver une seule personne par nom
// Exemple d'URL : GET /find-one-by-name/John
router.get('/find-one-by-name/:name', findOnePersonByName);

// Route GET pour trouver une seule personne par aliment favori
// Exemple d'URL : GET /find-one-by-food/Pizza
router.get('/find-one-by-food/:food', findOnePersonByFavoriteFood);

// Route GET pour trouver UNE seule personne par _id
// Exemple d'URL : GET /find-one-by-id/1234567890abcdef
router.get('/find-one-by-id/:personId', findOnePersonById);

// Route PUT pour mettre à jour une personne par ID
// Exemple d'URL : PUT /update-person/1234567890abcdef
router.put('/update-person/:personId', updatePersonById);

// Route PUT pour ajouter "hamburger" aux aliments préférés
// Exemple d'URL : PUT /add-favorite-food/1234567890abcdef
router.put('/add-favorite-food/:personId', addFavoriteFood);

// Route PUT pour mettre à jour l'âge d'une personne par son nom
// Exemple d'URL : PUT /update-age/John
router.put('/update-age/:name', updatePersonAge);

// Route PUT pour fixer l'âge d'une personne à 20 ans par son nom
// Exemple d'URL : PUT /set-age-20/John
router.put('/set-age-20/:personName', setAgeToTwenty);

// Route DELETE pour supprimer une personne par son ID
// Exemple d'URL : DELETE /delete/1234567890abcdef
router.delete('/delete/:personId', deletePersonById);

// Route DELETE pour supprimer plusieurs personnes par nom
// Exemple d'URL : DELETE /delete-many (avec un body contenant { name: "John" })
router.delete('/delete-many', deleteManyPeople);

// Route DELETE pour supprimer toutes les personnes nommées "Mary"
// Exemple d'URL : DELETE /delete-mary
router.delete('/delete-mary', deletePeopleNamedMary);

// Route GET pour chercher des personnes par aliment favori
// Exemple d'URL : GET /search-by-food/Pizza
router.get('/search-by-food/:food', searchPeopleByFood);

// Route GET pour chercher les amateurs de burritos
// Exemple d'URL : GET /burrito-lovers
router.get('/burrito-lovers', findBurritoLovers);

// Exportation du routeur pour l'utiliser dans l'application principale
module.exports = router;