import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsPasswordStrength, PasswordStrength } from './ds-password-strength';

describe('DsPasswordStrength', () => {
  let component: DsPasswordStrength;
  let fixture: ComponentFixture<DsPasswordStrength>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPasswordStrength],
    }).compileComponents();

    fixture = TestBed.createComponent(DsPasswordStrength);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ==========================================================================
  // RENDERING
  // ==========================================================================

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.ds-password-strength');
    expect(container).toBeTruthy();
  });

  it('should render 3 bars', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bars = compiled.querySelectorAll('.ds-password-strength__bar');
    expect(bars.length).toBe(3);
  });

  it('should have role="status"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.ds-password-strength');
    expect(container?.getAttribute('role')).toBe('status');
  });

  // ==========================================================================
  // STRENGTH CALCULATION
  // ==========================================================================

  it('should return "none" for empty password', () => {
    fixture.componentRef.setInput('password', '');
    fixture.detectChanges();
    expect(component.strength()).toBe('none');
  });

  it('should return "weak" for short password', () => {
    fixture.componentRef.setInput('password', 'abc');
    fixture.componentRef.setInput('minLength', 8);
    fixture.detectChanges();
    expect(component.strength()).toBe('weak');
  });

  it('should return "weak" for only letters', () => {
    fixture.componentRef.setInput('password', 'abcdefgh');
    fixture.componentRef.setInput('minLength', 8);
    fixture.detectChanges();
    expect(component.strength()).toBe('weak');
  });

  it('should return "medium" for letters and numbers', () => {
    fixture.componentRef.setInput('password', 'Test1234');
    fixture.componentRef.setInput('minLength', 8);
    fixture.detectChanges();
    expect(component.strength()).toBe('medium');
  });

  it('should return "medium" for letters and special chars', () => {
    fixture.componentRef.setInput('password', 'Test!@#$');
    fixture.componentRef.setInput('minLength', 8);
    fixture.detectChanges();
    expect(component.strength()).toBe('medium');
  });

  it('should return "strong" for all criteria met', () => {
    fixture.componentRef.setInput('password', 'Test123!@#');
    fixture.componentRef.setInput('minLength', 8);
    fixture.detectChanges();
    expect(component.strength()).toBe('strong');
  });

  // ==========================================================================
  // CRITERIA
  // ==========================================================================

  it('should validate length criterion', () => {
    fixture.componentRef.setInput('password', 'Test123!');
    fixture.componentRef.setInput('minLength', 8);
    fixture.detectChanges();

    const criteria = component.criteria();
    const lengthCriterion = criteria.find((c) => c.key === 'length');
    expect(lengthCriterion?.valid).toBe(true);
  });

  it('should invalidate length criterion for short password', () => {
    fixture.componentRef.setInput('password', 'Test1!');
    fixture.componentRef.setInput('minLength', 8);
    fixture.detectChanges();

    const criteria = component.criteria();
    const lengthCriterion = criteria.find((c) => c.key === 'length');
    expect(lengthCriterion?.valid).toBe(false);
  });

  it('should validate uppercase criterion', () => {
    fixture.componentRef.setInput('password', 'Test123!');
    fixture.detectChanges();

    const criteria = component.criteria();
    const upperCriterion = criteria.find((c) => c.key === 'uppercase');
    expect(upperCriterion?.valid).toBe(true);
  });

  it('should validate lowercase criterion', () => {
    fixture.componentRef.setInput('password', 'Test123!');
    fixture.detectChanges();

    const criteria = component.criteria();
    const lowerCriterion = criteria.find((c) => c.key === 'lowercase');
    expect(lowerCriterion?.valid).toBe(true);
  });

  it('should validate number criterion', () => {
    fixture.componentRef.setInput('password', 'Test123!');
    fixture.detectChanges();

    const criteria = component.criteria();
    const numberCriterion = criteria.find((c) => c.key === 'number');
    expect(numberCriterion?.valid).toBe(true);
  });

  it('should validate special char criterion', () => {
    fixture.componentRef.setInput('password', 'Test123!');
    fixture.detectChanges();

    const criteria = component.criteria();
    const specialCriterion = criteria.find((c) => c.key === 'special');
    expect(specialCriterion?.valid).toBe(true);
  });

  it('should return 5 criteria', () => {
    const criteria = component.criteria();
    expect(criteria.length).toBe(5);
  });

  // ==========================================================================
  // VISUAL STATES
  // ==========================================================================

  it('should activate 0 bars for "none" strength', () => {
    fixture.componentRef.setInput('password', '');
    fixture.detectChanges();

    const bars = component.bars();
    const activeBars = bars.filter((b) => b.active);
    expect(activeBars.length).toBe(0);
  });

  it('should activate 1 bar for "weak" strength', () => {
    fixture.componentRef.setInput('password', 'abc');
    fixture.detectChanges();

    const bars = component.bars();
    const activeBars = bars.filter((b) => b.active);
    expect(activeBars.length).toBe(1);
  });

  it('should activate 2 bars for "medium" strength', () => {
    fixture.componentRef.setInput('password', 'Test1234');
    fixture.detectChanges();

    const bars = component.bars();
    const activeBars = bars.filter((b) => b.active);
    expect(activeBars.length).toBe(2);
  });

  it('should activate 3 bars for "strong" strength', () => {
    fixture.componentRef.setInput('password', 'Test123!@#');
    fixture.detectChanges();

    const bars = component.bars();
    const activeBars = bars.filter((b) => b.active);
    expect(activeBars.length).toBe(3);
  });

  it('should apply weak CSS class to active bars', () => {
    fixture.componentRef.setInput('password', 'abc');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const weakBar = compiled.querySelector('.ds-password-strength__bar--weak');
    expect(weakBar).toBeTruthy();
  });

  it('should apply medium CSS class to active bars', () => {
    fixture.componentRef.setInput('password', 'Test1234');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const mediumBar = compiled.querySelector('.ds-password-strength__bar--medium');
    expect(mediumBar).toBeTruthy();
  });

  it('should apply strong CSS class to active bars', () => {
    fixture.componentRef.setInput('password', 'Test123!@#');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const strongBar = compiled.querySelector('.ds-password-strength__bar--strong');
    expect(strongBar).toBeTruthy();
  });

  // ==========================================================================
  // LABEL
  // ==========================================================================

  it('should display label when showLabel is true', () => {
    fixture.componentRef.setInput('password', 'Test123!@#');
    fixture.componentRef.setInput('showLabel', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const label = compiled.querySelector('.ds-password-strength__label');
    expect(label).toBeTruthy();
  });

  it('should hide label when showLabel is false', () => {
    fixture.componentRef.setInput('password', 'Test123!@#');
    fixture.componentRef.setInput('showLabel', false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const label = compiled.querySelector('.ds-password-strength__label');
    expect(label).toBeFalsy();
  });

  it('should hide label when strength is "none"', () => {
    fixture.componentRef.setInput('password', '');
    fixture.componentRef.setInput('showLabel', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const label = compiled.querySelector('.ds-password-strength__label');
    expect(label).toBeFalsy();
  });

  it('should display "Faible" for weak strength', () => {
    fixture.componentRef.setInput('password', 'abc');
    fixture.componentRef.setInput('showLabel', true);
    fixture.detectChanges();

    expect(component.strengthLabel()).toBe('Faible');
  });

  it('should display "Moyen" for medium strength', () => {
    fixture.componentRef.setInput('password', 'Test1234');
    fixture.componentRef.setInput('showLabel', true);
    fixture.detectChanges();

    expect(component.strengthLabel()).toBe('Moyen');
  });

  it('should display "Fort" for strong strength', () => {
    fixture.componentRef.setInput('password', 'Test123!@#');
    fixture.componentRef.setInput('showLabel', true);
    fixture.detectChanges();

    expect(component.strengthLabel()).toBe('Fort');
  });

  // ==========================================================================
  // CRITERIA DISPLAY
  // ==========================================================================

  it('should display criteria when showCriteria is true', () => {
    fixture.componentRef.setInput('password', 'Test123!');
    fixture.componentRef.setInput('showCriteria', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const criteria = compiled.querySelector('.ds-password-strength__criteria');
    expect(criteria).toBeTruthy();
  });

  it('should hide criteria when showCriteria is false', () => {
    fixture.componentRef.setInput('password', 'Test123!');
    fixture.componentRef.setInput('showCriteria', false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const criteria = compiled.querySelector('.ds-password-strength__criteria');
    expect(criteria).toBeFalsy();
  });

  it('should display all 5 criteria items', () => {
    fixture.componentRef.setInput('password', 'Test123!');
    fixture.componentRef.setInput('showCriteria', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.ds-password-strength__criterion');
    expect(items.length).toBe(5);
  });

  it('should apply valid class to satisfied criteria', () => {
    fixture.componentRef.setInput('password', 'Test123!@#');
    fixture.componentRef.setInput('showCriteria', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const validItems = compiled.querySelectorAll('.ds-password-strength__criterion--valid');
    expect(validItems.length).toBe(5);
  });

  // ==========================================================================
  // ACCESSIBILITY
  // ==========================================================================

  it('should have aria-label for "none" strength', () => {
    fixture.componentRef.setInput('password', '');
    fixture.detectChanges();

    expect(component.ariaLabel()).toBe('Force du mot de passe : non définie');
  });

  it('should have aria-label for "weak" strength', () => {
    fixture.componentRef.setInput('password', 'abc');
    fixture.detectChanges();

    expect(component.ariaLabel()).toBe('Force du mot de passe : Faible');
  });

  it('should have aria-label for "medium" strength', () => {
    fixture.componentRef.setInput('password', 'Test1234');
    fixture.detectChanges();

    expect(component.ariaLabel()).toBe('Force du mot de passe : Moyen');
  });

  it('should have aria-label for "strong" strength', () => {
    fixture.componentRef.setInput('password', 'Test123!@#');
    fixture.detectChanges();

    expect(component.ariaLabel()).toBe('Force du mot de passe : Fort');
  });

  // ==========================================================================
  // SIZES
  // ==========================================================================

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.ds-password-strength--sm');
    expect(container).toBeTruthy();
  });

  it('should apply md size class', () => {
    fixture.componentRef.setInput('size', 'md');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.ds-password-strength--md');
    expect(container).toBeTruthy();
  });

  it('should apply lg size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.ds-password-strength--lg');
    expect(container).toBeTruthy();
  });

  // ==========================================================================
  // EVENTS
  // ==========================================================================

  it('should emit strengthChange event', (done) => {
    let emittedValue: PasswordStrength | null = null;

    component.strengthChange.subscribe((strength) => {
      emittedValue = strength;
    });

    // Le composant émet dans un effect, attendre un cycle
    setTimeout(() => {
      expect(emittedValue).toBe('none');
      done();
    }, 50);
  });

  // ==========================================================================
  // CUSTOM MIN LENGTH
  // ==========================================================================

  it('should respect custom minLength', () => {
    fixture.componentRef.setInput('password', 'Test12');
    fixture.componentRef.setInput('minLength', 6);
    fixture.detectChanges();

    const criteria = component.criteria();
    const lengthCriterion = criteria.find((c) => c.key === 'length');
    expect(lengthCriterion?.valid).toBe(true);
  });

  it('should invalidate with custom minLength', () => {
    fixture.componentRef.setInput('password', 'Test12');
    fixture.componentRef.setInput('minLength', 10);
    fixture.detectChanges();

    const criteria = component.criteria();
    const lengthCriterion = criteria.find((c) => c.key === 'length');
    expect(lengthCriterion?.valid).toBe(false);
  });
});
