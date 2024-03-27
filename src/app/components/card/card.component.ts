import { Component, Input } from '@angular/core';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() class?: string;

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
