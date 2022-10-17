import connection from "../database/database.js";
import { nanoid } from 'nanoid';

async function shortenUrl(req, res) {
    const { url } = res.locals.body;
    const shortUrl = nanoid(8);

    try {
        await connection.query(
            'INSERT INTO urls (url, "shortUrl") VALUES ($1, $2);', [url, shortUrl]
        );

        return res.status(201).send(shortUrl);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { shortenUrl };