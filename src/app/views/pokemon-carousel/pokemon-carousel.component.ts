import { Component, Input, inject } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';
import {
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
} from '../../components/ui-carousel-helm';
import { MonCardComponent } from '../mon-card/mon-card.component';
import {
  CreateInfiniteQueryResult,
  InfiniteData,
} from '@tanstack/angular-query-experimental';
import {
  PokemonApiService,
  pageSize,
} from '../../services/pokemon-api.service';
import { Pokemon } from '../../types/pokemon';
import { HlmSpinnerComponent } from '../../components/ui-spinner-helm/src/lib/hlm-spinner.component';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { lucideAlertTriangle } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-pokemon-carousel',
  standalone: true,
  providers: [provideIcons({ lucideAlertTriangle })],
  imports: [
    MonCardComponent,
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HlmSpinnerComponent,
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    InViewportModule,
  ],
  templateUrl: './pokemon-carousel.component.html',
})
export class PokemonCarouselComponent {
  pokemonsInfiniteQuery: CreateInfiniteQueryResult<
    InfiniteData<Pokemon[], any>,
    Error
  >;
  pokemonService = inject(PokemonApiService);
  pageSize: number = pageSize;
  @Input() class?: string;

  constructor() {
    this.pokemonsInfiniteQuery =
      this.pokemonService.injectPokemonInfiniteQuery();
  }

  fetchNextEntry({ visible }: { target: Element; visible: boolean }) {
    if (visible) {
      this.pokemonsInfiniteQuery.fetchNextPage();
    }
  }

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
