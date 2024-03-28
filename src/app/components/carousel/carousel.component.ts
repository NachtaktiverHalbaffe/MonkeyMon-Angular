import { Component, Input, booleanAttribute } from '@angular/core';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  @Input() carouselClass?: string;
  @Input({ transform: booleanAttribute }) useControls: boolean = true;
  @Input({ transform: booleanAttribute }) useFlowBite: boolean = true;

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
