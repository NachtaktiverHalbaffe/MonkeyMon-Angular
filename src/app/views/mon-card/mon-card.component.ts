import { Component, Input } from '@angular/core';
import { StatBarComponent } from '../stat-bar/stat-bar.component';
import { CardComponent } from '../../components/card/card.component';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { TextComponent } from '../../components/text/text.component';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Mon } from '../../types/mon';
import { OutlinedButtonComponent } from '../../components/outlined-button/outlined-button.component';

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

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  sendFighter() {
    // TODO Arena logic
    console.log('Sending fighter to arena');
  }

  sendOpponent() {
    // TODO Arena logic
    console.log('Sending opponent to arena');
  }
}
