import { Model, UpdateQuery, isValidObjectId } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import CustomError from '../helpers/error/customError';

export default abstract class MongoModel<T> implements IModel<T> {
  protected model: Model<T>;
  
  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this.model.find({});
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new CustomError(404, 'Object not found');
    return this.model.findById(_id);
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(_id, { ...obj } as UpdateQuery<T>, { new: true });
  }

  public async delete(_id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(_id);
  }
}