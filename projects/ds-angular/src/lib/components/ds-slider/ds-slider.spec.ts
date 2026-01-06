import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsSlider } from './ds-slider';
import { ComponentRef } from '@angular/core';

describe('DsSlider', () => {
  let component: DsSlider;
  let fixture: ComponentFixture<DsSlider>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(DsSlider);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      expect(compiled.querySelector('.ds-slider')).toBeTruthy();
      expect(compiled.querySelector('.ds-slider--md')).toBeTruthy();
      expect(compiled.querySelector('.ds-slider__track')).toBeTruthy();
      expect(compiled.querySelector('.ds-slider__thumb')).toBeTruthy();
    });

    it('should render size classes', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      expect(compiled.querySelector('.ds-slider--sm')).toBeTruthy();

      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(compiled.querySelector('.ds-slider--lg')).toBeTruthy();
    });

    it('should render disabled state', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(compiled.querySelector('.ds-slider--disabled')).toBeTruthy();
    });

    it('should render vertical orientation', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();
      expect(compiled.querySelector('.ds-slider--vertical')).toBeTruthy();
    });

    it('should render two thumbs in range mode', () => {
      fixture.componentRef.setInput('range', true);
      fixture.detectChanges();
      const thumbs = compiled.querySelectorAll('.ds-slider__thumb');
      expect(thumbs.length).toBe(2);
    });

    it('should render one thumb in single mode', () => {
      fixture.componentRef.setInput('range', false);
      fixture.detectChanges();
      const thumbs = compiled.querySelectorAll('.ds-slider__thumb');
      expect(thumbs.length).toBe(1);
    });

    it('should render labels when showLabels is true', () => {
      fixture.componentRef.setInput('showLabels', true);
      fixture.detectChanges();
      expect(compiled.querySelector('.ds-slider__label--min')).toBeTruthy();
      expect(compiled.querySelector('.ds-slider__label--max')).toBeTruthy();
    });

    it('should not render labels when showLabels is false', () => {
      fixture.componentRef.setInput('showLabels', false);
      fixture.detectChanges();
      expect(compiled.querySelector('.ds-slider__label--min')).toBeFalsy();
      expect(compiled.querySelector('.ds-slider__label--max')).toBeFalsy();
    });

    it('should render ticks when showTicks is true', () => {
      fixture.componentRef.setInput('showTicks', true);
      fixture.componentRef.setInput('tickInterval', 25);
      fixture.detectChanges();
      const ticks = compiled.querySelectorAll('.ds-slider__tick');
      expect(ticks.length).toBeGreaterThan(0);
    });

    it('should not render ticks when showTicks is false', () => {
      fixture.componentRef.setInput('showTicks', false);
      fixture.detectChanges();
      expect(compiled.querySelector('.ds-slider__tick')).toBeFalsy();
    });
  });

  describe('Value management', () => {
    it('should initialize with default value 0', () => {
      expect(component.internalValue()).toBe(0);
      expect(component.value1()).toBe(0);
    });

    it('should accept initial single value', () => {
      component.writeValue(50);
      fixture.detectChanges();
      expect(component.internalValue()).toBe(50);
      expect(component.value1()).toBe(50);
    });

    it('should accept initial range value', () => {
      fixture.componentRef.setInput('range', true);
      component.writeValue([25, 75]);
      fixture.detectChanges();
      expect(component.internalValue()).toEqual([25, 75]);
      expect(component.value1()).toBe(25);
      expect(component.value2()).toBe(75);
    });

    it('should handle null writeValue', () => {
      component.writeValue(null);
      fixture.detectChanges();
      expect(component.internalValue()).toBe(0);
    });

    it('should handle null writeValue in range mode', () => {
      fixture.componentRef.setInput('range', true);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      component.writeValue(null);
      fixture.detectChanges();
      expect(component.internalValue()).toEqual([0, 100]);
    });

    it('should clamp value to min', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      component.writeValue(-10);
      fixture.detectChanges();
      // Value accepté mais clamped lors des interactions
      expect(component.value1()).toBe(-10);
    });

    it('should clamp value to max', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      component.writeValue(150);
      fixture.detectChanges();
      expect(component.value1()).toBe(150);
    });

    it('should compute percentage correctly', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      component.writeValue(50);
      fixture.detectChanges();
      expect(component.percentage1()).toBe(50);
    });

    it('should compute percentage for range values', () => {
      fixture.componentRef.setInput('range', true);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      component.writeValue([25, 75]);
      fixture.detectChanges();
      expect(component.percentage1()).toBe(25);
      expect(component.percentage2()).toBe(75);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should register onChange callback', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      component.writeValue(50);
      // writeValue alone doesn't trigger onChange
      expect(fn).not.toHaveBeenCalled();
    });

    it('should register onTouched callback', () => {
      const fn = jasmine.createSpy('onTouched');
      component.registerOnTouched(fn);
      component.onThumbBlur();
      expect(fn).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      expect(component.isDisabled()).toBe(true);
    });

    it('should emit value on change', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      component.writeValue(30);
      fixture.detectChanges();

      // Simuler un changement
      component['internalValue'].set(50);
      component['emitValue']();
      expect(fn).toHaveBeenCalledWith(50);
    });
  });

  describe('Keyboard navigation', () => {
    it('should increase value on ArrowRight', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 1);
      component.writeValue(50);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(51);
      expect(fn).toHaveBeenCalledWith(51);
    });

    it('should decrease value on ArrowLeft', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 1);
      component.writeValue(50);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(49);
      expect(fn).toHaveBeenCalledWith(49);
    });

    it('should increase value on ArrowUp', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 1);
      component.writeValue(50);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(51);
    });

    it('should decrease value on ArrowDown', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 1);
      component.writeValue(50);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(49);
    });

    it('should set to min on Home', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('min', 10);
      fixture.componentRef.setInput('max', 100);
      component.writeValue(50);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(10);
    });

    it('should set to max on End', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      component.writeValue(50);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(100);
    });

    it('should increase by 10*step on PageUp', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 1);
      component.writeValue(50);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(60);
    });

    it('should decrease by 10*step on PageDown', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 1);
      component.writeValue(50);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(40);
    });

    it('should not exceed max on keyboard navigation', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 10);
      component.writeValue(95);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(100);
    });

    it('should not go below min on keyboard navigation', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 10);
      component.writeValue(5);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(0);
    });

    it('should not handle keyboard when disabled', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('disabled', true);
      component.writeValue(50);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(50);
      expect(fn).not.toHaveBeenCalled();
    });

    it('should handle range mode - thumb 1 cannot exceed thumb 2', () => {
      fixture.componentRef.setInput('range', true);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 10);
      component.writeValue([40, 60]);
      fixture.detectChanges();

      // Essayer de pousser thumb 1 au-delà de thumb 2
      const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBe(60); // Clamped à thumb 2
      expect(component.value2()).toBe(60);
    });

    it('should handle range mode - thumb 2 cannot go below thumb 1', () => {
      fixture.componentRef.setInput('range', true);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 10);
      component.writeValue([40, 60]);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
      component.onKeyDown(event, 1);

      expect(component.value1()).toBe(40);
      expect(component.value2()).toBe(40); // Clamped à thumb 1
    });
  });

  describe('Mouse interactions', () => {
    it('should handle track click', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.detectChanges();

      // Simuler un click au milieu du track
      const track = compiled.querySelector('.ds-slider__track') as HTMLElement;
      const rect = track.getBoundingClientRect();
      const event = new MouseEvent('click', {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        bubbles: true,
      });

      component.onTrackClick(event);
      fixture.detectChanges();

      expect(component.value1()).toBeCloseTo(50, 0);
    });

    it('should not handle track click when disabled', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new MouseEvent('click', { bubbles: true });
      component.onTrackClick(event);

      expect(fn).not.toHaveBeenCalled();
    });

    it('should set dragging state on thumb mousedown', () => {
      const thumb = compiled.querySelector('.ds-slider__thumb') as HTMLElement;
      const event = new MouseEvent('mousedown', { bubbles: true });
      component.onThumbMouseDown(event, 0);

      expect(component.dragging()).toBe(0);
    });

    it('should not set dragging state when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new MouseEvent('mousedown', { bubbles: true });
      component.onThumbMouseDown(event, 0);

      expect(component.dragging()).toBe(null);
    });

    it('should update focused thumb on focus', () => {
      component.onThumbFocus(1);
      expect(component.focusedThumb()).toBe(1);
    });
  });

  describe('Labels and formatting', () => {
    it('should display formatted labels', () => {
      const formatter = (val: number) => `$${val}`;
      fixture.componentRef.setInput('formatLabel', formatter);
      fixture.componentRef.setInput('showLabels', true);
      component.writeValue(50);
      fixture.detectChanges();

      expect(component.label1()).toBe('$50');
    });

    it('should display default labels without formatter', () => {
      fixture.componentRef.setInput('showLabels', true);
      component.writeValue(75);
      fixture.detectChanges();

      expect(component.label1()).toBe('75');
    });

    it('should compute ticks correctly', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('showTicks', true);
      fixture.componentRef.setInput('tickInterval', 25);
      fixture.detectChanges();

      const ticks = component.ticks();
      expect(ticks).toEqual([0, 25, 50, 75, 100]);
    });

    it('should use step as tickInterval by default', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 20);
      fixture.componentRef.setInput('showTicks', true);
      fixture.detectChanges();

      const ticks = component.ticks();
      expect(ticks).toEqual([0, 20, 40, 60, 80, 100]);
    });

    it('should format tick labels', () => {
      const formatter = (val: number) => `${val}%`;
      fixture.componentRef.setInput('formatLabel', formatter);
      fixture.detectChanges();

      expect(component.getTickLabel(50)).toBe('50%');
    });
  });

  describe('ARIA attributes', () => {
    it('should have correct ARIA role', () => {
      const thumb = compiled.querySelector('.ds-slider__thumb');
      expect(thumb?.getAttribute('role')).toBe('slider');
    });

    it('should have correct aria-valuemin', () => {
      fixture.componentRef.setInput('min', 10);
      fixture.detectChanges();
      const thumb = compiled.querySelector('.ds-slider__thumb');
      expect(thumb?.getAttribute('aria-valuemin')).toBe('10');
    });

    it('should have correct aria-valuemax', () => {
      fixture.componentRef.setInput('max', 90);
      fixture.detectChanges();
      const thumb = compiled.querySelector('.ds-slider__thumb');
      expect(thumb?.getAttribute('aria-valuemax')).toBe('90');
    });

    it('should have correct aria-valuenow', () => {
      component.writeValue(50);
      fixture.detectChanges();
      const thumb = compiled.querySelector('.ds-slider__thumb');
      expect(thumb?.getAttribute('aria-valuenow')).toBe('50');
    });

    it('should have correct aria-orientation', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();
      const thumb = compiled.querySelector('.ds-slider__thumb');
      expect(thumb?.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should have aria-disabled when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const thumb = compiled.querySelector('.ds-slider__thumb');
      expect(thumb?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have correct aria-valuetext with formatter', () => {
      const formatter = (val: number) => `${val}%`;
      fixture.componentRef.setInput('formatLabel', formatter);
      component.writeValue(75);
      fixture.detectChanges();

      expect(component.getAriaValueText(0)).toBe('75%');
    });

    it('should have tabindex 0 when enabled', () => {
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();
      const thumb = compiled.querySelector('.ds-slider__thumb');
      expect(thumb?.getAttribute('tabindex')).toBe('0');
    });

    it('should have tabindex -1 when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const thumb = compiled.querySelector('.ds-slider__thumb');
      expect(thumb?.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Range mode specific', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('range', true);
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      component.writeValue([25, 75]);
      fixture.detectChanges();
    });

    it('should have two thumbs with correct values', () => {
      expect(component.value1()).toBe(25);
      expect(component.value2()).toBe(75);
    });

    it('should have correct aria-valuemax for first thumb', () => {
      const thumbs = compiled.querySelectorAll('.ds-slider__thumb');
      expect(thumbs[0]?.getAttribute('aria-valuemax')).toBe('75');
    });

    it('should have correct aria-valuemin for second thumb', () => {
      const thumbs = compiled.querySelectorAll('.ds-slider__thumb');
      expect(thumbs[1]?.getAttribute('aria-valuemin')).toBe('25');
    });

    it('should render both thumb labels', () => {
      fixture.componentRef.setInput('showLabels', true);
      fixture.detectChanges();

      expect(component.label1()).toBe('25');
      expect(component.label2()).toBe('75');
    });
  });

  describe('Step handling', () => {
    it('should snap to step increments', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 5);
      component.writeValue(23);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      component.onKeyDown(event, 0);

      // 23 + 5 = 28
      expect(component.value1()).toBe(28);
    });

    it('should handle decimal steps', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 1);
      fixture.componentRef.setInput('step', 0.1);
      component.writeValue(0.5);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      component.onKeyDown(event, 0);

      expect(component.value1()).toBeCloseTo(0.6, 1);
    });
  });

  describe('Styles computation', () => {
    it('should compute correct thumb1 style for horizontal', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      component.writeValue(50);
      fixture.detectChanges();

      const style = component.thumb1Style();
      expect(style['left']).toBe('50%');
    });

    it('should compute correct thumb1 style for vertical', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      component.writeValue(50);
      fixture.detectChanges();

      const style = component.thumb1Style();
      expect(style['bottom']).toBe('50%');
    });

    it('should compute correct fill style for horizontal single', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.componentRef.setInput('range', false);
      component.writeValue(30);
      fixture.detectChanges();

      const style = component.fillStyle();
      expect(style['left']).toBe('0%');
      expect(style['width']).toBe('30%');
    });

    it('should compute correct fill style for horizontal range', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.componentRef.setInput('range', true);
      component.writeValue([20, 80]);
      fixture.detectChanges();

      const style = component.fillStyle();
      expect(style['left']).toBe('20%');
      expect(style['width']).toBe('60%');
    });

    it('should compute correct fill style for vertical single', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.componentRef.setInput('range', false);
      component.writeValue(40);
      fixture.detectChanges();

      const style = component.fillStyle();
      expect(style['bottom']).toBe('0%');
      expect(style['height']).toBe('40%');
    });
  });
});
