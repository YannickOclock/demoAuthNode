# Shop Bob

Ce matin, vous avez reçu ce message de Bob, l'un de vos clients les plus fidèles.

```
Bonne nouvelle, je dois lancer une plateforme de vente et j'ai pensé à toi.
Dans un premier temps, voici mon besoin :

- Je veux lister tous mes produits sur une page d'accueil
- Au clic sur un produit je veux voir son texte de détail sur une nouvelle page
- De plus on veut voir la marque de ce produit

Par contre ça évoluera sans doute dans le futur donc merci de poser une base évolutive

Une intégration statique vous sera fournie
```

Evidemment on pourrait parfaitement réalisé ce projet avec les connaissances que l'on a actuellement.  
Cependant nous sommes tombés sur un ORM qui devrait nous faciliter la tâche.  
Etant donné que c'est la première fois que nous l'utilisons il va falloir faire preuvre de documentation et de patience.  
Pour cela, je t'ai créer la base du projet (avec un MCD) ainsi qu'un fichier `Documentation.md` à la racine pour t'aider. 

# Exercice

## 1) Créer ton utilisateur et ta BDD

- Créer un nouvel utilisateur à ta BDD
- Créer une nouvelle BDD et assigne cet utilisateur comme OWNER

## 2) Créer un modèle avec sequelize

- Créer un modèle Product avec sequelize (on s'occupera de Brand plus tard) dans `./app/models/Product.js`
- Configure les champs titre et description de type de texte
- Configure le nom de la table à `product`
- Exporte ton modèle pour pouvoir t'en servir ailleurs

## 3) Faire une migration et un seeding avec sequelize

- Créer un fichier `init-db.js` à la racine du projet
- Importes-y le client sequelize et ton modèle Product
- Execute `sequelize.drop` et `sync`
- Execute le fichier init-db avec `node init-db`
- Bonus : créer un script pour cette commande dans le package.json

Teste si tout fonctionne : en te connectant via `psql -U bob` tu dois voir la structure de ta table via `\d product`

- Modifie ton fichier pour créer 2 produits après l'appel de `sync` (pense à await)
- Le titre du premier produit est `DVD`, et la description `Regardez vos films préférés`
- Le titre du deuxième produit est `Blu-ray`, et la description `La HD c'est cool`

Reexecute le fichier init-db et test si tout fonctionne  : en te connectant via `psql -U bob` tu dois voir tes produits via `SELECT * FROM product;`

## 4) Dynamiser une première route, celle de l'accueil

- Place toi dans la méthode associée à la route `/`
- On veut passer la liste des produits à la vue
  - Voir au niveau de la [doc](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries) comment trouver des infos en bdd
- Dynamiser la vue à partir de la liste des produits

## 5) Dynamiser une deuxième route

Voir pour dynamiser la route de détail à l'aide de la méthode statique [findByPk](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findbypk) cette fois

## Bonus

- Faire de même pour le Model `Brand` et créer une relation entre les deux
- Tu trouves que le site n'est pas assez complet ? Améliore le.
