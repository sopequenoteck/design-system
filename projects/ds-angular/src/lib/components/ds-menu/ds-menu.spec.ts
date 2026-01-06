import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DsMenu, MenuItem } from './ds-menu';
import { faEdit, faTrash, faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [DsMenu],
  template: `
    <ds-menu
      [items]="items"
      [size]="size"
      [trigger]="trigger"
      [closeOnSelect]="closeOnSelect"
      [ariaLabel]="ariaLabel"
      (itemSelected)="onItemSelected($event)"
      (opened)="onOpened()"
      (closed)="onClosed()"
    >
      <button dsMenuTrigger>Open Menu</button>
    </ds-menu>
  `,
})
class TestHostComponent {
  items: MenuItem[] = [
    { id: 'edit', label: 'Edit', icon: faEdit },
    { id: 'copy', label: 'Copy', icon: faCopy },
    { id: 'delete', label: 'Delete', icon: faTrash, disabled: true },
    { id: 'download', label: 'Download', icon: faDownload, dividerBefore: true },
  ];
  size: 'sm' | 'md' | 'lg' = 'md';
  trigger: 'click' | 'contextmenu' = 'click';
  closeOnSelect = true;
  ariaLabel = 'Actions menu';

  selectedItem: MenuItem | null = null;
  openedCount = 0;
  closedCount = 0;

  onItemSelected(item: MenuItem): void {
    this.selectedItem = item;
  }

  onOpened(): void {
    this.openedCount++;
  }

  onClosed(): void {
    this.closedCount++;
  }
}

