import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  computed,
  input,
  signal,
} from '@angular/core';
import { HlmSpinnerComponent } from '../ui-spinner-helm/src/lib/hlm-spinner.component';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '../ui-sonner-helm/src/lib/hlm-toaster.component';
import { ClassValue } from 'clsx';
import { hlm } from '@spartan-ng/ui-core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-trimmed-image',
  standalone: true,
  imports: [HlmSpinnerComponent, HttpClientModule],
  templateUrl: './trimmed-image.component.html',
  host: {
    '[class]': '_computedClass()',
  },
})
export class TrimmedImageComponent implements OnInit, OnDestroy {
  public readonly src = input<string>('');
  src$ = toObservable(this.src);
  @Input() trimHeight: boolean = false;
  @Input() trimWidth: boolean = false;

  httpSubscription!: Subscription;
  imagePathSubscription!: Subscription;
  trimmedImageUrl = signal<string>('');

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(this.userClass()));

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.imagePathSubscription = this.src$.subscribe((src) => {
      this.httpSubscription = this.http
        .get(src, { responseType: 'blob' })
        .subscribe({
          next: (blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64data = reader.result as string;
              this.trimImage(base64data);
            };

            reader.readAsDataURL(blob);
          },
          error: (error) => {
            console.error('Error lading image: ', error.message);
            toast.error(`Couldnt load image: ${error.message}`);
          },
        });
    });
  }

  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();
    this.imagePathSubscription.unsubscribe();
  }

  trimImage(base64data: string) {
    try {
      const img = new Image();
      img.src = base64data;
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
          canvas.width = img.width;
          canvas.height = img.height;
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0);

          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const { data } = imageData;

          let minX = canvas.width;
          let minY = canvas.height;
          let maxX = 0;
          let maxY = 0;
          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const alpha = data[(y * canvas.width + x) * 4 + 3];

              if (alpha > 0) {
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
              }
            }
          }

          const trimmedCanvas = document.createElement('canvas');
          const trimmedContext = trimmedCanvas.getContext('2d');
          if (trimmedContext) {
            const trimmedWidth = this.trimWidth
              ? maxX - minX + 1
              : canvas.width;
            const trimmedHeight = this.trimHeight
              ? maxY - minY + 1
              : canvas.height;
            trimmedCanvas.width = trimmedWidth;
            trimmedCanvas.height = trimmedHeight;

            trimmedContext.drawImage(
              img,
              minX,
              minY,
              trimmedWidth,
              trimmedHeight,
              0,
              0,
              trimmedWidth,
              trimmedHeight
            );

            this.trimmedImageUrl.set(trimmedCanvas.toDataURL('image/png'));
          }
        }
      };
    } catch (error) {
      console.error('Error lading image:', error);
      toast.error('Couldnt load image', {
        description: '',
      });
    }
  }
}