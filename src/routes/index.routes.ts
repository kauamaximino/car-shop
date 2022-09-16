import { Router } from 'express';
import cars from './cars.routes';
import motorcycles from './motorcycle.routes';

const routes = Router();

routes.use(cars);
routes.use(motorcycles);

export default routes;