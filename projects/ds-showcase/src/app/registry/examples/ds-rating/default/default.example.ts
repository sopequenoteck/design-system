import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsRating } from 'ds-angular';

@Component({
  selector: 'example-ds-rating-default',
  standalone: true,
  imports: [DsRating, FormsModule],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsRatingDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  readonly = input<boolean>(false);
  disabled = input<boolean>(false);

  value = signal(3);
}
