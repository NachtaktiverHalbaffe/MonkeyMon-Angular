import { Component, Input, computed, input, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { StatBarComponent } from '../stat-bar/stat-bar.component';

import { Combatant } from '../../types/Combatant';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';
import { TextComponent } from '../../components/text/text.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-battle-stats',
  standalone: true,
  imports: [
    CardComponent,
    StatBarComponent,
    TextComponent,
    ProgressBarComponent,
  ],
  templateUrl: './battle-stats.component.html',
  host: {
    '[class]': '_computedClass()',
  },
})
export class BattleStatsComponent {
  readonly fighter = input<Combatant | null>(null);
  readonly opponent = input<Combatant | null>(null);

  @Input()
  set class(cls: ClassValue) {
    this.userCls.set(cls);
  }
  protected readonly userCls = signal<ClassValue>('');
  protected readonly _computedClass = computed(() => {
    return hlm(this.userCls());
  });
}
