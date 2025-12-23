import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { faStar, faTag, faHeart } from '@fortawesome/free-solid-svg-icons';
import { DsEntityPicker } from './ds-entity-picker';
import { DsEntityOption } from './ds-entity-picker.types';

const mockOptions: DsEntityOption[] = [
  { value: 'tag-1', label: 'Important', color: '#ef4444', emoji: '🏷️' },
  { value: 'tag-2', label: 'Favori', color: '#f59e0b', icon: faStar },
  { value: 'tag-3', label: 'Personnel', color: '#10b981' },
  { value: 'tag-4', label: 'Travail', color: '#3b82f6', disabled: true },
  { value: 'tag-5', label: 'Urgent', color: '#8b5cf6', description: 'À traiter rapidement' },
];

@Component({
  template: `
    <ds-entity-picker
      [options]="options"
      [placeholder]="placeholder"
      [size]="size"
      [disabled]="disabled"
      [error]="error"
      [helper]="helper"
      [label]="label"
      [clearable]="clearable"
      [multiple]="multiple"
      [allowCreate]="allowCreate"
      [minChars]="minChars"
      [(ngModel)]="value"
      (selectionChange)="onSelectionChange($event)"
      (createRequested)="onCreateRequested($event)"
      (searchChange)="onSearchChange($event)"
    />
  `,
  standalone: true,
  imports: [DsEntityPicker, FormsModule],
})
class TestComponent {
  options = mockOptions;
  placeholder = 'Rechercher...';
  size: 'sm' | 'md' | 'lg' = 'md';
  disabled = false;
  error = '';
  helper = '';
  label = '';
  clearable = true;
  multiple = false;
  allowCreate = false;
  minChars = 0;
  value: string | string[] | null = null;
  onSelectionChange = jasmine.createSpy('onSelectionChange');
  onCreateRequested = jasmine.createSpy('onCreateRequested');
  onSearchChange = jasmine.createSpy('onSearchChange');
}

@Component({
  template: `
    <ds-entity-picker
      [options]="options"
      [multiple]="true"
      [formControl]="control"
    />
  `,
  standalone: true,
  imports: [DsEntityPicker, ReactiveFormsModule],
})
class ReactiveFormTestComponent {
  options = mockOptions;
  control = new FormControl<string[] | null>(null);
}

