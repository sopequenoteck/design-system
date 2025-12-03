import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsBadge } from './ds-badge';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

describe('DsBadge', () => {
  let component: DsBadge;
  let fixture: ComponentFixture<DsBadge>;
  let badgeEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(DsBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
    badgeEl = fixture.debugElement.query(By.css('span'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render badge element', () => {
    expect(badgeEl).toBeTruthy();
  });

  it('should have default type', () => {
    expect(component.type()).toBe('default');
  });

  it('should have default size md', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default variant solid', () => {
    expect(component.variant()).toBe('solid');
  });

  it('should apply type input correctly', () => {
    fixture.componentRef.setInput('type', 'success');
    fixture.detectChanges();
    expect(component.type()).toBe('success');
  });

  it('should map default type to neutral variant', () => {
    fixture.componentRef.setInput('type', 'default');
    fixture.detectChanges();
    expect(component.badgeVariant).toBe('neutral');
  });

  it('should map accent type to primary variant', () => {
    fixture.componentRef.setInput('type', 'accent');
    fixture.detectChanges();
    expect(component.badgeVariant).toBe('primary');
  });

  it('should pass through other types', () => {
    fixture.componentRef.setInput('type', 'warning');
    fixture.detectChanges();
    expect(component.badgeVariant).toBe('warning');
  });

  it('should map default shape to rounded', () => {
    fixture.componentRef.setInput('shape', 'default');
    fixture.detectChanges();
    expect(component.badgeShape).toBe('rounded');
  });

  it('should map square shape to rounded', () => {
    fixture.componentRef.setInput('shape', 'square');
    fixture.detectChanges();
    expect(component.badgeShape).toBe('rounded');
  });

  it('should map pill shape to pill', () => {
    fixture.componentRef.setInput('shape', 'pill');
    fixture.detectChanges();
    expect(component.badgeShape).toBe('pill');
  });

  it('should return null styles when no custom color', () => {
    expect(component.styleOverrides).toBeNull();
  });

  it('should return solid custom styles with color', () => {
    fixture.componentRef.setInput('color', '#ff0000');
    fixture.detectChanges();

    const styles = component.styleOverrides;
    expect(styles).not.toBeNull();
    expect(styles?.['backgroundColor']).toBe('#ff0000');
    expect(styles?.['borderColor']).toBe('#ff0000');
  });

  it('should return outline custom styles with color', () => {
    fixture.componentRef.setInput('color', '#00ff00');
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();

    const styles = component.styleOverrides;
    expect(styles).not.toBeNull();
    expect(styles?.['borderColor']).toBe('#00ff00');
    expect(styles?.['color']).toBe('#00ff00');
    expect(styles?.['backgroundColor']).toBe('transparent');
  });

  it('should forward style overrides to primitive badge', () => {
    fixture.componentRef.setInput('color', '#112233');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('primitive-badge span'));
    expect(span.nativeElement.style.backgroundColor).toBe('rgb(17, 34, 51)');
  });

  it('should pass iconStart to primitive-badge', () => {
    fixture.componentRef.setInput('iconStart', faCheck);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    expect(iconStart).toBeTruthy();
  });

  it('should pass outline appearance to primitive badge', () => {
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();

    const primitive = fixture.debugElement.query(By.css('primitive-badge span'));
    expect(primitive.nativeElement.classList.contains('outline')).toBe(true);
  });

  it('should project content', () => {
    const testFixture = TestBed.createComponent(DsBadge);
    testFixture.nativeElement.textContent = 'Badge Content';
    testFixture.detectChanges();

    const spanEl = testFixture.debugElement.query(By.css('span'));
    expect(spanEl).toBeTruthy();
  });
});
