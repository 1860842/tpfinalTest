import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aide-enfant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aide-enfant.component.html',
  styleUrl: './aide-enfant.component.css'
})
export class AideEnfantComponent {
  @Input() view: any;
}
