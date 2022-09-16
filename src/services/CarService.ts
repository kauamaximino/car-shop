import IService from '../interfaces/IService';
import { ICar, car } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import CustomError from '../helpers/error/customError';

export default class CarService implements IService<ICar> {
  private model: IModel<ICar>;
  protected message400: string;
  protected message404: string;

  constructor(model: IModel<ICar>) {
    this.model = model;
    this.message400 = 'Id must have 24 hexadecimal characters';
    this.message404 = 'Object not found';
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = car.safeParse(obj);
    if (!parsed.success) throw new CustomError(400, 'Invalid car object');
    return this.model.create(obj);
  }

  public async read(): Promise<ICar[]> {
    return this.model.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    if (_id.length < 24) throw new CustomError(400, this.message400);

    const carResult = await this.model.readOne(_id);

    if (!carResult) throw new CustomError(404, this.message404);

    return carResult;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    if (_id.length < 24) throw new CustomError(400, this.message400);

    const carUpdate = await this.model.update(_id, obj);

    if (!carUpdate) throw new CustomError(404, this.message404);

    return carUpdate;
  }

  public async delete(_id: string): Promise<ICar | null> {
    if (_id.length < 24) throw new CustomError(400, this.message400);
    const carDelete = await this.model.delete(_id);

    if (!carDelete) throw new CustomError(404, this.message404);

    return this.model.delete(_id);
  }
}