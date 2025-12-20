import { Component, input } from '@angular/core';
import { DsTransfer, TransferItem } from 'ds-angular';

@Component({
  selector: 'example-ds-transfer-default',
  standalone: true,
  imports: [DsTransfer],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsTransferDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  showSearch = input<boolean>(true);
  disabled = input<boolean>(false);

  sourceItems: TransferItem[] = [
    { key: '1', label: 'Élément 1' },
    { key: '2', label: 'Élément 2' },
    { key: '3', label: 'Élément 3' },
    { key: '4', label: 'Élément 4' },
    { key: '5', label: 'Élément 5' }
  ];

  targetItems: TransferItem[] = [];
}
