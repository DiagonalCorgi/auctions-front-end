import {Express} from "express";
import {rootUrl} from "./base.routes"
import {authenticate} from "../middleware/auth.middleware";
import {parseSearch} from "../middleware/search.middleware";

import * as auction from '../controllers/auction.controller';
import * as auctionImages from '../controllers/auction.images.controller';
import * as auctionBids from '../controllers/auction.bids.controller';
import {parsePatchAuction, parsePostAuction} from "../middleware/post.middleware";


module.exports = (app: Express) => {
    app.route(rootUrl + '/auctions')
        .get(parseSearch, auction.viewAll)
        .post(authenticate, parsePostAuction, auction.addAuction);

    app.route(rootUrl+'/auctions/categories')
        .get(auction.getCategories)

    app.route(rootUrl+'/auctions/:id')
        .get(auction.viewOne)
        .patch(authenticate, parsePatchAuction, auction.updateAuction)
        .delete(authenticate, auction.deleteAuction)

    app.route(rootUrl+'/auctions/:id/bids')
        .get(auctionBids.getBids)
        .post(authenticate, auctionBids.addBid)

    app.route(rootUrl + '/auctions/:id/image')
        .get(auctionImages.getImage)
        .put(authenticate, auctionImages.setImage)
}