import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routers/routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const { PORT } = process.env;
app.listen(PORT);
