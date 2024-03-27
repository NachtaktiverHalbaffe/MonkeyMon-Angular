import { Component, Input } from '@angular/core';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
})
export class TextComponent {
  @Input() class?: string;

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
