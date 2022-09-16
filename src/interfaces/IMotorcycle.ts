import { z } from 'zod';
import { vehicle } from './IVehicle';

export const motorcycle = vehicle.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().positive().lte(2500),
});

export type IMotorcycle = z.infer<typeof motorcycle>;