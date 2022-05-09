// src/routes/album.routes.ts

import { Router, Request, Response } from 'express';
import Album from '../models/album';

import Photo from '../models/photo';
// import database from '../database';
// import {Album} from '../models/album';

const router = Router();

// GET ALL PHOTOS   
router.get('/', async (req: Request, res: Response) => {

    const result = await Photo.findAll();

    res.status(200).json({ albums: result });
});

// GET PHOTOS BY ID 
router.get('/:id', async (req: Request, res: Response) => {

    const result = await Photo.findByPk(req.params.id);
    
    if (result == null ){
        res.status(404).json(`Sorry, There is no photo with this id`)
    }else{
        res.status(200).json({ Photo: result });
    }
});

// GET PHOTOS BY ALBUM ID 
router.get('/findByAlbumId/:id', async (req: Request, res: Response) => {
    
    const id = Number(req.params.id);

    const result = await Photo.findAll({ where: { albumId: id } });

    if (result == null ){
        res.status(404).json(`Sorry, There is no photo with this id`)
    }else{
        res.status(200).json({ Photo: result });
    }
});

// POST WITHOUT ALBUM ID
router.post('/', async (req: Request, res: Response) => {

    let newPhoto = req.body as Photo;

    const result = await Photo.create(
        {
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            order: req.body.order,
        }
    );
    result.getDataValue;
    res.status(201).json({ Photo: result });
});

// POST PHOTO BY ALBUM ID
router.post('/albumId/:id', async (req: Request, res: Response) => {

    let newPhoto = req.body as Photo;

    const id = Number(req.params.id);

    const searchAlbum = await Album.findByPk(id);

    if (searchAlbum == null ){
        res.status(404).json(`Sorry, There is no al with this id`)
    }else{

        const result = await Photo.create(
            {
                imageUrl: req.body.imageUrl,
                description: req.body.description,
                order: req.body.order,
                AlbumId: req.params.id
            }
        );

        result.getDataValue;

        res.status(201).json({ Photo: result });
    }
});

// UPDATE PHOTO
router.put('/:id', async (req: Request, res: Response) => {

    let newPhoto = req.body as Photo;

    const id = Number(req.params.id);

    const result = await Photo.findByPk(id);
        
    if (result == null ){
        res.status(404).json(`Sorry, There is no photo with this id`)
    }else{    
        result!.imageUrl = req.body.imageUrl;
        result!.description = req.body.description;
        result!.order =  req.body.order;

        result?.save();

        res.status(200).json({ Photo: result });
    }
});

// UPDATE PHOTO ALBUM
router.post('/:id/albumId/:idAlbum', async (req: Request, res: Response) => {

    let newPhoto = req.body as Photo;

    const id = Number(req.params.id);

    const idAlbum = Number(req.params.idAlbum);

    const result = await Photo.findByPk(id);
    
    const searchAlbum = await Album.findByPk(idAlbum);

    if (result == null ){
        res.status(404).json(`Sorry, There is no photo with this id`)
    }else if (searchAlbum == null){
        res.status(404).json(`Sorry, There is no album with this id`)
    }else{
        result!.albumId = idAlbum;

        result?.save();
    
        res.status(201).json({ Photo: result });
    }
});

// DELETE PHOTO BY ID
router.delete('/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const result = await Photo.findByPk(id);

    if (result == null ){
        res.status(404).json(`Sorry, There is no photo with this id`)
    }else{
        result?.destroy();

        res.status(201).json({ Photo: result });
    }
   
});

export default router;