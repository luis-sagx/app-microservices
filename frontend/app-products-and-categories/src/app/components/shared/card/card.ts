import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() titulo = '';
  @Input() valor: number | string = '';
  @Input() icon: string = '';
}
