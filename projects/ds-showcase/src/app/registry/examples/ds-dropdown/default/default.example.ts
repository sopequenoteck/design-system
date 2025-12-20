import { Component, input } from '@angular/core';
import { DsDropdown, DropdownItem, ButtonVariant, ButtonSize, DropdownPosition } from 'ds-angular';

@Component({
  selector: 'example-ds-dropdown-default',
  standalone: true,
  imports: [DsDropdown],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsDropdownDefaultExample {
  type = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  position = input<DropdownPosition>('bottom');

  items: DropdownItem[] = [
    { code: 'option1', label: 'Option 1' },
    { code: 'option2', label: 'Option 2' },
    { code: 'option3', label: 'Option 3' },
  ];

  onSelect(code: string): void {
    console.log('Selected:', code);
  }
}
