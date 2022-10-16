import bcrypt from 'bcrypt';
import connection from '../database/database.js';

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

export { signUp };