import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ds-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ds-breadcrumb.html',
  styleUrl: './ds-breadcrumb.scss',
})
export class DsBreadcrumb {
  items = input.required<BreadcrumbItem[]>();
  separator = input<string>('/');
  maxItems = input<number | undefined>(undefined);

  itemClicked = output<BreadcrumbItem>();

  protected get visibleItems(): BreadcrumbItem[] {
    const allItems = this.items();
    const max = this.maxItems();

    if (!max || allItems.length <= max) {
      return allItems;
    }

    // Si on dépasse maxItems, on garde le premier, un ellipsis, et les derniers
    const firstItem = allItems[0];
    const lastItems = allItems.slice(-(max - 2));

    return [firstItem, { label: '...', disabled: true }, ...lastItems];
  }

  protected onItemClick(item: BreadcrumbItem, event: Event): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    this.itemClicked.emit(item);
  }

  protected isLastItem(index: number): boolean {
    return index === this.visibleItems.length - 1;
  }

  protected trackByIndex(index: number): number {
    return index;
  }
}
