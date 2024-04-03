import { Component, Input, inject } from '@angular/core';
import { StatBarComponent } from '../stat-bar/stat-bar.component';
import { CardComponent } from '../../components/card/card.component';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { TextComponent } from '../../components/text/text.component';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Mon } from '../../types/mon';
import { OutlinedButtonComponent } from '../../components/outlined-button/outlined-button.component';
import { BattleEngineService } from '../../services/battleengine-service.service';
import { toast } from 'ngx-sonner';
import { isPokemon } from '../../types/pokemon';

@Component({
  selector: 'app-mon-card',
  standalone: true,
  imports: [
    StatBarComponent,
    CardComponent,
    AvatarComponent,
    TextComponent,
    OutlinedButtonComponent,
  ],
  templateUrl: './mon-card.component.html',
})
export class MonCardComponent {
  @Input({ required: true }) mon!: Mon;
  @Input() class?: string;
  arenaService: BattleEngineService = inject(BattleEngineService);

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  sendFighter() {
    this.arenaService.setFighter(this.mon);
    toast(
      `${isPokemon(this.mon) ? 'Pokemon' : 'Monkey'} has been sent to Arena`,
      {
        description: `${this.mon.name} has been selected as the fighter`,
        action: {
          label: 'Ok',
          onClick: () => {},
        },
      }
    );
  }

  sendOpponent() {
    this.arenaService.setOpponent(this.mon);
    toast(
      `${isPokemon(this.mon) ? 'Pokemon' : 'Monkey'} has been sent to Arena`,
      {
        description: `${this.mon.name} has been selected as the opponent`,
        action: {
          label: 'Ok',
          onClick: () => {},
        },
      }
    );
  }
}
