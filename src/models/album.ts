// src/models/user.ts
import { Model, Sequelize, DataTypes } from 'sequelize';
import Photo from './photo';
const database = require ('../database');


//adicionar usuário aqui

export default class Album extends Model {
    public id: number;
    public title: string;
    public shareURL: string;
    public user:  string;
    public backgroundColor: string;
}


export const AlbumMap = (sequelize: Sequelize) => {

    Album.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255)
        },
        shareURL: {
            type: DataTypes.STRING(255)
        },
        backgroundColor: {
            type: DataTypes.STRING(255)
        },
        user: {
            type: DataTypes.STRING(255)
        }
    }, {
        sequelize,
        tableName: 'album',
        timestamps: true,
        // schema: "elisa",
    });
    
    // Album.sync();
}
