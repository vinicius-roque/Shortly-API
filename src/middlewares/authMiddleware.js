import joi from 'joi';
import connection from '../database/database.js';
import bcrypt from 'bcrypt';

const signUpSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(1).required()
});

async function validateSignUp(req, res, next) {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const errors = validation.error.details.map(error => error.message);

        return res.status(422).send(errors);
    }

    const { email } = req.body;
    
    const exintingEmail = await connection.query(
        'SELECT * FROM users WHERE email = $1;', [email]
    );

    if(exintingEmail.rows.length > 0) {
        return res.status(409).send("Este email já está sendo usado, tente outro!");
    } 

    next();
}

async function validateSignIn(req, res, next) {
    const validation = signInSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const errors = validation.error.details.map(error => error.message);

        return res.status(422).send(errors);
    }
        
    const { email, password } = req.body;

    const user = await connection.query(
        'SELECT * FROM users WHERE email = $1;', [email]
    );

    if(user.rows.length === 0) {
        return res.status(401).send('Try again. This email is invalid!');
    }

    const validPassword = bcrypt.compareSync(password, user.rows.length === 0 ? '' : user.rows[0].password);

    if(!validPassword) {
        return res.status(401).send('Try again. This password is invalid!');
    }

    next();
}

export { validateSignUp, validateSignIn };