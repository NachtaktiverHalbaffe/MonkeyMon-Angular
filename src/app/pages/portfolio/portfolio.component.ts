import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { TextComponent } from '../../components/text/text.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CardComponent, TextComponent, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {}
