import express from 'express';
import 'express-async-errors';
import indexRoutes from './routes/index.routes';
import globalError from './helpers/error/globalError';

const app = express();
app.use(express.json());
app.use(indexRoutes);
app.use(globalError);

export default app;