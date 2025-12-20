import { Component, input } from '@angular/core';
import { DsAvatar } from 'ds-angular';

@Component({
  selector: 'example-ds-avatar-default',
  standalone: true,
  imports: [DsAvatar],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsAvatarDefaultExample {
  name = input<string>('John Doe');
  shape = input<'circle' | 'rounded' | 'square'>('circle');
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  autoColor = input<boolean>(false);
}
