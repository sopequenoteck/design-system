import { Component, input } from '@angular/core';
import { DsPagination } from 'ds-angular';

@Component({
  selector: 'example-ds-pagination-default',
  standalone: true,
  imports: [DsPagination],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsPaginationDefaultExample {
  totalItems = input<number>(100);
  pageSize = input<number>(10);
  size = input<'sm' | 'md' | 'lg'>('md');
  showInfo = input<boolean>(true);

  currentPage = 1;
}
