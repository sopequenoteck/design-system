import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsAccordion, AccordionItem, AccordionChangeEvent } from './ds-accordion';

describe('DsAccordion', () => {
  let component: DsAccordion;
  let fixture: ComponentFixture<DsAccordion>;
  let compiled: HTMLElement;

  const mockItems: AccordionItem[] = [
    { id: '1', header: 'Section 1', content: 'Contenu de la section 1' },
    { id: '2', header: 'Section 2', content: 'Contenu de la section 2' },
    { id: '3', header: 'Section 3', content: 'Contenu de la section 3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(DsAccordion);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Expand/Collapse', () => {
    it('should toggle item on click', () => {
      expect(component.isExpanded('1')).toBe(false);

      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
    });

    it('should collapse item when toggled again', () => {
      component.toggleItem(mockItems[0]);
      fixture.detectChanges();
      expect(component.isExpanded('1')).toBe(true);

      component.toggleItem(mockItems[0]);
      fixture.detectChanges();
      expect(component.isExpanded('1')).toBe(false);
    });

    it('should emit itemChange event', () => {
      let emittedEvent: AccordionChangeEvent | null = null;
      component.itemChange.subscribe((event) => (emittedEvent = event));

      component.toggleItem(mockItems[0]);

      expect(emittedEvent).not.toBeNull();
      expect(emittedEvent!.itemId).toBe('1');
      expect(emittedEvent!.expanded).toBe(true);
    });
  });

  describe('Single mode (multiple=false)', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('multiple', false);
      fixture.detectChanges();
    });

    it('should close other items when opening one', () => {
      component.toggleItem(mockItems[0]);
      fixture.detectChanges();
      expect(component.isExpanded('1')).toBe(true);

      component.toggleItem(mockItems[1]);
      fixture.detectChanges();
      expect(component.isExpanded('1')).toBe(false);
      expect(component.isExpanded('2')).toBe(true);
    });
  });

  describe('Multiple mode (multiple=true)', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('multiple', true);
      fixture.detectChanges();
    });

    it('should allow multiple items open', () => {
      component.toggleItem(mockItems[0]);
      component.toggleItem(mockItems[1]);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
      expect(component.isExpanded('2')).toBe(true);
    });
  });

  describe('Expand/Collapse all', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('multiple', true);
      fixture.detectChanges();
    });

    it('should expand all items', () => {
      component.expandAll();
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
      expect(component.isExpanded('2')).toBe(true);
      expect(component.isExpanded('3')).toBe(true);
    });

    it('should collapse all items', () => {
      component.expandAll();
      fixture.detectChanges();

      component.collapseAll();
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(false);
      expect(component.isExpanded('2')).toBe(false);
      expect(component.isExpanded('3')).toBe(false);
    });
  });

  describe('Disabled state', () => {
    it('should not toggle when item is disabled', () => {
      const itemsWithDisabled: AccordionItem[] = [
        { id: '1', header: 'Section 1', content: 'Content', disabled: true },
      ];
      fixture.componentRef.setInput('items', itemsWithDisabled);
      fixture.detectChanges();

      component.toggleItem(itemsWithDisabled[0]);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(false);
    });

    it('should not toggle when accordion is disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(false);
    });
  });

  describe('DOM rendering', () => {
    it('should render all items', () => {
      const items = compiled.querySelectorAll('.ds-accordion__item');
      expect(items.length).toBe(3);
    });

    it('should render headers', () => {
      const headers = compiled.querySelectorAll('.ds-accordion__header');
      expect(headers.length).toBe(3);
      expect(headers[0].textContent?.trim()).toContain('Section 1');
    });

    it('should hide content by default', () => {
      const contents = compiled.querySelectorAll('.ds-accordion__content--expanded');
      expect(contents.length).toBe(0);
    });

    it('should show content when expanded', () => {
      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      const expandedContent = compiled.querySelector('.ds-accordion__content--expanded');
      expect(expandedContent).toBeTruthy();
    });

    it('should rotate icon when expanded', () => {
      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      const rotatedIcon = compiled.querySelector('.ds-accordion__icon--rotated');
      expect(rotatedIcon).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should apply default variant class', () => {
      const container = compiled.querySelector('.ds-accordion--default');
      expect(container).toBeTruthy();
    });

    it('should apply bordered variant class', () => {
      fixture.componentRef.setInput('variant', 'bordered');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-accordion--bordered');
      expect(container).toBeTruthy();
    });

    it('should apply separated variant class', () => {
      fixture.componentRef.setInput('variant', 'separated');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-accordion--separated');
      expect(container).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-accordion--sm');
      expect(container).toBeTruthy();
    });

    it('should apply md size class by default', () => {
      const container = compiled.querySelector('.ds-accordion--md');
      expect(container).toBeTruthy();
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-accordion--lg');
      expect(container).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-expanded on headers', () => {
      const headers = compiled.querySelectorAll('.ds-accordion__header');
      headers.forEach((header) => {
        expect(header.getAttribute('aria-expanded')).toBe('false');
      });
    });

    it('should update aria-expanded when expanded', () => {
      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      const firstHeader = compiled.querySelector('.ds-accordion__header');
      expect(firstHeader?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-controls linking header to content', () => {
      const header = compiled.querySelector('.ds-accordion__header');
      const content = compiled.querySelector('.ds-accordion__content');

      const controlsId = header?.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(content?.getAttribute('id')).toBe(controlsId);
    });

    it('should have role region on content', () => {
      const content = compiled.querySelector('.ds-accordion__content');
      expect(content?.getAttribute('role')).toBe('region');
    });

    it('should have aria-labelledby on content', () => {
      const header = compiled.querySelector('.ds-accordion__header');
      const content = compiled.querySelector('.ds-accordion__content');

      expect(content?.getAttribute('aria-labelledby')).toBe(header?.getAttribute('id'));
    });
  });

  describe('Keyboard navigation', () => {
    it('should toggle on Enter', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeydown(event, mockItems[0], 0);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
    });

    it('should toggle on Space', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.onKeydown(event, mockItems[0], 0);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
    });
  });

  describe('Initial expanded items', () => {
    it('should expand items from expandedIds input', () => {
      fixture.componentRef.setInput('expandedIds', ['1', '2']);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
      expect(component.isExpanded('2')).toBe(true);
      expect(component.isExpanded('3')).toBe(false);
    });
  });
});
