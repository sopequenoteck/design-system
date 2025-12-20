import { Component, input } from '@angular/core';
import { DsBreadcrumb, BreadcrumbItem } from 'ds-angular';

@Component({
  selector: 'example-ds-breadcrumb-default',
  standalone: true,
  imports: [DsBreadcrumb],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsBreadcrumbDefaultExample {
  separator = input<string>('/');

  items: BreadcrumbItem[] = [
    { label: 'Accueil' },
    { label: 'Produits' },
    { label: 'Catégorie' }
  ];
}
