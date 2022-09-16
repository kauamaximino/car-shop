import { ICar } from '../../interfaces/ICar';

export const carForCreate: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

export const carCreate: ICar & { _id: string } = {
  _id: "6324b1f7e63a20956a30c009",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2, 
}

export const wrongCarForCreate = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
}
