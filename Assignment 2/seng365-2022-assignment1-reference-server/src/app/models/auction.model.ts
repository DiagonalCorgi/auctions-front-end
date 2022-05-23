import {getPool} from "../../config/db";
import {decamelizeKeys} from "humps";

const viewAll = async(searchQuery: any): Promise<auctionsReturn> => {
    let query: string = `SELECT A.id as auctionId,
        A.title as title,
        A.end_date as endDate,
        A.category_id as categoryId,
        A.reserve as reserve,
        A.seller_id as sellerId,
        U.first_name as sellerFirstName,
        U.last_name as sellerLastName,
        (SELECT COUNT(*) FROM auction_bid WHERE auction_id = A.id) as numBids,
        (SELECT MAX(amount) FROM auction_bid WHERE auction_id = A.id) as highestBid
        FROM auction A JOIN user U ON A.seller_id = U.id `;
    if(searchQuery.bidderId !== -1){
        query += `INNER JOIN (SELECT DISTINCT user_id, auction_id from \`auction_bid\`) B ON A.id = B.auction_id AND B.user_id = ${searchQuery.bidderId} `
    }
    let countQuery = `SELECT COUNT(A.id) FROM auction A JOIN user U on A.seller_id = U.id `
    if(searchQuery.bidderId !== -1){
        countQuery += `INNER JOIN (SELECT DISTINCT user_id, auction_id from \`auction_bid\`) B ON A.id = B.auction_id AND B.user_id = ${searchQuery.bidderId} `
    }
    const whereConditions: any[] = []
    const values: any[] = []
    if (searchQuery.q !== "") {
        whereConditions.push('(\`title\` LIKE ? OR \`description\` LIKE ?)');
        values.push(`%${searchQuery.q}%`);
        values.push(`%${searchQuery.q}%`);
    }
    if (searchQuery.sellerId !== -1) {
        whereConditions.push('seller_id = ?');
        values.push(searchQuery.sellerId)
    }
    if (searchQuery.categoryIds.length){
        whereConditions.push(`\`category_id\` IN (?)`)
        values.push(searchQuery.categoryIds)
    }
    if (whereConditions.length) {
        query += `\nWHERE ${(whereConditions ? whereConditions.join(' AND ') : 1)}\n`
        countQuery += `\nWHERE ${(whereConditions ? whereConditions.join(' AND ') : 1)}\n`
    }
    const countValues = [...values]

    const searchSwitch = (sort: string) => ({
        'ALPHABETICAL_ASC': `ORDER BY title ASC`,
        'ALPHABETICAL_DESC': `ORDER BY title DESC`,
        'BIDS_ASC': `ORDER BY highestBid ASC`,
        'BIDS_DESC': `ORDER BY highestBid DESC`,
        'RESERVE_ASC': `ORDER BY reserve ASC`,
        'RESERVE_DESC': `ORDER BY reserve DESC`,
        'CLOSING_LAST': `ORDER BY \`endDate\` DESC`,
        'CLOSING_SOON': `ORDER BY \`endDate\` ASC`
    })[sort]
    query += searchSwitch(searchQuery.sortBy) + ', auctionId\n';

    // LIMIT and OFFSET
    if (searchQuery.count !== -1) {
        query += 'LIMIT ?\n';
        values.push(searchQuery.count);
    }
    if (searchQuery.startIndex !== -1) {
        if (searchQuery.count === -1) {
            query += 'LIMIT ?\n';
            values.push(1000000000);
        }
        query += 'OFFSET ?\n';
        values.push(searchQuery.startIndex);
    }

    const rows = await getPool().query(query, values)
    const countRows = await getPool().query(countQuery, countValues);
    const c = Object.values(JSON.parse(JSON.stringify(countRows[0][0])))[0]
    const a = rows[0];
    if (a.length && a[0].auctionId !== null) {
        return {count: c, auctions:a} as auctionsReturn;
    } else {
        return {count:0, auctions:[]};
    }
}

const getOne = async (id: number): Promise<auctions> => {
    const query = `SELECT A.id as auctionId,
        A.title as title,
        A.description as description,
        A.end_date as endDate,
        A.category_id as categoryId,
        A.reserve as reserve,
        A.seller_id as sellerId,
        U.first_name as sellerFirstName,
        U.last_name as sellerLastName,
        (SELECT COUNT(*) FROM auction_bid WHERE auction_id = A.id) as numBids,
        (SELECT MAX(amount) FROM auction_bid WHERE auction_id = A.id) as highestBid
        FROM auction A JOIN user U ON A.seller_id = U.id
        WHERE A.id = ?`;
    const rows = await getPool().query(query, id)
    return rows[0].length === 0 ? null: rows[0][0] as unknown as auctions;
}

const getImageFilename = async (id:number): Promise<string> => {
    const query = 'SELECT `image_filename` FROM `auction` WHERE id = ?'
    const rows = await getPool().query(query, [id])
    return rows[0].length === 0 ? null: rows[0][0].image_filename;
}

const setImageFileName = async (id: number, filename: string): Promise<void> => {
    const query = `UPDATE \`auction\` SET image_filename = ? WHERE id = ?`;
    const result = await getPool().query(query, [filename, id]);
}

const create = async(auction: baseAuction): Promise<number> => {
    const query = `INSERT INTO \`auction\` (title, description, category_id , seller_id, reserve, end_date) VALUES (?)`;
    const [result] = await getPool().query(query, [Object.values(decamelizeKeys(auction))])
    return result.insertId;
}

const update = async(auction: any, id: number): Promise<void> => {
    const query = 'UPDATE `auction` SET ? WHERE id = ?';
    const [result] = await getPool().query(query, [decamelizeKeys(auction), id])
}

const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM \`auction\` WHERE id = ?`;
    const [result] = await getPool().query(query, [id])
}

const getCategories = async (): Promise<category[]> => {
    const query = "SELECT id as categoryId, name from category ORDER BY id ASC"
    const rows = await getPool().query(query)
    return rows[0] as category[];
}

const getHighestBid = async (id:number): Promise<number> => {
    const query = `SELECT A.id,
    (SELECT MAX(amount) FROM auction_bid WHERE auction_id = A.id) as highestBid
    FROM auction A
    WHERE A.id = ?`
    const rows = await getPool().query(query, [id])
    return rows[0].length === 0 ? null: rows[0][0].highestBid as number;
}

export {viewAll, getOne, getImageFilename, setImageFileName, create, update, remove, getCategories, getHighestBid}