import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { carForCreate, carCreate, wrongCarForCreate } from '../../mocks/car.mock';
import CarController from '../../../controllers/CarController';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';

describe('Seção Controller Cars', () => { 
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })

  after(() => { sinon.restore() });

  it('Deve retornar status 201 e o carro criado com id', async () => {
    sinon.stub(carService, 'create').resolves(carCreate);
    req.body = carForCreate;
    await carController.create(req, res);

    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carCreate)).to.be.true;
  })

  it('Deve retornar status 200 e todos os carros', async () => {
    sinon.stub(carService, 'read').resolves([carCreate]);
    await carController.read(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith([carCreate])).to.be.true;
  })

  it('Deve retornar status 200 e o carro com o id informado', async () => {
    sinon.stub(carService, 'readOne').resolves(carCreate);
    req.params = { id: carCreate._id };
    await carController.readOne(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carCreate)).to.be.true;
  })

  it('Deve retornar status 200 e o carro atualizado', async () => {
    sinon.stub(carService, 'update').resolves(carCreate);
    req.params = { id: carCreate._id };
    req.body = carForCreate;
    await carController.update(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carCreate)).to.be.true;
  })

  it('Deve retornar status 200 e o carro deletado', async () => {
    sinon.stub(carService, 'delete').resolves(carCreate);
    req.params = { id: carCreate._id };
    await carController.delete(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carCreate)).to.be.true;
  })

});
