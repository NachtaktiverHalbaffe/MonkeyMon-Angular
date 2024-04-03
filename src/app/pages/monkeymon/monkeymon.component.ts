import { Component } from '@angular/core';
import { PokemonCarouselComponent } from '../../views/pokemon-carousel/pokemon-carousel.component';
import { ArenaComponent } from '../../views/arena/arena.component';
import { CardComponent } from '../../components/card/card.component';
import { BattleSpriteComponent } from '../../components/battle-sprite/battle-sprite.component';
import { BattleStatsComponent } from '../../views/battle-stats/battle-stats.component';

@Component({
  selector: 'app-monkeymon',
  standalone: true,
  imports: [
    PokemonCarouselComponent,
    ArenaComponent,
    CardComponent,
    BattleSpriteComponent,
    BattleStatsComponent,
  ],
  templateUrl: './monkeymon.component.html',
})
export class MonkeymonComponent {}
