import { z } from 'zod';

const vehicle = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2021),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof vehicle>;