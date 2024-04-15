// dans un script js
// je prends mon modele Product
import Product from './app/models/Product.js';
// je prends mon client connecté
import sequelize from './app/database.js';
import Brand from './app/models/Brand.js';
import User from './app/models/User.js';
// je supprime les tables et je les recrée
try {
    Product.belongsTo(Brand); // A BelongsTo B
    Brand.hasMany(Product);
    // Je supprime les tables si elles existent
    await sequelize.drop();
    // Je les recree
    await sequelize.sync();
    // Le seeding
    await User.create({ email: 'john@doe.fr', firstname: 'John', lastname: 'Doe', password: '1234' })
    await Brand.create({ title: 'Panasonic' });
    await Product.create({ title: 'DVD', description: 'Regardez vos films préférés', BrandId: 1});
    await Product.create({ title: 'Blu-ray', description: 'La HD c\'est cool', BrandId: 1});
} catch (error) {
    console.error(error);
}