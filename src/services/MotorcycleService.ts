import IService from '../interfaces/IService';
import { IMotorcycle, motorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import CustomError from '../helpers/error/customError';

export default class MotorcycleService implements IService<IMotorcycle> { 
  private model: IModel<IMotorcycle>;
  protected message400: string;
  protected message404: string;

  constructor(model: IModel<IMotorcycle>) {
    this.model = model;
    this.message400 = 'Id must have 24 hexadecimal characters';
    this.message404 = 'Object not found';
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycle.safeParse(obj);
    if (!parsed.success) throw new CustomError(400, 'Invalid motorcycle object');
    return this.model.create(obj);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this.model.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    if (_id.length < 24) throw new CustomError(400, this.message400);

    const motorcycleResult = await this.model.readOne(_id);

    if (!motorcycleResult) throw new CustomError(404, this.message404);

    return motorcycleResult;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    if (_id.length < 24) throw new CustomError(400, this.message400);

    const motorcycleUpdate = await this.model.update(_id, obj);

    if (!motorcycleUpdate) throw new CustomError(404, this.message404);

    return motorcycleUpdate;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    if (_id.length < 24) throw new CustomError(400, this.message400);
    const motorcycleDelete = await this.model.delete(_id);

    if (!motorcycleDelete) throw new CustomError(404, this.message404);

    return this.model.delete(_id);
  }
}