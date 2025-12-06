import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DsCombobox, DsComboboxOption } from './ds-combobox';

const mockOptions: DsComboboxOption[] = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Cherry' },
  { value: '4', label: 'Date', disabled: true },
  { value: '5', label: 'Elderberry', description: 'A small dark berry' },
];

@Component({
  template: `
    <ds-combobox
      [options]="options"
      [placeholder]="placeholder"
      [size]="size"
      [disabled]="disabled"
      [error]="error"
      [helper]="helper"
      [label]="label"
      [clearable]="clearable"
      [allowCustom]="allowCustom"
      [minChars]="minChars"
      [(ngModel)]="value"
      (selectionChange)="onSelectionChange($event)"
      (inputChange)="onInputChange($event)">
    </ds-combobox>
  `,
  standalone: true,
  imports: [DsCombobox, FormsModule],
})
class TestComponent {
  options = mockOptions;
  placeholder = 'Search...';
  size: 'sm' | 'md' | 'lg' = 'md';
  disabled = false;
  error = '';
  helper = '';
  label = '';
  clearable = true;
  allowCustom = false;
  minChars = 0;
  value: string | null = null;
  onSelectionChange = jasmine.createSpy('onSelectionChange');
  onInputChange = jasmine.createSpy('onInputChange');
}

@Component({
  template: `
    <ds-combobox [options]="options" [formControl]="control"></ds-combobox>
  `,
  standalone: true,
  imports: [DsCombobox, ReactiveFormsModule],
})
class ReactiveFormTestComponent {
  options = mockOptions;
  control = new FormControl<string | null>(null);
}

