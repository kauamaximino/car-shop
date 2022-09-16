import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose'
import CarModel from '../../../models/CarModel';
import { carForCreate, carCreate } from '../../mocks/car.mock';

const { expect } = chai;

describe('Seção Model Cars', () => {

  const carModel = new CarModel();

  after(() => {sinon.restore()});

  it('Deve ser possível criar um carro', async () => {
    sinon.stub(Model, 'create').resolves(carCreate);
    const carCreated = await carModel.create(carForCreate);
    expect(carCreated).to.be.eql(carCreate);
  })

  it('Deve ser possível retornar todos os carros', async () => {
    sinon.stub(Model, 'find').resolves([carCreate]);
    const cars = await carModel.read();
    expect(cars).to.be.eql([carCreate]);
  })

  it('Deve ser possível retornar um carro pelo id', async () => {
    sinon.stub(Model, 'findById').resolves(carCreate);
    const cars = await carModel.readOne('6324b1f7e63a20956a30c009');
    // console.log(cars)
    expect(cars).to.be.eql(carCreate);
  })

  it('Deve ser possível atualizar um carro pelo id', async () => {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carCreate);
    const cars = await carModel.update('6324b1f7e63a20956a30c009', carForCreate);
    expect(cars).to.be.eql(carCreate);
  })

  it('Deve ser possível deletar um carro pelo id', async () => {
    sinon.stub(Model, 'findByIdAndDelete').resolves();
    try {
      const carDelete = await carModel.delete('6324b1f7e63a20956a30c009');
      expect(carDelete).to.be.undefined;
    } catch (error: any) {
      expect(error.message).to.be.eql('Object not found');
    }
  })
});