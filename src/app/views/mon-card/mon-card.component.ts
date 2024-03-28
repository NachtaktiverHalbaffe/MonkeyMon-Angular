import { Component, Input } from '@angular/core';
import { StatBarComponent } from '../stat-bar/stat-bar.component';
import { CardComponent } from '../../components/card/card.component';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { TextComponent } from '../../components/text/text.component';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-mon-card',
  standalone: true,
  imports: [StatBarComponent, CardComponent, AvatarComponent, TextComponent],
  templateUrl: './mon-card.component.html',
})
export class MonCardComponent {
  @Input() class?: string;

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
