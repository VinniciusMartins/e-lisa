import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { port } from './config';

import albumRoutes from './routes/album.routes';
import photoRoutes from './routes/photo.routes';
const database = require ('./database');

import { AlbumMap } from './models/album';
import { PhotoMap, albumPhotoRelation } from './models/photo';

AlbumMap(database)
   
PhotoMap(database)

albumPhotoRelation(database)

// teste(database);

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/album', albumRoutes);
app.use('/photo', photoRoutes);

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

// const server = http.createServer(app);
// server.listen(port, () => {
//   console.log(`API started at http://localhost:${port}`);
// });

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

module.exports = app;