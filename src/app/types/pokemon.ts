import { z } from 'zod';
import { MonSchema, Mon } from './mon';

export const PokemonSchema = MonSchema.extend({
  id: z.number().int({ message: 'Id must be an integer' }),
  imageFront: z.string().url().nullable(),
  imageBack: z.string().url().nullable(),
  types: z.array(z.string()),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export function isPokemon(toBeDetermined: Mon): toBeDetermined is Pokemon {
  if ((toBeDetermined as Pokemon).imageBack) {
    return true;
  }
  return false;
}
