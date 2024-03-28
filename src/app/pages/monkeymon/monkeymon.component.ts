import { Component } from '@angular/core';
import { MonCardComponent } from '../../views/mon-card/mon-card.component';
import {
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
} from '../../components/ui-carousel-helm';

@Component({
  selector: 'app-monkeymon',
  standalone: true,
  imports: [
    MonCardComponent,

    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
  ],
  templateUrl: './monkeymon.component.html',
})
export class MonkeymonComponent {}
