import { Component, computed, input, output, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: string;
}

@Component({
  selector: 'ds-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-tabs.html',
  styleUrl: './ds-tabs.scss',
})
export class DsTabs {
  tabs = input.required<TabItem[]>();
  activeTabId = input<string | undefined>(undefined);

  tabChanged = output<TabItem>();

  protected readonly internalActiveIndex = signal<number>(0);

  protected readonly activeIndex = computed<number>(() => {
    const activeId = this.activeTabId();
    if (activeId) {
      const index = this.tabs().findIndex((tab) => tab.id === activeId);
      return index !== -1 ? index : 0;
    }
    return this.internalActiveIndex();
  });

  protected readonly activeTab = computed<TabItem>(() => {
    return this.tabs()[this.activeIndex()] || this.tabs()[0];
  });

  protected selectTab(tab: TabItem, index: number): void {
    if (tab.disabled) return;

    this.internalActiveIndex.set(index);
    this.tabChanged.emit(tab);
  }

  protected isTabActive(index: number): boolean {
    return this.activeIndex() === index;
  }

  @HostListener('keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') !== 'tab') return;

    const currentIndex = this.activeIndex();
    const tabsArray = this.tabs();
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = this.findPreviousEnabledTab(currentIndex);
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = this.findNextEnabledTab(currentIndex);
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = this.findNextEnabledTab(-1);
        break;
      case 'End':
        event.preventDefault();
        nextIndex = this.findPreviousEnabledTab(tabsArray.length);
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      this.selectTab(tabsArray[nextIndex], nextIndex);
      this.focusTab(nextIndex);
    }
  }

  private findNextEnabledTab(startIndex: number): number {
    const tabsArray = this.tabs();
    for (let i = startIndex + 1; i < tabsArray.length; i++) {
      if (!tabsArray[i].disabled) return i;
    }
    return startIndex === -1 ? 0 : startIndex;
  }

  private findPreviousEnabledTab(startIndex: number): number {
    const tabsArray = this.tabs();
    for (let i = startIndex - 1; i >= 0; i--) {
      if (!tabsArray[i].disabled) return i;
    }
    return startIndex === tabsArray.length ? tabsArray.length - 1 : startIndex;
  }

  private focusTab(index: number): void {
    setTimeout(() => {
      const tabButton = document.querySelector(
        `.ds-tabs__tab[data-index="${index}"]`
      ) as HTMLElement;
      tabButton?.focus();
    }, 0);
  }

  protected trackByTabId(index: number, tab: TabItem): string {
    return tab.id;
  }
}
