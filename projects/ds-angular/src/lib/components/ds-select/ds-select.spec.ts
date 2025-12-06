import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DsSelect, DsSelectOption } from './ds-select';

const mockOptions: DsSelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Disabled Option', disabled: true },
];

@Component({
  template: `
    <ds-select
      [options]="options"
      [placeholder]="placeholder"
      [size]="size"
      [disabled]="disabled"
      [error]="error"
      [helper]="helper"
      [label]="label"
      [clearable]="clearable"
      [searchable]="searchable"
      [(ngModel)]="value"
      (selectionChange)="onSelectionChange($event)">
    </ds-select>
  `,
  standalone: true,
  imports: [DsSelect, FormsModule],
})
class TestComponent {
  options = mockOptions;
  placeholder = 'Select an option';
  size: 'sm' | 'md' | 'lg' = 'md';
  disabled = false;
  error = '';
  helper = '';
  label = '';
  clearable = false;
  searchable = false;
  value: string | null = null;
  onSelectionChange = jasmine.createSpy('onSelectionChange');
}

@Component({
  template: `
    <ds-select [options]="options" [formControl]="control"></ds-select>
  `,
  standalone: true,
  imports: [DsSelect, ReactiveFormsModule],
})
class ReactiveFormTestComponent {
  options = mockOptions;
  control = new FormControl<string | null>(null);
}

