import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveBadge } from './primitive-badge';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimitiveBadge', () => {
  let component: PrimitiveBadge;
  let fixture: ComponentFixture<PrimitiveBadge>;
  let badgeEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
    badgeEl = fixture.debugElement.query(By.css('span'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render badge with default props', () => {
    expect(badgeEl).toBeTruthy();
    expect(badgeEl.nativeElement.classList.contains('primary')).toBe(true);
    expect(badgeEl.nativeElement.classList.contains('md')).toBe(true);
    expect(badgeEl.nativeElement.classList.contains('rounded')).toBe(true);
  });

  it('should expose type via data attribute', () => {
    expect(badgeEl.nativeElement.getAttribute('data-type')).toBe('label');
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();

    expect(badgeEl.nativeElement.classList.contains('success')).toBe(true);
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(badgeEl.nativeElement.classList.contains('lg')).toBe(true);
  });

  it('should apply shape class', () => {
    fixture.componentRef.setInput('shape', 'pill');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.classList.contains('pill')).toBe(true);
  });

  it('should apply outline class when appearance is outline', () => {
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.classList.contains('outline')).toBe(true);
  });

  it('should apply custom styles when provided', () => {
    fixture.componentRef.setInput('customStyles', {
      backgroundColor: '#123456',
      borderColor: '#123456',
    });
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.style.backgroundColor).toBe('rgb(18, 52, 86)');
    expect(span.nativeElement.style.borderColor).toBe('rgb(18, 52, 86)');
  });

  it('should render iconStart when provided', () => {
    fixture.componentRef.setInput('iconStart', faCheck);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    expect(iconStart).toBeTruthy();
  });

  it('should render iconEnd when provided', () => {
    fixture.componentRef.setInput('iconEnd', faTimes);
    fixture.detectChanges();

    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
    expect(iconEnd).toBeTruthy();
  });

  it('should render both icons when provided', () => {
    fixture.componentRef.setInput('iconStart', faCheck);
    fixture.componentRef.setInput('iconEnd', faTimes);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));

    expect(iconStart).toBeTruthy();
    expect(iconEnd).toBeTruthy();
  });

  it('should project content', () => {
    const testFixture = TestBed.createComponent(PrimitiveBadge);
    const spanEl = testFixture.debugElement.query(By.css('span'));

    testFixture.nativeElement.textContent = 'Badge Content';
    testFixture.detectChanges();

    expect(spanEl).toBeTruthy();
  });

  it('should apply type status', () => {
    fixture.componentRef.setInput('type', 'status');
    fixture.detectChanges();

    expect(component.type()).toBe('status');
  });

  it('should apply type count', () => {
    fixture.componentRef.setInput('type', 'count');
    fixture.detectChanges();

    expect(component.type()).toBe('count');
  });

  it('should apply type label', () => {
    fixture.componentRef.setInput('type', 'label');
    fixture.detectChanges();

    expect(component.type()).toBe('label');
  });
});
