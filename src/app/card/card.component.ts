import { Component, Input } from '@angular/core';
import { Classroom } from '../../types';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() classroom!:Classroom;
}
