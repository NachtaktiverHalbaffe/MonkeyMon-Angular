import {
  Component,
  HostListener,
  Input,
  OnInit,
  computed,
  input,
} from '@angular/core';
import { TrimmedImageComponent } from '../trimmed-image/trimmed-image.component';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';

@Component({
  selector: 'app-battle-sprite',
  standalone: true,
  imports: [TrimmedImageComponent],
  templateUrl: './battle-sprite.component.html',
  host: {
    '[class]': '_computedClass()',
  },
})
export class BattleSpriteComponent implements OnInit {
  public readonly src = input<string>('');
  @Input() alignment: 'left-bottom' | 'right-top' = 'left-bottom';

  _userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(this._userClass()));

  posXLeft = 10;
  posYBottom = 450;
  posYTop = -180;
  size: { width: number; height: number };
  position: { x: number; y: number };

  constructor() {
    this.size = { width: window.innerWidth, height: window.innerHeight };
    switch (this.alignment) {
      case 'left-bottom':
        this.position = {
          x: this.posXLeft,
          y: this.posYBottom,
        };
        break;
      case 'right-top':
        this.position = {
          x: 5000,
          y: this.posYTop,
        };

        break;
      default:
        this.position = {
          x: this.posXLeft,
          y: this.posYBottom,
        };

        break;
    }
  }

  ngOnInit(): void {
    this.size = { width: window.innerWidth, height: window.innerHeight };
    this.calculatePos();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.size = { width: window.innerWidth, height: window.innerHeight };
    this.calculatePos();
  }

  calculatePos() {
    if (this.size.width != null) {
      const newWidthLimit =
        this.size.width > 640 ? this.size.width - 240 : this.size.width - 220;

      if (this.size.width > 640) {
        if (newWidthLimit < this.position.x || this.alignment === 'right-top') {
          this.position = {
            x: newWidthLimit - 200,
            y: this.alignment === 'right-top' ? this.posYTop : this.posYBottom,
          };
        } else {
          this.position = {
            x: this.position.x,
            y: this.posYBottom,
          };
        }
      } else {
        if (newWidthLimit < this.position.x || this.alignment === 'right-top') {
          this.position = {
            x: newWidthLimit,
            y:
              this.alignment === 'right-top'
                ? this.posYTop + 100
                : this.posYBottom + 70,
          };
        } else {
          this.position = {
            x: this.position.x,
            y: this.posYBottom + 70,
          };
        }
      }
    }
  }
}
