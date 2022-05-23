import Logger from "../../config/logger"
import {NextFunction, Request, Response} from "express";
import {getCategories} from "../models/auction.model";

const parseSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const search: auctionSearchQuery = {
        startIndex: 0, count: -1, q: "", categoryIds: [],
        sellerId: -1, bidderId: -1, sortBy: "CLOSING_SOON"}
    const allowedSorts: string[] = ["ALPHABETICAL_ASC", "ALPHABETICAL_DESC", "BIDS_ASC", "BIDS_DESC", "CLOSING_SOON",
        "CLOSING_LAST", "RESERVE_ASC", "RESERVE_DESC"]
    try {
        if (req.query.hasOwnProperty('count')) {
            if (isNaN(parseInt(req.query.count as string, 10)) || parseInt(req.query.count as string, 10) < 0)
                throw new Error("Invalid count parameter")
            search.count = parseInt(req.query.count as string, 10);
        }
        if (req.query.hasOwnProperty('startIndex')) {
            if (isNaN(parseInt(req.query.startIndex as string, 10)) || parseInt(req.query.startIndex as string, 10) < 0)
                throw new Error("Invalid startIndex parameter")
            search.startIndex = parseInt(req.query.startIndex as string, 10);
        }
        if (req.query.hasOwnProperty('sellerId')) {
            if (isNaN(parseInt(req.query.sellerId as string, 10)) || parseInt(req.query.sellerId as string, 10) < 0)
                throw new Error("Invalid sellerId parameter")
            search.sellerId = parseInt(req.query.sellerId as string, 10);
        }
        if (req.query.hasOwnProperty('bidderId')) {
            if (isNaN(parseInt(req.query.bidderId as string, 10)) || parseInt(req.query.bidderId as string, 10) < 0)
                throw new Error("Invalid bidderId parameter")
            search.bidderId = parseInt(req.query.bidderId as string, 10);
        }
        if (req.query.hasOwnProperty('q'))
            search.q = req.query.q as string;
        if (req.query.hasOwnProperty('sortBy')) {
            if (allowedSorts.includes(req.query.sortBy as string))
                search.sortBy = req.query.sortBy as string;
            else
                throw new Error('Invalid sortBy parameter');
        }
        if (req.query.hasOwnProperty('categoryIds')) {
            if(!Array.isArray(req.query.categoryIds))
                search.categoryIds = [parseInt(req.query.categoryIds as string, 10)]
            else
                search.categoryIds = (req.query.categoryIds as string[]).map((x: string) => parseInt(x, 10))
            const categories = await getCategories();

            if (!search.categoryIds.every(c => categories.map(x => x.categoryId).includes(c)))
                throw new Error('Invalid categoryId')
        }
        req.searchQuery = search;
        next();
    } catch (err) {
        Logger.error(err)
        res.statusMessage = 'Bad Request';
        res.status(400).send();
        return;
    }
}

export {parseSearch}