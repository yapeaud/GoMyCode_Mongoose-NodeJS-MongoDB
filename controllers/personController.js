// Importation du modèle Person pour interagir avec la collection "Person" dans MongoDB
const Person = require('../models/Person');

// Ajouter une personne
const addPerson = async (req, res) => {
    try {
        // Extraction des données du corps de la requête
        const { name, age, favoriteFoods } = req.body;

        // Création d'une nouvelle instance de Person avec les données extraites
        const newPerson = new Person({ name, age, favoriteFoods });

        // Sauvegarde de la nouvelle personne dans la base de données
        const savedPerson = await newPerson.save();

        // Réponse avec un statut 201 (Créé) et les données de la personne sauvegardée
        res.status(201).json(savedPerson);
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de l'ajout", error: err.message });
    }
};

// Ajouter plusieurs personnes avec un tableau passé en argument
const addManyPersons = async (req, res) => {
    try {
        // Extraction du tableau de personnes du corps de la requête
        const { arrayOfPeople } = req.body;

        // Vérification que le tableau est valide et non vide
        if (!Array.isArray(arrayOfPeople) || arrayOfPeople.length === 0) {
            return res.status(400).json({ message: "Le tableau arrayOfPeople est requis et ne doit pas être vide." });
        }

        // Insertion de plusieurs personnes en une seule opération
        const savedPeople = await Person.create(arrayOfPeople);

        // Réponse avec un statut 201 (Créé) et les données des personnes sauvegardées
        res.status(201).json(savedPeople);
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de l'ajout des personnes", error: err.message });
    }
};

// Rechercher toutes les personnes avec un nom donné
const findPersonsByName = async (req, res) => {
    try {
        // Extraction du nom depuis les paramètres d'URL
        const { name } = req.params;

        // Recherche des personnes ayant le nom spécifié
        const persons = await Person.find({ name });

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (persons.length === 0) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${name}".` });
        }

        // Réponse avec un statut 200 (OK) et les données des personnes trouvées
        res.status(200).json(persons);
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Rechercher une seule personne par nom
const findOnePersonByName = async (req, res) => {
    try {
        // Extraction du nom depuis les paramètres d'URL
        const { name } = req.params;

        // Recherche d'une seule personne ayant le nom spécifié
        const person = await Person.findOne({ name });

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${name}".` });
        }

        // Réponse avec un statut 200 (OK) et les données de la personne trouvée
        res.status(200).json(person);
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Rechercher une personne qui a un certain aliment dans ses favoris
const findOnePersonByFavoriteFood = async (req, res) => {
    try {
        // Extraction de l'aliment depuis les paramètres d'URL
        const { food } = req.params;

        // Recherche d'une personne ayant l'aliment spécifié dans ses favoris
        const person = await Person.findOne({ favoriteFoods: food });

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec "${food}" dans ses aliments favoris.` });
        }

        // Réponse avec un statut 200 (OK) et les données de la personne trouvée
        res.status(200).json(person);
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Rechercher une personne par son _id
const findPersonById = async (req, res) => {
    try {
        // Extraction de l'ID depuis les paramètres d'URL
        const { id } = req.params;

        // Recherche de la personne par son ID
        const person = await Person.findById(id);

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${id}".` });
        }

        // Réponse avec un statut 200 (OK) et les données de la personne trouvée
        res.status(200).json(person);
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Rechercher UNE personne par son _id
const findOnePersonById = async (req, res) => {
    try {
        // Extraction de l'ID depuis les paramètres d'URL
        const { personId } = req.params;

        // Recherche de la personne par son ID
        const person = await Person.findById(personId);

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${personId}".` });
        }

        // Réponse avec un statut 200 (OK) et les données de la personne trouvée
        res.status(200).json(person);
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Mettre à jour une personne par son _id en modifiant un champ
const updatePersonById = async (req, res) => {
    try {
        // Extraction de l'ID depuis les paramètres d'URL
        const { personId } = req.params;
        // Extraction des données à mettre à jour depuis le corps de la requête
        const updates = req.body;

        // Étape 1 : Trouver la personne par ID
        let person = await Person.findById(personId);

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${personId}".` });
        }

        // Étape 2 : Modifier les champs nécessaires
        Object.assign(person, updates);

        // Étape 3 : Sauvegarder les modifications
        await person.save();

        // Réponse avec un statut 200 (OK) et un message de succès
        res.status(200).json({ message: "Personne mise à jour avec succès", person });
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
};

// Trouver une personne par ID et ajouter "hamburger" à ses aliments préférés
const addFavoriteFood = async (req, res) => {
    try {
        // Extraction de l'ID depuis les paramètres d'URL
        const { personId } = req.params;

        // Étape 1 : Trouver la personne par ID
        let person = await Person.findById(personId);

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${personId}".` });
        }

        // Étape 2 : Ajouter "hamburger" à favoriteFoods
        person.favoriteFoods.push("hamburger");

        // Étape 3 : Sauvegarder la mise à jour
        await person.save();

        // Réponse avec un statut 200 (OK) et un message de succès
        res.status(200).json({ message: "Aliment ajouté avec succès", person });
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
};

// Mettre à jour l'âge d'une personne par son nom
const updatePersonAge = async (req, res) => {
    try {
        // Extraction du nom depuis les paramètres d'URL
        const { name } = req.params;
        // Extraction de la nouvelle valeur de l'âge depuis le corps de la requête
        const { newAge } = req.body;

        // Trouver et mettre à jour la première personne avec ce nom
        const updatedPerson = await Person.findOneAndUpdate(
            { name: name },  // Condition de recherche
            { age: newAge }, // Nouvelle valeur
            { new: true, runValidators: true } // Options : renvoie le document mis à jour et applique les validateurs
        );

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (!updatedPerson) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${name}".` });
        }

        // Réponse avec un statut 200 (OK) et un message de succès
        res.status(200).json({ message: "Âge mis à jour avec succès", person: updatedPerson });
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
};

// Trouver une personne par son nom et fixer son âge à 20 ans
const setAgeToTwenty = async (req, res) => {
    try {
        // Extraction du nom depuis les paramètres d'URL
        const { personName } = req.params;

        // Trouver la personne et mettre à jour son âge
        const updatedPerson = await Person.findOneAndUpdate(
            { name: personName }, // Condition de recherche
            { age: 20 }, // Mise à jour de l'âge
            { new: true, runValidators: true } // Retourne le document mis à jour
        );

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (!updatedPerson) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${personName}".` });
        }

        // Réponse avec un statut 200 (OK) et un message de succès
        res.status(200).json({ message: "Âge fixé à 20 ans avec succès", person: updatedPerson });
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
};

// Supprimer une personne par son ID
const deletePersonById = async (req, res) => {
    try {
        // Extraction de l'ID depuis les paramètres d'URL
        const { personId } = req.params;

        // Trouver et supprimer la personne
        const deletedPerson = await Person.findByIdAndRemove(personId);

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (!deletedPerson) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${personId}".` });
        }

        // Réponse avec un statut 200 (OK) et un message de succès
        res.status(200).json({ message: "Personne supprimée avec succès", person: deletedPerson });
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    }
};

// Supprimer plusieurs personnes avec un critère donné
const deleteManyPeople = async (req, res) => {
    try {
        // Extraction du nom depuis le corps de la requête
        const { name } = req.body;

        // Supprimer toutes les personnes portant ce nom
        const result = await Person.deleteMany({ name });

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${name}".` });
        }

        // Réponse avec un statut 200 (OK) et un message de succès
        res.status(200).json({ message: `${result.deletedCount} personne(s) supprimée(s) avec succès.` });
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    }
};

