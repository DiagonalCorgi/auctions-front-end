type baseAuction = {
    title: string,
    categoryId: number,
    sellerId: number,
    reserve: number,
    endDate: string
}

type postAuction = {
    description: string
} & baseAuction

type auction = {
    auctionId: number,
    sellerFirstName: string,
    sellerLastName: string,
    highestBid: number,
    numBids: number,
} & baseAuction

type auctions = {description: string}&auction

type auctionSearchQuery = {
    startIndex: number,
    count: number,
    q: string,
    categoryIds: number[],
    sellerId: number,
    bidderId: number,
    sortBy: string
}

type auctionsReturn = {
    auctions: auction[],
    count: number
}

type category = {
    categoryId: number,
    name: string
}

type bid = {
    bidderId: number,
    amount: number,
    firstName: string
    lastName: string,
    timestamp: string
}

type postBid = {
    bidderId: number,
    amount: number
}