import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import recordsRouter from './routes/records';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(json());

app.use(recordsRouter);

app.use(errorHandler);

export default app;