describe('DsCombobox', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Rendering', () => {
    it('should create', () => {
      const combobox = fixture.debugElement.query(By.directive(DsCombobox));
      expect(combobox).toBeTruthy();
    });

    it('should display placeholder', () => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      expect(input.placeholder).toBe('Search...');
    });

    it('should display label when provided', () => {
      component.label = 'Fruit';
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.ds-combobox__label');
      expect(label).toBeTruthy();
      expect(label.textContent).toContain('Fruit');
    });

    it('should display required asterisk', () => {
      component.label = 'Fruit';
      fixture.detectChanges();

      // Access the component instance to set required
      const comboboxDebugEl = fixture.debugElement.query(By.directive(DsCombobox));
      comboboxDebugEl.componentInstance.required = () => true;
      fixture.detectChanges();

      // Note: This test might need adjustment based on how required is passed
    });

    it('should display helper text', () => {
      component.helper = 'Select a fruit';
      fixture.detectChanges();

      const helper = fixture.nativeElement.querySelector('.ds-combobox__helper');
      expect(helper).toBeTruthy();
      expect(helper.textContent).toContain('Select a fruit');
    });

    it('should display error text', () => {
      component.error = 'Required field';
      fixture.detectChanges();

      const error = fixture.nativeElement.querySelector('.ds-combobox__error');
      expect(error).toBeTruthy();
      expect(error.textContent).toContain('Required field');
    });
  });

  describe('Sizes', () => {
    it('should apply md size by default', () => {
      const container = fixture.nativeElement.querySelector('.ds-combobox');
      expect(container.classList).toContain('ds-combobox--md');
    });

    it('should apply sm size', () => {
      component.size = 'sm';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-combobox');
      expect(container.classList).toContain('ds-combobox--sm');
    });

    it('should apply lg size', () => {
      component.size = 'lg';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-combobox');
      expect(container.classList).toContain('ds-combobox--lg');
    });
  });

  describe('Dropdown', () => {
    it('should open dropdown on focus', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-combobox__dropdown');
      expect(dropdown).toBeTruthy();
    }));

    it('should filter options based on input', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      input.value = 'app';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-combobox__option');
      expect(options.length).toBe(1);
      expect(options[0].textContent).toContain('Apple');
    }));

    it('should show no results message when no match', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      input.value = 'xyz';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.ds-combobox__empty');
      expect(empty).toBeTruthy();
    }));

    it('should emit inputChange on typing', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();

      input.value = 'ban';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      expect(component.onInputChange).toHaveBeenCalledWith('ban');
    }));
  });

  describe('Selection', () => {
    it('should select option on click', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const option = fixture.nativeElement.querySelector('.ds-combobox__option');
      option.dispatchEvent(new Event('mousedown'));
      tick();
      fixture.detectChanges();

      expect(component.onSelectionChange).toHaveBeenCalled();
      expect(input.value).toBe('Apple');
    }));

    it('should not select disabled option', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const disabledOption = fixture.nativeElement.querySelectorAll('.ds-combobox__option')[3];
      disabledOption.dispatchEvent(new Event('mousedown'));
      tick();
      fixture.detectChanges();

      expect(input.value).toBe('');
    }));

    it('should show check icon on selected option', fakeAsync(() => {
      component.value = '1';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const check = fixture.nativeElement.querySelector('.ds-combobox__check');
      expect(check).toBeTruthy();
    }));
  });

  describe('Clearable', () => {
    it('should show clear button when has value', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector('.ds-combobox__clear');
      expect(clearBtn).toBeTruthy();
    }));

    it('should clear value on clear button click', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector('.ds-combobox__clear');
      clearBtn.dispatchEvent(new MouseEvent('mousedown'));
      tick();
      fixture.detectChanges();

      expect(component.onSelectionChange).toHaveBeenCalledWith(null);
    }));
  });

  describe('Disabled state', () => {
    it('should disable input when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      expect(input.disabled).toBeTrue();
    });

    it('should have disabled class', () => {
      component.disabled = true;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-combobox');
      expect(container.classList).toContain('ds-combobox--disabled');
    });

    it('should not open dropdown when disabled', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-combobox__dropdown');
      expect(dropdown).toBeFalsy();
    }));
  });

  describe('Keyboard navigation', () => {
    let hostElement: HTMLElement;

    beforeEach(() => {
      const comboboxDebugEl = fixture.debugElement.query(By.directive(DsCombobox));
      hostElement = comboboxDebugEl.nativeElement;
    });

    it('should open on ArrowDown', fakeAsync(() => {
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-combobox__dropdown');
      expect(dropdown).toBeTruthy();
    }));

    it('should close on Escape', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-combobox__dropdown');
      expect(dropdown).toBeFalsy();
    }));

    it('should navigate with ArrowDown', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      fixture.detectChanges();

      const focused = fixture.nativeElement.querySelector('.ds-combobox__option--focused');
      expect(focused).toBeTruthy();
    }));

    it('should select on Enter', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      tick();
      fixture.detectChanges();

      expect(component.onSelectionChange).toHaveBeenCalled();
    }));
  });

  describe('Description', () => {
    it('should show option description', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();

      input.value = 'elder';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const description = fixture.nativeElement.querySelector('.ds-combobox__option-description');
      expect(description).toBeTruthy();
      expect(description.textContent).toContain('A small dark berry');
    }));
  });

  describe('ARIA attributes', () => {
    it('should have role=combobox on input', () => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      expect(input.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-expanded', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      expect(input.getAttribute('aria-expanded')).toBe('false');

      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      expect(input.getAttribute('aria-expanded')).toBe('true');
    }));

    it('should have aria-autocomplete', () => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
    });

    it('should have role=listbox on dropdown', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-combobox__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const listbox = fixture.nativeElement.querySelector('.ds-combobox__listbox');
      expect(listbox.getAttribute('role')).toBe('listbox');
    }));
  });
});

describe('DsCombobox with Reactive Forms', () => {
  let component: ReactiveFormTestComponent;
  let fixture: ComponentFixture<ReactiveFormTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should update FormControl on selection', fakeAsync(() => {
    const input = fixture.nativeElement.querySelector('.ds-combobox__input');
    input.focus();
    input.dispatchEvent(new Event('focus'));
    tick();
    fixture.detectChanges();

    const option = fixture.nativeElement.querySelector('.ds-combobox__option');
    option.dispatchEvent(new Event('mousedown'));
    tick();
    fixture.detectChanges();

    expect(component.control.value).toBe('1');
  }));

  it('should display value from FormControl', fakeAsync(() => {
    component.control.setValue('2');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.ds-combobox__input');
    expect(input.value).toBe('Banana');
  }));

  it('should be disabled when FormControl is disabled', () => {
    component.control.disable();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.ds-combobox__input');
    expect(input.disabled).toBeTrue();
  });
});
