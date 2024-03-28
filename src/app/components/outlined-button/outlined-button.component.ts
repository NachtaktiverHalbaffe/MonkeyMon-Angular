import { Component, Input } from '@angular/core';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-outlined-button',
  standalone: true,
  imports: [],
  templateUrl: './outlined-button.component.html',
})
export class OutlinedButtonComponent {
  @Input() class?: string;

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
