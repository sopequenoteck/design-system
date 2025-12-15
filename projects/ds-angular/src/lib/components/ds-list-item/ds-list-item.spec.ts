import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { DsListItem } from './ds-list-item';

describe('DsListItem', () => {
  let component: DsListItem;
  let fixture: ComponentFixture<DsListItem>;
  let itemElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(DsListItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Item');
    fixture.detectChanges();
    itemElement = fixture.debugElement.query(By.css('.ds-list-item'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // === Rendering ===
  describe('Rendering', () => {
    it('should render with required title', () => {
      const titleEl = fixture.debugElement.query(By.css('.ds-list-item__title'));
      expect(titleEl.nativeElement.textContent).toBe('Test Item');
    });

    it('should render subtitle when provided', () => {
      fixture.componentRef.setInput('subtitle', 'Subtitle text');
      fixture.detectChanges();

      const subtitleEl = fixture.debugElement.query(By.css('.ds-list-item__subtitle'));
      expect(subtitleEl).toBeTruthy();
      expect(subtitleEl.nativeElement.textContent).toBe('Subtitle text');
    });

    it('should not render subtitle when not provided', () => {
      const subtitleEl = fixture.debugElement.query(By.css('.ds-list-item__subtitle'));
      expect(subtitleEl).toBeFalsy();
    });

    it('should render checkbox when checkable is true', () => {
      fixture.componentRef.setInput('checkable', true);
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('primitive-checkbox'));
      expect(checkbox).toBeTruthy();
    });

    it('should not render checkbox when checkable is false', () => {
      const checkbox = fixture.debugElement.query(By.css('primitive-checkbox'));
      expect(checkbox).toBeFalsy();
    });

    it('should render bar indicator when indicator is priority', () => {
      fixture.componentRef.setInput('indicator', 'priority');
      fixture.detectChanges();

      const indicator = fixture.debugElement.query(By.css('.ds-list-item__indicator--bar'));
      expect(indicator).toBeTruthy();
    });

    it('should render dot indicator when indicator is dot', () => {
      fixture.componentRef.setInput('indicator', 'dot');
      fixture.detectChanges();

      const indicator = fixture.debugElement.query(By.css('.ds-list-item__indicator--dot'));
      expect(indicator).toBeTruthy();
    });

    it('should not render indicator when indicator is none', () => {
      const indicator = fixture.debugElement.query(By.css('.ds-list-item__indicator'));
      expect(indicator).toBeFalsy();
    });
  });

  // === Sizes ===
  describe('Sizes', () => {
    it('should apply size sm', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(itemElement.nativeElement.classList.contains('ds-list-item--sm')).toBe(true);
    });

    it('should apply size md by default', () => {
      expect(itemElement.nativeElement.classList.contains('ds-list-item--md')).toBe(true);
    });

    it('should apply size lg', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(itemElement.nativeElement.classList.contains('ds-list-item--lg')).toBe(true);
    });
  });

  // === States ===
  describe('States', () => {
    it('should apply completed class', () => {
      fixture.componentRef.setInput('completed', true);
      fixture.detectChanges();

      expect(itemElement.nativeElement.classList.contains('ds-list-item--completed')).toBe(true);
    });

    it('should apply disabled class', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(itemElement.nativeElement.classList.contains('ds-list-item--disabled')).toBe(true);
    });

    it('should apply selected class', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(itemElement.nativeElement.classList.contains('ds-list-item--selected')).toBe(true);
    });

    it('should apply clickable class by default', () => {
      expect(itemElement.nativeElement.classList.contains('ds-list-item--clickable')).toBe(true);
    });

    it('should not apply clickable class when clickable is false', () => {
      fixture.componentRef.setInput('clickable', false);
      fixture.detectChanges();

      expect(itemElement.nativeElement.classList.contains('ds-list-item--clickable')).toBe(false);
    });

    it('should not apply clickable class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(itemElement.nativeElement.classList.contains('ds-list-item--clickable')).toBe(false);
    });
  });

  // === Events ===
  describe('Events', () => {
    it('should emit clicked on click', () => {
      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      itemElement.nativeElement.click();

      expect(clickedSpy).toHaveBeenCalled();
    });

    it('should not emit clicked when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      itemElement.nativeElement.click();

      expect(clickedSpy).not.toHaveBeenCalled();
    });

    it('should emit checkedChange on checkbox change', () => {
      fixture.componentRef.setInput('checkable', true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      component.handleCheckedChange(true);

      expect(checkedChangeSpy).toHaveBeenCalledWith({ checked: true });
    });

    it('should not emit checkedChange when disabled', () => {
      fixture.componentRef.setInput('checkable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      component.handleCheckedChange(true);

      expect(checkedChangeSpy).not.toHaveBeenCalled();
    });
  });

  // === Accessibility ===
  describe('Accessibility', () => {
    it('should have role button when clickable', () => {
      expect(itemElement.nativeElement.getAttribute('role')).toBe('button');
    });

    it('should have role listitem when not clickable', () => {
      fixture.componentRef.setInput('clickable', false);
      fixture.detectChanges();

      expect(itemElement.nativeElement.getAttribute('role')).toBe('listitem');
    });

    it('should have tabindex 0 by default', () => {
      expect(itemElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should have tabindex -1 when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(itemElement.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should set aria-disabled when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(itemElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set aria-selected when selected', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(itemElement.nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should handle Enter key', () => {
      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeyDown(event);

      expect(clickedSpy).toHaveBeenCalled();
    });

    it('should handle Space key', () => {
      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.handleKeyDown(event);

      expect(clickedSpy).toHaveBeenCalled();
    });

    it('should not handle keyboard when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeyDown(event);

      expect(clickedSpy).not.toHaveBeenCalled();
    });

    it('should hide indicator from screen readers', () => {
      fixture.componentRef.setInput('indicator', 'priority');
      fixture.detectChanges();

      const indicator = fixture.debugElement.query(By.css('.ds-list-item__indicator'));
      expect(indicator.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // === Indicator Colors ===
  describe('Indicator Colors', () => {
    it('should resolve predefined color "high"', () => {
      fixture.componentRef.setInput('indicator', 'priority');
      fixture.componentRef.setInput('indicatorColor', 'high');
      fixture.detectChanges();

      const color = component.resolveIndicatorColor();
      expect(color).toContain('--color-error');
    });

    it('should resolve predefined color "medium"', () => {
      fixture.componentRef.setInput('indicator', 'priority');
      fixture.componentRef.setInput('indicatorColor', 'medium');
      fixture.detectChanges();

      const color = component.resolveIndicatorColor();
      expect(color).toContain('--color-warning');
    });

    it('should resolve predefined color "low"', () => {
      fixture.componentRef.setInput('indicator', 'priority');
      fixture.componentRef.setInput('indicatorColor', 'low');
      fixture.detectChanges();

      const color = component.resolveIndicatorColor();
      expect(color).toContain('--color-info');
    });

    it('should pass through custom color', () => {
      fixture.componentRef.setInput('indicator', 'priority');
      fixture.componentRef.setInput('indicatorColor', '#ff5500');
      fixture.detectChanges();

      const color = component.resolveIndicatorColor();
      expect(color).toBe('#ff5500');
    });
  });

  // === Checkbox integration ===
  describe('Checkbox Integration', () => {
    it('should pass checked state to checkbox', () => {
      fixture.componentRef.setInput('checkable', true);
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should pass indeterminate state to checkbox', () => {
      fixture.componentRef.setInput('checkable', true);
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(component.indeterminate()).toBe(true);
    });

    it('should pass disabled state to checkbox', () => {
      fixture.componentRef.setInput('checkable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.disabled()).toBe(true);
    });
  });
});

// === Test with content projection ===
@Component({
  template: `
    <ds-list-item title="Test">
      <span inline class="test-inline">Tag</span>
      <span meta class="test-meta">09:00</span>
      <button actions class="test-action">Edit</button>
    </ds-list-item>
  `,
  standalone: true,
  imports: [DsListItem],
})
class TestHostComponent {}

describe('DsListItem with projected content', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should project inline content', () => {
    const inline = fixture.debugElement.query(By.css('.test-inline'));
    expect(inline).toBeTruthy();
    expect(inline.nativeElement.textContent).toBe('Tag');
  });

  it('should project meta content', () => {
    const meta = fixture.debugElement.query(By.css('.test-meta'));
    expect(meta).toBeTruthy();
    expect(meta.nativeElement.textContent).toBe('09:00');
  });

  it('should project actions content', () => {
    const action = fixture.debugElement.query(By.css('.test-action'));
    expect(action).toBeTruthy();
    expect(action.nativeElement.textContent).toBe('Edit');
  });
});
