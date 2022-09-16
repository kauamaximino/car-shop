import { Router } from 'express';
import cars from './cars.routes';

const routes = Router();

routes.use(cars);

export default routes;