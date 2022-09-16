import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';
import CustomError from '../helpers/error/customError';

export default class MotorcycleController {
  constructor(private service: IService<IMotorcycle>) { }

  public async create(request: Request, response: Response): Promise<Response> {
    const motorcycleCreatead = await this.service.create(request.body);
    return response.status(201).json(motorcycleCreatead);
  }

  public async read(_request: Request, response: Response): Promise<Response> {
    const allMotorcycles = await this.service.read();
    return response.status(200).json(allMotorcycles);
  }

  public async readOne(request: Request, response: Response): Promise<Response> {
    const motorcycle = await this.service.readOne(request.params.id);
    return response.status(200).json(motorcycle);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    if (Object.keys(request.body).length < 1) throw new CustomError(400, 'Invalid body');
    const motorcycleUpdated = await this.service.update(request.params.id, request.body);
    return response.status(200).json(motorcycleUpdated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const motorcycleDeleted = await this.service.delete(request.params.id);
    return response.status(204).json(motorcycleDeleted);
  }
}