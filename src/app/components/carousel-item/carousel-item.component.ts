import { Component, Input, booleanAttribute } from '@angular/core';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-carousel-item',
  standalone: true,
  imports: [],
  templateUrl: './carousel-item.component.html',
})
export class CarouselItemComponent {
  @Input() carouselItemClass?: string;
  @Input({ transform: booleanAttribute }) useFlowBite: boolean = true;

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
