import {Request, Response} from "express";
import Logger from "../../config/logger";
import * as Auctions from "../models/auction.model";
import {getImageExtension} from "../models/imageTools";
import {addImage, readImage, removeImage} from "../models/images.model";

const getImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const filename = await Auctions.getImageFilename(parseInt(req.params.id, 10))
        const [image, mimetype]  = await readImage(filename)
        res.status(200).contentType(mimetype).send(image)
    } catch (err) {
        Logger.error(err);
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
    }
}

const setImage = async (req: Request, res: Response): Promise<void> => {
    try{
        let isNew = true;
        const image = req.body;
        const auctionId = parseInt(req.params.id, 10);
        const auction = await Auctions.getOne(auctionId);
        if(auction == null) {
            res.status(404).send();
            return;
        }
        if(req.authId !== auction.sellerId) {
            res.statusMessage = "Forbidden";
            res.status(403).send();
            return;
        }
        const mimeType = req.header('Content-Type');
        const fileExt = getImageExtension(mimeType);
        if (fileExt === null) {
            res.statusMessage = 'Bad Request: photo must be image/jpeg, image/png, image/gif type, but it was: ' + mimeType;
            res.status(400).send();
            return;
        }

        if (image.length === undefined) {
            res.statusMessage = 'Bad request: empty image';
            res.status(400).send();
            return;
        }

        // get image
        const filename = await Auctions.getImageFilename(auctionId);
        if(filename != null && filename !== "") {
            await removeImage(filename);
            isNew = false;
        }
        const newFilename = await addImage(image, fileExt);
        // set new filename? or just save as old name?
        await Auctions.setImageFileName(auctionId, newFilename);
        if(isNew)
            res.status(201).send()
        else
            res.status(200).send()
    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
        return;
    }
}

export {getImage, setImage}