import express from 'express';
import controller from './controller';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', controller);

export default app;
