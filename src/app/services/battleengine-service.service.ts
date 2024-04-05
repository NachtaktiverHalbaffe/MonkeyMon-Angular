import { Injectable } from '@angular/core';
import { Combatant } from '../types/Combatant';
import { Monkey } from '../types/monkey';
import { Pokemon, isPokemon } from '../types/pokemon';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root',
})
export class BattleEngineService {
  fighter: Combatant | null;
  opponent: Combatant | null;
  battleState$: Observable<{
    fighter: Combatant | null;
    opponent: Combatant | null;
  }>;
  isFightOver: boolean = false;

  constructor() {
    this.fighter = null;
    this.opponent = null;
    this.battleState$ = from(this.battle());
  }

  setFighter(fighter: Monkey | Pokemon) {
    this.fighter = {
      currentHp: fighter.hp,
      mon: isPokemon(fighter)
        ? { ...fighter, image: fighter.imageBack }
        : fighter,
    };
    if (this.isFightOver) {
      this.isFightOver = false;
      this.battleState$ = from(this.battle());
    }
    console.debug('Set fighter: ', this.fighter);
  }

  setOpponent(opponent: Monkey | Pokemon) {
    this.opponent = { currentHp: opponent.hp, mon: opponent };
    if (this.isFightOver) {
      this.isFightOver = false;
      this.battleState$ = from(this.battle());
    }
    console.debug('Set opponent: ', this.opponent);
  }

  damageFighter(damage: number) {
    if (this.fighter != null) {
      this.fighter = {
        ...this.fighter,
        currentHp: this.fighter.currentHp - damage,
      };
    }
  }

  damageOpponent(damage: number) {
    if (this.opponent != null) {
      this.opponent = {
        ...this.opponent,
        currentHp: this.opponent.currentHp - damage,
      };
    }
  }

  fighterIsFaster(): boolean {
    if (this.fighter == null || this.opponent == null) {
      throw Error('Fighter and opponent must both be set');
    }
    return this.fighter.mon.speed >= this.opponent.mon.speed;
  }

  calculateDamage(attacker: Combatant, defender: Combatant): number {
    const damage = attacker.mon.attack - defender.mon.defense;
    return damage > 0 ? damage : 1;
  }

  async *battle(): AsyncGenerator<{
    fighter: Combatant | null;
    opponent: Combatant | null;
  }> {
    // Wait until all fighter are set
    while (this.fighter == null || this.opponent == null) {
      console.debug('Either fighter or opponent isnt set');
      await new Promise((f) => setTimeout(f, 1000));
      yield { fighter: this.fighter, opponent: this.opponent };
    }

    while (this.fighter.currentHp > 0 && this.opponent.currentHp > 0) {
      await new Promise((f) => setTimeout(f, 1000));
      if (this.fighterIsFaster()) {
        this.opponent = {
          ...this.opponent!,
          currentHp:
            this.opponent!.currentHp -
            this.calculateDamage(this.fighter, this.opponent),
        };

        if (this.opponent.currentHp <= 0) {
          yield { opponent: this.opponent, fighter: this.fighter };
          break;
        }

        this.fighter = {
          ...this.fighter!,
          currentHp:
            this.fighter!.currentHp -
            this.calculateDamage(this.opponent, this.fighter),
        };
      } else {
        this.fighter = {
          ...this.fighter!,
          currentHp:
            this.fighter!.currentHp -
            this.calculateDamage(this.opponent, this.fighter),
        };

        if (this.fighter!.currentHp <= 0) {
          yield { opponent: this.opponent, fighter: this.fighter };
          break;
        }
        this.opponent = {
          ...this.opponent!,
          currentHp:
            this.opponent!.currentHp -
            this.calculateDamage(this.fighter, this.opponent),
        };
      }
      console.debug('One round fought');
      console.debug('HP Fighter: ', this.fighter!.currentHp);
      console.debug('HP Opponent: ', this.opponent!.currentHp);

      yield { opponent: this.opponent, fighter: this.fighter };
    }
    this.isFightOver = true;
    yield { opponent: this.opponent, fighter: this.fighter };
    return { opponent: this.opponent, fighter: this.fighter };
  }
}
