import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter.js';
import urlRouter from './routers/urlRouter.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(urlRouter);

server.get('/status', (req, res) => {
    res.sendStatus(200);
});

server.listen(process.env.PORT, console.log("Server running on port " + process.env.PORT));