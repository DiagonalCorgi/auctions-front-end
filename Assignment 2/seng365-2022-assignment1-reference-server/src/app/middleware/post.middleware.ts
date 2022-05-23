import {NextFunction, Request, Response} from "express";
import Logger from "../../config/logger";
import {getOne, getCategories} from "../models/auction.model";

const parsePostAuction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const auction: postAuction = {
            title:"", description: "", categoryId: -1, sellerId: req.authId, reserve: 1, endDate: ""
        }
        if (req.body.hasOwnProperty('title') && req.body.title!=="" && req.body.title.length <= 128)
            auction.title = req.body.title
        else
            throw new Error('Invalid or empty title')
        if (req.body.hasOwnProperty('description') && req.body.description!=="" && req.body.description.length <= 2048)
            auction.description = req.body.description
        else
            throw new Error('No description')
        if (req.body.hasOwnProperty('categoryId')) {
            const categories = await getCategories();
            if (categories.map(x => x.categoryId).includes(parseInt(req.body.categoryId, 10)))
                auction.categoryId = parseInt(req.body.categoryId, 10)
            else
                throw new Error('Invalid categoryId')
        }
        else
            throw new Error('Empty categoryId')
        if (req.body.hasOwnProperty('endDate')) {
            if(isNaN(Date.parse(req.body.endDate))){
                res.statusMessage = "Invalid endDate"
                res.status(400).send();
                return;
            }
            if(Date.parse(req.body.endDate) < Date.now()) {
                res.statusMessage = "Auction end date cannot be in the past";
                res.status(403).send();
            }
            else
                auction.endDate = req.body.endDate
        }
        else
            throw new Error('No endDate')
        if (req.body.hasOwnProperty('reserve')) {
            if (req.body.reserve > 99999999999)
                throw new Error("Invalid reserve")
            auction.reserve = parseInt(req.body.reserve, 10)
        }
        req.postAuction = auction
        next()
    } catch (err) {
        Logger.error(err)
        res.statusMessage = 'Bad Request';
        res.status(400).send();
        return;
    }
}

const parsePatchAuction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const a = await getOne(parseInt(req.params.id,10))
        if(a==null) {
            res.status(404).send();
            return;
        }
        if (a.numBids > 0) {
            res.statusMessage = "Cannot change auction parameters after bedding has begun"
            res.status(403).send()
            return;
        }
        const auction: postAuction = {
            title:a.title, description: a.description, categoryId: a.categoryId, sellerId: a.sellerId, reserve: a.reserve, endDate: a.endDate
        }
        if (req.body.hasOwnProperty('title')) {
            if (req.body.description.title >= 128)
                throw new Error("Invalid description")
            auction.title = req.body.title
        }
        if (req.body.hasOwnProperty('description')) {
            if (req.body.description.length >= 2048)
                throw new Error("Invalid description")
            auction.description = req.body.description
        }
        if (req.body.hasOwnProperty('categoryId')) {
            const categories = await getCategories();
            if (categories.map(x => x.categoryId).includes(parseInt(req.body.categoryId, 10)))
                auction.categoryId = parseInt(req.body.categoryId, 10)
            else
                throw new Error('Invalid categoryId')
        }
        if (req.body.hasOwnProperty('endDate')) {
            if (Date.parse(req.body.endDate) < Date.now()) {
                res.statusMessage = "Auction end date cannot be in the past";
                res.status(403).send();
            } else
                auction.endDate = req.body.endDate
        }
        if (req.body.hasOwnProperty('reserve')) {
            if (req.body.reserve > 99999999999)
                throw new Error("Invalid reserve")
            auction.reserve = parseInt(req.body.reserve, 10)
        }
        req.postAuction = auction
        next()
    } catch (err) {
        Logger.error(err)
        res.statusMessage = 'Bad Request';
        res.status(400).send();
        return;
    }
}

export {parsePostAuction, parsePatchAuction}