// Importation du module mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition du schéma pour la collection "Person"
const personSchema = new mongoose.Schema({
    // Champ "name" de type String, obligatoire (required: true)
    name: {
        type: String,
        required: true, // Ce champ est obligatoire
    },
    // Champ "age" de type Number, avec une validation optionnelle pour empêcher les âges négatifs
    age: {
        type: Number,
        min: 0, // Optionnel : empêche les valeurs négatives pour l'âge
    },
    // Champ "favoriteFoods" de type tableau de chaînes (Array of Strings)
    favoriteFoods: {
        type: [String], // Tableau de chaînes de caractères
        default: [], // Optionnel : valeur par défaut vide si aucun aliment n'est fourni
    },
});

// Création du modèle "Person" à partir du schéma défini
// Le modèle permet d'interagir avec la collection "Person" dans MongoDB
const Person = mongoose.model('Person', personSchema);

// Exportation du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = Person;