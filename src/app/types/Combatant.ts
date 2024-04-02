import { Monkey } from './monkey';
import { Pokemon } from './pokemon';

export type Combatant = {
  currentHp: number;
  mon: Monkey | Pokemon;
};
