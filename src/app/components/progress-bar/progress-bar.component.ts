import { Component, Input, numberAttribute } from '@angular/core';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
})
export class ProgressBarComponent {
  @Input() color: string = 'bg-white';
  @Input({ required: true, transform: numberAttribute }) value!: number;
  @Input() class?: string;

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
