import { Component, input } from '@angular/core';
import { DsPopover, DsPopoverComponent, PopoverTrigger } from 'ds-angular';

@Component({
  selector: 'example-ds-popover-default',
  standalone: true,
  imports: [DsPopover, DsPopoverComponent],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsPopoverDefaultExample {
  trigger = input<PopoverTrigger>('click');
  closeOnBackdrop = input<boolean>(true);
}