describe('DsSelect', () => {
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
      const select = fixture.debugElement.query(By.directive(DsSelect));
      expect(select).toBeTruthy();
    });

    it('should display placeholder when no value', () => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      expect(trigger.textContent).toContain('Select an option');
    });

    it('should display label when provided', () => {
      component.label = 'My Label';
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.ds-select__label');
      expect(label).toBeTruthy();
      expect(label.textContent).toContain('My Label');
    });

    it('should display helper text', () => {
      component.helper = 'Helper text';
      fixture.detectChanges();

      const helper = fixture.nativeElement.querySelector('.ds-select__helper');
      expect(helper).toBeTruthy();
      expect(helper.textContent).toContain('Helper text');
    });

    it('should display error text', () => {
      component.error = 'Error message';
      fixture.detectChanges();

      const error = fixture.nativeElement.querySelector('.ds-select__error');
      expect(error).toBeTruthy();
      expect(error.textContent).toContain('Error message');
    });

    it('should apply error class when error is set', () => {
      component.error = 'Error';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-select');
      expect(container.classList.contains('ds-select--error')).toBeTrue();
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      component.size = 'sm';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-select');
      expect(container.classList.contains('ds-select--sm')).toBeTrue();
    });

    it('should apply md size class by default', () => {
      const container = fixture.nativeElement.querySelector('.ds-select');
      expect(container.classList.contains('ds-select--md')).toBeTrue();
    });

    it('should apply lg size class', () => {
      component.size = 'lg';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-select');
      expect(container.classList.contains('ds-select--lg')).toBeTrue();
    });
  });

  describe('Dropdown behavior', () => {
    it('should open dropdown on click', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-select__dropdown');
      expect(dropdown).toBeTruthy();
    }));

    it('should close dropdown on second click', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      trigger.click();
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-select__dropdown');
      expect(dropdown).toBeFalsy();
    }));

    it('should display options when open', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      expect(options.length).toBe(4);
    }));

    it('should not open when disabled', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-select__dropdown');
      expect(dropdown).toBeFalsy();
    }));
  });

  describe('Selection', () => {
    it('should select option on click', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      options[1].click();
      tick();
      fixture.detectChanges();

      expect(component.value).toBe('2');
      expect(component.onSelectionChange).toHaveBeenCalled();
    }));

    it('should display selected option label', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      options[0].click();
      tick();
      fixture.detectChanges();

      const value = fixture.nativeElement.querySelector('.ds-select__value');
      expect(value.textContent).toContain('Option 1');
    }));

    it('should close dropdown after selection', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      options[0].click();
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-select__dropdown');
      expect(dropdown).toBeFalsy();
    }));

    it('should not select disabled option', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      options[3].click(); // Disabled option
      tick();
      fixture.detectChanges();

      expect(component.value).toBeNull();
    }));

    it('should mark selected option', fakeAsync(() => {
      component.value = '2';
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      expect(options[1].classList.contains('ds-select__option--selected')).toBeTrue();
    }));
  });

  describe('Clearable', () => {
    it('should show clear button when clearable and has value', fakeAsync(() => {
      component.clearable = true;
      component.value = '1';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector('.ds-select__clear');
      expect(clearBtn).toBeTruthy();
    }));

    it('should not show clear button when no value', () => {
      component.clearable = true;
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector('.ds-select__clear');
      expect(clearBtn).toBeFalsy();
    });

    it('should clear value on clear button click', fakeAsync(() => {
      component.clearable = true;
      component.value = '1';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector('.ds-select__clear');
      clearBtn.click();
      tick();
      fixture.detectChanges();

      expect(component.value).toBeNull();
    }));
  });

  describe('Searchable', () => {
    it('should show search input when searchable', fakeAsync(() => {
      component.searchable = true;
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const searchInput = fixture.nativeElement.querySelector('.ds-select__search-input');
      expect(searchInput).toBeTruthy();
    }));

    it('should filter options based on search', fakeAsync(() => {
      component.searchable = true;
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const searchInput = fixture.nativeElement.querySelector('.ds-select__search-input');
      searchInput.value = 'Option 1';
      searchInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      expect(options.length).toBe(1);
      expect(options[0].textContent).toContain('Option 1');
    }));

    it('should show empty state when no results', fakeAsync(() => {
      component.searchable = true;
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const searchInput = fixture.nativeElement.querySelector('.ds-select__search-input');
      searchInput.value = 'nonexistent';
      searchInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.ds-select__empty');
      expect(empty).toBeTruthy();
      expect(empty.textContent).toContain('Aucun résultat');
    }));
  });

  describe('Keyboard navigation', () => {
    let hostElement: HTMLElement;

    beforeEach(() => {
      const selectDebugEl = fixture.debugElement.query(By.directive(DsSelect));
      hostElement = selectDebugEl.nativeElement;
    });

    it('should open on Enter key', fakeAsync(() => {
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-select__dropdown');
      expect(dropdown).toBeTruthy();
    }));

    it('should open on Space key', fakeAsync(() => {
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-select__dropdown');
      expect(dropdown).toBeTruthy();
    }));

    it('should open on ArrowDown key', fakeAsync(() => {
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-select__dropdown');
      expect(dropdown).toBeTruthy();
    }));

    it('should close on Escape key', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      tick();
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.ds-select__dropdown');
      expect(dropdown).toBeFalsy();
    }));

    it('should navigate with ArrowDown', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      expect(options[1].classList.contains('ds-select__option--focused')).toBeTrue();
    }));

    it('should navigate with ArrowUp', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      // Move to second option first
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      // Then back up
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      expect(options[0].classList.contains('ds-select__option--focused')).toBeTrue();
    }));

    it('should select on Enter when option is focused', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      tick();
      fixture.detectChanges();

      expect(component.value).toBe('2');
    }));

    it('should go to first option on Home key', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      // Navigate to a later option
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      // Press Home
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      expect(options[0].classList.contains('ds-select__option--focused')).toBeTrue();
    }));

    it('should go to last option on End key', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      expect(options[3].classList.contains('ds-select__option--focused')).toBeTrue();
    }));
  });

  describe('ARIA attributes', () => {
    it('should have aria-expanded on trigger', () => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should update aria-expanded when open', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    }));

    it('should have aria-haspopup on trigger', () => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('should have role=listbox on options container', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const listbox = fixture.nativeElement.querySelector('.ds-select__listbox');
      expect(listbox.getAttribute('role')).toBe('listbox');
    }));

    it('should have role=option on each option', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      options.forEach((option: HTMLElement) => {
        expect(option.getAttribute('role')).toBe('option');
      });
    }));

    it('should have aria-selected on selected option', fakeAsync(() => {
      component.value = '2';
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      expect(options[1].getAttribute('aria-selected')).toBe('true');
      expect(options[0].getAttribute('aria-selected')).toBe('false');
    }));

    it('should have aria-disabled on disabled option', fakeAsync(() => {
      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      trigger.click();
      tick();
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
      expect(options[3].getAttribute('aria-disabled')).toBe('true');
    }));
  });

  describe('Disabled state', () => {
    it('should apply disabled class', () => {
      component.disabled = true;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-select');
      expect(container.classList.contains('ds-select--disabled')).toBeTrue();
    });

    it('should disable trigger button', () => {
      component.disabled = true;
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
      expect(trigger.disabled).toBeTrue();
    });
  });
});

describe('DsSelect with Reactive Forms', () => {
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
    const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
    trigger.click();
    tick();
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('.ds-select__option');
    options[1].click();
    tick();
    fixture.detectChanges();

    expect(component.control.value).toBe('2');
  }));

  it('should display value from FormControl', fakeAsync(() => {
    component.control.setValue('3');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const value = fixture.nativeElement.querySelector('.ds-select__value');
    expect(value.textContent).toContain('Option 3');
  }));

  it('should be disabled when FormControl is disabled', () => {
    component.control.disable();
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.ds-select__trigger');
    expect(trigger.disabled).toBeTrue();
  });
});
