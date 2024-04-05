import { Component, OnDestroy, inject, signal } from '@angular/core';
import { HlmAlertDescriptionDirective } from '../../components/ui-alert-helm/src/lib/hlm-alert-description.directive';
import { HlmAlertIconDirective } from '../../components/ui-alert-helm/src/lib/hlm-alert-icon.directive';
import { HlmAlertTitleDirective } from '../../components/ui-alert-helm/src/lib/hlm-alert-title.directive';
import { HlmAlertDirective } from '../../components/ui-alert-helm/src/lib/hlm-alert.directive';
import {
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
} from '../../components/ui-carousel-helm';
import { HlmSpinnerComponent } from '../../components/ui-spinner-helm/src/lib/hlm-spinner.component';
import { MonCardComponent } from '../mon-card/mon-card.component';
import { MonkeyApiService } from '../../services/monkey-api.service';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { lucideAlertTriangle } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-monkey-carousel',
  standalone: true,
  providers: [provideIcons({ lucideAlertTriangle })],
  imports: [
    MonCardComponent,
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HlmSpinnerComponent,
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    AsyncPipe,
  ],
  templateUrl: './monkey-carousel.component.html',
})
export class MonkeyCarouselComponent implements OnDestroy {
  monkeyService = inject(MonkeyApiService);
  isError = signal<boolean>(false);
  errMsg = signal<string>('');
  monkeySubscription: Subscription;

  monkeys$ = this.monkeyService.getAllMonkeys();

  constructor() {
    this.monkeySubscription = this.monkeys$.subscribe({
      error: (err) => {
        console.warn(err.message);
        this.isError.set(true);
        this.errMsg.set(err.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.monkeySubscription.unsubscribe();
  }
}
