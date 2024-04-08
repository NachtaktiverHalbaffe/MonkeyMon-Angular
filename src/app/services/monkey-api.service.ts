import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Monkey, MonkeySchema } from '../types/monkey';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

interface MonkeyApiGetResponse {
  content: MonkeyApiPostResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface MonkeyApiPostResponse {
  id: number;
  name: string;
  known_from: string | null;
  description: string | null;
  strength: string | null;
  weaknesses: string | null;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  health_points: number;
  image: string | null;
  species_name: string | null;
  species_content: object;
}

@Injectable({
  providedIn: 'root',
})
export class MonkeyApiService {
  monkeys: Monkey[] = [];
  http: HttpClient = inject(HttpClient);
  errorMsgLabel: string = '';

  constructor(translate: TranslateService) {
    translate.get('monkeyapi.error').subscribe((translation) => {
      this.errorMsgLabel = translation;
    });
  }

  getAllMonkeys(): Observable<Monkey[]> {
    return this._fetchMonkeys();
  }

  _fetchMonkeys(): Observable<Monkey[]> {
    return this.http
      .get<MonkeyApiGetResponse>('http://localhost:8080/api/v1/monkeys', {
        responseType: 'json',
      })
      .pipe(
        catchError((error, caught) => {
          const errMsg = `${this.errorMsgLabel}: ${error.message}`;
          import('ngx-sonner')
            .then((module) => module.toast)
            .then((toast) => toast.error(errMsg));
          return throwError(() => new Error(errMsg));
        }),
        map((response: MonkeyApiGetResponse) => {
          const content = response['content'];
          const monkeys: Monkey[] = [];
          content.forEach((data) => {
            const monkey: Monkey = {
              id: data['id'],
              name: data['name'],
              description: data['description'],
              hp: data['health_points'],
              attack: data['attack'],
              defense: data['defense'],
              specialAttack: data['special_attack'],
              specialDefense: data['special_defense'],
              speed: data['speed'],
              image: data['image'],
              knownFrom: data['known_from'],
              strength: data['strength'],
              weaknesses: data['weaknesses'],
              speciesName: data['species_name'],
              //   speciesContent: response["species_content"],
            };

            try {
              monkeys.push(MonkeySchema.parse(monkey));
            } catch (error) {
              console.debug(error);
            }
          });
          return monkeys;
        })
      );
  }

  _postMonkey(monkey: Monkey): Observable<MonkeyApiPostResponse> {
    const formData = new FormData();
    formData.append(
      'body',
      JSON.stringify({
        name: monkey.name,
        description: monkey.description,
        health_points: monkey.hp,
        attack: monkey.attack,
        defense: monkey.defense,
        special_attack: monkey.specialAttack,
        special_defense: monkey.specialDefense,
        speed: monkey.speed,
        image: monkey.image,
        known_from: monkey.knownFrom,
        strength: monkey.strength,
        weaknesses: monkey.weaknesses,
        species_name: monkey.speciesName != '' ? monkey.speciesName : null,
      })
    );

    return this.http.post<MonkeyApiPostResponse>(
      'http://localhost:8080/api/v1/monkeys',
      formData
    );
  }
}
