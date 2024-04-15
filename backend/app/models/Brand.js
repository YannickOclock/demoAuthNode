// on importe la classe la mère et la liste des types fournis par sequelize
import { Model, DataTypes } from 'sequelize';
// on importe notre client connecté à la base de données
import sequelize from '../database.js';

// on définit le modèle qui étend la classe mère et hérite donc de ses méthodes
class Brand extends Model { }

// on execute la méthode qui sert à initialiser les propriétés de notre modèle
// on passe à init 2 objets en argument
Brand.init({
    // dans le premier objet on liste notre propriétés à qui on associe un objet de configuration
    title: {
        type: DataTypes.TEXT, // on configure un type
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
}, { // dans le 2ème objet on dit dans quelle bdd devront persister les infos
    sequelize, // pour cela on indique le client connecté à la bdd
    modelName: 'Brand', // on donne un nom au modèle, cela pourra servir plus tard
    tableName: 'brand', // on peut demander à sequelize de ranger les infos liées à ce modèle dans la table de notre choix
});

export default Brand;