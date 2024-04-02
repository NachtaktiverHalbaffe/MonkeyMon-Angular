import { Component, Input } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Mon } from '../../types/mon';
import { StatBarComponent } from '../stat-bar/stat-bar.component';
import { BattleSpriteComponent } from '../../components/battle-sprite/battle-sprite.component';
import { Combatant } from '../../types/Combatant';

@Component({
  selector: 'app-battle-stats',
  standalone: true,
  imports: [CardComponent, StatBarComponent, BattleSpriteComponent],
  templateUrl: './battle-stats.component.html',
})
export class BattleStatsComponent {
  @Input() fighter?: Combatant;
  @Input() opponent?: Combatant;
}
