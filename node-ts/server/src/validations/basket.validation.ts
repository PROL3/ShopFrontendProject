import { z } from 'zod';
import { dynamicValidateSchema } from './dynamic.validation';

const TechItemSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1).max(100),
    category: z.string().min(1).max(50),
    brand: z.string().min(1).max(50),
    price: z.number().positive(),
    quantity: z.number().int().nonnegative(),
});

export const userValidateSchema = <T extends Partial<z.infer<typeof TechItemSchema>>,>(obj: T) => dynamicValidateSchema(TechItemSchema, obj)
