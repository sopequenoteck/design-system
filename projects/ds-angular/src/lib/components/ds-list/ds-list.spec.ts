import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { DsList } from './ds-list';
import { DsListItem } from '../ds-list-item/ds-list-item';

describe('DsList', () => {
  let component: DsList;
  let fixture: ComponentFixture<DsList>;
  let listElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsList],
    }).compileComponents();

    fixture = TestBed.createComponent(DsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listElement = fixture.debugElement.query(By.css('.ds-list'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // === Rendering ===
  describe('Rendering', () => {
    it('should render with default variant', () => {
      expect(listElement.nativeElement.classList.contains('ds-list--default')).toBe(true);
    });

    it('should render with default size', () => {
      expect(listElement.nativeElement.classList.contains('ds-list--md')).toBe(true);
    });

    it('should have role list', () => {
      expect(listElement.nativeElement.getAttribute('role')).toBe('list');
    });
  });

  // === Variants ===
  describe('Variants', () => {
    it('should apply divided variant', () => {
      fixture.componentRef.setInput('variant', 'divided');
      fixture.detectChanges();

      expect(listElement.nativeElement.classList.contains('ds-list--divided')).toBe(true);
    });

    it('should apply card variant', () => {
      fixture.componentRef.setInput('variant', 'card');
      fixture.detectChanges();

      expect(listElement.nativeElement.classList.contains('ds-list--card')).toBe(true);
    });
  });

  // === Sizes ===
  describe('Sizes', () => {
    it('should apply size sm', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(listElement.nativeElement.classList.contains('ds-list--sm')).toBe(true);
    });

    it('should apply size lg', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(listElement.nativeElement.classList.contains('ds-list--lg')).toBe(true);
    });
  });

  // === Loading State ===
  describe('Loading State', () => {
    it('should render skeletons when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const skeletons = fixture.debugElement.queryAll(By.css('.ds-list__skeleton'));
      expect(skeletons.length).toBe(3); // default loadingCount
    });

    it('should render custom number of skeletons', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.componentRef.setInput('loadingCount', 5);
      fixture.detectChanges();

      const skeletons = fixture.debugElement.queryAll(By.css('.ds-list__skeleton'));
      expect(skeletons.length).toBe(5);
    });

    it('should render ds-skeleton components in loading state', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const dsSkeletons = fixture.debugElement.queryAll(By.css('ds-skeleton'));
      expect(dsSkeletons.length).toBeGreaterThan(0);
    });
  });

  // === Empty State ===
  describe('Empty State', () => {
    it('should render ds-empty when empty', () => {
      fixture.componentRef.setInput('empty', true);
      fixture.detectChanges();

      const emptyComponent = fixture.debugElement.query(By.css('ds-empty'));
      expect(emptyComponent).toBeTruthy();
    });

    it('should pass emptyTitle to ds-empty', () => {
      fixture.componentRef.setInput('empty', true);
      fixture.componentRef.setInput('emptyTitle', 'Custom Title');
      fixture.detectChanges();

      expect(component.emptyTitle()).toBe('Custom Title');
    });

    it('should pass emptyDescription to ds-empty', () => {
      fixture.componentRef.setInput('empty', true);
      fixture.componentRef.setInput('emptyDescription', 'Custom Description');
      fixture.detectChanges();

      expect(component.emptyDescription()).toBe('Custom Description');
    });

    it('should not render empty when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.componentRef.setInput('empty', true);
      fixture.detectChanges();

      const emptyComponent = fixture.debugElement.query(By.css('ds-empty'));
      expect(emptyComponent).toBeFalsy();
    });
  });

  // === Drag & Drop ===
  describe('Drag & Drop', () => {
    it('should render drop zone when draggable', () => {
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      const dropZone = fixture.debugElement.query(By.css('.ds-list__drop-zone'));
      expect(dropZone).toBeTruthy();
    });

    it('should apply draggable class', () => {
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      expect(listElement.nativeElement.classList.contains('ds-list--draggable')).toBe(true);
    });

    it('should emit dropped event on drop', () => {
      fixture.componentRef.setInput('draggable', true);
      fixture.componentRef.setInput('dragData', ['item1', 'item2', 'item3']);
      fixture.detectChanges();

      const droppedSpy = jasmine.createSpy('dropped');
      component.dropped.subscribe(droppedSpy);

      // Simulate drop event
      const mockEvent = {
        previousIndex: 0,
        currentIndex: 2,
        item: { data: 'item1' },
        container: { data: ['item1', 'item2', 'item3'] },
        previousContainer: { data: ['item1', 'item2', 'item3'] },
        isPointerOverContainer: true,
        distance: { x: 0, y: 100 },
        dropPoint: { x: 0, y: 0 },
        event: new MouseEvent('drop'),
      };

      component.onDrop(mockEvent as any);

      expect(droppedSpy).toHaveBeenCalledWith({
        item: 'item1',
        previousIndex: 0,
        currentIndex: 2,
      });
    });
  });

  // === Virtualisation ===
  describe('Virtualisation', () => {
    it('should render viewport when virtual', () => {
      fixture.componentRef.setInput('virtual', true);
      fixture.detectChanges();

      const viewport = fixture.debugElement.query(By.css('cdk-virtual-scroll-viewport'));
      expect(viewport).toBeTruthy();
    });

    it('should apply virtual class', () => {
      fixture.componentRef.setInput('virtual', true);
      fixture.detectChanges();

      expect(listElement.nativeElement.classList.contains('ds-list--virtual')).toBe(true);
    });

    it('should set itemSize on viewport', () => {
      fixture.componentRef.setInput('virtual', true);
      fixture.componentRef.setInput('itemSize', 50);
      fixture.detectChanges();

      expect(component.itemSize()).toBe(50);
    });

    it('should set viewportHeight', () => {
      fixture.componentRef.setInput('virtual', true);
      fixture.componentRef.setInput('viewportHeight', 500);
      fixture.detectChanges();

      expect(component.viewportStyle()).toEqual({ height: '500px' });
    });
  });

  // === Selection ===
  describe('Selection', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('dragData', ['item1', 'item2', 'item3']);
      fixture.detectChanges();
    });

    it('should emit selectionChange on toggle', () => {
      const selectionChangeSpy = jasmine.createSpy('selectionChange');
      component.selectionChange.subscribe(selectionChangeSpy);

      component.toggleSelection('item1');

      expect(selectionChangeSpy).toHaveBeenCalledWith({ selected: ['item1'] });
    });

    it('should add item to selection', () => {
      const selectionChangeSpy = jasmine.createSpy('selectionChange');
      component.selectionChange.subscribe(selectionChangeSpy);

      component.toggleSelection('item1');

      expect(selectionChangeSpy).toHaveBeenCalledWith({ selected: ['item1'] });
    });

    it('should remove item from selection', () => {
      fixture.componentRef.setInput('selectedItems', ['item1', 'item2']);
      fixture.detectChanges();

      const selectionChangeSpy = jasmine.createSpy('selectionChange');
      component.selectionChange.subscribe(selectionChangeSpy);

      component.toggleSelection('item1');

      expect(selectionChangeSpy).toHaveBeenCalledWith({ selected: ['item2'] });
    });

    it('should check if item is selected', () => {
      fixture.componentRef.setInput('selectedItems', ['item1']);
      fixture.detectChanges();

      expect(component.isSelected('item1')).toBe(true);
      expect(component.isSelected('item2')).toBe(false);
    });

    it('should select all items', () => {
      const selectionChangeSpy = jasmine.createSpy('selectionChange');
      component.selectionChange.subscribe(selectionChangeSpy);

      component.selectAll();

      expect(selectionChangeSpy).toHaveBeenCalledWith({
        selected: ['item1', 'item2', 'item3'],
      });
    });

    it('should clear selection', () => {
      fixture.componentRef.setInput('selectedItems', ['item1', 'item2']);
      fixture.detectChanges();

      const selectionChangeSpy = jasmine.createSpy('selectionChange');
      component.selectionChange.subscribe(selectionChangeSpy);

      component.clearSelection();

      expect(selectionChangeSpy).toHaveBeenCalledWith({ selected: [] });
    });

    it('should not emit when selectable is false', () => {
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      const selectionChangeSpy = jasmine.createSpy('selectionChange');
      component.selectionChange.subscribe(selectionChangeSpy);

      component.toggleSelection('item1');

      expect(selectionChangeSpy).not.toHaveBeenCalled();
    });
  });

  // === Computed Properties ===
  describe('Computed Properties', () => {
    it('should compute skeleton array correctly', () => {
      fixture.componentRef.setInput('loadingCount', 5);
      fixture.detectChanges();

      expect(component.skeletonArray().length).toBe(5);
    });

    it('should compute skeleton size based on list size', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      expect(component.skeletonSize()).toBe('sm');

      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(component.skeletonSize()).toBe('lg');
    });
  });
});

// === Test with content projection ===
@Component({
  template: `
    <ds-list>
      <ds-list-item title="Item 1" />
      <ds-list-item title="Item 2" />
      <ds-list-item title="Item 3" />
    </ds-list>
  `,
  standalone: true,
  imports: [DsList, DsListItem],
})
class TestHostComponent {}

describe('DsList with projected content', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should project ds-list-item components', () => {
    const items = fixture.debugElement.queryAll(By.css('ds-list-item'));
    expect(items.length).toBe(3);
  });
});
