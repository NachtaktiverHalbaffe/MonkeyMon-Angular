import { DecimalPipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  OnInit,
  TrackByFunction,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import {
  BrnColumnManager,
  BrnTableModule,
  PaginatorState,
  useBrnColumnManager,
} from '@spartan-ng/ui-table-brain';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  HlmCheckboxCheckIconComponent,
  HlmCheckboxComponent,
} from '@spartan-ng/ui-checkbox-helm';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { PokemonApiService } from '../../services/pokemon-api.service';
import { Pokemon } from '../../types/pokemon';
import { HlmSpinnerComponent } from '../../components/ui-spinner-helm/src/lib/hlm-spinner.component';
import {
  lucideChevronDown,
  lucideMoreHorizontal,
  lucideArrowUpDown,
} from '@ng-icons/lucide';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  host: {
    class: 'w-full',
  },
  imports: [
    FormsModule,

    BrnMenuTriggerDirective,
    HlmMenuModule,

    BrnTableModule,
    HlmTableModule,

    HlmButtonModule,

    HlmIconComponent,
    HlmInputDirective,

    HlmCheckboxCheckIconComponent,
    HlmCheckboxComponent,

    BrnSelectModule,
    HlmSelectModule,
    HlmSpinnerComponent,

    HlmCardDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    HlmCardFooterDirective,
    TranslateModule,
  ],
  templateUrl: './pokemon-table.component.html',
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideMoreHorizontal,
      lucideArrowUpDown,
    }),
  ],
})
export class PokemonTableComponent implements OnInit {
  protected readonly _rawFilterInput = signal('');
  protected readonly _pokemonFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );
  labelName: string = '';
  labelHp: string = '';
  labelAttack: string = '';
  labelDefense: string = '';
  labelSpecialAttack: string = '';
  labelSpecialDefense: string = '';
  labelSpeed: string = '';
  labelTypes: string = '';

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  protected _brnColumnManager: any;
  protected readonly _allDisplayedColumns = computed(() => [
    ...this._brnColumnManager.displayedColumns(),
  ]);

  readonly _query = inject(PokemonApiService).injectPokemonQuery();
  private readonly _pokemonData = computed(() => this._query.data() ?? []);
  private readonly _filteredPokemons = computed(() => {
    const pokemonFilter = this._pokemonFilter()?.trim()?.toLowerCase();
    if (pokemonFilter && pokemonFilter.length > 0) {
      return this._pokemonData().filter((u) =>
        u.name.toLowerCase().includes(pokemonFilter)
      );
    }
    return this._pokemonData();
  });

  readonly _idSort = signal<'ASC' | 'DESC' | null>(null);
  readonly _nameSort = signal<'ASC' | 'DESC' | null>(null);
  readonly _hpSort = signal<'ASC' | 'DESC' | null>(null);
  readonly _attackSort = signal<'ASC' | 'DESC' | null>(null);
  readonly _defenseSort = signal<'ASC' | 'DESC' | null>(null);
  readonly _specialAttackSort = signal<'ASC' | 'DESC' | null>(null);
  readonly _specialDefenseSort = signal<'ASC' | 'DESC' | null>(null);
  readonly _speedSort = signal<'ASC' | 'DESC' | null>(null);

  protected readonly _filteredSortedPaginatedPokemons = computed(() => {
    const idSort = this._idSort();
    const nameSort = this._nameSort();
    const hpSort = this._hpSort();
    const attackSort = this._attackSort();
    const defenseSort = this._defenseSort();
    const specialAttackSort = this._specialAttackSort();
    const specialDefenseSort = this._specialDefenseSort();
    const speedSort = this._speedSort();
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const data = this._filteredPokemons();
    if (idSort) {
      return [...data]
        .sort((p1, p2) =>
          (idSort === 'ASC' ? 1 : -1) * p1.id < p2.id ? -1 : 1
        )
        .slice(start, end);
    } else if (nameSort) {
      return [...data]
        .sort(
          (p1, p2) =>
            (nameSort === 'ASC' ? 1 : -1) * p1.name.localeCompare(p2.name)
        )
        .slice(start, end);
    } else if (hpSort) {
      return [...data]
        .sort((p1, p2) =>
          (hpSort === 'ASC' ? 1 : -1) * p1.hp < p2.hp ? -1 : 1
        )
        .slice(start, end);
    } else if (attackSort) {
      return [...data]
        .sort((p1, p2) =>
          (attackSort === 'ASC' ? 1 : -1) * p1.attack < p2.attack ? -1 : 1
        )
        .slice(start, end);
    } else if (defenseSort) {
      return [...data]
        .sort((p1, p2) =>
          (defenseSort === 'ASC' ? 1 : -1) * p1.defense < p2.defense ? -1 : 1
        )
        .slice(start, end);
    } else if (specialAttackSort) {
      return [...data]
        .sort((p1, p2) =>
          (specialAttackSort === 'ASC' ? 1 : -1) * p1.specialAttack <
          p2.specialAttack
            ? -1
            : 1
        )
        .slice(start, end);
    } else if (specialDefenseSort) {
      return [...data]
        .sort((p1, p2) =>
          (specialDefenseSort === 'ASC' ? 1 : -1) * p1.specialDefense <
          p2.specialDefense
            ? -1
            : 1
        )
        .slice(start, end);
    } else if (speedSort) {
      return [...data]
        .sort((p1, p2) =>
          (speedSort === 'ASC' ? 1 : -1) * p1.speed < p2.speed ? -1 : 1
        )
        .slice(start, end);
    } else {
      return data.slice(start, end);
    }
  });
  protected readonly _totalElements = computed(
    () => this._filteredPokemons().length
  );
  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  protected readonly _trackBy: TrackByFunction<Pokemon> = (
    _: number,
    p: Pokemon
  ) => p.id;

  constructor(translate: TranslateService) {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    effect(() => this._pokemonFilter.set(this._debouncedFilter() ?? ''), {
      allowSignalWrites: true,
    });

    translate
      .get([
        'pokemon.hp',
        'pokemon.attack',
        'pokemon.attack',
        'pokemon.defense',
        'pokemon.specialAttack',
        'pokemon.specialDefense',
        'pokemon.speed',
        'statistics.name',
        'statistics.types',
      ])
      .subscribe((translations) => {
        this.labelHp = translations['pokemon.hp'];
        this.labelAttack = translations['pokemon.attack'];
        this.labelDefense = translations['pokemon.defense'];
        this.labelSpecialAttack = translations['pokemon.specialAttack'];
        this.labelSpecialDefense = translations['pokemon.specialDefense'];
        this.labelSpeed = translations['pokemon.speed'];
        this.labelName = translations['statistics.name'];
        this.labelTypes = translations['statistics.types'];
      });
  }
  ngOnInit(): void {
    this._brnColumnManager = useBrnColumnManager({
      id: { visible: true, label: '#' },
      name: { visible: true, label: this.labelName },
      hp: { visible: true, label: this.labelHp },
      attack: { visible: true, label: this.labelAttack },
      defense: { visible: true, label: this.labelDefense },
      specialAttack: { visible: true, label: this.labelSpecialAttack },
      specialDefense: { visible: true, label: this.labelSpecialDefense },
      speed: { visible: true, label: this.labelSpeed },
      types: { visible: true, label: this.labelTypes },
    });
  }

  protected _setSorting(sortingSignal: WritableSignal<'ASC' | 'DESC' | null>) {
    if (sortingSignal !== this._idSort) {
      this._idSort.set(null);
    }
    if (sortingSignal !== this._nameSort) {
      this._nameSort.set(null);
    }
    if (sortingSignal !== this._hpSort) {
      this._hpSort.set(null);
    }
    if (sortingSignal !== this._attackSort) {
      this._attackSort.set(null);
    }
    if (sortingSignal !== this._defenseSort) {
      this._defenseSort.set(null);
    }
    if (sortingSignal !== this._specialAttackSort) {
      this._specialAttackSort.set(null);
    }
    if (sortingSignal !== this._specialDefenseSort) {
      this._specialDefenseSort.set(null);
    }
    if (sortingSignal !== this._speedSort) {
      this._speedSort.set(null);
    }

    const sort = sortingSignal();
    if (sort === 'ASC') {
      sortingSignal.set('DESC');
    } else if (sort === 'DESC') {
      sortingSignal.set(null);
    } else {
      sortingSignal.set('ASC');
    }
  }
}
