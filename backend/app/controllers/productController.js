import Product from "../models/Product.js";

const productController = {

  async list(req, res) {
    // ECRIRE ICI POUR AFFICHER LA LISTE DES PRODUITS
    try {
      // Recuperer la liste de tous les produits
      const products = await Product.findAll();
      res.json({
        products: products
      });
    } catch (error) {
      res.status(404).json({ message: 'Products not found' });
    }
  },

  async details(req, res) {
    // ECRIRE ICI POUR AFFICHER LE DETAIL D'UN PRODUIT
    try {
      const idUrl = req.params.id;
      // Recuperer un produit en particulier
      const productFound = await Product.findByPk(idUrl);
      // Si un produit a ete trouve dans notre base
      if (productFound) {
        console.log(productFound);
        res.json({
          product: productFound
        });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  },

};

export default productController;
