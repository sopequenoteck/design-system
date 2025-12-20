import { Component, input } from '@angular/core';
import { DsAccordion, AccordionItem } from 'ds-angular';

@Component({
  selector: 'example-ds-accordion-default',
  standalone: true,
  imports: [DsAccordion],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsAccordionDefaultExample {
  multiple = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'bordered' | 'separated'>('default');

  items: AccordionItem[] = [
    { id: 'item-1', header: 'Section 1', content: 'Contenu de la section 1. Lorem ipsum dolor sit amet.' },
    { id: 'item-2', header: 'Section 2', content: 'Contenu de la section 2. Sed do eiusmod tempor incididunt.' },
    { id: 'item-3', header: 'Section 3', content: 'Contenu de la section 3. Ut enim ad minim veniam.' }
  ];
}
