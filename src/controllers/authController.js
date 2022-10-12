import connection from "../database/database.js";
import bcrypt from 'bcrypt';

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

} 

export {signUp, signIn};