// src/routes/album.routes.ts

import { Router, Request, Response } from 'express';

import Album from '../models/album';
import Photo from '../models/photo';

const router = Router();

// GET ALL ALBUMS
router.get('/:user/album', async (req: Request, res: Response) => {

    const user = String(req.params.user);

    const result = await Album.findAll({ where: { user: user }, include: { model: Photo}});

    res.status(200).json({ album: result });
});

// GET ALBUM BY ID
router.get('/:user/album/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const user = String(req.params.user);

    const result = await Album.findOne({ where: { user: user, id: id }, include: { model: Photo}});

    if (result == null ){
        res.status(404).json(`Sorry, There is no album with this id`)
    } else {
        res.status(200).json({ Album: [result] });
    }
    
  });

// GET ALBUM BY SHARE URL
router.get('/:user/album/share/:shareUrl', async (req: Request, res: Response) => {

    const shareUrl = String(req.params.shareUrl);

    const user = String(req.params.user);

    const result = await Album.findAll({ where: { user: user, shareURL: shareUrl }, include: { model: Photo} });

    if (result == null ){
        res.status(404).json(`Sorry, There is no album with this id`)
    } else {
        res.status(200).json({ Album: result });
    }
  });

// POST ALBUM
router.post('/:user/album', async (req: Request, res: Response) => {
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
router.put('/:user/album/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const user = String(req.params.user);

    const result = await Album.findOne({ where: { user: user, id: id }});


    if (result == null ){
        res.status(404).json(`Sorry, There is no album with this id`)
    }else{
        result!.title = req.body.title;
        result!.shareURL = req.body.shareURL;
        result!.backgroundColor =  req.body.backgroundColor;
        result!.user =  req.body.user;
    
        result?.save();
    
        res.status(200).json({ Album: [result] });
    }
});

// DELETE ALBUM
router.delete('/:user/album/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);
    
    const user = String(req.params.user);

    const result = await Album.findOne({ where: { user: user, id: id }});

    if (result == null ){
        res.status(404).json(`Sorry, There is no album with this id`)
    }else{
        result?.destroy();

        res.status(200).json({ Album: result });
    }
});
export default router;

