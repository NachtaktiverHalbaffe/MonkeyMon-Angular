import { Component, Input } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { StatBarComponent } from '../stat-bar/stat-bar.component';
import { Mon } from '../../types/mon';
import { BattleSpriteComponent } from '../../components/battle-sprite/battle-sprite.component';
import { BattleStatsComponent } from '../battle-stats/battle-stats.component';
import { Combatant } from '../../types/Combatant';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [CardComponent, BattleSpriteComponent, BattleStatsComponent],
  templateUrl: './arena.component.html',
})
export class ArenaComponent {
  @Input() fighter?: Combatant;
  @Input() opponent?: Combatant;
}
