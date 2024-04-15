//import jwt from 'jsonwebtoken';
import { v4 as randomUUID } from 'uuid';
import User from '../models/User.js';

// je stocke les informations dans la mémoire de l'application (côté back)
let sessions = [];

const authController = {
    me: async(req, res) => {
        // Sur chaque URL, je vérifie si l'utilisateur est connecté
        // en utilisant le cookie sessionId qui contient l'id de l'utilisateur

        // Récupérer le cookie
        const sessionId = req.cookies.sessionId;
        // Vérifier si le cookie existe
        if (sessions[sessionId]) {
            // Récupérer les données de l'utilisateur
            const user = await User.findByPk(sessions[sessionId].userId);
            // Renvoyer les données de l'utilisateur
            res.json(user);
        } else {
            // Renvoyer une erreur
            res.status(401).json({ message: 'Non autorisé, merci de vous authentifier' });
        }
    },

    signin: async(req, res) => {
        // Récupérer les données en GET
        const email = req.query.email;
        const password = req.query.password;
        // Vérifier avec Sequelize si l'utilisateur existe
        const user = await User.findOne({ where: { email: email } });
        // Si l'utilisateur existe
        if (user) {
            // Vérifier si le mot de passe est correct
            if (user.password === password) {
                // Générer un cookie
                const sessionId = randomUUID();
                // Stocker le cookie
                sessions[sessionId] = { userId: user.id };
                res.cookie('sessionId', sessionId, { httpOnly: true });
                // Renvoyer un message de succès
                res.json({ message: 'Authentification réussie' });
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