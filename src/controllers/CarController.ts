import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';
import CustomError from '../helpers/error/customError';

export default class CarController {
  constructor(private service: IService<ICar>) { }
  
  public async create(request: Request, response: Response): Promise<Response> { 
    const carCreatead = await this.service.create(request.body);
    return response.status(201).json(carCreatead);
  }

  public async read(_request: Request, response: Response): Promise<Response> {
    const allCars = await this.service.read();
    return response.status(200).json(allCars);
  }

  public async readOne(request: Request, response: Response): Promise<Response> {
    const car = await this.service.readOne(request.params.id);
    return response.status(200).json(car);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    if (Object.keys(request.body).length < 1) throw new CustomError(400, 'Invalid body');
    const carUpdated = await this.service.update(request.params.id, request.body);
    return response.status(200).json(carUpdated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const carDeleted = await this.service.delete(request.params.id);
    return response.status(204).json(carDeleted);
  }
}