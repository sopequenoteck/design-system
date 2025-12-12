import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsTransfer, TransferItem, TransferChangeEvent } from './ds-transfer';

describe('DsTransfer', () => {
  let component: DsTransfer;
  let fixture: ComponentFixture<DsTransfer>;

  const mockSourceItems: TransferItem[] = [
    { key: '1', label: 'Item 1' },
    { key: '2', label: 'Item 2', description: 'Description 2' },
    { key: '3', label: 'Item 3', disabled: true },
    { key: '4', label: 'Item 4' },
  ];

  const mockTargetItems: TransferItem[] = [
    { key: '5', label: 'Item 5' },
    { key: '6', label: 'Item 6', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsTransfer],
    }).compileComponents();

    fixture = TestBed.createComponent(DsTransfer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('source', mockSourceItems);
    fixture.componentRef.setInput('target', mockTargetItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // === RENDERING ===

  it('should render source and target panels', () => {
    const panels = fixture.nativeElement.querySelectorAll('.ds-transfer__panel');
    expect(panels.length).toBe(2);

    const sourcePanel = fixture.nativeElement.querySelector('.ds-transfer__panel--source');
    const targetPanel = fixture.nativeElement.querySelector('.ds-transfer__panel--target');
    expect(sourcePanel).toBeTruthy();
    expect(targetPanel).toBeTruthy();
  });

  it('should display source title', () => {
    fixture.componentRef.setInput('sourceTitle', 'Available Items');
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__title');
    expect(title.textContent).toContain('Available Items');
  });

  it('should display target title', () => {
    fixture.componentRef.setInput('targetTitle', 'Selected Items');
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.ds-transfer__panel--target .ds-transfer__title');
    expect(title.textContent).toContain('Selected Items');
  });

  it('should display item counts', () => {
    const counts = fixture.nativeElement.querySelectorAll('.ds-transfer__count');
    expect(counts.length).toBe(2);
    expect(counts[0].textContent).toContain('0 / 4'); // Source
    expect(counts[1].textContent).toContain('0 / 2'); // Target
  });

  it('should render all source items', () => {
    const sourceItems = fixture.nativeElement.querySelectorAll('.ds-transfer__panel--source .ds-transfer__item');
    expect(sourceItems.length).toBe(4);
  });

  it('should render all target items', () => {
    const targetItems = fixture.nativeElement.querySelectorAll('.ds-transfer__panel--target .ds-transfer__item');
    expect(targetItems.length).toBe(2);
  });

  it('should display item labels', () => {
    const labels = fixture.nativeElement.querySelectorAll('.ds-transfer__item-label');
    expect(labels[0].textContent).toContain('Item 1');
    expect(labels[1].textContent).toContain('Item 2');
  });

  it('should display item descriptions when provided', () => {
    const descriptions = fixture.nativeElement.querySelectorAll('.ds-transfer__item-description');
    expect(descriptions.length).toBeGreaterThan(0);
    expect(descriptions[0].textContent).toContain('Description 2');
  });

  it('should render transfer action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.ds-transfer__actions ds-button');
    expect(buttons.length).toBe(2);
  });

  // === SEARCH ===

  it('should show search inputs when showSearch is true', () => {
    fixture.componentRef.setInput('showSearch', true);
    fixture.detectChanges();

    const searchInputs = fixture.nativeElement.querySelectorAll('.ds-transfer__search-input');
    expect(searchInputs.length).toBe(2);
  });

  it('should hide search inputs when showSearch is false', () => {
    fixture.componentRef.setInput('showSearch', false);
    fixture.detectChanges();

    const searchInputs = fixture.nativeElement.querySelectorAll('.ds-transfer__search-input');
    expect(searchInputs.length).toBe(0);
  });

  it('should filter source items based on search query', () => {
    const searchInput = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__search-input');
    searchInput.value = 'Item 2';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component['filteredSource']().length).toBe(1);
    expect(component['filteredSource']()[0].label).toBe('Item 2');
  });

  it('should filter target items based on search query', () => {
    const searchInput = fixture.nativeElement.querySelector('.ds-transfer__panel--target .ds-transfer__search-input');
    searchInput.value = 'Item 5';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component['filteredTarget']().length).toBe(1);
    expect(component['filteredTarget']()[0].label).toBe('Item 5');
  });

  it('should filter by description', () => {
    const searchInput = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__search-input');
    searchInput.value = 'Description 2';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component['filteredSource']().length).toBe(1);
    expect(component['filteredSource']()[0].key).toBe('2');
  });

  it('should show clear button when search query exists', () => {
    const searchInput = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__search-input');
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__search-clear');
    expect(clearButton).toBeTruthy();
  });

  it('should clear search query when clear button clicked', () => {
    component['sourceSearchQuery'].set('test');
    fixture.detectChanges();

    component.clearSearch('left');
    expect(component['sourceSearchQuery']()).toBe('');
  });

  it('should show empty state when search returns no results', () => {
    const searchInput = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__search-input');
    searchInput.value = 'nonexistent';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const empty = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__empty');
    expect(empty).toBeTruthy();
    expect(empty.textContent).toContain('Aucun résultat');
  });

  // === SELECTION ===

  it('should select item when clicked', () => {
    const item = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__item');
    item.click();
    fixture.detectChanges();

    expect(component['sourceSelected']().has('1')).toBe(true);
  });

  it('should deselect item when clicked again', () => {
    component.toggleItemSelection(mockSourceItems[0], 'left');
    expect(component['sourceSelected']().has('1')).toBe(true);

    component.toggleItemSelection(mockSourceItems[0], 'left');
    expect(component['sourceSelected']().has('1')).toBe(false);
  });

  it('should not select disabled items', () => {
    component.toggleItemSelection(mockSourceItems[2], 'left');
    expect(component['sourceSelected']().has('3')).toBe(false);
  });

  it('should add selected class to selected items', () => {
    component.toggleItemSelection(mockSourceItems[0], 'left');
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__item');
    expect(item.classList.contains('ds-transfer__item--selected')).toBe(true);
  });

  it('should add disabled class to disabled items', () => {
    const items = fixture.nativeElement.querySelectorAll('.ds-transfer__panel--source .ds-transfer__item');
    expect(items[2].classList.contains('ds-transfer__item--disabled')).toBe(true);
  });

  // === SELECT ALL ===

  it('should show select all checkbox when showSelectAll is true', () => {
    fixture.componentRef.setInput('showSelectAll', true);
    fixture.detectChanges();

    const selectAll = fixture.nativeElement.querySelectorAll('.ds-transfer__select-all');
    expect(selectAll.length).toBe(2);
  });

  it('should hide select all checkbox when showSelectAll is false', () => {
    fixture.componentRef.setInput('showSelectAll', false);
    fixture.detectChanges();

    const selectAll = fixture.nativeElement.querySelectorAll('.ds-transfer__select-all');
    expect(selectAll.length).toBe(0);
  });

  it('should select all selectable items when select all is clicked', () => {
    component.toggleSelectAll('left');
    expect(component['sourceSelected']().size).toBe(3); // 4 items - 1 disabled
  });

  it('should deselect all items when select all is clicked again', () => {
    component.toggleSelectAll('left');
    expect(component['sourceSelected']().size).toBe(3);

    component.toggleSelectAll('left');
    expect(component['sourceSelected']().size).toBe(0);
  });

  it('should not select disabled items with select all', () => {
    component.toggleSelectAll('left');
    expect(component['sourceSelected']().has('3')).toBe(false); // Item 3 is disabled
  });

  it('should compute isAllSourceSelected correctly', () => {
    expect(component['isAllSourceSelected']()).toBe(false);

    component.toggleSelectAll('left');
    expect(component['isAllSourceSelected']()).toBe(true);
  });

  it('should compute isAllTargetSelected correctly', () => {
    expect(component['isAllTargetSelected']()).toBe(false);

    component.toggleSelectAll('right');
    expect(component['isAllTargetSelected']()).toBe(true);
  });

  // === TRANSFER ===

  it('should transfer selected items to target', () => {
    component.toggleItemSelection(mockSourceItems[0], 'left');
    component.toggleItemSelection(mockSourceItems[1], 'left');

    let emittedEvent: TransferChangeEvent | undefined;
    component.transferChange.subscribe((event) => {
      emittedEvent = event;
    });

    component.transferToTarget();

    expect(emittedEvent).toBeDefined();
    expect(emittedEvent!.source.length).toBe(2);
    expect(emittedEvent!.target.length).toBe(4);
    expect(emittedEvent!.target.some(item => item.key === '1')).toBe(true);
    expect(emittedEvent!.target.some(item => item.key === '2')).toBe(true);
  });

  it('should transfer selected items to source', () => {
    component.toggleItemSelection(mockTargetItems[0], 'right');

    let emittedEvent: TransferChangeEvent | undefined;
    component.transferChange.subscribe((event) => {
      emittedEvent = event;
    });

    component.transferToSource();

    expect(emittedEvent).toBeDefined();
    expect(emittedEvent!.source.length).toBe(5);
    expect(emittedEvent!.target.length).toBe(1);
    expect(emittedEvent!.source.some(item => item.key === '5')).toBe(true);
  });

  it('should clear selection after transfer to target', () => {
    component.toggleItemSelection(mockSourceItems[0], 'left');
    component.transferToTarget();

    expect(component['sourceSelected']().size).toBe(0);
  });

  it('should clear selection after transfer to source', () => {
    component.toggleItemSelection(mockTargetItems[0], 'right');
    component.transferToSource();

    expect(component['targetSelected']().size).toBe(0);
  });

  it('should disable transfer to target button when nothing selected', () => {
    expect(component['canTransferToTarget']()).toBe(false);
  });

  it('should enable transfer to target button when items selected', () => {
    component.toggleItemSelection(mockSourceItems[0], 'left');
    expect(component['canTransferToTarget']()).toBe(true);
  });

  it('should disable transfer to source button when nothing selected', () => {
    expect(component['canTransferToSource']()).toBe(false);
  });

  it('should enable transfer to source button when items selected', () => {
    component.toggleItemSelection(mockTargetItems[0], 'right');
    expect(component['canTransferToSource']()).toBe(true);
  });

  it('should not transfer when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    component.toggleItemSelection(mockSourceItems[0], 'left');

    let emitted = false;
    component.transferChange.subscribe(() => {
      emitted = true;
    });

    component.transferToTarget();
    expect(emitted).toBe(false);
  });

  // === SIZES ===

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-transfer');
    expect(container.classList.contains('ds-transfer--sm')).toBe(true);
  });

  it('should apply md size class by default', () => {
    const container = fixture.nativeElement.querySelector('.ds-transfer');
    expect(container.classList.contains('ds-transfer--md')).toBe(true);
  });

  it('should apply lg size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-transfer');
    expect(container.classList.contains('ds-transfer--lg')).toBe(true);
  });

  // === DISABLED STATE ===

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-transfer');
    expect(container.classList.contains('ds-transfer--disabled')).toBe(true);
  });

  it('should disable search inputs when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const searchInputs = fixture.nativeElement.querySelectorAll('.ds-transfer__search-input');
    searchInputs.forEach((input: HTMLInputElement) => {
      expect(input.disabled).toBe(true);
    });
  });

  it('should not allow selection when disabled', () => {
    fixture.componentRef.setInput('disabled', true);

    component.toggleItemSelection(mockSourceItems[0], 'left');
    expect(component['sourceSelected']().size).toBe(0);
  });

  it('should not allow select all when disabled', () => {
    fixture.componentRef.setInput('disabled', true);

    component.toggleSelectAll('left');
    expect(component['sourceSelected']().size).toBe(0);
  });

  // === ACCESSIBILITY ===

  it('should have role="group" on container', () => {
    const container = fixture.nativeElement.querySelector('.ds-transfer');
    expect(container.getAttribute('role')).toBe('group');
  });

  it('should have role="listbox" on lists', () => {
    const lists = fixture.nativeElement.querySelectorAll('.ds-transfer__list');
    lists.forEach((list: HTMLElement) => {
      expect(list.getAttribute('role')).toBe('listbox');
    });
  });

  it('should have role="option" on items', () => {
    const items = fixture.nativeElement.querySelectorAll('.ds-transfer__item');
    items.forEach((item: HTMLElement) => {
      expect(item.getAttribute('role')).toBe('option');
    });
  });

  it('should set aria-selected on items', () => {
    component.toggleItemSelection(mockSourceItems[0], 'left');
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.ds-transfer__panel--source .ds-transfer__item');
    expect(item.getAttribute('aria-selected')).toBe('true');
  });

  it('should set aria-disabled on disabled items', () => {
    const items = fixture.nativeElement.querySelectorAll('.ds-transfer__panel--source .ds-transfer__item');
    expect(items[2].getAttribute('aria-disabled')).toBe('true');
  });

  it('should set aria-multiselectable on listboxes', () => {
    const lists = fixture.nativeElement.querySelectorAll('.ds-transfer__list');
    lists.forEach((list: HTMLElement) => {
      expect(list.getAttribute('aria-multiselectable')).toBe('true');
    });
  });

  it('should set aria-label on search inputs', () => {
    const searchInputs = fixture.nativeElement.querySelectorAll('.ds-transfer__search-input');
    expect(searchInputs[0].getAttribute('aria-label')).toContain('source');
    expect(searchInputs[1].getAttribute('aria-label')).toContain('cible');
  });

  it('should set aria-label on transfer buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.ds-transfer__actions ds-button');
    expect(buttons[0].getAttribute('aria-label')).toContain('droite');
    expect(buttons[1].getAttribute('aria-label')).toContain('gauche');
  });

  // === HELPERS ===

  it('should compute selected count correctly', () => {
    component.toggleItemSelection(mockSourceItems[0], 'left');
    component.toggleItemSelection(mockSourceItems[1], 'left');

    expect(component.getSelectedCount('left')).toBe(2);
  });

  it('should compute item count correctly', () => {
    expect(component.getItemCount('left')).toBe(4);
    expect(component.getItemCount('right')).toBe(2);
  });

  it('should generate unique item IDs', () => {
    const id1 = component['getItemId'](mockSourceItems[0], 'left');
    const id2 = component['getItemId'](mockSourceItems[1], 'left');
    expect(id1).not.toBe(id2);
    expect(id1).toContain('left');
    expect(id1).toContain('1');
  });

  it('should generate unique listbox IDs', () => {
    const sourceId = component['getListboxId']('left');
    const targetId = component['getListboxId']('right');
    expect(sourceId).not.toBe(targetId);
    expect(sourceId).toContain('left');
    expect(targetId).toContain('right');
  });
});
