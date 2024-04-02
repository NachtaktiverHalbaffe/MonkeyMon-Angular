import { Component } from '@angular/core';
import { PokemonCarouselComponent } from '../../views/pokemon-carousel/pokemon-carousel.component';

@Component({
  selector: 'app-monkeymon',
  standalone: true,
  imports: [PokemonCarouselComponent],
  templateUrl: './monkeymon.component.html',
})
export class MonkeymonComponent {}
