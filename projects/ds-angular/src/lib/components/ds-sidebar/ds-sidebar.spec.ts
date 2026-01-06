import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { faHome, faCog, faUsers, faChartBar, faBell } from '@fortawesome/free-solid-svg-icons';
import { DsSidebar } from './ds-sidebar';
import { DsSidebarItemComponent } from './ds-sidebar-item.component';
import { SidebarItem, SidebarMode } from './ds-sidebar.types';

// Test host component
@Component({
  template: `
    <ds-sidebar
      [items]="items"
      [mode]="mode"
      [size]="size"
      [position]="position"
      [collapsible]="collapsible"
      [ariaLabel]="ariaLabel"
      (itemClick)="onItemClick($event)"
      (itemExpand)="onItemExpand($event)"
      (modeChange)="onModeChange($event)">
    </ds-sidebar>
  `,
  standalone: true,
  imports: [DsSidebar],
})
class TestHostComponent {
  items: SidebarItem[] = [];
  mode: SidebarMode = 'full';
  size: 'sm' | 'md' | 'lg' = 'md';
  position: 'left' | 'right' = 'left';
  collapsible = true;
  ariaLabel = 'Test navigation';

  onItemClick = jasmine.createSpy('onItemClick');
  onItemExpand = jasmine.createSpy('onItemExpand');
  onModeChange = jasmine.createSpy('onModeChange');
}

