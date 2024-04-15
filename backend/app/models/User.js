import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';

class User extends Model { }

User.init({
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    firstname: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastname: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
});

export default User;