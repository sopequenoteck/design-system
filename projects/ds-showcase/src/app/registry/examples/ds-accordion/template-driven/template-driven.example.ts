import { Component, signal, input } from '@angular/core';
import { DsAccordion, DsAccordionItem, DsChip } from 'ds-angular';

interface TaskItem {
  id: string;
  name: string;
  status: 'pending' | 'completed';
}

interface TaskGroup {
  key: string;
  label: string;
  items: TaskItem[];
}

@Component({
  selector: 'example-ds-accordion-template-driven',
  standalone: true,
  imports: [DsAccordion, DsAccordionItem, DsChip],
  templateUrl: './template-driven.example.html',
  styleUrl: './template-driven.example.scss',
})
export class DsAccordionTemplateDrivenExample {
  multiple = input<boolean>(true);
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'bordered' | 'separated'>('separated');

  readonly groupedItems = signal<TaskGroup[]>([
    {
      key: 'pending',
      label: 'En attente',
      items: [
        { id: '1', name: 'Revue de code', status: 'pending' },
        { id: '2', name: 'Tests unitaires', status: 'pending' },
        { id: '3', name: 'Documentation', status: 'pending' },
      ],
    },
    {
      key: 'completed',
      label: 'Terminées',
      items: [
        { id: '4', name: 'Setup projet', status: 'completed' },
        { id: '5', name: 'Design system', status: 'completed' },
      ],
    },
  ]);
}
