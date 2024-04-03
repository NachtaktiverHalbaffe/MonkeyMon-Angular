import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
  host: {
    '[class]': '_computedClass()',
  },
})
export class TextComponent {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm('mb-3 text-gray-900 dark:text-neutral-200', this.userClass())
  );
}
