import { Component, computed, inject, input } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { BattleSpriteComponent } from '../../components/battle-sprite/battle-sprite.component';
import { BattleStatsComponent } from '../battle-stats/battle-stats.component';
import { Combatant } from '../../types/Combatant';
import { BattleEngineService } from '../../services/battleengine-service.service';

import { ClassValue } from 'clsx';
import { hlm } from '@spartan-ng/ui-core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [
    CardComponent,
    BattleSpriteComponent,
    BattleStatsComponent,
    AsyncPipe,
  ],
  templateUrl: './arena.component.html',
  host: {
    '[class]': '_computedClass()',
  },
})
export class ArenaComponent {
  arenaService = inject(BattleEngineService);
  battleState$ = this.arenaService.battleState$;
  fighter$: Observable<Combatant | null> = of(null);
  fighterUrl$: Observable<string | null> = of(null);
  opponent$: Observable<Combatant | null> = of(null);
  opponentUrl$: Observable<string | null> = of(null);

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      "w-auto h-fit bg-[url('assets/arena_background.jpg')] bg-cover shadow-lg rounded-xl m-4",
      this.userClass()
    )
  );

  constructor() {
    this.fighter$ = this.battleState$.pipe(
      map((battleState) => battleState.fighter)
    );
    this.fighterUrl$ = this.fighter$.pipe(
      map((fighter) => fighter?.mon.image ?? null)
    );
    this.opponent$ = this.battleState$.pipe(
      map((battleState) => battleState.opponent)
    );
    this.opponentUrl$ = this.opponent$.pipe(
      map((opponent) => opponent?.mon.image ?? null)
    );
  }
}
