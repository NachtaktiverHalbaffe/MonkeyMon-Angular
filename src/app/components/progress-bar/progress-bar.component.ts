import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
})
export class ProgressBarComponent {
  @Input() color: string = 'bg-white';
  @Input({ required: true, transform: numberAttribute }) value!: number;
}
