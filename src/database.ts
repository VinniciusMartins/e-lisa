// src/database.ts
import { db_host, db_port, db_name, db_user, db_password } from './config';
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: db_host,
  port: db_port,
  database: db_name,
  username: db_user,
  password: db_password,
  models: [__dirname + '/src/models/*.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
})

module.exports = sequelize;