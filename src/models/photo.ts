// src/models/user.ts
import { Model, Sequelize, DataTypes } from 'sequelize';
import Album from './album';

export default class Photo extends Model {
    public id?: number;
    public imageUrl?: string;
    public description?: string;
    public order?: string;
    public albumId?: number;
}

export const PhotoMap =  (sequelize: Sequelize) => {

    Photo.init ({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        imageUrl: {
            type: DataTypes.STRING(255)
        },
        description: {
            type: DataTypes.STRING(255)
        },
        order: {
            type: DataTypes.STRING(255)
        },
        albumId: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        tableName: 'photo',
        timestamps: true,
        schema: "elisa"
    });

    // Photo.sync();
}


export const teste = (sequelize: Sequelize) => {

    Album.hasMany(Photo, {foreignKey: 'albumId'});
    // Photo.hasOne(Album, {as: 'photos', foreignKey: 'photos',});

    Album.sync();
    Photo.sync();
}
