import connection from "../database/database.js";
import joi from 'joi';
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

async function validateSingUp(req, res, next) {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const errors = validation.error.details.map(detail => detail.message);

        return res.status(422).send(errors);
    }

    const { email } = req.body;
    
    const existingUser = await connection.query(
        'SELECT * FROM users WHERE email = $1;', [email]
    );

    if(existingUser.rowCount) {
        return res.status(409).send('This email is already being used!');
    }

    next();
}

async function validateSingIn(req, res, next) {
    const { error } = signInSchema.validate(req.body, { abortEarly: false });

    if(error) {
        return res.send(error.message).status(422);
    }

    const { email, password } = req.body;
    
    const user = (await connection.query(
        'SELECT * FROM users WHERE email = $1', [email])
    ).rows;

    const validEmail = user.find(value => value.email === email);

    if(!validEmail) {
        return res.sendStatus(401);
    }

    const validPassword = bcrypt.compareSync(password, user[0].password);

    if(!validPassword) {
        return res.sendStatus(401);
    }

    res.locals.userId = user[0].id;

    next();
}

export { validateSingUp, validateSingIn };