const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 0, // Optionnel : empêcher les âges négatifs
    },
    favoriteFoods: {
        type: [String], // Tableau de chaînes
        default: [], // Optionnel : valeur par défaut vide
    },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
