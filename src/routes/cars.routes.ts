import { Router } from 'express';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

const cars = Router();

cars.post('/cars', (request, response) => carController.create(request, response));
cars.get('/cars', (_request, response) => carController.read(_request, response));
cars.get('/cars/:id', (request, response) => carController.readOne(request, response));
cars.put('/cars/:id', (request, response) => carController.update(request, response));
cars.delete('/cars/:id', (request, response) => carController.delete(request, response));

export default cars;