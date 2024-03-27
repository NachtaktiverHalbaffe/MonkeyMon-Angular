import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { TextComponent } from '../../components/text/text.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CardComponent, TextComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {}
