import { Component } from '@angular/core';
import { MonCardComponent } from '../../views/mon-card/mon-card.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CarouselItemComponent } from '../../components/carousel-item/carousel-item.component';

@Component({
  selector: 'app-monkeymon',
  standalone: true,
  imports: [MonCardComponent, CarouselComponent, CarouselItemComponent],
  templateUrl: './monkeymon.component.html',
})
export class MonkeymonComponent {}
