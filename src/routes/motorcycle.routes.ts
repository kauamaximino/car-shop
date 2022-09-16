import { Router } from 'express';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleController from '../controllers/MotorcycleController';

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const motorcycles = Router();
const motorcycleID = '/motorcycles/:id';

motorcycles.post(
  '/motorcycles',
  (request, response) => motorcycleController.create(request, response),
);

motorcycles.get(
  '/motorcycles',
  (_request, response) => motorcycleController.read(_request, response),
);

motorcycles.get(
  motorcycleID,
  (request, response) => motorcycleController.readOne(request, response),
);

motorcycles.put(
  motorcycleID,
  (request, response) => motorcycleController.update(request, response),
);

motorcycles.delete(
  motorcycleID,
  (request, response) => motorcycleController.delete(request, response),
);

export default motorcycles;