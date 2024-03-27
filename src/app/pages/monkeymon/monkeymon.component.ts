import { Component } from '@angular/core';
import { MonCardComponent } from '../../ui/mon-card/mon-card.component';

@Component({
  selector: 'app-monkeymon',
  standalone: true,
  imports: [MonCardComponent],
  templateUrl: './monkeymon.component.html',
  styleUrl: './monkeymon.component.css',
})
export class MonkeymonComponent {}
