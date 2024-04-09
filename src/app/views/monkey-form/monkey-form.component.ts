import { Component, inject, signal } from '@angular/core';
import { HlmCardContentDirective } from '../../components/ui-card-helm/src/lib/hlm-card-content.directive';
import { HlmCardDescriptionDirective } from '../../components/ui-card-helm/src/lib/hlm-card-description.directive';
import { HlmCardHeaderDirective } from '../../components/ui-card-helm/src/lib/hlm-card-header.directive';
import { HlmCardTitleDirective } from '../../components/ui-card-helm/src/lib/hlm-card-title.directive';
import { HlmCardDirective } from '../../components/ui-card-helm/src/lib/hlm-card.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { Monkey, MonkeySchema } from '../../types/monkey';
import { MonkeyApiService } from '../../services/monkey-api.service';

// export function zodValidator():ValidatorFn{
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;
//     const key = control.
//   }
// }

@Component({
  selector: 'app-monkey-form',
  standalone: true,

  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    TranslateModule,
    HlmInputDirective,
    ReactiveFormsModule,
    HlmLabelDirective,
  ],
  templateUrl: './monkey-form.component.html',
})
export class MonkeyFormComponent {
  monkeyForm: FormGroup;
  imageFile: File | null = null;
  isPosting = signal<boolean>(false);
  success = signal<boolean>(false);
  error = signal<boolean>(false);

  monkeyApiService = inject(MonkeyApiService);

  formFieldBuilder = [
    { key: 'name', type: 'text' },
    { key: 'image', type: 'file' },
    { key: 'description', type: 'text' },
    { key: 'speciesName', type: 'text' },
    { key: 'knownFrom', type: 'text' },
    { key: 'strengths', type: 'text' },
    { key: 'weaknesses', type: 'text' },
    { key: 'hp', type: 'number' },
    { key: 'attack', type: 'number' },
    { key: 'defense', type: 'number' },
    { key: 'specialAttack', type: 'number' },
    { key: 'specialDefense', type: 'number' },
    { key: 'speed', type: 'number' },
  ];

  constructor(private fb: FormBuilder, translate: TranslateService) {
    this.monkeyForm = this.fb.group({
      name: new FormControl(
        null,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: value,
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: 1,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('name', monkey);
        }
      ),
      image: new FormControl(null),
      description: new FormControl(
        null,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            description: value,
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: 1,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('description', monkey);
        }
      ),
      speciesName: new FormControl(
        null,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            speciesName: value,
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: 1,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('speciesName', monkey);
        }
      ),
      knownFrom: new FormControl(
        null,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            description: value,
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: 1,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('description', monkey);
        }
      ),
      strengths: new FormControl(
        null,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            strength: value,
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: 1,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('strength', monkey);
        }
      ),
      weaknesses: new FormControl(
        null,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            weaknesses: value,
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: 1,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('weaknesses', monkey);
        }
      ),
      hp: new FormControl(
        0,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            hp: value,
            attack: 1,
            defense: 1,
            specialAttack: 1,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('hp', monkey);
        }
      ),
      attack: new FormControl(
        0,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            hp: 1,
            attack: value,
            defense: 1,
            specialAttack: 1,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('attack', monkey);
        }
      ),
      defense: new FormControl(
        0,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            hp: 1,
            attack: 1,
            defense: value,
            specialAttack: 1,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('defense', monkey);
        }
      ),
      specialAttack: new FormControl(
        0,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: value,
            specialDefense: 1,
            speed: 1,
          };
          return this._validateEntry('specialAttack', monkey);
        }
      ),
      specialDefense: new FormControl(
        0,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: 1,
            specialDefense: value,
            speed: 1,
          };
          return this._validateEntry('specialDefense', monkey);
        }
      ),
      speed: new FormControl(
        0,
        (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          const monkey: Monkey = {
            name: '',
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: 1,
            specialDefense: 1,
            speed: value,
          };
          return this._validateEntry('speed', monkey);
        }
      ),
    });
    // Just to get ngx-translate-extract working
    translate.get('monkey_form.labels.name');
    translate.get('monkey_form.labels.image');
    translate.get('monkey_form.labels.description');
    translate.get('monkey_form.labels.speciesName');
    translate.get('monkey_form.labels.knownFrom');
    translate.get('monkey_form.labels.strengths');
    translate.get('monkey_form.labels.weaknesses');
    translate.get('monkey_form.labels.hp');
    translate.get('monkey_form.labels.attack');
    translate.get('monkey_form.labels.defense');
    translate.get('monkey_form.labels.specialAttack');
    translate.get('monkey_form.labels.specialDefense');
    translate.get('monkey_form.labels.speed');
    translate.get('monkey_form.descriptions.name');
    translate.get('monkey_form.descriptions.image');
    translate.get('monkey_form.descriptions.description');
    translate.get('monkey_form.descriptions.speciesName');
    translate.get('monkey_form.descriptions.knownFrom');
    translate.get('monkey_form.descriptions.strengths');
    translate.get('monkey_form.descriptions.weaknesses');
    translate.get('monkey_form.descriptions.hp');
    translate.get('monkey_form.descriptions.attack');
    translate.get('monkey_form.descriptions.defense');
    translate.get('monkey_form.descriptions.specialAttack');
    translate.get('monkey_form.descriptions.specialDefense');
    translate.get('monkey_form.descriptions.speed');
  }

  async onSubmit(e: Event) {
    this.isPosting.set(true);
    const data: Monkey = {
      name: this.monkeyForm.value.name,
      description: this.monkeyForm.value.description,
      knownFrom: this.monkeyForm.value.knownFrom,
      strength: this.monkeyForm.value.strengths,
      weaknesses: this.monkeyForm.value.weaknesses,
      hp: this.monkeyForm.value.hp,
      attack: this.monkeyForm.value.attack,
      defense: this.monkeyForm.value.defense,
      specialAttack: this.monkeyForm.value.specialAttack,
      specialDefense: this.monkeyForm.value.specialDefense,
      speed: this.monkeyForm.value.speed,
    };

    const validatedData = MonkeySchema.safeParse(data);
    if (validatedData.success) {
      const response = this.monkeyApiService._postMonkey(data, this.imageFile);
      const success = await response.toPromise().then((result) => {
        this.isPosting.set(false);
        return typeof result?.['id'] == 'number';
      });

      success ? this.success.set(true) : this.error.set(true);
    } else {
      this.isPosting.set(false);
      this.error.set(true);
    }
  }

  _validateEntry(key: string, value: Monkey): ValidationErrors | null {
    const result = MonkeySchema.safeParse(value);

    if (result.success) {
      return null;
    }

    for (let index = 0; index < result.error.issues.length; index++) {
      const element = result.error.issues[index];

      if (element.path[0] == key) {
        return { zodError: element.message };
      }
    }

    return null;
  }

  processFile(imageInput: any) {
    this.imageFile = imageInput.files[0];
  }
}
