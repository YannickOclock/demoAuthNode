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