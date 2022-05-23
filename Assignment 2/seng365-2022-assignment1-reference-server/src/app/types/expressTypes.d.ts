// tslint:disable-next-line:no-namespace
declare namespace Express {
    export interface Request {
        authId?: number
        searchQuery: auctionSearchQuery
        postAuction: postAuction
    }
}