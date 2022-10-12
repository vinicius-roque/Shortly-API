import connection from "../database/database.js";
import joi from 'joi';

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

export { validateSingUp };