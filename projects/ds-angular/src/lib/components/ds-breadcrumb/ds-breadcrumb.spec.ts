import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DsBreadcrumb, BreadcrumbItem } from './ds-breadcrumb';

describe('DsBreadcrumb', () => {
  let component: DsBreadcrumb;
  let fixture: ComponentFixture<DsBreadcrumb>;

  const mockItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Item' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsBreadcrumb, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DsBreadcrumb);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render all items', () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
    expect(items.length).toBe(4);
  });

  it('should render links for items with href except last item', () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__link'));
    expect(links.length).toBe(3); // Only first 3 items have links

    const lastItemText = fixture.debugElement.query(
      By.css('.ds-breadcrumb__item--active .ds-breadcrumb__text')
    );
    expect(lastItemText).toBeTruthy();
    expect(lastItemText.nativeElement.textContent.trim()).toBe('Item');
  });

  it('should render custom separator', () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.componentRef.setInput('separator', '>');
    fixture.detectChanges();

    const separators = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__separator'));
    expect(separators.length).toBe(3); // 4 items = 3 separators
    expect(separators[0].nativeElement.textContent).toBe('>');
  });

  it('should apply active class to last item', () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();

    const allItems = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
    const lastItem = allItems[allItems.length - 1];

    expect(lastItem.nativeElement.classList.contains('ds-breadcrumb__item--active')).toBe(true);
  });

  it('should emit itemClicked when link is clicked', () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();

    let clickedItem: BreadcrumbItem | undefined;
    component.itemClicked.subscribe((item) => {
      clickedItem = item;
    });

    const firstLink = fixture.debugElement.query(By.css('.ds-breadcrumb__link'));
    firstLink.nativeElement.click();

    expect(clickedItem).toEqual(mockItems[0]);
  });

  it('should not emit itemClicked for disabled items', () => {
    const itemsWithDisabled: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Disabled', href: '/disabled', disabled: true },
    ];
    fixture.componentRef.setInput('items', itemsWithDisabled);
    fixture.detectChanges();

    let emitCount = 0;
    component.itemClicked.subscribe(() => {
      emitCount++;
    });

    const disabledText = fixture.debugElement.query(
      By.css('.ds-breadcrumb__text--disabled')
    );
    expect(disabledText).toBeTruthy();
  });

  it('should collapse items when maxItems is set', () => {
    const manyItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Level1', href: '/level1' },
      { label: 'Level2', href: '/level2' },
      { label: 'Level3', href: '/level3' },
      { label: 'Level4', href: '/level4' },
      { label: 'Current' },
    ];
    fixture.componentRef.setInput('items', manyItems);
    fixture.componentRef.setInput('maxItems', 4);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
    expect(items.length).toBe(4); // First + ellipsis + last 2

    const ellipsisText = items[1].nativeElement.textContent;
    expect(ellipsisText).toContain('...');
  });

  it('should set aria-current on last item', () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();

    const lastItemText = fixture.debugElement.query(
      By.css('.ds-breadcrumb__item--active .ds-breadcrumb__text')
    );
    expect(lastItemText.nativeElement.getAttribute('aria-current')).toBe('page');
  });

  describe('Separators', () => {
    it('should render correct number of separators', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const separators = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__separator'));
      expect(separators.length).toBe(mockItems.length - 1);
    });

    it('should use default separator when not specified', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const firstSeparator = fixture.debugElement.query(By.css('.ds-breadcrumb__separator'));
      expect(firstSeparator.nativeElement.textContent).toBe('/');
    });

    it('should not render separator after last item', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const allItems = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
      const lastItem = allItems[allItems.length - 1];
      const separatorInLastItem = lastItem.query(By.css('.ds-breadcrumb__separator'));

      expect(separatorInLastItem).toBeFalsy();
    });
  });

  describe('Active state', () => {
    it('should mark only last item as active', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const activeItems = fixture.debugElement.queryAll(
        By.css('.ds-breadcrumb__item--active')
      );
      expect(activeItems.length).toBe(1);
    });

    it('should apply correct aria-current attribute', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const lastItemText = fixture.debugElement.query(
        By.css('.ds-breadcrumb__item--active .ds-breadcrumb__text')
      );
      expect(lastItemText.nativeElement.getAttribute('aria-current')).toBe('page');
    });
  });

  describe('Navigation', () => {
    it('should render items with href as links', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const links = fixture.debugElement.queryAll(By.css('a[href]'));
      expect(links.length).toBeGreaterThan(0);
    });

    it('should render items without href as text', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const lastItemText = fixture.debugElement.query(
        By.css('.ds-breadcrumb__item--active .ds-breadcrumb__text')
      );
      expect(lastItemText).toBeTruthy();
    });

    it('should prevent default action for disabled items', () => {
      const itemsWithDisabled: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Disabled', href: '/disabled', disabled: true },
      ];
      fixture.componentRef.setInput('items', itemsWithDisabled);
      fixture.detectChanges();

      const event = new MouseEvent('click');
      spyOn(event, 'preventDefault');

      component['onItemClick'](itemsWithDisabled[1], event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('MaxItems handling', () => {
    it('should not collapse when items count equals maxItems', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.componentRef.setInput('maxItems', 4);
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
      expect(items.length).toBe(4);

      const hasEllipsis = items.some((item) => item.nativeElement.textContent.includes('...'));
      expect(hasEllipsis).toBe(false);
    });

    it('should not collapse when items count is less than maxItems', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.componentRef.setInput('maxItems', 10);
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
      expect(items.length).toBe(mockItems.length);
    });

    it('should show ellipsis when items exceed maxItems', () => {
      const manyItems: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Level1', href: '/level1' },
        { label: 'Level2', href: '/level2' },
        { label: 'Level3', href: '/level3' },
        { label: 'Current' },
      ];
      fixture.componentRef.setInput('items', manyItems);
      fixture.componentRef.setInput('maxItems', 3);
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
      expect(items.length).toBe(3);

      const ellipsisText = items[1].nativeElement.textContent;
      expect(ellipsisText).toContain('...');
    });

    it('should handle maxItems undefined', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.componentRef.setInput('maxItems', undefined);
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
      expect(items.length).toBe(mockItems.length);
    });

    it('should mark ellipsis as disabled', () => {
      const manyItems: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Level1', href: '/level1' },
        { label: 'Level2', href: '/level2' },
        { label: 'Level3', href: '/level3' },
        { label: 'Current' },
      ];
      fixture.componentRef.setInput('items', manyItems);
      fixture.componentRef.setInput('maxItems', 3);
      fixture.detectChanges();

      const visibleItems = component['visibleItems'];
      const ellipsisItem = visibleItems.find((item) => item.label === '...');
      expect(ellipsisItem?.disabled).toBe(true);
    });
  });

  describe('Helper methods', () => {
    it('should correctly identify last item', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      expect(component['isLastItem'](0)).toBe(false);
      expect(component['isLastItem'](mockItems.length - 1)).toBe(true);
    });

    it('should track by index', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const trackByResult = component['trackByIndex'](2);
      expect(trackByResult).toBe(2);
    });
  });

  describe('Disabled state', () => {
    it('should apply disabled class to disabled items', () => {
      const itemsWithDisabled: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Disabled', href: '/disabled', disabled: true },
        { label: 'Current' },
      ];
      fixture.componentRef.setInput('items', itemsWithDisabled);
      fixture.detectChanges();

      const disabledText = fixture.debugElement.query(
        By.css('.ds-breadcrumb__text--disabled')
      );
      expect(disabledText).toBeTruthy();
    });

    it('should not emit click event for disabled items', () => {
      const itemsWithDisabled: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Disabled', href: '/disabled', disabled: true },
      ];
      fixture.componentRef.setInput('items', itemsWithDisabled);
      fixture.detectChanges();

      let emitCount = 0;
      component.itemClicked.subscribe(() => {
        emitCount++;
      });

      const event = new MouseEvent('click');
      component['onItemClick'](itemsWithDisabled[1], event);

      expect(emitCount).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle single item', () => {
      const singleItem: BreadcrumbItem[] = [{ label: 'Home' }];
      fixture.componentRef.setInput('items', singleItem);
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
      expect(items.length).toBe(1);

      const separators = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__separator'));
      expect(separators.length).toBe(0);
    });

    it('should handle empty items array', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__item'));
      expect(items.length).toBe(0);
    });

    it('should handle items without href', () => {
      const itemsNoHref: BreadcrumbItem[] = [
        { label: 'Home' },
        { label: 'Products' },
        { label: 'Current' },
      ];
      fixture.componentRef.setInput('items', itemsNoHref);
      fixture.detectChanges();

      const links = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__link'));
      expect(links.length).toBe(0);

      const textElements = fixture.debugElement.queryAll(By.css('.ds-breadcrumb__text'));
      expect(textElements.length).toBe(3);
    });
  });

  describe('visibleItems getter', () => {
    it('should return all items when maxItems is not set', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const visible = component['visibleItems'];
      expect(visible.length).toBe(mockItems.length);
    });

    it('should return collapsed items when maxItems is exceeded', () => {
      const manyItems: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Level1', href: '/level1' },
        { label: 'Level2', href: '/level2' },
        { label: 'Level3', href: '/level3' },
        { label: 'Level4', href: '/level4' },
        { label: 'Current' },
      ];
      fixture.componentRef.setInput('items', manyItems);
      fixture.componentRef.setInput('maxItems', 4);
      fixture.detectChanges();

      const visible = component['visibleItems'];
      expect(visible.length).toBe(4);
      expect(visible[0]).toEqual(manyItems[0]);
      expect(visible[1].label).toBe('...');
    });
  });
});
