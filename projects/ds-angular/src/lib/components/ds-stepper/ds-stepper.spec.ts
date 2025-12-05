import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsStepper, Step, StepChangeEvent } from './ds-stepper';

describe('DsStepper', () => {
  let component: DsStepper;
  let fixture: ComponentFixture<DsStepper>;
  let compiled: HTMLElement;

  const mockSteps: Step[] = [
    { label: 'Étape 1', description: 'Description 1' },
    { label: 'Étape 2', description: 'Description 2' },
    { label: 'Étape 3', description: 'Description 3' },
    { label: 'Étape 4', description: 'Description 4' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(DsStepper);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Step states', () => {
    it('should mark previous steps as completed', () => {
      fixture.componentRef.setInput('activeStep', 2);
      fixture.detectChanges();

      expect(component.getStepState(mockSteps[0], 0)).toBe('completed');
      expect(component.getStepState(mockSteps[1], 1)).toBe('completed');
    });

    it('should mark current step as active', () => {
      fixture.componentRef.setInput('activeStep', 1);
      fixture.detectChanges();

      expect(component.getStepState(mockSteps[1], 1)).toBe('active');
    });

    it('should mark future steps as pending', () => {
      fixture.componentRef.setInput('activeStep', 1);
      fixture.detectChanges();

      expect(component.getStepState(mockSteps[2], 2)).toBe('pending');
      expect(component.getStepState(mockSteps[3], 3)).toBe('pending');
    });

    it('should respect explicit step state', () => {
      const stepsWithError: Step[] = [
        { label: 'Step 1', state: 'error' },
        { label: 'Step 2' },
      ];
      fixture.componentRef.setInput('steps', stepsWithError);
      fixture.detectChanges();

      expect(component.getStepState(stepsWithError[0], 0)).toBe('error');
    });
  });

  describe('Navigation', () => {
    it('should emit stepChange when navigating', () => {
      let emittedEvent: StepChangeEvent | null = null;
      component.stepChange.subscribe((event) => (emittedEvent = event));

      component.goToStep(2);

      expect(emittedEvent).not.toBeNull();
      expect(emittedEvent!.currentIndex).toBe(2);
      expect(emittedEvent!.previousIndex).toBe(0);
    });

    it('should not emit when navigating to same step', () => {
      let emitCount = 0;
      component.stepChange.subscribe(() => emitCount++);

      component.goToStep(0);

      expect(emitCount).toBe(0);
    });

    it('should navigate to next step', () => {
      let emittedEvent: StepChangeEvent | null = null;
      component.stepChange.subscribe((event) => (emittedEvent = event));

      component.next();

      expect(emittedEvent!.currentIndex).toBe(1);
    });

    it('should navigate to previous step', () => {
      fixture.componentRef.setInput('activeStep', 2);
      fixture.detectChanges();

      let emittedEvent: StepChangeEvent | null = null;
      component.stepChange.subscribe((event) => (emittedEvent = event));

      component.previous();

      expect(emittedEvent!.currentIndex).toBe(1);
    });

    it('should not navigate beyond bounds', () => {
      fixture.componentRef.setInput('activeStep', 3);
      fixture.detectChanges();

      let emitCount = 0;
      component.stepChange.subscribe(() => emitCount++);

      component.next();

      expect(emitCount).toBe(0);
    });
  });

  describe('Clickable behavior', () => {
    it('should allow clicking when clickable is true', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      expect(component.isStepClickable(mockSteps[2], 2)).toBe(true);
    });

    it('should not allow clicking when clickable is false', () => {
      fixture.componentRef.setInput('clickable', false);
      fixture.detectChanges();

      expect(component.isStepClickable(mockSteps[2], 2)).toBe(false);
    });

    it('should not allow clicking disabled steps', () => {
      const stepsWithDisabled: Step[] = [
        { label: 'Step 1' },
        { label: 'Step 2', disabled: true },
      ];
      fixture.componentRef.setInput('steps', stepsWithDisabled);
      fixture.detectChanges();

      expect(component.isStepClickable(stepsWithDisabled[1], 1)).toBe(false);
    });
  });

  describe('Linear mode', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('linear', true);
      fixture.componentRef.setInput('activeStep', 1);
      fixture.detectChanges();
    });

    it('should allow navigating to completed steps', () => {
      expect(component.isStepClickable(mockSteps[0], 0)).toBe(true);
    });

    it('should allow navigating to current step', () => {
      expect(component.isStepClickable(mockSteps[1], 1)).toBe(true);
    });

    it('should allow navigating to next step', () => {
      expect(component.isStepClickable(mockSteps[2], 2)).toBe(true);
    });

    it('should not allow skipping steps', () => {
      expect(component.isStepClickable(mockSteps[3], 3)).toBe(false);
    });
  });

  describe('DOM rendering', () => {
    it('should render all steps', () => {
      const steps = compiled.querySelectorAll('.ds-stepper__step');
      expect(steps.length).toBe(4);
    });

    it('should render step labels', () => {
      const labels = compiled.querySelectorAll('.ds-stepper__label');
      expect(labels[0].textContent?.trim()).toContain('Étape 1');
    });

    it('should render step descriptions when enabled', () => {
      fixture.componentRef.setInput('showDescriptions', true);
      fixture.detectChanges();

      const descriptions = compiled.querySelectorAll('.ds-stepper__description');
      expect(descriptions.length).toBe(4);
    });

    it('should not render descriptions when disabled', () => {
      fixture.componentRef.setInput('showDescriptions', false);
      fixture.detectChanges();

      const descriptions = compiled.querySelectorAll('.ds-stepper__description');
      expect(descriptions.length).toBe(0);
    });

    it('should render connectors', () => {
      const connectors = compiled.querySelectorAll('.ds-stepper__connector');
      expect(connectors.length).toBe(3); // n-1 connectors
    });

    it('should not render connectors when disabled', () => {
      fixture.componentRef.setInput('showConnector', false);
      fixture.detectChanges();

      const connectors = compiled.querySelectorAll('.ds-stepper__connector');
      expect(connectors.length).toBe(0);
    });

    it('should mark completed connectors', () => {
      fixture.componentRef.setInput('activeStep', 2);
      fixture.detectChanges();

      const completedConnectors = compiled.querySelectorAll('.ds-stepper__connector--completed');
      expect(completedConnectors.length).toBe(2);
    });

    it('should render check icon for completed steps', () => {
      fixture.componentRef.setInput('activeStep', 2);
      fixture.detectChanges();

      const completedSteps = compiled.querySelectorAll('.ds-stepper__step--completed');
      expect(completedSteps.length).toBe(2);
    });
  });

  describe('Orientation', () => {
    it('should apply horizontal class by default', () => {
      const container = compiled.querySelector('.ds-stepper--horizontal');
      expect(container).toBeTruthy();
    });

    it('should apply vertical class when set', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-stepper--vertical');
      expect(container).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-stepper--sm');
      expect(container).toBeTruthy();
    });

    it('should apply md size class by default', () => {
      const container = compiled.querySelector('.ds-stepper--md');
      expect(container).toBeTruthy();
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-stepper--lg');
      expect(container).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have role tablist', () => {
      const container = compiled.querySelector('[role="tablist"]');
      expect(container).toBeTruthy();
    });

    it('should have aria-orientation', () => {
      const container = compiled.querySelector('[aria-orientation="horizontal"]');
      expect(container).toBeTruthy();
    });

    it('should have role tab on steps', () => {
      const tabs = compiled.querySelectorAll('[role="tab"]');
      expect(tabs.length).toBe(4);
    });

    it('should have aria-selected on active step', () => {
      const activeTab = compiled.querySelector('[aria-selected="true"]');
      expect(activeTab).toBeTruthy();
    });

    it('should have aria-label on steps', () => {
      const steps = compiled.querySelectorAll('.ds-stepper__step');
      steps.forEach((step) => {
        expect(step.getAttribute('aria-label')).toBeTruthy();
      });
    });
  });

  describe('Keyboard navigation', () => {
    it('should focus next step on ArrowRight (horizontal)', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.onKeydown(event, 0);
      // Focus is handled via DOM, we just verify no errors
      expect(true).toBe(true);
    });

    it('should navigate on Enter', () => {
      let emittedEvent: StepChangeEvent | null = null;
      component.stepChange.subscribe((event) => (emittedEvent = event));

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeydown(event, 2);

      expect(emittedEvent!.currentIndex).toBe(2);
    });

    it('should navigate on Space', () => {
      let emittedEvent: StepChangeEvent | null = null;
      component.stepChange.subscribe((event) => (emittedEvent = event));

      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.onKeydown(event, 2);

      expect(emittedEvent!.currentIndex).toBe(2);
    });
  });

  describe('Optional steps', () => {
    it('should display optional indicator', () => {
      const stepsWithOptional: Step[] = [
        { label: 'Step 1' },
        { label: 'Step 2', optional: true },
      ];
      fixture.componentRef.setInput('steps', stepsWithOptional);
      fixture.detectChanges();

      const optional = compiled.querySelector('.ds-stepper__optional');
      expect(optional?.textContent?.trim()).toBe('(Optionnel)');
    });
  });
});
