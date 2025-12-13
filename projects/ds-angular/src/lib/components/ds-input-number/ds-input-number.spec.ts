import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsInputNumber } from './ds-input-number';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('DsInputNumber', () => {
  let component: DsInputNumber;
  let fixture: ComponentFixture<DsInputNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsInputNumber],
    }).compileComponents();

    fixture = TestBed.createComponent(DsInputNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // === INITIAL STATE ===

  it('should have null as initial value', () => {
    expect(component.internalValue()).toBeNull();
  });

  it('should have md as default size', () => {
    expect(component.size()).toBe('md');
  });

  it('should have controls enabled by default', () => {
    expect(component.controls()).toBe(true);
  });

  it('should have both as default controls position', () => {
    expect(component.controlsPosition()).toBe('both');
  });

  it('should have 0 as default precision', () => {
    expect(component.precision()).toBe(0);
  });

  // === INPUTS ===

  it('should accept min/max values', () => {
    fixture.componentRef.setInput('min', 10);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();

    expect(component.min()).toBe(10);
    expect(component.max()).toBe(100);
  });

  it('should accept step value', () => {
    fixture.componentRef.setInput('step', 5);
    fixture.detectChanges();

    expect(component.step()).toBe(5);
  });

  it('should accept prefix and suffix', () => {
    fixture.componentRef.setInput('prefix', '$');
    fixture.componentRef.setInput('suffix', 'kg');
    fixture.detectChanges();

    expect(component.prefix()).toBe('$');
    expect(component.suffix()).toBe('kg');
  });

  it('should accept precision value', () => {
    fixture.componentRef.setInput('precision', 2);
    fixture.detectChanges();

    expect(component.precision()).toBe(2);
  });

  // === SIZES ===

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-input-number');
    expect(container.classList.contains('ds-input-number--sm')).toBe(true);
  });

  it('should apply md size class', () => {
    fixture.componentRef.setInput('size', 'md');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-input-number');
    expect(container.classList.contains('ds-input-number--md')).toBe(true);
  });

  it('should apply lg size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-input-number');
    expect(container.classList.contains('ds-input-number--lg')).toBe(true);
  });

  // === DISABLED / READONLY ===

  it('should apply disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-input-number');
    const input = fixture.nativeElement.querySelector('input');

    expect(container.classList.contains('ds-input-number--disabled')).toBe(true);
    expect(input.disabled).toBe(true);
  });

  it('should apply readonly state', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-input-number');
    const input = fixture.nativeElement.querySelector('input');

    expect(container.classList.contains('ds-input-number--readonly')).toBe(true);
    expect(input.readOnly).toBe(true);
  });

  // === CONTROLS VISIBILITY ===

  it('should show controls when controls is true', () => {
    fixture.componentRef.setInput('controls', true);
    fixture.componentRef.setInput('controlsPosition', 'both');
    fixture.detectChanges();

    const decrementBtn = fixture.nativeElement.querySelector('.ds-input-number__btn--decrement');
    const incrementBtn = fixture.nativeElement.querySelector('.ds-input-number__btn--increment');

    expect(decrementBtn).toBeTruthy();
    expect(incrementBtn).toBeTruthy();
  });

  it('should hide controls when controls is false', () => {
    fixture.componentRef.setInput('controls', false);
    fixture.detectChanges();

    const btns = fixture.nativeElement.querySelectorAll('.ds-input-number__btn');
    expect(btns.length).toBe(0);
  });

  it('should show controls on right when controlsPosition is right', () => {
    fixture.componentRef.setInput('controls', true);
    fixture.componentRef.setInput('controlsPosition', 'right');
    fixture.detectChanges();

    const controlsRight = fixture.nativeElement.querySelector('.ds-input-number__controls-right');
    expect(controlsRight).toBeTruthy();

    const btns = controlsRight.querySelectorAll('.ds-input-number__btn');
    expect(btns.length).toBe(2);
  });

  // === INCREMENT / DECREMENT ===

  it('should increment value by step', () => {
    component.writeValue(5);
    fixture.componentRef.setInput('step', 1);
    fixture.detectChanges();

    component.increment();

    expect(component.internalValue()).toBe(6);
  });

  it('should decrement value by step', () => {
    component.writeValue(5);
    fixture.componentRef.setInput('step', 1);
    fixture.detectChanges();

    component.decrement();

    expect(component.internalValue()).toBe(4);
  });

  it('should respect max value when incrementing', () => {
    component.writeValue(98);
    fixture.componentRef.setInput('max', 100);
    fixture.componentRef.setInput('step', 5);
    fixture.detectChanges();

    component.increment();

    expect(component.internalValue()).toBe(100);
  });

  it('should respect min value when decrementing', () => {
    component.writeValue(2);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('step', 5);
    fixture.detectChanges();

    component.decrement();

    expect(component.internalValue()).toBe(0);
  });

  it('should not increment when at max', () => {
    component.writeValue(100);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();

    component.increment();

    expect(component.internalValue()).toBe(100);
  });

  it('should not decrement when at min', () => {
    component.writeValue(0);
    fixture.componentRef.setInput('min', 0);
    fixture.detectChanges();

    component.decrement();

    expect(component.internalValue()).toBe(0);
  });

  // === PRECISION ===

  it('should format value with precision 0', () => {
    component.writeValue(5.678);
    fixture.componentRef.setInput('precision', 0);
    fixture.detectChanges();

    expect(component.displayValue()).toBe('6');
  });

  it('should format value with precision 2', () => {
    component.writeValue(5.678);
    fixture.componentRef.setInput('precision', 2);
    fixture.detectChanges();

    expect(component.displayValue()).toBe('5.68');
  });

  it('should round value to precision on blur', () => {
    fixture.componentRef.setInput('precision', 2);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '5.6789';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.internalValue()).toBe(5.68);
  });

  // === KEYBOARD NAVIGATION ===

  it('should increment on ArrowUp', () => {
    component.writeValue(5);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.internalValue()).toBe(6);
  });

  it('should decrement on ArrowDown', () => {
    component.writeValue(5);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.internalValue()).toBe(4);
  });

  it('should set to min on Home key', () => {
    component.writeValue(50);
    fixture.componentRef.setInput('min', 0);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.internalValue()).toBe(0);
  });

  it('should set to max on End key', () => {
    component.writeValue(50);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.internalValue()).toBe(100);
  });

  it('should increment by 10 steps on PageUp', () => {
    component.writeValue(5);
    fixture.componentRef.setInput('step', 2);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.internalValue()).toBe(25);
  });

  it('should decrement by 10 steps on PageDown', () => {
    component.writeValue(25);
    fixture.componentRef.setInput('step', 2);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.internalValue()).toBe(5);
  });

  // === BUTTON CLICKS ===

  it('should increment on increment button click', () => {
    component.writeValue(5);
    fixture.detectChanges();

    const incrementBtn = fixture.nativeElement.querySelector('.ds-input-number__btn--increment') as HTMLButtonElement;
    incrementBtn.click();
    fixture.detectChanges();

    expect(component.internalValue()).toBe(6);
  });

  it('should decrement on decrement button click', () => {
    component.writeValue(5);
    fixture.detectChanges();

    const decrementBtn = fixture.nativeElement.querySelector('.ds-input-number__btn--decrement') as HTMLButtonElement;
    decrementBtn.click();
    fixture.detectChanges();

    expect(component.internalValue()).toBe(4);
  });

  it('should disable increment button when at max', () => {
    component.writeValue(100);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();

    const incrementBtn = fixture.nativeElement.querySelector('.ds-input-number__btn--increment') as HTMLButtonElement;
    expect(incrementBtn.disabled).toBe(true);
  });

  it('should disable decrement button when at min', () => {
    component.writeValue(0);
    fixture.componentRef.setInput('min', 0);
    fixture.detectChanges();

    const decrementBtn = fixture.nativeElement.querySelector('.ds-input-number__btn--decrement') as HTMLButtonElement;
    expect(decrementBtn.disabled).toBe(true);
  });

  // === VALUE CHANGES ===

  it('should emit valueChange event on increment', (done) => {
    component.writeValue(5);
    fixture.detectChanges();

    component.valueChange.subscribe((value) => {
      expect(value).toBe(6);
      done();
    });

    component.increment();
  });

  it('should emit valueChange event on decrement', (done) => {
    component.writeValue(5);
    fixture.detectChanges();

    component.valueChange.subscribe((value) => {
      expect(value).toBe(4);
      done();
    });

    component.decrement();
  });

  // === PREFIX / SUFFIX ===

  it('should display prefix', () => {
    fixture.componentRef.setInput('prefix', '$');
    fixture.detectChanges();

    const prefix = fixture.nativeElement.querySelector('.ds-input-number__prefix');
    expect(prefix.textContent.trim()).toBe('$');
  });

  it('should display suffix', () => {
    fixture.componentRef.setInput('suffix', 'kg');
    fixture.detectChanges();

    const suffix = fixture.nativeElement.querySelector('.ds-input-number__suffix');
    expect(suffix.textContent.trim()).toBe('kg');
  });

  it('should add has-prefix class when prefix is present', () => {
    fixture.componentRef.setInput('prefix', '$');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-input-number');
    expect(container.classList.contains('ds-input-number--has-prefix')).toBe(true);
  });

  it('should add has-suffix class when suffix is present', () => {
    fixture.componentRef.setInput('suffix', 'kg');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-input-number');
    expect(container.classList.contains('ds-input-number--has-suffix')).toBe(true);
  });

  // === ARIA ATTRIBUTES ===

  it('should set role spinbutton', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('role')).toBe('spinbutton');
  });

  it('should set aria-valuemin', () => {
    fixture.componentRef.setInput('min', 10);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-valuemin')).toBe('10');
  });

  it('should set aria-valuemax', () => {
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should set aria-valuenow when value is set', () => {
    component.writeValue(50);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-valuenow')).toBe('50');
  });

  it('should set aria-valuetext with prefix and suffix', () => {
    component.writeValue(50);
    fixture.componentRef.setInput('prefix', '$');
    fixture.componentRef.setInput('suffix', 'USD');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-valuetext')).toBe('$50USD');
  });

  // === CONTROL VALUE ACCESSOR ===

  it('should implement ControlValueAccessor', () => {
    expect(component.writeValue).toBeDefined();
    expect(component.registerOnChange).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
    expect(component.setDisabledState).toBeDefined();
  });

  it('should call onChange when value changes', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    component.writeValue(5);
    component.increment();

    expect(onChangeSpy).toHaveBeenCalledWith(6);
  });

  it('should call onTouched on blur', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedSpy);

    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('blur'));

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should set disabled state through CVA', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.isDisabled()).toBe(true);
  });
});

// === REACTIVE FORMS INTEGRATION ===

@Component({
  selector: 'test-host',
  template: `
    <form [formGroup]="form">
      <ds-input-number
        formControlName="amount"
        [min]="0"
        [max]="1000"
        [step]="10"
      />
    </form>
  `,
  imports: [DsInputNumber, ReactiveFormsModule],
})
class TestHostComponent {
  form = signal({
    amount: new FormControl(100),
  });
}

describe('DsInputNumber - Reactive Forms', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should bind to reactive form control', () => {
    const formValue = component.form().amount.value;
    expect(formValue).toBe(100);
  });

  it('should update form control on increment', () => {
    const incrementBtn = fixture.nativeElement.querySelector('.ds-input-number__btn--increment') as HTMLButtonElement;
    incrementBtn.click();
    fixture.detectChanges();

    const formValue = component.form().amount.value;
    expect(formValue).toBe(110);
  });

  it('should update component when form control changes', () => {
    component.form().amount.setValue(500);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('500');
  });
});
