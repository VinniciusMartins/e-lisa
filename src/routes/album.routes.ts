// src/routes/album.routes.ts

import { Router, Request, Response } from 'express';

import Album from '../models/album';
import Photo from '../models/photo';

const router = Router();

// GET ALL ALBUMS
router.get('/', async (req: Request, res: Response) => {

    const result = await Album.findAll({include: { model: Photo}});

    res.status(200).json({ albums: result });
});

// GET ALBUM BY ID
router.get('/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const result = await Album.findByPk(id, {include: { model: Photo}});

    if (result == null ){
        res.status(404).json(`Sorry, There is no album with this id`)
    } else {
        res.status(200).json({ Album: result });
    }
    
  });

// GET ALBUM BY SHARE URL
router.get('/share/:shareUrl', async (req: Request, res: Response) => {

    const shareUrl = String(req.params.shareUrl);

    const result = await Album.findAll({ where: { shareURL: shareUrl }, include: { model: Photo} });

    if (result == null ){
        res.status(404).json(`Sorry, There is no album with this id`)
    } else {
        res.status(200).json({ Album: result });
    }
  });

// POST ALBUM
router.post('/', async (req: Request, res: Response) => {
    let newAlbum = req.body as Album;

    const result = await Album.create(
        {
            title: req.body.title,
            shareURL: req.body.shareURL,
            backgroundColor: req.body.backgroundColor,
            user: req.body.user
        }
    );
    
    result.getDataValue;

    res.status(201).json({ Album: newAlbum });
});

// UPDATE ALBUM
router.put('/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const result = await Album.findByPk(id);

    if (result == null ){
        res.status(404).json(`Sorry, There is no album with this id`)
    }else{
        result!.title = req.body.title;
        result!.shareURL = req.body.shareURL;
        result!.backgroundColor =  req.body.backgroundColor;
        result!.user =  req.body.user;
    
        result?.save();
    
        res.status(200).json({ Album: result });
    }
});

// DELETE ALBUM
router.delete('/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const result = await Album.findByPk(id);

    if (result == null ){
        res.status(404).json(`Sorry, There is no album with this id`)
    }else{
        result?.destroy();

        res.status(200).json({ Album: result });
    }
});
export default router;

