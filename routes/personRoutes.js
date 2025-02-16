const express = require('express');
const router = express.Router();
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
router.post('/add-person', addPerson);

// Route POST pour ajouter plusieurs personnes
router.post('/add-many', addManyPersons);

// Route GET pour trouver des personnes par nom
router.get('/find-by-name/:name', findPersonsByName);

// Route GET pour trouver une seule personne par nom
router.get('/find-one-by-name/:name', findOnePersonByName);

// Route GET pour trouver une seule personne par aliment favori
router.get('/find-one-by-food/:food', findOnePersonByFavoriteFood);

// Route GET pour trouver UNE seule personne par _id
router.get('/find-one-by-id/:personId', findOnePersonById);

// Route PUT pour mettre à jour une personne par ID
router.put('/update-person/:personId', updatePersonById);

// Route PUT pour ajouter "hamburger" aux aliments préférés
router.put('/add-favorite-food/:personId', addFavoriteFood);

// Route PUT pour mettre à jour l'âge d'une personne par son nom
router.put('/update-age/:name', updatePersonAge);

// Route PUT pour fixer l'âge d'une personne à 20 ans par son nom
router.put('/set-age-20/:personName', setAgeToTwenty);

// Route DELETE pour supprimer une personne par son ID
router.delete('/delete/:personId', deletePersonById);

// Route DELETE pour supprimer plusieurs personnes par nom
router.delete('/delete-many', deleteManyPeople);

// Route DELETE pour supprimer toutes les "Mary"
router.delete('/delete-mary', deletePeopleNamedMary);

// Route GET pour chercher des personnes par aliment favori
router.get('/search-by-food/:food', searchPeopleByFood);

// Route GET pour chercher les amateurs de burritos
router.get('/burrito-lovers', findBurritoLovers);

module.exports = router;