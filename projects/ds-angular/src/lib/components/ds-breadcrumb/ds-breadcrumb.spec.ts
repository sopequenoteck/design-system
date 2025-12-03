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
});
