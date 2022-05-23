import {getPool} from "../../config/db";

const viewBids = async (id: number): Promise<bid[]> => {
    const query = `SELECT user_id AS bidder_id, first_name, last_name, timestamp, amount
                      FROM \`auction_bid\` B
                      LEFT JOIN \`user\` U on B.user_id = U.id
                      WHERE auction_id = ?
                      ORDER BY amount DESC`;
    const rows = await getPool().query(query, [id])
    return rows[0] as bid[]
}

const createBid = async (bid: postBid, id: number): Promise<void> => {
    const query = `INSERT INTO \`auction_bid\` ( user_id, auction_id, timestamp, amount) VALUES (?,?,?,?)`
    const [result] = await getPool().query(query, [bid.bidderId, id, new Date(), bid.amount])
}

export {viewBids, createBid}