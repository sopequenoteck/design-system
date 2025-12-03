import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveToggle } from './primitive-toggle';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimitiveToggle', () => {
  let component: PrimitiveToggle;
  let fixture: ComponentFixture<PrimitiveToggle>;
  let toggleElement: DebugElement;
  let switchElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveToggle);
    component = fixture.componentInstance;
    toggleElement = fixture.debugElement.query(By.css('.primitive-toggle'));
    switchElement = fixture.debugElement.query(By.css('.primitive-toggle__switch'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render with default unchecked state', () => {
      expect(component.checked()).toBe(false);
      expect(switchElement.nativeElement.getAttribute('aria-checked')).toBe('false');
    });

    it('should render checked state when checked is true', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(switchElement.nativeElement.getAttribute('aria-checked')).toBe('true');
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--checked')).toBe(true);
    });

    it('should render label when provided', () => {
      fixture.componentRef.setInput('label', 'Enable feature');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent.trim()).toBe('Enable feature');
    });

    it('should not render label when not provided', () => {
      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));
      expect(label).toBeFalsy();
    });

    it('should render track and thumb', () => {
      const track = fixture.debugElement.query(By.css('.primitive-toggle__track'));
      const thumb = fixture.debugElement.query(By.css('.primitive-toggle__thumb'));
      expect(track).toBeTruthy();
      expect(thumb).toBeTruthy();
    });
  });

  describe('Label Position', () => {
    it('should position label on the right by default', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--label-right')).toBe(true);

      const children = toggleElement.nativeElement.children;
      const switchIndex = Array.from(children).findIndex((el: any) =>
        el.classList.contains('primitive-toggle__switch')
      );
      const labelIndex = Array.from(children).findIndex((el: any) =>
        el.classList.contains('primitive-toggle__label')
      );

      expect(switchIndex).toBeLessThan(labelIndex);
    });

    it('should position label on the left when labelPosition is left', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--label-left')).toBe(true);

      const children = toggleElement.nativeElement.children;
      const switchIndex = Array.from(children).findIndex((el: any) =>
        el.classList.contains('primitive-toggle__switch')
      );
      const labelIndex = Array.from(children).findIndex((el: any) =>
        el.classList.contains('primitive-toggle__label')
      );

      expect(labelIndex).toBeLessThan(switchIndex);
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--sm')).toBe(true);
    });

    it('should apply md size class by default', () => {
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--md')).toBe(true);
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--lg')).toBe(true);
    });
  });

  describe('Disabled State', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
    });

    it('should apply disabled class', () => {
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--disabled')).toBe(true);
    });

    it('should set aria-disabled attribute', () => {
      expect(switchElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set tabindex to -1', () => {
      expect(switchElement.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should not toggle when clicked', () => {
      const initialValue = component.checked();
      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(initialValue);
    });

    it('should not toggle when label is clicked', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const initialValue = component.checked();
      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));
      label.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(initialValue);
    });
  });

  describe('User Interactions', () => {
    it('should toggle checked state on switch click', () => {
      expect(component.checked()).toBe(false);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should toggle checked state on label click', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));

      expect(component.checked()).toBe(false);

      label.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should emit checkedChange event on toggle', () => {
      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(true);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should toggle on Space key press', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      switchElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should toggle on Enter key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      switchElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should not toggle on other key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      switchElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });
  });

  describe('Focus State', () => {
    it('should apply focused class on focus', () => {
      switchElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--focused')).toBe(true);
    });

    it('should remove focused class on blur', () => {
      switchElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--focused')).toBe(true);

      switchElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--focused')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have role="switch"', () => {
      expect(switchElement.nativeElement.getAttribute('role')).toBe('switch');
    });

    it('should have tabindex="0" when not disabled', () => {
      expect(switchElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should update aria-checked based on state', () => {
      expect(switchElement.nativeElement.getAttribute('aria-checked')).toBe('false');

      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();
      expect(switchElement.nativeElement.getAttribute('aria-checked')).toBe('true');
    });

    it('should associate label with toggle via aria-labelledby when label is provided', () => {
      fixture.componentRef.setInput('label', 'Enable feature');
      fixture.componentRef.setInput('toggleId', 'test-toggle');
      fixture.detectChanges();

      expect(switchElement.nativeElement.getAttribute('aria-labelledby')).toBe('test-toggle-label');
      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));
      expect(label.nativeElement.getAttribute('id')).toBe('test-toggle-label');
    });

    it('should not have aria-labelledby when no label is provided', () => {
      expect(switchElement.nativeElement.getAttribute('aria-labelledby')).toBeFalsy();
    });
  });

  describe('CSS Classes', () => {
    it('should always have base class', () => {
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle')).toBe(true);
    });

    it('should apply checked class when checked', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--checked')).toBe(true);
    });

    it('should apply disabled class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--disabled')).toBe(true);
    });
  });
});
