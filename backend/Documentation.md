## A la découverte d'un ORM

On pourrait faire ça d'instinct avec ce qu'on connait mais aujourd'hui on va tester un outil : [Sequelize](https://sequelize.org/)

Sequelize est un ORM Object-Relationnal Mapping. L'ORM C'est le fait de faire correspondre des lignes de bases de données à des objets utilisable dans notre application. L'ORM apporte des moyens pratiques pour manipuler ces objets sans se préoccuper dee l'implémentation technique pour dialoguer avec la BDD.

En gros, sequelize va nous permettre de béneficier de modèle active record sans avoir à les écrire à 100% à la main.

### Documentation

On se lance dans une nouvelle découverte d'un outil: on commence à être familiarisé avec les docs : on y trouve

- un getting started : un pas à pas pour découvrir l'outil
- une API reference : un manuel exhaustif pour trouver des choses précises

En suivant le guide on voit comment installer

```
npm install sequelize
```

Il faut aussi le connecteur pour notre RDBMS

```
npm install pg pg-hstore
```

### Connexion

En suivant le getting started on a vu comment créer un module de connexion
On pourrait mettre cette connexion dans le fichier `./app/database.js` par exemple.

```js
import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

dotenv.config();

// on a mis une url de connexion dans un fichier .env
// du type postgres://user:pass@example.com:5432/dbname
// ici PG_URL=postgres://bob:bob@localhost:5432/bob
// ici on a ajoutée une option pour dire qu'on utilise la convention de nommage snake_case
const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
  }
});

// on exporte ce qui représente notre client connecté à la base donnée
export default sequelize;
```

### Définir un modèle

On crée une classe qui étend la classe `Model` founir par sequelize, ainsi on hérite de pleeeein de méthodes très pratiques

```js
import { Model } from 'sequelize';

class User extends Model {}
```

Pour définir ce qui caractérise notre modèle on fait ensuite appel à la méthode statique init sur ce modèle, cela va crée des propriétés dans le modèle avec des getter, des setter, une validation de données et la possibilité de créer facilement la table correspondante en bdd derrière

```js
// on importe la classe la mère et la liste des types fournis par sequelize
import { Model, DataTypes } from 'sequelize';
// on importe notre client connecté à la base de données
import sequelize from "./app/database.js";

// on définit le modèle qui étend la classe mère et hérite donc de ses méthodes
class User extends Model {}

// on execute la méthode qui sert à initialiser les propriétés de notre modèle
// on passe à init 2 objets en argument
User.init({
  // dans le premier objet on liste notre propriétés à qui on associe un objet de configuration
  firstname: {
    // https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
    type: DataTypes.TEXT, // on configure un type
    // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/ 
    allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
    // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
    validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
      notEmpty: true,
    },
  },
  lastname: {
    type: DataTypes.TEXT,
  }
}, { // dans le 2ème objet on dit dans quelle bdd devront persister les infos
  sequelize, // pour cela on indique le client connecté à la bdd
  modelName: 'User', // on donne un nom au modèle, cela pourra servir plus tard
  tableName: 'user', // on peut demander à sequelize de ranger les infos liées à ce modèle dans la table de notre choix
});

export default User;
```

### Faire la migration (créer les tables)

Une fois qu'on a créé des modèles associés à un client connecté à une bdd

On peut importer ces modèles et lancer la synchronisation avec la BDD

```js
// dans un script js
// je prends mes modèles
import User from './chemin/vers/User.js';
// je prends mon client connecté
import sequelize from './app/database.js';
// je supprime les tables et je les recrée
try  {
  await sequelize.drop();
  await sequelize.sync();
} catch (error) {
  console.error(error);
}
```

### Faire le seeding (insérer des lignes dans les tables)

Pour faire le seeding je vais pouvoir utiliser la méthode statique create sur chacun de mes modèles

```js
// dans un script js
// on importe notre modèle
import User from './chemin/vers/User.js';

try  {
  await User.create({ firstname: 'Alexis', lastname: 'Vincent' });
  await User.create({ firstname: 'Toto', lastname: 'Dupont' });
  await User.create({ firstname: 'John', lastname: 'Doe' });
} catch (error) {
  console.error(error);
}
```

## Utilisation des méthodes des modèles dans les controllers

Dans nos contrôleur on aura parfois besoin de déclencher l'appel aux méthodes des modèles correspondant aux action du CRUD

C'est ce qu'on trouve [dans la doc](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

On aura même parfois besoin de sélectionner une ou plusieurs lignes en bdd

Pareil la [doc nous dit tout](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)

Par exemple on a pu dynamiser la page d'accueil en passant des données depuis le controller

```js
  async list(req, res) {
    try {
      // on passe par une méthode statique de la classe pour trouver ici la liste de tous les produits
      const products = await Product.findAll();
      // ensuite on peut dynamiser notre vue à partir des données trouvées
      res.render('list', {
        products: products,
      });
    //  comme une promesse peut toujours tomber dans un cas d'erreur il est bon de le prévoir
    } catch(error) {
      console.error(error);
      res.status(500).render('error');
    }
  },
```

## (BONUS) Les associations

On peut définir [des associations](https://sequelize.org/docs/v6/core-concepts/assocs/) entre nos table. Il existe plusieurs types d'associations dans Sequelize :

- **belongsTo**: définit une relation de type "many-to-one", où un enregistrement de la table source (ex: User) appartient à un enregistrement de la table cible (ex: Company).
- **hasOne**: définit une relation de type "one-to-one", où un enregistrement de la table source (ex: User) est associé à un unique enregistrement de la table cible (ex: Profile).
- **hasMany**: définit une relation de type "one-to-many", où un enregistrement de la table source (ex: User) peut être associé à plusieurs enregistrements de la table cible (ex: Post).
- **belongsToMany**: définit une relation de type "many-to-many", où un enregistrement de la table source (ex: User) peut être associé à plusieurs enregistrements de la table cible (ex: Group), et vice versa.
