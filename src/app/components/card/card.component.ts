import { Component, Input, computed, signal } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { iconVariants } from '../ui-icon-helm/src/lib/hlm-icon.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  host: {
    '[class]': '_computedClass()',
  },
})
export class CardComponent {
  @Input()
  set class(cls: ClassValue) {
    this.userCls.set(cls);
  }

  protected readonly userCls = signal<ClassValue>('');

  protected readonly _computedClass = computed(() => {
    const userCls = this.userCls();
    return hlm(userCls);
  });
}