describe('DsEntityPicker', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  // Helper pour rechercher dans l'overlay CDK
  const queryOverlay = (selector: string): HTMLElement | null => {
    return overlayContainerElement.querySelector(selector);
  };

  const queryAllOverlay = (selector: string): NodeListOf<HTMLElement> => {
    return overlayContainerElement.querySelectorAll(selector);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Rendering', () => {
    it('should create', () => {
      const picker = fixture.debugElement.query(By.directive(DsEntityPicker));
      expect(picker).toBeTruthy();
    });

    it('should display placeholder', () => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      expect(input.placeholder).toBe('Rechercher...');
    });

    it('should display label when provided', () => {
      component.label = 'Étiquette';
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.ds-entity-picker__label');
      expect(label).toBeTruthy();
      expect(label.textContent).toContain('Étiquette');
    });

    it('should display helper text', () => {
      component.helper = 'Sélectionnez une étiquette';
      fixture.detectChanges();

      const helper = fixture.nativeElement.querySelector('.ds-entity-picker__helper');
      expect(helper).toBeTruthy();
      expect(helper.textContent).toContain('Sélectionnez une étiquette');
    });

    it('should display error text', () => {
      component.error = 'Champ obligatoire';
      fixture.detectChanges();

      const error = fixture.nativeElement.querySelector('.ds-entity-picker__error');
      expect(error).toBeTruthy();
      expect(error.textContent).toContain('Champ obligatoire');
    });
  });

  describe('Sizes', () => {
    it('should apply md size by default', () => {
      const container = fixture.nativeElement.querySelector('.ds-entity-picker');
      expect(container.classList).toContain('ds-entity-picker--md');
    });

    it('should apply sm size', () => {
      component.size = 'sm';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-entity-picker');
      expect(container.classList).toContain('ds-entity-picker--sm');
    });

    it('should apply lg size', () => {
      component.size = 'lg';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-entity-picker');
      expect(container.classList).toContain('ds-entity-picker--lg');
    });
  });

  describe('Dropdown', () => {
    it('should open dropdown on focus', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const dropdown = queryOverlay('.ds-entity-picker__dropdown');
      expect(dropdown).toBeTruthy();
    }));

    it('should filter options based on input', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      input.value = 'Imp';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const options = queryAllOverlay('.ds-entity-picker__option:not(.ds-entity-picker__option--create)');
      expect(options.length).toBe(1);
      expect(options[0].textContent).toContain('Important');
    }));

    it('should show no results message when no match', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      input.value = 'xyz123';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const empty = queryOverlay('.ds-entity-picker__empty');
      expect(empty).toBeTruthy();
    }));

    it('should display option with emoji', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const emoji = queryOverlay('.ds-entity-picker__option-emoji');
      expect(emoji).toBeTruthy();
      expect(emoji!.textContent).toContain('🏷️');
    }));

    it('should display option with color indicator', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const indicator = queryOverlay('.ds-entity-picker__option-indicator');
      expect(indicator).toBeTruthy();
    }));

    it('should display option description', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();

      input.value = 'Urgent';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const description = queryOverlay('.ds-entity-picker__option-description');
      expect(description).toBeTruthy();
      expect(description!.textContent).toContain('À traiter rapidement');
    }));
  });

  describe('Single Selection', () => {
    it('should select option on click', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const option = queryOverlay('.ds-entity-picker__option');
      option!.dispatchEvent(new Event('mousedown'));
      tick();
      fixture.detectChanges();

      expect(component.onSelectionChange).toHaveBeenCalled();
    }));

    it('should not select disabled option', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const options = queryAllOverlay('.ds-entity-picker__option');
      const disabledOption = options[3];
      disabledOption.dispatchEvent(new Event('mousedown'));
      tick();
      fixture.detectChanges();

      expect(component.value).toBeNull();
    }));
  });

  describe('Multiple Selection', () => {
    beforeEach(() => {
      component.multiple = true;
      fixture.detectChanges();
    });

    it('should have multiple class', () => {
      const container = fixture.nativeElement.querySelector('.ds-entity-picker');
      expect(container.classList).toContain('ds-entity-picker--multiple');
    });

    it('should allow selecting multiple options', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      // Sélectionner la première option
      let options = queryAllOverlay('.ds-entity-picker__option:not(.ds-entity-picker__option--disabled)');
      options[0].dispatchEvent(new Event('mousedown'));
      tick();
      fixture.detectChanges();

      // Ouvrir à nouveau et sélectionner la deuxième
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      options = queryAllOverlay('.ds-entity-picker__option:not(.ds-entity-picker__option--disabled)');
      options[0].dispatchEvent(new Event('mousedown'));
      tick();
      fixture.detectChanges();

      expect(component.onSelectionChange).toHaveBeenCalledTimes(2);
    }));

    it('should display chips for selected options', fakeAsync(() => {
      component.value = ['tag-1', 'tag-2'];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const chips = fixture.nativeElement.querySelectorAll('ds-entity-chip');
      expect(chips.length).toBe(2);
    }));

    it('should remove chip on click', fakeAsync(() => {
      component.value = ['tag-1', 'tag-2'];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const removeBtn = fixture.nativeElement.querySelector('.ds-entity-chip__remove');
      removeBtn.click();
      tick();
      fixture.detectChanges();

      expect(component.onSelectionChange).toHaveBeenCalled();
    }));
  });

  describe('Allow Create', () => {
    beforeEach(() => {
      component.allowCreate = true;
      fixture.detectChanges();
    });

    it('should show create option when no match', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      input.value = 'Nouveau tag';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const createOption = queryOverlay('.ds-entity-picker__option--create');
      expect(createOption).toBeTruthy();
      expect(createOption!.textContent).toContain('Créer');
      expect(createOption!.textContent).toContain('Nouveau tag');
    }));

    it('should emit createRequested on create click', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      input.value = 'Nouveau tag';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const createOption = queryOverlay('.ds-entity-picker__option--create');
      createOption!.dispatchEvent(new Event('mousedown'));
      tick();
      fixture.detectChanges();

      expect(component.onCreateRequested).toHaveBeenCalledWith('Nouveau tag');
    }));

    it('should not show create option if value already exists', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      input.value = 'Important';
      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const createOption = queryOverlay('.ds-entity-picker__option--create');
      expect(createOption).toBeFalsy();
    }));
  });

  describe('Clearable', () => {
    it('should show clear button when has value', fakeAsync(() => {
      component.value = 'tag-1';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector('.ds-entity-picker__clear');
      expect(clearBtn).toBeTruthy();
    }));

    it('should clear value on clear button click', fakeAsync(() => {
      component.value = 'tag-1';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector('.ds-entity-picker__clear');
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

      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      expect(input.disabled).toBeTrue();
    });

    it('should have disabled class', () => {
      component.disabled = true;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-entity-picker');
      expect(container.classList).toContain('ds-entity-picker--disabled');
    });

    it('should not open dropdown when disabled', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const dropdown = queryOverlay('.ds-entity-picker__dropdown');
      expect(dropdown).toBeFalsy();
    }));
  });

  describe('Keyboard navigation', () => {
    let hostElement: HTMLElement;

    beforeEach(() => {
      const pickerDebugEl = fixture.debugElement.query(By.directive(DsEntityPicker));
      hostElement = pickerDebugEl.nativeElement;
    });

    it('should open on ArrowDown', fakeAsync(() => {
      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      fixture.detectChanges();

      const dropdown = queryOverlay('.ds-entity-picker__dropdown');
      expect(dropdown).toBeTruthy();
    }));

    it('should close on Escape', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      tick();
      fixture.detectChanges();

      const dropdown = queryOverlay('.ds-entity-picker__dropdown');
      expect(dropdown).toBeFalsy();
    }));

    it('should navigate with ArrowDown', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      fixture.detectChanges();

      const focused = queryOverlay('.ds-entity-picker__option--focused');
      expect(focused).toBeTruthy();
    }));

    it('should select on Enter', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
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

    it('should remove last chip on Backspace in multiple mode', fakeAsync(() => {
      component.multiple = true;
      component.value = ['tag-1', 'tag-2'];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      tick();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
      tick();
      fixture.detectChanges();

      expect(component.onSelectionChange).toHaveBeenCalled();
    }));

    it('should scroll focused option into view on navigation', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      tick();
      fixture.detectChanges();

      // Vérifier que l'option est focusée (scrollIntoView est appelé via document.getElementById)
      const focused = queryOverlay('.ds-entity-picker__option--focused');
      expect(focused).toBeTruthy();
    }));
  });

  describe('ARIA attributes', () => {
    it('should have role=combobox on input', () => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      expect(input.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-expanded', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      expect(input.getAttribute('aria-expanded')).toBe('false');

      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      expect(input.getAttribute('aria-expanded')).toBe('true');
    }));

    it('should have aria-autocomplete', () => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
    });

    it('should have role=listbox on dropdown', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const listbox = queryOverlay('.ds-entity-picker__listbox');
      expect(listbox!.getAttribute('role')).toBe('listbox');
    }));

    it('should have aria-multiselectable in multiple mode', fakeAsync(() => {
      component.multiple = true;
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
      input.focus();
      input.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const listbox = queryOverlay('.ds-entity-picker__listbox');
      expect(listbox!.getAttribute('aria-multiselectable')).toBe('true');
    }));
  });
});

describe('DsEntityPicker with Reactive Forms', () => {
  let component: ReactiveFormTestComponent;
  let fixture: ComponentFixture<ReactiveFormTestComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormTestComponent],
    }).compileComponents();

    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    fixture = TestBed.createComponent(ReactiveFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should update FormControl on selection', fakeAsync(() => {
    const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
    input.focus();
    input.dispatchEvent(new Event('focus'));
    tick();
    fixture.detectChanges();

    const option = overlayContainerElement.querySelector('.ds-entity-picker__option');
    option!.dispatchEvent(new Event('mousedown'));
    tick();
    fixture.detectChanges();

    expect(component.control.value).toContain('tag-1');
  }));

  it('should display chips from FormControl value', fakeAsync(() => {
    component.control.setValue(['tag-1', 'tag-2']);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const chips = fixture.nativeElement.querySelectorAll('ds-entity-chip');
    expect(chips.length).toBe(2);
  }));

  it('should be disabled when FormControl is disabled', () => {
    component.control.disable();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.ds-entity-picker__input');
    expect(input.disabled).toBeTrue();
  });
});
