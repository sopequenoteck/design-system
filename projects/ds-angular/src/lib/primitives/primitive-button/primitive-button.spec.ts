import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveButton } from './primitive-button';
import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimitiveButton', () => {
  let component: PrimitiveButton;
  let fixture: ComponentFixture<PrimitiveButton>;
  let buttonEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveButton],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveButton);
    component = fixture.componentInstance;
    buttonEl = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button with default props', () => {
    expect(buttonEl).toBeTruthy();
    expect(buttonEl.nativeElement.type).toBe('button');
    expect(buttonEl.nativeElement.classList.contains('primary')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('md')).toBe(true);
    expect(buttonEl.nativeElement.disabled).toBe(false);
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('secondary')).toBe(true);
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('lg')).toBe(true);
  });

  it('should apply outline appearance class when outline', () => {
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('outline')).toBe(true);
  });

  it('should set host block class when block input is true', () => {
    fixture.componentRef.setInput('block', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('block')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('block')).toBe(true);
  });

  it('should disable button when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(buttonEl.nativeElement.disabled).toBe(true);
  });

  it('should emit clicked event on click when not disabled', () => {
    spyOn(component.clicked, 'emit');

    buttonEl.nativeElement.click();

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event on click when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    spyOn(component.clicked, 'emit');

    buttonEl.nativeElement.click();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should render iconStart when provided', () => {
    fixture.componentRef.setInput('iconStart', faCheck);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    expect(iconStart).toBeTruthy();
  });

  it('should render iconEnd when provided', () => {
    fixture.componentRef.setInput('iconEnd', faArrowRight);
    fixture.detectChanges();

    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
    expect(iconEnd).toBeTruthy();
  });

  it('should render both icons when provided', () => {
    fixture.componentRef.setInput('iconStart', faCheck);
    fixture.componentRef.setInput('iconEnd', faArrowRight);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));

    expect(iconStart).toBeTruthy();
    expect(iconEnd).toBeTruthy();
  });

  it('should project content', () => {
    const content = buttonEl.nativeElement.textContent.trim();
    expect(content).toBe('');

    // Create a new component with content
    const testFixture = TestBed.createComponent(PrimitiveButton);
    testFixture.nativeElement.innerHTML = '<button>Click me</button>';
    testFixture.detectChanges();
  });

  it('should set button type attribute', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.type).toBe('submit');
  });

  // === TESTS DES VARIANTES ===

  it('should apply ghost variant class', () => {
    fixture.componentRef.setInput('variant', 'ghost');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('ghost')).toBe(true);
  });

  it('should apply success variant class', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('success')).toBe(true);
  });

  it('should apply warning variant class', () => {
    fixture.componentRef.setInput('variant', 'warning');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('warning')).toBe(true);
  });

  it('should apply error variant class', () => {
    fixture.componentRef.setInput('variant', 'error');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('error')).toBe(true);
  });

  it('should apply info variant class', () => {
    fixture.componentRef.setInput('variant', 'info');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('info')).toBe(true);
  });

  // === TESTS DES TAILLES ===

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('sm')).toBe(true);
  });

  // === TESTS DES APPARENCES ===

  it('should apply solid appearance by default', () => {
    // appearance='solid' is default, outline class should not be present
    expect(buttonEl.nativeElement.classList.contains('outline')).toBe(false);
  });

  it('should combine variant and outline appearance', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.classList.contains('success')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('outline')).toBe(true);
  });

  // === TESTS DES TYPES ===

  it('should set button type to reset', () => {
    fixture.componentRef.setInput('type', 'reset');
    fixture.detectChanges();

    expect(buttonEl.nativeElement.type).toBe('reset');
  });

  it('should have button type by default', () => {
    expect(buttonEl.nativeElement.type).toBe('button');
  });

  // === TESTS DE LA MÉTHODE buttonClasses ===

  it('should generate correct button classes', () => {
    fixture.componentRef.setInput('variant', 'error');
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.componentRef.setInput('block', true);
    fixture.detectChanges();

    const classes = component.buttonClasses;
    expect(classes).toContain('error');
    expect(classes).toContain('lg');
    expect(classes).toContain('outline');
    expect(classes).toContain('block');
  });

  it('should generate correct button classes without outline', () => {
    fixture.componentRef.setInput('variant', 'primary');
    fixture.componentRef.setInput('size', 'sm');
    fixture.componentRef.setInput('appearance', 'solid');
    fixture.detectChanges();

    const classes = component.buttonClasses;
    expect(classes).toContain('primary');
    expect(classes).toContain('sm');
    expect(classes).not.toContain('outline');
  });

  // === TESTS DE COMBINAISONS ===

  it('should handle all props together', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.componentRef.setInput('variant', 'warning');
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('block', true);
    fixture.componentRef.setInput('iconStart', faCheck);
    fixture.componentRef.setInput('iconEnd', faArrowRight);
    fixture.detectChanges();

    expect(buttonEl.nativeElement.type).toBe('submit');
    expect(buttonEl.nativeElement.classList.contains('warning')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('lg')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('outline')).toBe(true);
    expect(buttonEl.nativeElement.disabled).toBe(true);
    expect(fixture.nativeElement.classList.contains('block')).toBe(true);

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
    expect(iconStart).toBeTruthy();
    expect(iconEnd).toBeTruthy();
  });

  // === TESTS DU HOST BINDING ===

  it('should have hostBlock getter returning false by default', () => {
    expect(component.hostBlock).toBe(false);
  });

  it('should have hostBlock getter returning true when block is set', () => {
    fixture.componentRef.setInput('block', true);
    fixture.detectChanges();

    expect(component.hostBlock).toBe(true);
  });
});
