import { Component } from '@angular/core';
import { MonkeyFormComponent } from '../../views/monkey-form/monkey-form.component';

@Component({
  selector: 'app-monkeyapi',
  standalone: true,
  imports: [MonkeyFormComponent],
  templateUrl: './monkeyapi.component.html',
  styleUrl: './monkeyapi.component.css',
})
export class MonkeyapiComponent {}
