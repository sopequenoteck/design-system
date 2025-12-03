import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveCheckbox } from './primitive-checkbox';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimitiveCheckbox', () => {
  let component: PrimitiveCheckbox;
  let fixture: ComponentFixture<PrimitiveCheckbox>;
  let checkboxElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveCheckbox);
    component = fixture.componentInstance;
    checkboxElement = fixture.debugElement.query(By.css('.primitive-checkbox'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render with default unchecked state', () => {
      expect(component.checked()).toBe(false);
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('unchecked');
    });

    it('should render checked state when checked is true', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('checked');
      const icon = fixture.debugElement.query(By.css('.primitive-checkbox__icon'));
      expect(icon).toBeTruthy();
    });

    it('should render indeterminate state when indeterminate is true', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('indeterminate');
      const icon = fixture.debugElement.query(By.css('.primitive-checkbox__icon'));
      expect(icon).toBeTruthy();
    });

    it('should render label when provided', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-checkbox__label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent.trim()).toBe('Test Label');
    });

    it('should not render label when not provided', () => {
      const label = fixture.debugElement.query(By.css('.primitive-checkbox__label'));
      expect(label).toBeFalsy();
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--sm')).toBe(true);
    });

    it('should apply md size class by default', () => {
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--md')).toBe(true);
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--lg')).toBe(true);
    });
  });

  describe('Disabled State', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
    });

    it('should apply disabled class', () => {
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--disabled')).toBe(true);
    });

    it('should set aria-disabled attribute', () => {
      expect(checkboxElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set tabindex to -1', () => {
      expect(checkboxElement.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should not toggle when clicked', () => {
      const initialValue = component.checked();
      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(initialValue);
    });
  });

  describe('User Interactions', () => {
    it('should toggle checked state on click', () => {
      expect(component.checked()).toBe(false);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should emit checkedChange event on toggle', () => {
      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(true);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should toggle on Space key press', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      checkboxElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should toggle on Enter key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      checkboxElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should not toggle on other key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      checkboxElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });
  });

  describe('Focus State', () => {
    it('should apply focused class on focus', () => {
      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--focused')).toBe(true);
    });

    it('should remove focused class on blur', () => {
      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--focused')).toBe(true);

      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--focused')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have role="checkbox"', () => {
      expect(checkboxElement.nativeElement.getAttribute('role')).toBe('checkbox');
    });

    it('should have tabindex="0" when not disabled', () => {
      expect(checkboxElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should update aria-checked based on state', () => {
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('unchecked');

      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('checked');

      fixture.componentRef.setInput('checked', false);
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('indeterminate');
    });

    it('should associate label with checkbox via aria-labelledby when label is provided', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('checkboxId', 'test-checkbox');
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.getAttribute('aria-labelledby')).toBe('test-checkbox-label');
      const label = fixture.debugElement.query(By.css('.primitive-checkbox__label'));
      expect(label.nativeElement.getAttribute('id')).toBe('test-checkbox-label');
    });

    it('should not have aria-labelledby when no label is provided', () => {
      expect(checkboxElement.nativeElement.getAttribute('aria-labelledby')).toBeFalsy();
    });
  });

  describe('CSS Classes', () => {
    it('should always have base class', () => {
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox')).toBe(true);
    });

    it('should apply checked class when checked', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--checked')).toBe(true);
    });

    it('should apply indeterminate class when indeterminate', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--indeterminate')).toBe(true);
    });

    it('should apply disabled class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--disabled')).toBe(true);
    });
  });

  describe('Checkbox State Computed Signal', () => {
    it('should compute state as unchecked by default', () => {
      expect(component['checkboxState']()).toBe('unchecked');
    });

    it('should compute state as checked when checked is true', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(component['checkboxState']()).toBe('checked');
    });

    it('should compute state as indeterminate when indeterminate is true (priority over checked)', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(component['checkboxState']()).toBe('indeterminate');
    });
  });
});