// Supprimer toutes les personnes dont le nom est "Mary"
const deletePeopleNamedMary = async (req, res) => {
    try {
        // Supprime toutes les personnes avec name: "Mary"
        const result = await Person.deleteMany({ name: "Mary" });

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Aucune personne nommée "Mary" trouvée.` });
        }

        // Réponse avec un statut 200 (OK) et un message de succès
        res.status(200).json({ message: `${result.deletedCount} personne(s) nommée(s) "Mary" supprimée(s) avec succès.` });
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    }
};

// Recherche de personnes ayant un aliment favori spécifique, triées et limitées
const searchPeopleByFood = async (req, res) => {
    try {
        // Extraction de l'aliment depuis les paramètres d'URL
        const { food } = req.params;

        // Recherche des personnes ayant l'aliment spécifié dans leurs favoris
        const people = await Person.find({ favoriteFoods: food }) // Filtrer par aliment
            .sort({ name: 1 }) // Trier par nom (ordre alphabétique)
            .limit(5) // Limiter à 5 résultats
            .select("name age favoriteFoods"); // Sélectionner uniquement certains champs

        // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
        if (people.length === 0) {
            return res.status(404).json({ message: `Aucune personne trouvée avec "${food}" comme aliment favori.` });
        }

        // Réponse avec un statut 200 (OK) et les résultats de la recherche
        res.status(200).json({ results: people });
    } catch (err) {
        // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Trouver les personnes qui aiment les burritos, trier par nom, limiter à 2 résultats et masquer l'âge
const findBurritoLovers = (req, res) => {
    Person.find({ favoriteFoods: "Burritos" }) // Filtrer par aliment favori
        .sort({ name: 1 }) // Trier par nom (ordre alphabétique)
        .limit(2) // Limiter à 2 résultats
        .select("-age") // Exclure l'âge (- signifie exclusion)
        .exec((err, data) => { // Exécuter la requête avec un callback
            if (err) {
                // En cas d'erreur, réponse avec un statut 500 (Erreur serveur) et un message d'erreur
                return res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
            }
            if (!data.length) {
                // Si aucune personne n'est trouvée, retourner un statut 404 (Non trouvé)
                return res.status(404).json({ message: "Aucun amateur de burritos trouvé." });
            }
            // Réponse avec un statut 200 (OK) et les résultats de la recherche
            res.status(200).json({ results: data });
        });
};

// Exportation des fonctions pour les utiliser dans d'autres fichiers
module.exports = {
    addPerson,
    addManyPersons,
    findPersonsByName,
    findOnePersonByName,
    findOnePersonByFavoriteFood,
    findPersonById,
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
};