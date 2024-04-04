import { Component } from '@angular/core';
import { PokemonTableComponent } from '../../views/pokemon-table/pokemon-table.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [PokemonTableComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {}
