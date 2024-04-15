//import jwt from 'jsonwebtoken';
import { v4 as randomUUID } from 'uuid';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// je stocke les informations dans la mémoire de l'application (côté back)
let sessions = [];

const authController = {
    signin: async(req, res) => {
        // Récupérer les données en GET
        const email = req.body.email;
        const password = req.body.password;
        // Vérifier avec Sequelize si l'utilisateur existe
        const user = await User.findOne({ where: { email: email } });
        // Si l'utilisateur existe
        if (user) {
            // Vérifier si le mot de passe est correct
            if (user.password === password) {
                // Générer un token JWT
                const jwtToken = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
                res.json({ token: jwtToken });
            } else {
                // Renvoyer une erreur
                res.status(401).json({ message: 'Non autorisé, merci de vous authentifier' });
            }
        } else {
            // Renvoyer une erreur
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

    }
};

export default authController;