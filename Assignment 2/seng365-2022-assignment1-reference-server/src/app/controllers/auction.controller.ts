import {Request, Response} from "express";
import Logger from '../../config/logger';
import * as Auction from '../models/auction.model';

const viewAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const auctions = await Auction.viewAll(req.searchQuery);
        res.status(200).send(auctions);
        return;
    } catch (err) {
        Logger.error(err);
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
    }
}

const viewOne = async (req:Request, res: Response): Promise<void> => {
    try {
        const auction = await Auction.getOne(parseInt(req.params.id, 10));
        if (auction !== null) {
            res.status(200).send(auction);
            return;
        } else {
            res.status(404).send()
            return;
        }
    } catch (err) {
        Logger.error(err);
        res.status(500).send();
        return;
    }

}

const addAuction = async (req: Request, res: Response): Promise<void> => {
    try {
        const auctionId = await Auction.create(req.postAuction);
        res.statusMessage = 'Created';
        res.status(201).json({auctionId});
    } catch (err) {
        if (err.errno === 1062) { // duplicate key entry
            res.statusMessage = "Duplicate entry"
            res.status(403).send(err.sqlMessage)
        } else {
            Logger.error(err);
            res.statusMessage = 'Internal Server Error';
            res.status(500).send();
        }
    }
}

const updateAuction = async (req: Request, res: Response): Promise<void> => {
    try {
        const auctionId = await Auction.update(req.postAuction, parseInt(req.params.id, 10));
        res.status(200).json({auctionId});
    } catch (err) {
        Logger.error(err);
        res.statusMessage = 'Internal Server Error';
        res.status(500).send();
    }
}

const deleteAuction = async (req: Request, res: Response): Promise<void> => {
    try {
        const auctionId = parseInt(req.params.id, 10);
        const auction = await Auction.getOne(auctionId);
        if(auction == null){
            res.status(404).send()
            return;
        }
        if(auction.sellerId !== req.authId) {
            res.status(403).send();
            return;
        }
        if(auction.numBids > 0){
            res.statusMessage = "Cannot delete auction after bid has been placed"
            res.status(403).send()
        }
        await Auction.remove(auctionId);
        res.status(200).send();
        return;
    } catch (err) {
        Logger.error(err)
        res.status(500).send()
        return;
    }
}

const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Auction.getCategories();
        res.status(200).send(categories);
    } catch (err) {
        Logger.error(err);
        res.status(500).send()
    }
}

export {viewAll, viewOne, addAuction, updateAuction, deleteAuction, getCategories}