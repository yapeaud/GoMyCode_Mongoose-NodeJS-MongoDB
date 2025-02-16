const Person = require('../models/Person');

// Ajouter une personne
const addPerson = async (req, res) => {
    try {
        const { name, age, favoriteFoods } = req.body;

        // Création d'une nouvelle personne
        const newPerson = new Person({ name, age, favoriteFoods });

        // Sauvegarde dans la BDD
        const savedPerson = await newPerson.save();

        res.status(201).json(savedPerson);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'ajout", error: err.message });
    }
};

// Ajouter plusieurs personnes avec un tableau passé en argument
const addManyPersons = async (req, res) => {
    try {
        const { arrayOfPeople } = req.body; // On attend un objet avec une clé "arrayOfPeople"

        if (!Array.isArray(arrayOfPeople) || arrayOfPeople.length === 0) {
            return res.status(400).json({ message: "Le tableau arrayOfPeople est requis et ne doit pas être vide." });
        }

        // Insérer plusieurs personnes d'un coup
        const savedPeople = await Person.create(arrayOfPeople);

        res.status(201).json(savedPeople);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'ajout des personnes", error: err.message });
    }
};

// Rechercher toutes les personnes avec un nom donné
const findPersonsByName = async (req, res) => {
    try {
        const { name } = req.params; // Récupère le nom depuis les paramètres d'URL

        const persons = await Person.find({ name });

        if (persons.length === 0) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${name}".` });
        }

        res.status(200).json(persons);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Rechercher une seule personne par nom
const findOnePersonByName = async (req, res) => {
    try {
        const { name } = req.params; // Récupère le nom depuis les paramètres d'URL

        const person = await Person.findOne({ name });

        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${name}".` });
        }

        res.status(200).json(person);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Rechercher une personne qui a un certain aliment dans ses favoris
const findOnePersonByFavoriteFood = async (req, res) => {
    try {
        const { food } = req.params; // Récupérer l'aliment depuis les paramètres d'URL

        const person = await Person.findOne({ favoriteFoods: food });

        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec "${food}" dans ses aliments favoris.` });
        }

        res.status(200).json(person);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Rechercher une personne par son _id
const findPersonById = async (req, res) => {
    try {
        const { id } = req.params; // Récupérer l'ID depuis les paramètres d'URL

        const person = await Person.findById(id);

        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${id}".` });
        }

        res.status(200).json(person);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Rechercher UNE personne par son _id
const findOnePersonById = async (req, res) => {
    try {
        const { personId } = req.params; // Récupérer l'ID depuis les paramètres d'URL

        const person = await Person.findById(personId);

        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${personId}".` });
        }

        res.status(200).json(person);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
    }
};

// Mettre à jour une personne par son _id en modifiant un champ
const updatePersonById = async (req, res) => {
    try {
        const { personId } = req.params; // Récupérer l'ID depuis les paramètres d'URL
        const updates = req.body; // Récupérer les données à modifier

        // Étape 1 : Trouver la personne par ID
        let person = await Person.findById(personId);

        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${personId}".` });
        }

        // Étape 2 : Modifier les champs nécessaires
        Object.assign(person, updates);

        // Étape 3 : Sauvegarder les modifications
        await person.save();

        res.status(200).json({ message: "Personne mise à jour avec succès", person });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
};

// Trouver une personne par ID et ajouter "hamburger" à ses aliments préférés
const addFavoriteFood = async (req, res) => {
    try {
        const { personId } = req.params; // Récupérer l'ID depuis l'URL

        // Étape 1 : Trouver la personne par ID
        let person = await Person.findById(personId);

        if (!person) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${personId}".` });
        }

        // Étape 2 : Ajouter "hamburger" à favoriteFoods
        person.favoriteFoods.push("hamburger");

        // Étape 3 : Sauvegarder la mise à jour
        await person.save();

        res.status(200).json({ message: "Aliment ajouté avec succès", person });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
};

// Mettre à jour l'âge d'une personne par son nom
const updatePersonAge = async (req, res) => {
    try {
        const { name } = req.params; // Récupérer le nom depuis les paramètres d'URL
        const { newAge } = req.body; // Récupérer la nouvelle valeur de l'âge depuis le body

        // Trouver et mettre à jour la première personne avec ce nom
        const updatedPerson = await Person.findOneAndUpdate(
            { name: name },  // Condition de recherche
            { age: newAge }, // Nouvelle valeur
            { new: true, runValidators: true } // Options : renvoie le document mis à jour et applique les validateurs
        );

        if (!updatedPerson) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${name}".` });
        }

        res.status(200).json({ message: "Âge mis à jour avec succès", person: updatedPerson });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
};

// Trouver une personne par son nom et fixer son âge à 20 ans
const setAgeToTwenty = async (req, res) => {
    try {
        const { personName } = req.params; // Récupérer le nom depuis l'URL

        // Trouver la personne et mettre à jour son âge
        const updatedPerson = await Person.findOneAndUpdate(
            { name: personName }, // Condition de recherche
            { age: 20 }, // Mise à jour de l'âge
            { new: true, runValidators: true } // Retourne le document mis à jour
        );

        if (!updatedPerson) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${personName}".` });
        }

        res.status(200).json({ message: "Âge fixé à 20 ans avec succès", person: updatedPerson });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
};

// Supprimer une personne par son ID
const deletePersonById = async (req, res) => {
    try {
        const { personId } = req.params; // Récupérer l'ID depuis l'URL

        // Trouver et supprimer la personne
        const deletedPerson = await Person.findByIdAndRemove(personId);

        if (!deletedPerson) {
            return res.status(404).json({ message: `Aucune personne trouvée avec l'ID "${personId}".` });
        }

        res.status(200).json({ message: "Personne supprimée avec succès", person: deletedPerson });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    }
};

// Supprimer plusieurs personnes avec un critère donné
const deleteManyPeople = async (req, res) => {
    try {
        const { name } = req.body; // Récupérer le nom depuis le corps de la requête

        // Supprimer toutes les personnes portant ce nom
        const result = await Person.deleteMany({ name });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Aucune personne trouvée avec le nom "${name}".` });
        }

        res.status(200).json({ message: `${result.deletedCount} personne(s) supprimée(s) avec succès.` });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    }
};

// Supprimer toutes les personnes dont le nom est "Mary"
const deletePeopleNamedMary = async (req, res) => {
    try {
        // Supprime toutes les personnes avec name: "Mary"
        const result = await Person.deleteMany({ name: "Mary" });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Aucune personne nommée "Mary" trouvée.` });
        }

        res.status(200).json({ message: `${result.deletedCount} personne(s) nommée(s) "Mary" supprimée(s) avec succès.` });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    }
};

// Recherche de personnes ayant un aliment favori spécifique, triées et limitées
const searchPeopleByFood = async (req, res) => {
    try {
        const { food } = req.params; // Aliment favori en paramètre

        const people = await Person.find({ favoriteFoods: food }) // Filtrer par aliment
            .sort({ name: 1 }) // Trier par nom (ordre alphabétique)
            .limit(5) // Limiter à 5 résultats
            .select("name age favoriteFoods"); // Sélectionner uniquement certains champs

        if (people.length === 0) {
            return res.status(404).json({ message: `Aucune personne trouvée avec "${food}" comme aliment favori.` });
        }

        res.status(200).json({ results: people });
    } catch (err) {
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
                return res.status(500).json({ message: "Erreur lors de la recherche", error: err.message });
            }
            if (!data.length) {
                return res.status(404).json({ message: "Aucun amateur de burritos trouvé." });
            }
            res.status(200).json({ results: data });
        });
};

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