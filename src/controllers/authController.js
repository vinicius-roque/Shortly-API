import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";

async function signUp(req, res) {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 12);

    try {
        await connection.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, passwordHash]
        );

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function signIn(req, res) {
    try {
        const { userId } = res.locals;
        const token = uuidv4();

        await connection.query(
            'INSERT INTO urls ("userId", token) VALUES ($1, $2);', [userId, token]
        );

        return res.send({ token }).status(200); 
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
} 

export { signUp, signIn };