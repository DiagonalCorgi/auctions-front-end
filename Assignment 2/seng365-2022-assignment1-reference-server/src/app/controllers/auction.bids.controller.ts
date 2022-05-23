import {Request, Response} from "express";
import * as Auction from "../models/auction.model";
import * as Bids from "../models/auction.bid.model"
import Logger from "../../config/logger";


const getBids = async (req: Request, res: Response): Promise<void> => {
    try {
        const auctionId = parseInt(req.params.id, 10);
        const auction = await Auction.getOne(auctionId);
        if(auction == null) {
            res.status(404).send();
            return;
        }
        const bids = await Bids.viewBids(auctionId)
        res.status(200).send(bids)
        return;
    } catch (err) {
        Logger.error(err);
        res.status(500).send();
    }
}

const addBid = async (req: Request, res: Response): Promise<void> => {
    try {
        const auctionId = parseInt(req.params.id, 10);
        if(!req.body.hasOwnProperty('amount') || typeof req.body.amount !== "number" || req.body.amount < 0 || req.body.amount > 99999999999) {
            res.status(400).send()
            return;
        }
        const auction = await Auction.getOne(auctionId)
        if(auction==null){
            res.status(404).send();
            return;
        }
        if(auction.sellerId === req.authId){
            res.statusMessage = "Cannot bid on your own auction";
            res.status(403).send();
            return;
        }
        if(Date.parse(auction.endDate) < Date.now()){
            res.statusMessage = "Cannot bid on a closed auction";
            res.status(403).send();
            return;
        }
        if(auction.highestBid && req.body.amount <= auction.highestBid) {
            res.statusMessage = "Bid must be higher than the current highest";
            res.status(403).send();
            return;
        }
        await Bids.createBid({bidderId: req.authId, amount: parseInt(req.body.amount, 10)}, auctionId)
        res.status(201).send();
    } catch (err) {
        Logger.error(err);
        res.status(500).send();
    }
}

export {getBids, addBid}
