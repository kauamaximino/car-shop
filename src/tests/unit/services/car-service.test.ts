import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose'
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carForCreate, carCreate } from '../../mocks/car.mock';

const { expect } = chai;

describe('Seção Service Cars', () => {

  const carModel = new CarModel();
  const carService = new CarService(carModel);

  after(() => { sinon.restore() });

  it('Deve ser possível criar um carro', async () => {
    sinon.stub(carModel, 'create').resolves(carCreate);
    try {
      const carCreated = await carService.create(carForCreate);
      expect(carCreated).to.be.eql(carCreate);
    } catch (error: any) {
      expect(error.message).to.be.eql('Invalid car object');
    }
  })

  it('Deve ser possível retornar todos os carros', async () => {
    sinon.stub(carModel, 'read').resolves([carCreate]);
    const cars = await carService.read();
    expect(cars).to.be.eql([carCreate]);
  })

  it('Deve ser possível retornar um carro pelo id', async () => {
    sinon.stub(carModel, 'readOne').resolves(carCreate);
    try {
      const cars = await carService.readOne('6324b1f7e63a20956a30c009');
      expect(cars).to.be.eql(carCreate);
    } catch (error: any) {
      expect(error.message).to.be.eql('Id must have 24 hexadecimal characters');
    }
  })

  it('Deve ser possível atualizar um carro pelo id', async () => {
    sinon.stub(carModel, 'update').resolves(carCreate);
    try {
      const cars = await carService.update('6324b1f7e63a20956a30c009', carForCreate);
      expect(cars).to.be.eql(carCreate);
    } catch (error: any) {
      expect(error.message).to.be.eql('Id must have 24 hexadecimal characters');
    }
  })

  it('Deve ser possível deletar um carro pelo id', async () => {
    sinon.stub(carModel, 'delete').resolves();
    try {
      const carDelete = await carService.delete('6324b1f7e63a20956a30c009');
      expect(carDelete).to.be.undefined;
    } catch (error: any) {
      expect(error.message).to.be.eql('Object not found');
    }
  })
})