describe('DsMenu', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let menuComponent: DsMenu;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, OverlayModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    const menuDebug = fixture.debugElement.query(By.directive(DsMenu));
    menuComponent = menuDebug.componentInstance;
  });

  afterEach(() => {
    // Clean up any overlays left in the DOM to prevent memory leaks
    document.querySelectorAll('.cdk-overlay-container').forEach((el) => {
      el.innerHTML = '';
    });
    fixture?.destroy();
  });

  // === CRÉATION ===

  it('should create', () => {
    expect(menuComponent).toBeTruthy();
  });

  it('should render trigger content', () => {
    const trigger = fixture.debugElement.query(By.css('[dsMenuTrigger]'));
    expect(trigger.nativeElement.textContent).toContain('Open Menu');
  });

  // === OUVERTURE / FERMETURE ===

  it('should open menu on click when trigger is click', fakeAsync(() => {
    const trigger = fixture.debugElement.query(By.css('.ds-menu__trigger'));
    trigger.triggerEventHandler('click', { preventDefault: () => {} });
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeTrue();
  }));

  it('should open menu on contextmenu when trigger is contextmenu', fakeAsync(() => {
    hostComponent.trigger = 'contextmenu';
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('.ds-menu__trigger'));
    trigger.triggerEventHandler('contextmenu', { preventDefault: () => {} });
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeTrue();
  }));

  it('should not open on click when trigger is contextmenu', fakeAsync(() => {
    hostComponent.trigger = 'contextmenu';
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('.ds-menu__trigger'));
    trigger.triggerEventHandler('click', { preventDefault: () => {} });
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeFalse();
  }));

  it('should close menu on backdrop click', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    menuComponent.onBackdropClick();
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeFalse();
  }));

  it('should close menu on item selection when closeOnSelect is true', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const item = hostComponent.items[0];
    menuComponent.selectItem(item);
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeFalse();
  }));

  it('should keep menu open on item selection when closeOnSelect is false', fakeAsync(() => {
    hostComponent.closeOnSelect = false;
    fixture.detectChanges();

    menuComponent.open();
    tick();
    fixture.detectChanges();

    const item = hostComponent.items[0];
    menuComponent.selectItem(item);
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeTrue();
  }));

  it('should emit opened event when opening', fakeAsync(() => {
    menuComponent.open();
    tick();

    expect(hostComponent.openedCount).toBe(1);
  }));

  it('should emit closed event when closing', fakeAsync(() => {
    menuComponent.open();
    tick();

    menuComponent.close();
    tick();

    expect(hostComponent.closedCount).toBe(1);
  }));

  // === ITEMS ===

  it('should render all menu items', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const items = document.querySelectorAll('.ds-menu__item');
    expect(items.length).toBe(4);
  }));

  it('should render icons when provided', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const icons = document.querySelectorAll('.ds-menu__item-icon');
    expect(icons.length).toBe(4);
  }));

  it('should render dividers when dividerBefore is true', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const dividers = document.querySelectorAll('.ds-menu__divider');
    expect(dividers.length).toBe(1);
  }));

  it('should emit itemSelected when item is clicked', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const item = hostComponent.items[0];
    menuComponent.selectItem(item);
    tick();

    expect(hostComponent.selectedItem).toBe(item);
  }));

  it('should not emit itemSelected for disabled items', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const disabledItem = hostComponent.items[2]; // 'Delete' is disabled
    menuComponent.selectItem(disabledItem);
    tick();

    expect(hostComponent.selectedItem).toBeNull();
  }));

  it('should apply disabled class to disabled items', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const disabledItem = document.querySelector('.ds-menu__item--disabled');
    expect(disabledItem).toBeTruthy();
  }));

  // === TAILLES ===

  it('should apply sm size class', fakeAsync(() => {
    hostComponent.size = 'sm';
    fixture.detectChanges();

    menuComponent.open();
    tick();
    fixture.detectChanges();

    const panel = document.querySelector('.ds-menu__panel--sm');
    expect(panel).toBeTruthy();
  }));

  it('should apply md size class', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const panel = document.querySelector('.ds-menu__panel--md');
    expect(panel).toBeTruthy();
  }));

  it('should apply lg size class', fakeAsync(() => {
    hostComponent.size = 'lg';
    fixture.detectChanges();

    menuComponent.open();
    tick();
    fixture.detectChanges();

    const panel = document.querySelector('.ds-menu__panel--lg');
    expect(panel).toBeTruthy();
  }));

  // === NAVIGATION CLAVIER ===

  it('should open menu on ArrowDown from trigger', fakeAsync(() => {
    const trigger = fixture.debugElement.query(By.css('.ds-menu__trigger'));
    trigger.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeTrue();
  }));

  it('should open menu on Enter from trigger', fakeAsync(() => {
    const trigger = fixture.debugElement.query(By.css('.ds-menu__trigger'));
    trigger.triggerEventHandler('keydown', { key: 'Enter', preventDefault: () => {} });
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeTrue();
  }));

  it('should open menu on Space from trigger', fakeAsync(() => {
    const trigger = fixture.debugElement.query(By.css('.ds-menu__trigger'));
    trigger.triggerEventHandler('keydown', { key: ' ', preventDefault: () => {} });
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeTrue();
  }));

  it('should close menu on Escape', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    menuComponent.onMenuKeydown({ key: 'Escape', preventDefault: () => {} } as KeyboardEvent);
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeFalse();
  }));

  it('should navigate down with ArrowDown', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const initialIndex = menuComponent.activeIndex();
    menuComponent.onMenuKeydown({ key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent);
    tick();

    expect(menuComponent.activeIndex()).toBe(initialIndex + 1);
  }));

  it('should navigate up with ArrowUp', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    // D'abord aller au deuxième item
    menuComponent.onMenuKeydown({ key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent);
    tick();
    const currentIndex = menuComponent.activeIndex();

    menuComponent.onMenuKeydown({ key: 'ArrowUp', preventDefault: () => {} } as KeyboardEvent);
    tick();

    expect(menuComponent.activeIndex()).toBe(currentIndex - 1);
  }));

  it('should jump to first item with Home', fakeAsync(() => {
    menuComponent.open();
    tick();

    // Navigate to middle
    menuComponent.onMenuKeydown({ key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent);
    menuComponent.onMenuKeydown({ key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent);
    tick();

    menuComponent.onMenuKeydown({ key: 'Home', preventDefault: () => {} } as KeyboardEvent);
    tick();

    expect(menuComponent.activeIndex()).toBe(0);
  }));

  it('should jump to last item with End', fakeAsync(() => {
    menuComponent.open();
    tick();

    menuComponent.onMenuKeydown({ key: 'End', preventDefault: () => {} } as KeyboardEvent);
    tick();

    expect(menuComponent.activeIndex()).toBe(3); // Last item (Download)
  }));

  it('should select item on Enter in menu', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    menuComponent.onMenuKeydown({ key: 'Enter', preventDefault: () => {} } as KeyboardEvent);
    tick();

    expect(hostComponent.selectedItem).toBe(hostComponent.items[0]);
  }));

  it('should select item on Space in menu', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    menuComponent.onMenuKeydown({ key: ' ', preventDefault: () => {} } as KeyboardEvent);
    tick();

    expect(hostComponent.selectedItem).toBe(hostComponent.items[0]);
  }));

  it('should skip disabled items when navigating', fakeAsync(() => {
    menuComponent.open();
    tick();

    // Item 0: Edit, Item 1: Copy, Item 2: Delete (disabled), Item 3: Download
    // Navigate from Copy (1) to Download (3), skipping Delete (2)
    menuComponent.onMenuKeydown({ key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent);
    tick();
    expect(menuComponent.activeIndex()).toBe(1); // Copy

    menuComponent.onMenuKeydown({ key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent);
    tick();
    expect(menuComponent.activeIndex()).toBe(3); // Download (skipped Delete)
  }));

  it('should wrap navigation at boundaries', fakeAsync(() => {
    menuComponent.open();
    tick();

    // Go to end
    menuComponent.onMenuKeydown({ key: 'End', preventDefault: () => {} } as KeyboardEvent);
    tick();
    expect(menuComponent.activeIndex()).toBe(3);

    // Go down should wrap to first
    menuComponent.onMenuKeydown({ key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent);
    tick();
    expect(menuComponent.activeIndex()).toBe(0);
  }));

  it('should close menu on Tab', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    menuComponent.onMenuKeydown({ key: 'Tab', preventDefault: () => {} } as KeyboardEvent);
    tick();
    fixture.detectChanges();

    expect(menuComponent.isOpen()).toBeFalse();
  }));

  // === INTERACTION SOURIS ===

  it('should update active index on mouse enter', fakeAsync(() => {
    menuComponent.open();
    tick();

    menuComponent.onItemMouseEnter(1);
    tick();

    expect(menuComponent.activeIndex()).toBe(1);
  }));

  it('should not update active index on hover over disabled item', fakeAsync(() => {
    menuComponent.open();
    tick();

    const initialIndex = menuComponent.activeIndex();
    menuComponent.onItemMouseEnter(2); // Disabled item
    tick();

    expect(menuComponent.activeIndex()).toBe(initialIndex);
  }));

  // === ACCESSIBILITÉ ===

  it('should have role menu on panel', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const panel = document.querySelector('.ds-menu__panel');
    expect(panel?.getAttribute('role')).toBe('menu');
  }));

  it('should have role menuitem on items', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const items = document.querySelectorAll('.ds-menu__item');
    items.forEach(item => {
      expect(item.getAttribute('role')).toBe('menuitem');
    });
  }));

  it('should set aria-haspopup on trigger', () => {
    const trigger = fixture.debugElement.query(By.css('.ds-menu__trigger'));
    expect(trigger.nativeElement.getAttribute('aria-haspopup')).toBe('menu');
  });

  it('should set aria-expanded correctly', fakeAsync(() => {
    const trigger = fixture.debugElement.query(By.css('.ds-menu__trigger'));
    expect(trigger.nativeElement.getAttribute('aria-expanded')).toBe('false');

    menuComponent.open();
    tick();
    fixture.detectChanges();

    expect(trigger.nativeElement.getAttribute('aria-expanded')).toBe('true');
  }));

  it('should set aria-activedescendant', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const panel = document.querySelector('.ds-menu__panel');
    expect(panel?.getAttribute('aria-activedescendant')).toBe('menu-item-edit');
  }));

  it('should set aria-disabled on disabled items', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const disabledItem = document.querySelector('#menu-item-delete');
    expect(disabledItem?.getAttribute('aria-disabled')).toBe('true');
  }));

  it('should set aria-label when provided', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const panel = document.querySelector('.ds-menu__panel');
    expect(panel?.getAttribute('aria-label')).toBe('Actions menu');
  }));

  // === CDK OVERLAY ===

  it('should render overlay with CDK when open', fakeAsync(() => {
    menuComponent.open();
    tick();
    fixture.detectChanges();

    const overlay = document.querySelector('.cdk-overlay-pane');
    expect(overlay).toBeTruthy();
  }));

  it('should toggle menu state', fakeAsync(() => {
    expect(menuComponent.isOpen()).toBeFalse();

    menuComponent.toggle();
    tick();
    expect(menuComponent.isOpen()).toBeTrue();

    menuComponent.toggle();
    tick();
    expect(menuComponent.isOpen()).toBeFalse();
  }));

  // === CLEANUP ===

  it('should close menu on destroy', fakeAsync(() => {
    menuComponent.open();
    tick();
    expect(menuComponent.isOpen()).toBeTrue();

    menuComponent.ngOnDestroy();
    tick();
    expect(menuComponent.isOpen()).toBeFalse();
  }));
});
