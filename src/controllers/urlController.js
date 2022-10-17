import connection from "../database/database.js";
import { nanoid } from 'nanoid';

async function shortenUrl(req, res) {
    const { url } = res.locals.body;
    const userId = res.locals.userId;
    const shortUrl = nanoid(8);

    try {
        await connection.query(
            'INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3);', [url, shortUrl, userId]
        );

        return res.status(201).send(shortUrl);
    } catch (error) {
        return res.status(500).send(error);
    }
}
  

export { shortenUrl };