import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Pokemon, PokemonSchema } from '../types/pokemon';
import Pokedex from 'pokedex-promise-v2';
import { from } from 'rxjs';

const pageSize = 10;

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  pokedexApi: Pokedex;
  currentPage: number;
  nextPage: number | null;
  data = signal<Pokemon[]>([]);

  constructor() {
    this.pokedexApi = new Pokedex();
    this.currentPage = 0;
    this.nextPage = 0;
  }

  getAllPokemon(): WritableSignal<Pokemon[]> {
    this.#getAllPokemon();
    return this.data;
  }

  async #getAllPokemon() {
    try {
      const pokemonListResponse = await this.pokedexApi.getPokemonsList();
      const pokemons = await Promise.all(
        pokemonListResponse.results.map(async (element): Promise<Pokemon> => {
          const singlePokemon = await this.#getPokemon(element.name);

          return singlePokemon;
        })
      );
      // return pokemons;
      this.data.set(pokemons.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.debug(error);
    }
  }

  async #getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const response = await this.pokedexApi.getPokemonByName(nameOrId);

    const pokemon: Pokemon = {
      id: response.id,
      name: response.name,
      imageFront: response.sprites.front_default,
      imageBack: response.sprites.back_default,
      image: response.sprites.front_default,
      description: '',
      hp: response.stats.filter((stat) => stat.stat.name == 'hp').pop()!
        .base_stat,
      attack: response.stats.filter((stat) => stat.stat.name == 'attack').pop()!
        .base_stat,
      defense: response.stats
        .filter((stat) => stat.stat.name == 'defense')
        .pop()!.base_stat,
      specialAttack: response.stats
        .filter((stat) => stat.stat.name == 'special-attack')
        .pop()!.base_stat,
      specialDefense: response.stats
        .filter((stat) => stat.stat.name == 'special-defense')
        .pop()!.base_stat,
      speed: response.stats.filter((stat) => stat.stat.name == 'speed').pop()!
        .base_stat,
      types: response.types.map((type) => type.type.name),
    };

    try {
      const species = await this.pokedexApi.getPokemonSpeciesByName(
        response.id
      );
      pokemon!.name = species.names
        .filter((entry) => entry.language.name == 'de')
        .pop()!.name;
      pokemon!.description = species.flavor_text_entries
        .filter((entry) => entry.language.name == 'de')
        .pop()!.flavor_text;
    } catch (error) {
      console.debug(error);
    }

    return PokemonSchema.parse(pokemon);
  }

  getNextPage(): WritableSignal<Pokemon[]> {
    this.#getPokemonPage();
    return this.data;
  }

  async #getPokemonPage() {
    if (this.nextPage == null) {
      console.warn('No more Pokemon data avaible, aborting fetching page');
      return;
    }

    console.debug('Fetching pokeapi with page ', this.nextPage);

    try {
      const pokemonListResponse = await this.pokedexApi.getPokemonsList({
        offset: pageSize * this.nextPage,
        limit: pageSize,
      });

      const pokemons = await Promise.all(
        pokemonListResponse.results.map(async (element): Promise<Pokemon> => {
          const singlePokemon = await this.#getPokemon(element.name);

          return singlePokemon;
        })
      );
      this.currentPage = this.nextPage;
      this.nextPage = pokemons.length < pageSize ? null : this.currentPage + 1;
      this.data.update((prevData) => [
        ...prevData,
        ...pokemons.sort((a, b) => a.id - b.id),
      ]);
    } catch (error) {
      console.warn(error);
    }
  }

  async getNrOfAvailbePokemon(): Promise<number> {
    try {
      return (await this.pokedexApi.getPokemonsList()).count;
    } catch (error) {
      return 0;
    }
  }
}
