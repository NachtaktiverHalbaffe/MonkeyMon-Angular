import {
  Component,
  Input,
  OnInit,
  Signal,
  computed,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { TextComponent } from '../../components/text/text.component';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';

@Component({
  selector: 'app-stat-bar',
  standalone: true,
  imports: [ProgressBarComponent, TextComponent],
  templateUrl: './stat-bar.component.html',
  host: {
    '[class]': '_computedClass()',
  },
})
export class StatBarComponent implements OnInit {
  public readonly value = input<number>(0);
  @Input({ transform: numberAttribute }) maxValue: number = 300;
  @Input({ required: true }) label!: string;
  @Input() labelWidth: string | null = null;
  @Input() labelColor: string | null = null;

  valuePercent = computed(() =>
    Math.round((this.value() / this.maxValue) * 100)
  );
  color = computed(() => {
    if (this.valuePercent() > 90.0) {
      return 'bg-green-900';
    } else if (this.valuePercent() > 75.0) {
      return 'bg-lime-800';
    } else if (this.valuePercent() > 50.0) {
      return 'bg-lime-500';
    } else if (this.valuePercent() > 25.0) {
      return 'bg-orange-500';
    } else {
      return 'bg-red-800';
    }
  });

  mergeClasses(...inputs: ClassValue[]) {
    return hlm(inputs);
  }

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(this.userClass()));

  ngOnInit(): void {}
}
