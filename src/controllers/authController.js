import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { v4 as uuid } from 'uuid';

async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const encryptedPassword = bcrypt.hashSync(password, 8);

        await connection.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, encryptedPassword]
        );

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function signIn(req, res) {
    const userId = res.locals.userId;
    const token = uuid();

    try {
        await connection.query(
            'INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [userId, token]
        );

        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { signUp, signIn };