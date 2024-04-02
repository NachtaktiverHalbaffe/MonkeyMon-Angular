import { Component, Input } from '@angular/core';
import { HlmSpinnerComponent } from '../ui-spinner-helm/src/lib/hlm-spinner.component';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '../ui-sonner-helm/src/lib/hlm-toaster.component';

@Component({
  selector: 'app-trimmed-image',
  standalone: true,
  imports: [HlmSpinnerComponent, HlmToasterComponent],
  templateUrl: './trimmed-image.component.html',
})
export class TrimmedImageComponent {
  @Input({ required: true }) src!: string;
  @Input() class?: string;
  @Input() trimHeight: boolean = false;
  @Input() trimWidth: boolean = false;
  trimmedImageUrl: string = '';

  async trimImage() {
    try {
      const response = await fetch(this.src);
      const blob = await response.blob();

      const img = new Image();
      img.src = URL.createObjectURL(blob);
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

          const trimmedWidth = this.trimWidth ? maxX - minX + 1 : canvas.width;
          const trimmedHeight = this.trimHeight
            ? maxY - minY + 1
            : canvas.height;
          const trimmedCanvas = document.createElement('canvas');
          const trimmedContext = trimmedCanvas.getContext('2d');

          if (trimmedContext) {
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
            const trimmedImageData = trimmedCanvas.toDataURL();
            this.trimmedImageUrl = trimmedImageData;
          }
        }
      };
    } catch (error) {
      console.error('Error lading image:', error);
      toast('Couldnt load image', {
        description: '',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    }
  }

  constructor() {
    this.trimImage;
  }
}
