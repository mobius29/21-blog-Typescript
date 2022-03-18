import express from 'express';
import cookieParser from 'cookie-parser';
import controller from './controller';
import jwtMiddleware from './lib/jwtMiddleware';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(jwtMiddleware);
app.use('/api', controller);

export default app;
