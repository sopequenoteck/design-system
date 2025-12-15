import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { DsListGroup } from './ds-list-group';
import { DsListItem } from '../ds-list-item/ds-list-item';

describe('DsListGroup', () => {
  let component: DsListGroup;
  let fixture: ComponentFixture<DsListGroup>;
  let groupElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsListGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(DsListGroup);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Group');
    fixture.detectChanges();
    groupElement = fixture.debugElement.query(By.css('.ds-list-group'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render title', () => {
      const titleEl = fixture.debugElement.query(By.css('.ds-list-group__title'));
      expect(titleEl.nativeElement.textContent).toBe('Test Group');
    });

    it('should render subtitle when provided', () => {
      fixture.componentRef.setInput('subtitle', 'Subtitle');
      fixture.detectChanges();

      const subtitleEl = fixture.debugElement.query(By.css('.ds-list-group__subtitle'));
      expect(subtitleEl).toBeTruthy();
      expect(subtitleEl.nativeElement.textContent).toBe('Subtitle');
    });

    it('should render count badge when provided', () => {
      fixture.componentRef.setInput('count', 5);
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('ds-badge'));
      expect(badge).toBeTruthy();
    });

    it('should not render count badge when not provided', () => {
      const badge = fixture.debugElement.query(By.css('ds-badge'));
      expect(badge).toBeFalsy();
    });
  });

  describe('Collapsible', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'collapsible');
      fixture.detectChanges();
    });

    it('should apply collapsible class', () => {
      expect(groupElement.nativeElement.classList.contains('ds-list-group--collapsible')).toBe(true);
    });

    it('should render chevron icon', () => {
      const chevron = fixture.debugElement.query(By.css('.ds-list-group__chevron'));
      expect(chevron).toBeTruthy();
    });

    it('should have role button on header', () => {
      const header = fixture.debugElement.query(By.css('.ds-list-group__header'));
      expect(header.nativeElement.getAttribute('role')).toBe('button');
    });

    it('should have tabindex 0 on header', () => {
      const header = fixture.debugElement.query(By.css('.ds-list-group__header'));
      expect(header.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should toggle on click', () => {
      const header = fixture.debugElement.query(By.css('.ds-list-group__header'));
      const expandedSpy = jasmine.createSpy('expandedChange');
      component.expandedChange.subscribe(expandedSpy);

      header.nativeElement.click();
      fixture.detectChanges();

      expect(expandedSpy).toHaveBeenCalledWith({ expanded: false });
    });

    it('should toggle on Enter key', () => {
      const expandedSpy = jasmine.createSpy('expandedChange');
      component.expandedChange.subscribe(expandedSpy);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeyDown(event);

      expect(expandedSpy).toHaveBeenCalled();
    });

    it('should toggle on Space key', () => {
      const expandedSpy = jasmine.createSpy('expandedChange');
      component.expandedChange.subscribe(expandedSpy);

      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.handleKeyDown(event);

      expect(expandedSpy).toHaveBeenCalled();
    });

    it('should apply collapsed class when collapsed', () => {
      fixture.componentRef.setInput('expanded', false);
      fixture.detectChanges();

      expect(groupElement.nativeElement.classList.contains('ds-list-group--collapsed')).toBe(true);
    });

    it('should hide content when collapsed', () => {
      fixture.componentRef.setInput('expanded', false);
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.ds-list-group__content'));
      expect(content).toBeFalsy();
    });
  });

  describe('Default variant', () => {
    it('should not render chevron', () => {
      const chevron = fixture.debugElement.query(By.css('.ds-list-group__chevron'));
      expect(chevron).toBeFalsy();
    });

    it('should not have role on header', () => {
      const header = fixture.debugElement.query(By.css('.ds-list-group__header'));
      expect(header.nativeElement.getAttribute('role')).toBeNull();
    });

    it('should not toggle on click', () => {
      const expandedSpy = jasmine.createSpy('expandedChange');
      component.expandedChange.subscribe(expandedSpy);

      component.toggle();

      expect(expandedSpy).not.toHaveBeenCalled();
    });
  });

  describe('Sticky', () => {
    it('should apply sticky class', () => {
      fixture.componentRef.setInput('sticky', true);
      fixture.detectChanges();

      expect(groupElement.nativeElement.classList.contains('ds-list-group--sticky')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-expanded when collapsible', () => {
      fixture.componentRef.setInput('variant', 'collapsible');
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('.ds-list-group__header'));
      expect(header.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should update aria-expanded on toggle', () => {
      fixture.componentRef.setInput('variant', 'collapsible');
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('.ds-list-group__header'));
      header.nativeElement.click();
      fixture.detectChanges();

      expect(header.nativeElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have aria-label on content', () => {
      const content = fixture.debugElement.query(By.css('.ds-list-group__content'));
      expect(content.nativeElement.getAttribute('aria-label')).toBe('Test Group');
    });
  });
});

@Component({
  template: `
    <ds-list-group title="Test" variant="collapsible">
      <ds-list-item title="Item 1" />
      <ds-list-item title="Item 2" />
    </ds-list-group>
  `,
  standalone: true,
  imports: [DsListGroup, DsListItem],
})
class TestHostComponent {}

describe('DsListGroup with content', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should project list items', () => {
    const items = fixture.debugElement.queryAll(By.css('ds-list-item'));
    expect(items.length).toBe(2);
  });
});