describe('DsSidebar', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  const sampleItems: SidebarItem[] = [
    { id: '1', label: 'Dashboard', icon: faHome, routerLink: '/dashboard' },
    { id: '2', label: 'Users', icon: faUsers, children: [
      { id: '2-1', label: 'All Users', routerLink: '/users' },
      { id: '2-2', label: 'Roles', routerLink: '/users/roles' },
    ]},
    { id: '3', label: 'Analytics', icon: faChartBar, routerLink: '/analytics', badge: 5, badgeVariant: 'error' },
    { id: '4', label: 'Settings', icon: faCog, routerLink: '/settings', disabled: true },
    { id: '5', label: 'Notifications', icon: faBell, dividerAfter: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  afterEach(() => {
    // Clean up any overlays left in the DOM to prevent memory leaks
    document.querySelectorAll('.cdk-overlay-container').forEach((el) => {
      el.innerHTML = '';
    });
    fixture?.destroy();
  });

  // ============ CRÉATION ET RENDU ============

  describe('Création et rendu', () => {
    it('should create', () => {
      host.items = sampleItems;
      fixture.detectChanges();
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render all items', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-sidebar-item'));
      expect(items.length).toBe(5); // 5 items de niveau 0
    });

    it('should render nested items when parent is expanded', () => {
      host.items = [
        { id: '1', label: 'Parent', expanded: true, children: [
          { id: '1-1', label: 'Child 1' },
          { id: '1-2', label: 'Child 2' },
        ]},
      ];
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-sidebar-item'));
      expect(items.length).toBe(3); // 1 parent + 2 enfants
    });

    it('should not render nested items when parent is collapsed', () => {
      host.items = [
        { id: '1', label: 'Parent', expanded: false, children: [
          { id: '1-1', label: 'Child 1' },
        ]},
      ];
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-sidebar-item'));
      expect(items.length).toBe(1); // Seulement le parent
    });

    it('should render icons when provided', () => {
      host.items = [{ id: '1', label: 'With Icon', icon: faHome }];
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('.ds-sidebar-item__icon'));
      expect(icon).toBeTruthy();
    });
  });

  // ============ MODES ============

  describe('Modes', () => {
    it('should apply full mode by default', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));
      expect(sidebar.classes['ds-sidebar--full']).toBeTruthy();
    });

    it('should apply collapsed mode', () => {
      host.items = sampleItems;
      host.mode = 'collapsed';
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));
      expect(sidebar.classes['ds-sidebar--collapsed']).toBeTruthy();
    });

    it('should apply overlay mode', () => {
      host.items = sampleItems;
      host.mode = 'overlay';
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));
      expect(sidebar.classes['ds-sidebar--overlay']).toBeTruthy();
    });

    it('should toggle between full and collapsed modes', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      expect(component.internalMode()).toBe('full');

      component.toggleMode();
      fixture.detectChanges();
      expect(component.internalMode()).toBe('collapsed');
      expect(host.onModeChange).toHaveBeenCalledWith('collapsed');

      component.toggleMode();
      fixture.detectChanges();
      expect(component.internalMode()).toBe('full');
    });

    it('should show toggle button when collapsible', () => {
      host.items = sampleItems;
      host.collapsible = true;
      fixture.detectChanges();

      const toggleBtn = fixture.debugElement.query(By.css('.ds-sidebar__toggle-btn'));
      expect(toggleBtn).toBeTruthy();
    });

    it('should hide toggle button when not collapsible', () => {
      host.items = sampleItems;
      host.collapsible = false;
      fixture.detectChanges();

      const toggleBtn = fixture.debugElement.query(By.css('.ds-sidebar__toggle-btn'));
      expect(toggleBtn).toBeFalsy();
    });
  });

  // ============ EXPAND/COLLAPSE ============

  describe('Expand/Collapse', () => {
    it('should expand item with children on toggle', () => {
      host.items = [
        { id: '1', label: 'Parent', children: [
          { id: '1-1', label: 'Child' },
        ]},
      ];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const item = host.items[0];

      component.toggleExpand(item);
      fixture.detectChanges();

      expect(component.expandedItemIds().has('1')).toBeTruthy();
    });

    it('should collapse expanded item on second toggle', () => {
      host.items = [
        { id: '1', label: 'Parent', expanded: true, children: [
          { id: '1-1', label: 'Child' },
        ]},
      ];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const item = host.items[0];

      // Initial state: expanded from data
      expect(component.expandedItemIds().has('1')).toBeTruthy();

      component.toggleExpand(item);
      fixture.detectChanges();
      expect(component.expandedItemIds().has('1')).toBeFalsy();
    });

    it('should emit itemExpand event', () => {
      host.items = [
        { id: '1', label: 'Parent', children: [
          { id: '1-1', label: 'Child' },
        ]},
      ];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      component.toggleExpand(host.items[0]);

      expect(host.onItemExpand).toHaveBeenCalledWith({
        item: host.items[0],
        expanded: true,
      });
    });

    it('should expand all items', () => {
      host.items = [
        { id: '1', label: 'Parent 1', children: [
          { id: '1-1', label: 'Child 1' },
        ]},
        { id: '2', label: 'Parent 2', children: [
          { id: '2-1', label: 'Child 2' },
        ]},
      ];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      component.expandAll();
      fixture.detectChanges();

      expect(component.expandedItemIds().has('1')).toBeTruthy();
      expect(component.expandedItemIds().has('2')).toBeTruthy();
    });

    it('should collapse all items', () => {
      host.items = [
        { id: '1', label: 'Parent 1', expanded: true, children: [
          { id: '1-1', label: 'Child 1' },
        ]},
        { id: '2', label: 'Parent 2', expanded: true, children: [
          { id: '2-1', label: 'Child 2' },
        ]},
      ];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      component.collapseAll();
      fixture.detectChanges();

      expect(component.expandedItemIds().size).toBe(0);
    });
  });

  // ============ ACTIVE STATE ============

  describe('Active state', () => {
    it('should set active item on click', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const event = { item: sampleItems[0], event: new MouseEvent('click') };

      component.handleItemClick(event);
      fixture.detectChanges();

      expect(component.activeItemId()).toBe('1');
    });

    it('should emit itemClick event', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const itemEl = fixture.debugElement.query(By.css('.ds-sidebar-item'));
      itemEl.triggerEventHandler('click', new MouseEvent('click'));
      fixture.detectChanges();

      expect(host.onItemClick).toHaveBeenCalled();
    });

    it('should apply active class to active item', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      component.setActiveItem('1');
      fixture.detectChanges();

      const activeItem = fixture.debugElement.query(By.css('.ds-sidebar-item--active'));
      expect(activeItem).toBeTruthy();
    });
  });

  // ============ DISABLED ITEMS ============

  describe('Disabled items', () => {
    it('should not activate disabled items', () => {
      host.items = [{ id: '1', label: 'Disabled', disabled: true }];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const event = { item: host.items[0], event: new MouseEvent('click') };

      component.handleItemClick(event);
      fixture.detectChanges();

      expect(component.activeItemId()).toBeNull();
    });

    it('should apply disabled class', () => {
      host.items = [{ id: '1', label: 'Disabled', disabled: true }];
      fixture.detectChanges();

      const disabledItem = fixture.debugElement.query(By.css('.ds-sidebar-item--disabled'));
      expect(disabledItem).toBeTruthy();
    });

    it('should have tabindex -1 on disabled items', () => {
      host.items = [{ id: '1', label: 'Disabled', disabled: true }];
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('.ds-sidebar-item'));
      expect(item.attributes['tabindex']).toBe('-1');
    });
  });

  // ============ BADGES ============

  describe('Badges', () => {
    it('should render badge when provided', () => {
      host.items = [{ id: '1', label: 'With Badge', badge: 5 }];
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.ds-sidebar-item__badge'));
      expect(badge).toBeTruthy();
      expect(badge.nativeElement.textContent.trim()).toBe('5');
    });

    it('should render string badge', () => {
      host.items = [{ id: '1', label: 'With Badge', badge: 'NEW' }];
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.ds-sidebar-item__badge'));
      expect(badge.nativeElement.textContent.trim()).toBe('NEW');
    });

    it('should apply badge variant class', () => {
      host.items = [{ id: '1', label: 'With Badge', badge: 5, badgeVariant: 'error' }];
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.ds-sidebar-item__badge--error'));
      expect(badge).toBeTruthy();
    });

    it('should hide badge in collapsed mode', () => {
      host.items = [{ id: '1', label: 'With Badge', badge: 5 }];
      host.mode = 'collapsed';
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.ds-sidebar-item__badge'));
      expect(badge).toBeFalsy();
    });
  });

  // ============ DIVIDERS ============

  describe('Dividers', () => {
    it('should render divider after item', () => {
      host.items = [{ id: '1', label: 'With Divider', dividerAfter: true }];
      fixture.detectChanges();

      const divider = fixture.debugElement.query(By.css('.ds-sidebar-item__divider'));
      expect(divider).toBeTruthy();
    });
  });

  // ============ SIZES ============

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      host.items = sampleItems;
      host.size = 'sm';
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar--sm'));
      expect(sidebar).toBeTruthy();
    });

    it('should apply md size class by default', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar--md'));
      expect(sidebar).toBeTruthy();
    });

    it('should apply lg size class', () => {
      host.items = sampleItems;
      host.size = 'lg';
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar--lg'));
      expect(sidebar).toBeTruthy();
    });
  });

  // ============ POSITIONS ============

  describe('Positions', () => {
    it('should apply left position class by default', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar--left'));
      expect(sidebar).toBeTruthy();
    });

    it('should apply right position class', () => {
      host.items = sampleItems;
      host.position = 'right';
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar--right'));
      expect(sidebar).toBeTruthy();
    });
  });

  // ============ OVERLAY MODE ============

  describe('Overlay mode', () => {
    it('should show trigger button in overlay mode when closed', () => {
      host.items = sampleItems;
      host.mode = 'overlay';
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('.ds-sidebar__trigger'));
      expect(trigger).toBeTruthy();
    });

    it('should open overlay on trigger click', fakeAsync(() => {
      host.items = sampleItems;
      host.mode = 'overlay';
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      component.openOverlay();
      tick(350); // Attendre l'animation
      fixture.detectChanges();

      expect(component.isOverlayOpen()).toBeTruthy();
      const overlay = fixture.debugElement.query(By.css('.ds-sidebar--overlay-open'));
      expect(overlay).toBeTruthy();
    }));

    it('should show backdrop when overlay is open', fakeAsync(() => {
      host.items = sampleItems;
      host.mode = 'overlay';
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      component.openOverlay();
      tick(350);
      fixture.detectChanges();

      const backdrop = fixture.debugElement.query(By.css('.ds-sidebar__backdrop'));
      expect(backdrop).toBeTruthy();
    }));

    it('should close overlay on backdrop click', fakeAsync(() => {
      host.items = sampleItems;
      host.mode = 'overlay';
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      component.openOverlay();
      tick(350);
      fixture.detectChanges();

      const backdrop = fixture.debugElement.query(By.css('.ds-sidebar__backdrop'));
      backdrop.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(component.isOverlayOpen()).toBeFalsy();
    }));
  });

  // ============ NAVIGATION CLAVIER ============

  describe('Navigation clavier', () => {
    it('should navigate down with ArrowDown', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));

      // Initial focusedIndex is -1
      expect(component['focusedIndex']()).toBe(-1);

      // ArrowDown → focusedIndex devient 0
      sidebar.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
      fixture.detectChanges();

      expect(component['focusedIndex']()).toBe(0);
    });

    it('should navigate up with ArrowUp', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));

      // D'abord descendre deux fois
      sidebar.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
      sidebar.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
      fixture.detectChanges();
      expect(component['focusedIndex']()).toBe(1);

      // Puis remonter
      sidebar.triggerEventHandler('keydown', { key: 'ArrowUp', preventDefault: () => {} });
      fixture.detectChanges();

      expect(component['focusedIndex']()).toBe(0);
    });

    it('should expand item with ArrowRight', () => {
      host.items = [
        { id: '1', label: 'Parent', children: [
          { id: '1-1', label: 'Child' },
        ]},
      ];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));

      // Focus premier item
      sidebar.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
      // Expand
      sidebar.triggerEventHandler('keydown', { key: 'ArrowRight', preventDefault: () => {} });
      fixture.detectChanges();

      expect(component.expandedItemIds().has('1')).toBeTruthy();
    });

    it('should collapse item with ArrowLeft', () => {
      host.items = [
        { id: '1', label: 'Parent', expanded: true, children: [
          { id: '1-1', label: 'Child' },
        ]},
      ];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));

      // Focus premier item (parent)
      sidebar.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
      // Collapse
      sidebar.triggerEventHandler('keydown', { key: 'ArrowLeft', preventDefault: () => {} });
      fixture.detectChanges();

      expect(component.expandedItemIds().has('1')).toBeFalsy();
    });

    it('should go to first item with Home', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));

      // Descendre plusieurs fois
      sidebar.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
      sidebar.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
      sidebar.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
      fixture.detectChanges();
      expect(component['focusedIndex']()).toBe(2);

      // Home → retour au premier item
      sidebar.triggerEventHandler('keydown', { key: 'Home', preventDefault: () => {} });
      fixture.detectChanges();

      expect(component['focusedIndex']()).toBe(0);
    });

    it('should go to last item with End', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));

      // End → dernier item (index = items.length - 1)
      sidebar.triggerEventHandler('keydown', { key: 'End', preventDefault: () => {} });
      fixture.detectChanges();

      const lastIndex = component.flattenedItems().length - 1;
      expect(component['focusedIndex']()).toBe(lastIndex);
    });

    it('should activate item with Enter', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));
      // Focus premier item
      sidebar.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
      // Enter
      sidebar.triggerEventHandler('keydown', { key: 'Enter', preventDefault: () => {} });
      fixture.detectChanges();

      expect(host.onItemClick).toHaveBeenCalled();
    });

    it('should close overlay with Escape', fakeAsync(() => {
      host.items = sampleItems;
      host.mode = 'overlay';
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      component.openOverlay();
      tick(350);
      fixture.detectChanges();

      const sidebar = fixture.debugElement.query(By.css('.ds-sidebar'));
      sidebar.triggerEventHandler('keydown', { key: 'Escape', preventDefault: () => {} });
      fixture.detectChanges();

      expect(component.isOverlayOpen()).toBeFalsy();
    }));
  });

  // ============ ACCESSIBILITÉ ============

  describe('Accessibilité', () => {
    it('should have role="navigation"', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const nav = fixture.debugElement.query(By.css('[role="navigation"]'));
      expect(nav).toBeTruthy();
    });

    it('should have aria-label', () => {
      host.items = sampleItems;
      host.ariaLabel = 'Main menu';
      fixture.detectChanges();

      const nav = fixture.debugElement.query(By.css('[aria-label="Main menu"]'));
      expect(nav).toBeTruthy();
    });

    it('should have aria-expanded on expandable items', () => {
      host.items = [
        { id: '1', label: 'Parent', children: [
          { id: '1-1', label: 'Child' },
        ]},
      ];
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('[aria-expanded]'));
      expect(item).toBeTruthy();
    });

    it('should have role="menubar" on body', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const menubar = fixture.debugElement.query(By.css('[role="menubar"]'));
      expect(menubar).toBeTruthy();
    });

    it('should have role="menuitem" on items', () => {
      host.items = sampleItems;
      fixture.detectChanges();

      const menuitems = fixture.debugElement.queryAll(By.css('[role="menuitem"]'));
      expect(menuitems.length).toBeGreaterThan(0);
    });
  });

  // ============ COMPUTED PROPERTIES ============

  describe('Computed properties', () => {
    it('should compute flattened items correctly', () => {
      host.items = [
        { id: '1', label: 'Parent', expanded: true, children: [
          { id: '1-1', label: 'Child 1' },
          { id: '1-2', label: 'Child 2' },
        ]},
        { id: '2', label: 'Item 2' },
      ];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      const flattened = component.flattenedItems();

      expect(flattened.length).toBe(4); // 1 parent + 2 enfants + 1 autre
      expect(flattened[0].level).toBe(0);
      expect(flattened[1].level).toBe(1);
      expect(flattened[2].level).toBe(1);
      expect(flattened[3].level).toBe(0);
    });

    it('should compute visible item count', () => {
      host.items = [
        { id: '1', label: 'Parent', expanded: true, children: [
          { id: '1-1', label: 'Child' },
        ]},
      ];
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(DsSidebar)).componentInstance;
      expect(component.visibleItemCount()).toBe(2);
    });
  });

  // ============ COLLAPSED MODE POPOVER ============

  describe('Collapsed mode popover', () => {
    it('should not show children inline in collapsed mode', () => {
      host.items = [
        { id: '1', label: 'Parent', icon: faHome, expanded: true, children: [
          { id: '1-1', label: 'Child 1' },
          { id: '1-2', label: 'Child 2' },
        ]},
      ];
      host.mode = 'collapsed';
      fixture.detectChanges();

      // Les enfants ne doivent pas être affichés inline
      const childrenContainer = fixture.debugElement.query(By.css('.ds-sidebar-item__children'));
      expect(childrenContainer).toBeFalsy();
    });

    it('should have aria-haspopup on parent items in collapsed mode', () => {
      host.items = [
        { id: '1', label: 'Parent', icon: faHome, children: [
          { id: '1-1', label: 'Child' },
        ]},
      ];
      host.mode = 'collapsed';
      fixture.detectChanges();

      const parentItem = fixture.debugElement.query(By.css('.ds-sidebar-item--has-children'));
      expect(parentItem.nativeElement.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('should pass sidebarPosition to items', () => {
      host.items = [
        { id: '1', label: 'Item 1', icon: faHome },
      ];
      host.position = 'right';
      fixture.detectChanges();

      const itemComponent = fixture.debugElement.query(By.directive(DsSidebarItemComponent));
      expect(itemComponent.componentInstance.sidebarPosition()).toBe('right');
    });

    it('should not show tooltip for items with children in collapsed mode', () => {
      host.items = [
        { id: '1', label: 'Parent', icon: faHome, children: [
          { id: '1-1', label: 'Child' },
        ]},
      ];
      host.mode = 'collapsed';
      fixture.detectChanges();

      const parentItem = fixture.debugElement.query(By.css('.ds-sidebar-item--has-children'));
      // Le tooltip ne doit pas être affiché pour les items avec enfants
      expect(parentItem.nativeElement.getAttribute('dstooltip')).toBeFalsy();
    });
  });
});
