import { Component, inject, signal } from '@angular/core';
import { HlmCardContentDirective } from '../../components/ui-card-helm/src/lib/hlm-card-content.directive';
import { HlmCardDescriptionDirective } from '../../components/ui-card-helm/src/lib/hlm-card-description.directive';
import { HlmCardHeaderDirective } from '../../components/ui-card-helm/src/lib/hlm-card-header.directive';
import { HlmCardTitleDirective } from '../../components/ui-card-helm/src/lib/hlm-card-title.directive';
import { HlmCardDirective } from '../../components/ui-card-helm/src/lib/hlm-card.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { Monkey, MonkeySchema } from '../../types/monkey';
import { MonkeyApiService } from '../../services/monkey-api.service';
import { number } from 'zod';

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
      name: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
      speciesName: new FormControl(''),
      knownFrom: new FormControl(''),
      strengths: new FormControl(''),
      weaknesses: new FormControl(''),
      hp: new FormControl(0),
      attack: new FormControl(0),
      defense: new FormControl(0),
      specialAttack: new FormControl(0),
      specialDefense: new FormControl(0),
      speed: new FormControl(0),
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

  processFile(imageInput: any) {
    this.imageFile = imageInput.files[0];
  }
}
