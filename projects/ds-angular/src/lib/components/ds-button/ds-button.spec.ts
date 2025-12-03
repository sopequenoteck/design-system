import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsButton } from './ds-button';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

describe('DsButton', () => {
  let component: DsButton;
  let fixture: ComponentFixture<DsButton>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsButton],
    }).compileComponents();

    fixture = TestBed.createComponent(DsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button element', () => {
    expect(buttonElement).toBeTruthy();
  });

  it('should have default variant primary', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should have default appearance solid', () => {
    expect(component.appearance()).toBe('solid');
  });

  it('should have default size md', () => {
    expect(component.size()).toBe('md');
  });

  it('should apply variant input correctly', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    expect(component.variant()).toBe('secondary');
  });

  it('should set disabled state when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.disabled()).toBe(true);
    expect(component.isDisabled).toBe(true);
  });

  it('should set loading state when loading input is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(component.loading()).toBe(true);
  });

  it('should set block mode when block input is true', () => {
    fixture.componentRef.setInput('block', true);
    fixture.detectChanges();
    expect(component.block()).toBe(true);
  });

  it('should emit clicked event when clicked', () => {
    spyOn(component.clicked, 'emit');
    buttonElement.nativeElement.click();
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    spyOn(component.clicked, 'emit');
    component.handleClick();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should not emit clicked event when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    spyOn(component.clicked, 'emit');
    component.handleClick();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should return submit type when submit is true', () => {
    fixture.componentRef.setInput('submit', true);
    fixture.detectChanges();
    expect(component.buttonType).toBe('submit');
  });

  it('should return button type when submit is false', () => {
    fixture.componentRef.setInput('submit', false);
    fixture.detectChanges();
    expect(component.buttonType).toBe('button');
  });

  it('should render spinner when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should pass iconStart to primitive-button', () => {
    fixture.componentRef.setInput('iconStart', faCheck);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    expect(iconStart).toBeTruthy();
  });

  it('should apply block class when block is true', () => {
    fixture.componentRef.setInput('block', true);
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('.ds-button-wrapper'));
    expect(wrapper.nativeElement.classList.contains('block')).toBe(true);
  });

  it('should apply outline appearance on primitive button when appearance is outline', () => {
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    const primitiveButton = fixture.debugElement.query(By.css('primitive-button button'));
    expect(primitiveButton.nativeElement.classList.contains('outline')).toBe(true);
  });
});
