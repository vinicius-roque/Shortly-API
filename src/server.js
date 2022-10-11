import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.get('/status', (req, res) => {
    res.sendStatus(200);
});

server.listen(process.env.PORT, console.log(`Magic happens on port ${process.env.PORT}`));