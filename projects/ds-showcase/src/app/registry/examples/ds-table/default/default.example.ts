import { Component, input } from '@angular/core';
import { DsTable, DsTableColumn } from 'ds-angular';

@Component({
  selector: 'example-ds-table-default',
  standalone: true,
  imports: [DsTable],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsTableDefaultExample {
  variant = input<'default' | 'striped' | 'bordered'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
  hoverable = input<boolean>(true);

  columns: DsTableColumn[] = [
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' }
  ];

  data = [
    { name: 'Alice Martin', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob Dupont', email: 'bob@example.com', role: 'User' },
    { name: 'Claire Bernard', email: 'claire@example.com', role: 'Editor' }
  ];
}
