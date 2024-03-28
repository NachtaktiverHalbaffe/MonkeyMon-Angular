import { Component, Input, OnInit, numberAttribute } from '@angular/core';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { TextComponent } from '../../components/text/text.component';

@Component({
  selector: 'app-stat-bar',
  standalone: true,
  imports: [ProgressBarComponent, TextComponent],
  templateUrl: './stat-bar.component.html',
})
export class StatBarComponent implements OnInit {
  @Input({ required: true, transform: numberAttribute }) value!: number;
  @Input({ transform: numberAttribute }) maxValue: number = 300;
  @Input({ required: true }) label!: string;

  color: string = 'bg-white';
  valuePercent: number = 0;

  ngOnInit(): void {
    this.valuePercent = Math.round((this.value / this.maxValue) * 100);

    if (this.valuePercent > 90.0) {
      this.color = 'bg-green-900';
    } else if (this.valuePercent > 75.0) {
      this.color = 'bg-lime-800';
    } else if (this.valuePercent > 50.0) {
      this.color = 'bg-lime-500';
    } else if (this.valuePercent > 25.0) {
      this.color = 'bg-orange-500';
    } else {
      this.color = 'bg-red-800';
    }
  }
}
