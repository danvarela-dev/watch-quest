import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss'],
})
export class CircleComponent {
  @Input() value = '';
  @Input() color = '#c22525';
}
