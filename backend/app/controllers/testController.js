import jwt from 'jsonwebtoken';

const testController = {
    test: (req, res) => {
        // Plus tard, on stockera cette méthode dans un middleware pour éviter de se répéter

        // On récupère le JWT envoyé par le client
        const token = req.headers.authorization.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, 'secret');
        const userId = decodedToken.userId;
        // On vérifie que le token est valide
        if(!token)
        {
            return res.status(401).json({error: 'Unauthorized'});
        }

        res.send('Bravo ! Vous avez accès à cette route sécurisée !');
    }
}

export default testController;