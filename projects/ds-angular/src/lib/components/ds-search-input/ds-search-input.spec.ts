import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DsSearchInput, SearchInputSize } from './ds-search-input';

@Component({
  template: `
    <ds-search-input
      [size]="size"
      [placeholder]="placeholder"
      [debounceMs]="debounceMs"
      [disabled]="disabled"
      [loading]="loading"
      [clearable]="clearable"
      [minChars]="minChars"
      (search)="onSearch($event)"
      (searchImmediate)="onSearchImmediate($event)"
      (cleared)="onCleared()">
    </ds-search-input>
  `,
  standalone: true,
  imports: [DsSearchInput],
})
class TestHostComponent {
  size: SearchInputSize = 'md';
  placeholder = 'Rechercher...';
  debounceMs = 300;
  disabled = false;
  loading = false;
  clearable = true;
  minChars = 0;

  searchValue = '';
  immediateValue = '';
  clearedCount = 0;

  onSearch(value: string): void {
    this.searchValue = value;
  }

  onSearchImmediate(value: string): void {
    this.immediateValue = value;
  }

  onCleared(): void {
    this.clearedCount++;
  }
}

@Component({
  template: `
    <ds-search-input [formControl]="control"></ds-search-input>
  `,
  standalone: true,
  imports: [DsSearchInput, ReactiveFormsModule],
})
class TestFormComponent {
  control = new FormControl('');
}

describe('DsSearchInput', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering', () => {
    it('should render input element', () => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      expect(input).toBeTruthy();
    });

    it('should render search icon', () => {
      const icon = fixture.debugElement.query(By.css('.ds-search-input__icon--search'));
      expect(icon).toBeTruthy();
    });

    it('should display placeholder', () => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      expect(input.nativeElement.placeholder).toBe('Rechercher...');
    });

    it('should update placeholder when changed', () => {
      component.placeholder = 'Search...';
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      expect(input.nativeElement.placeholder).toBe('Search...');
    });
  });

  describe('size', () => {
    it('should apply sm size class', () => {
      component.size = 'sm';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-search-input'));
      expect(container.nativeElement.classList.contains('ds-search-input--sm')).toBe(true);
    });

    it('should apply md size class by default', () => {
      const container = fixture.debugElement.query(By.css('.ds-search-input'));
      expect(container.nativeElement.classList.contains('ds-search-input--md')).toBe(true);
    });

    it('should apply lg size class', () => {
      component.size = 'lg';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-search-input'));
      expect(container.nativeElement.classList.contains('ds-search-input--lg')).toBe(true);
    });
  });

  describe('disabled state', () => {
    it('should apply disabled class when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-search-input'));
      expect(container.nativeElement.classList.contains('ds-search-input--disabled')).toBe(true);
    });

    it('should disable input when disabled', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      expect(input.nativeElement.disabled).toBe(true);
    }));
  });

  describe('loading state', () => {
    it('should apply loading class when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-search-input'));
      expect(container.nativeElement.classList.contains('ds-search-input--loading')).toBe(true);
    });

    it('should show spinner icon when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('.ds-search-input__icon--loading'));
      expect(spinner).toBeTruthy();
    });

    it('should hide clear button when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      // Type something first
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.ds-search-input__clear'));
      expect(clearBtn).toBeFalsy();
    });
  });

  describe('clear button', () => {
    it('should not show clear button when input is empty', () => {
      const clearBtn = fixture.debugElement.query(By.css('.ds-search-input__clear'));
      expect(clearBtn).toBeFalsy();
    });

    it('should show clear button when input has value', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.ds-search-input__clear'));
      expect(clearBtn).toBeTruthy();
    }));

    it('should clear input on clear button click', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.ds-search-input__clear'));
      clearBtn.nativeElement.click();
      tick();
      fixture.detectChanges();

      expect(input.nativeElement.value).toBe('');
    }));

    it('should emit cleared event on clear', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.ds-search-input__clear'));
      clearBtn.nativeElement.click();
      tick();
      fixture.detectChanges();

      expect(component.clearedCount).toBe(1);
    }));

    it('should not show clear button when clearable is false', fakeAsync(() => {
      component.clearable = false;
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.ds-search-input__clear'));
      expect(clearBtn).toBeFalsy();
    }));
  });

  describe('search output', () => {
    it('should emit search after debounce', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.searchValue).toBe('');

      tick(350); // Slightly more than debounce to ensure it fires
      fixture.detectChanges();

      expect(component.searchValue).toBe('test');
    }));

    it('should debounce multiple inputs', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));

      input.nativeElement.value = 'a';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick(100);

      input.nativeElement.value = 'ab';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick(100);

      input.nativeElement.value = 'abc';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Not yet emitted
      expect(component.searchValue).toBe('');

      tick(350);
      fixture.detectChanges();

      // Only final value emitted
      expect(component.searchValue).toBe('abc');
    }));

    it('should respect minChars', fakeAsync(() => {
      component.minChars = 3;
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'ab';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick(350);
      fixture.detectChanges();

      expect(component.searchValue).toBe('');

      input.nativeElement.value = 'abc';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick(350);
      fixture.detectChanges();

      expect(component.searchValue).toBe('abc');
    }));
  });

  describe('searchImmediate output', () => {
    it('should emit searchImmediate on Enter key', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      input.nativeElement.dispatchEvent(enterEvent);
      tick();
      fixture.detectChanges();

      expect(component.immediateValue).toBe('test');
    }));

    it('should not emit searchImmediate if minChars not met', fakeAsync(() => {
      component.minChars = 3;
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'ab';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      input.nativeElement.dispatchEvent(enterEvent);
      tick();
      fixture.detectChanges();

      expect(component.immediateValue).toBe('');
    }));
  });

  describe('keyboard navigation', () => {
    it('should clear on Escape key', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      input.nativeElement.dispatchEvent(escapeEvent);
      tick();
      fixture.detectChanges();

      expect(input.nativeElement.value).toBe('');
    }));
  });

  describe('accessibility', () => {
    it('should have aria-label from placeholder by default', () => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      expect(input.nativeElement.getAttribute('aria-label')).toBe('Rechercher...');
    });

    it('should set clear button aria-label', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.ds-search-input__clear'));
      expect(clearBtn.nativeElement.getAttribute('aria-label')).toBe('Effacer la recherche');
    }));
  });
});

describe('DsSearchInput with FormControl', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should work with FormControl', () => {
    expect(component).toBeTruthy();
  });

  it('should update FormControl value on input', fakeAsync(() => {
    const input = fixture.debugElement.query(By.css('.ds-search-input__input'));
    input.nativeElement.value = 'test';
    input.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();

    expect(component.control.value).toBe('test');
  }));

  it('should update input when FormControl value changes', fakeAsync(() => {
    component.control.setValue('programmatic');
    tick();
    fixture.detectChanges();
    tick(); // Additional tick for ngModel sync

    const dsSearchInput = fixture.debugElement.query(By.directive(DsSearchInput)).componentInstance as DsSearchInput;
    expect(dsSearchInput.internalValue()).toBe('programmatic');
  }));
});

describe('DsSearchInput standalone', () => {
  let component: DsSearchInput;
  let fixture: ComponentFixture<DsSearchInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSearchInput],
    }).compileComponents();

    fixture = TestBed.createComponent(DsSearchInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create standalone', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size of md', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default debounceMs of 300', () => {
    expect(component.debounceMs()).toBe(300);
  });

  it('should have default clearable of true', () => {
    expect(component.clearable()).toBe(true);
  });

  it('should have default minChars of 0', () => {
    expect(component.minChars()).toBe(0);
  });
});
