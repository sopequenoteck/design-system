import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DsRating } from './ds-rating';

describe('DsRating', () => {
  let component: DsRating;
  let fixture: ComponentFixture<DsRating>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsRating, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DsRating);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default state', () => {
    it('should render with default value 0', () => {
      expect(component.internalValue()).toBe(0);
    });

    it('should render 5 stars by default', () => {
      const stars = compiled.querySelectorAll('.ds-rating__star');
      expect(stars.length).toBe(5);
    });

    it('should render all empty stars when value is 0', () => {
      const emptyStars = compiled.querySelectorAll('.ds-rating__icon--empty');
      expect(emptyStars.length).toBe(5);
    });

    it('should have md size by default', () => {
      const container = compiled.querySelector('.ds-rating--md');
      expect(container).toBeTruthy();
    });

    it('should have role="slider"', () => {
      const container = compiled.querySelector('[role="slider"]');
      expect(container).toBeTruthy();
    });

    it('should have tabindex="0" when not disabled', () => {
      const container = compiled.querySelector('.ds-rating');
      expect(container?.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Props', () => {
    it('should render custom max stars', () => {
      fixture.componentRef.setInput('max', 10);
      fixture.detectChanges();

      const stars = compiled.querySelectorAll('.ds-rating__star');
      expect(stars.length).toBe(10);
    });

    it('should render filled stars based on value', () => {
      component.internalValue.set(3);
      fixture.detectChanges();

      const filledStars = compiled.querySelectorAll('.ds-rating__icon--filled');
      expect(filledStars.length).toBe(3);
    });

    it('should render half stars when allowHalf is true', () => {
      fixture.componentRef.setInput('allowHalf', true);
      component.internalValue.set(2.5);
      fixture.detectChanges();

      const halfStars = compiled.querySelectorAll('.ds-rating__icon--half');
      expect(halfStars.length).toBe(1);
    });

    it('should apply readonly class', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating--readonly');
      expect(container).toBeTruthy();
    });

    it('should apply disabled class', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating--disabled');
      expect(container).toBeTruthy();
    });

    it('should set tabindex="-1" when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating');
      expect(container?.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating--sm');
      expect(container).toBeTruthy();
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating--lg');
      expect(container).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should update value on star click', () => {
      const stars = compiled.querySelectorAll('.ds-rating__star');
      const thirdStar = stars[2] as HTMLElement;

      thirdStar.click();
      fixture.detectChanges();

      expect(component.internalValue()).toBe(3);
    });

    it('should emit ratingChange event on click', () => {
      const spy = jasmine.createSpy('ratingChange');
      component.ratingChange.subscribe(spy);

      const stars = compiled.querySelectorAll('.ds-rating__star');
      (stars[3] as HTMLElement).click();

      expect(spy).toHaveBeenCalledWith(4);
    });

    it('should not update value when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      component.internalValue.set(0);
      fixture.detectChanges();

      const stars = compiled.querySelectorAll('.ds-rating__star');
      (stars[2] as HTMLElement).click();
      fixture.detectChanges();

      expect(component.internalValue()).toBe(0);
    });

    it('should not update value when readonly', () => {
      fixture.componentRef.setInput('readonly', true);
      component.internalValue.set(0);
      fixture.detectChanges();

      const stars = compiled.querySelectorAll('.ds-rating__star');
      (stars[2] as HTMLElement).click();
      fixture.detectChanges();

      expect(component.internalValue()).toBe(0);
    });

    it('should update hover value on mousemove', () => {
      const stars = compiled.querySelectorAll('.ds-rating__star');
      const thirdStar = stars[2] as HTMLElement;

      const event = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });

      thirdStar.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.hoverValue()).toBeGreaterThan(0);
    });

    it('should reset hover value on mouseleave', () => {
      component.hoverValue.set(3);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating') as HTMLElement;
      container.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(component.hoverValue()).toBeNull();
    });
  });

  describe('Keyboard navigation', () => {
    it('should increase value on ArrowRight', () => {
      component.internalValue.set(2);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      container.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.internalValue()).toBe(3);
    });

    it('should decrease value on ArrowLeft', () => {
      component.internalValue.set(3);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      container.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.internalValue()).toBe(2);
    });

    it('should set value to 0 on Home', () => {
      component.internalValue.set(3);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      container.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.internalValue()).toBe(0);
    });

    it('should set value to max on End', () => {
      fixture.componentRef.setInput('max', 5);
      component.internalValue.set(2);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'End' });
      container.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.internalValue()).toBe(5);
    });

    it('should not exceed max value', () => {
      fixture.componentRef.setInput('max', 5);
      component.internalValue.set(5);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      container.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.internalValue()).toBe(5);
    });

    it('should not go below 0', () => {
      component.internalValue.set(0);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      container.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.internalValue()).toBe(0);
    });

    it('should use step 0.5 when allowHalf is true', () => {
      fixture.componentRef.setInput('allowHalf', true);
      component.internalValue.set(2);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      container.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.internalValue()).toBe(2.5);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should work with FormControl', () => {
      const control = new FormControl(3);
      fixture.componentRef.setInput('value', control.value);
      component.writeValue(control.value!);
      fixture.detectChanges();

      expect(component.internalValue()).toBe(3);
    });

    it('should call onChange when value changes', () => {
      const spy = jasmine.createSpy('onChange');
      component.registerOnChange(spy);

      const stars = compiled.querySelectorAll('.ds-rating__star');
      (stars[3] as HTMLElement).click();

      expect(spy).toHaveBeenCalledWith(4);
    });

    it('should call onTouched when value changes', () => {
      const spy = jasmine.createSpy('onTouched');
      component.registerOnTouched(spy);

      const stars = compiled.querySelectorAll('.ds-rating__star');
      (stars[2] as HTMLElement).click();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Computed properties', () => {
    it('stars should return correct array length', () => {
      fixture.componentRef.setInput('max', 7);
      fixture.detectChanges();

      expect(component.stars().length).toBe(7);
    });

    it('displayValue should return hoverValue when hovering', () => {
      component.internalValue.set(2);
      component.hoverValue.set(4);
      fixture.detectChanges();

      expect(component.displayValue()).toBe(4);
    });

    it('displayValue should return internalValue when not hovering', () => {
      component.internalValue.set(3);
      component.hoverValue.set(null);
      fixture.detectChanges();

      expect(component.displayValue()).toBe(3);
    });

    it('getStarType should return "full" for filled star', () => {
      component.internalValue.set(3);
      fixture.detectChanges();

      expect(component.getStarType(2)).toBe('full');
    });

    it('getStarType should return "empty" for empty star', () => {
      component.internalValue.set(2);
      fixture.detectChanges();

      expect(component.getStarType(4)).toBe('empty');
    });

    it('getStarType should return "half" when allowHalf and value is 0.5', () => {
      fixture.componentRef.setInput('allowHalf', true);
      component.internalValue.set(2.5);
      fixture.detectChanges();

      expect(component.getStarType(3)).toBe('half');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label with current value', () => {
      component.internalValue.set(3);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating');
      expect(container?.getAttribute('aria-label')).toContain('3');
    });

    it('should have aria-valuenow', () => {
      component.internalValue.set(4);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating');
      expect(container?.getAttribute('aria-valuenow')).toBe('4');
    });

    it('should have aria-valuemin="0"', () => {
      const container = compiled.querySelector('.ds-rating');
      expect(container?.getAttribute('aria-valuemin')).toBe('0');
    });

    it('should have aria-valuemax equal to max', () => {
      fixture.componentRef.setInput('max', 10);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating');
      expect(container?.getAttribute('aria-valuemax')).toBe('10');
    });

    it('should have aria-readonly when readonly', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating');
      expect(container?.getAttribute('aria-readonly')).toBe('true');
    });

    it('should have aria-disabled when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-rating');
      expect(container?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have aria-hidden on icons', () => {
      const icons = compiled.querySelectorAll('.ds-rating__icon');
      icons.forEach((icon) => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });
});
