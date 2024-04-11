import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-stream',
  standalone: true,
  imports: [],
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.scss'
})
export class StreamComponent {
  @Input() classname!:string;
}
