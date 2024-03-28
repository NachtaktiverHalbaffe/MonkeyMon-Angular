import { z } from 'zod';

export const MonSchema = z.object({
  id: z.coerce
    .number()
    .int({ message: 'Id must be an integer' })
    .optional()
    .nullable(),
  name: z.string({ required_error: 'Name must be given' }).trim(),
  image: z
    .string()
    .trim()
    .url({ message: 'Not a valid URL' })
    .optional()
    .nullable(),
  description: z
    .string()
    .trim()
    .max(300, { message: 'Description can only have up to 300 characters' })
    .optional()
    .nullable(),
  hp: z.coerce
    .number()
    .int({ message: 'HP must be an integer' })
    .gt(0, { message: 'HP must be greater than 0' })
    .lt(500, { message: "HP can't be greater than 500" }),
  attack: z.coerce
    .number()
    .int({ message: 'Attack must be an integer' })
    .gt(0, { message: 'Attack must be greater than 0' })
    .lt(500, { message: "Attack can't be greater than 500" }),
  defense: z.coerce
    .number()
    .int({ message: 'Defense must be an integer' })
    .gt(0, { message: 'Defense must be greater than 0' })
    .lt(500, { message: "Defense can't be greater than 500" }),
  specialAttack: z.coerce
    .number()
    .int({ message: 'Special Attack must be an integer' })
    .gt(0, { message: 'Special Attack must be greater than 0' })
    .lt(500, { message: "Special Attack can't be greater than 500" }),
  specialDefense: z.coerce
    .number()
    .int({ message: 'Special Defense must be an integer' })
    .gt(0, { message: 'Special Defense must be greater than 0' })
    .lt(500, { message: "Special Defense can't be greater than 500" }),
  speed: z.coerce
    .number()
    .int({ message: 'Speed must be an integer' })
    .gt(0, { message: 'Speed must be greater than 0' })
    .lt(500, { message: "Speed can't be greater than 500" }),
});

export type Mon = z.infer<typeof MonSchema>;
