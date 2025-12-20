import { Component, signal, computed } from '@angular/core';
import { DsStepper, Step, StepperOrientation, StepperSize, StepChangeEvent } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsStepperDefinition } from '../../../registry/definitions/ds-stepper.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-stepper-page',
  standalone: true,
  imports: [DsStepper, DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">&lt;{{ definition.selector }}&gt;</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Stepper avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-stepper
              [steps]="steps"
              [activeStep]="activeStep"
              [orientation]="demoOrientation()"
              [size]="demoSize()"
              [clickable]="demoClickable()"
              [linear]="demoLinear()"
              (stepChange)="onStepChange($event)"
            />
            <div class="stepper-actions">
              <button class="demo-btn" [disabled]="activeStep === 0" (click)="previousStep()">Précédent</button>
              <button class="demo-btn" [disabled]="activeStep === steps.length - 1" (click)="nextStep()">Suivant</button>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Vertical</h3>
          <p class="demo-block__desc">Stepper en mode vertical.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-stepper
              [steps]="steps"
              [activeStep]="1"
              orientation="vertical"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Linear</h3>
          <p class="demo-block__desc">Navigation linéaire obligatoire.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-stepper
              [steps]="steps"
              [activeStep]="0"
              [linear]="true"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Error</h3>
          <p class="demo-block__desc">Étape avec état erreur.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-stepper
              [steps]="stepsWithError"
              [activeStep]="2"
            />
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .stepper-actions {
      display: flex;
      gap: 8px;
      margin-top: 24px;
    }
    .demo-btn {
      padding: 8px 16px; border: none; border-radius: 4px;
      background: var(--color-primary, #3b82f6); color: white; cursor: pointer;
      font-size: 0.875rem;
      &:hover:not(:disabled) { opacity: 0.9; }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
  `]
})
export class StepperPage {
  definition = DsStepperDefinition;

  activeStep = 1;

  steps: Step[] = [
    { label: 'Informations', description: 'Renseignez vos informations personnelles' },
    { label: 'Adresse', description: 'Entrez votre adresse de livraison' },
    { label: 'Paiement', description: 'Choisissez votre mode de paiement' },
    { label: 'Confirmation', description: 'Vérifiez et confirmez votre commande' },
  ];

  stepsWithError: Step[] = [
    { label: 'Étape 1', state: 'completed' },
    { label: 'Étape 2', state: 'error' },
    { label: 'Étape 3' },
  ];

  defaultValues = signal<ControlValues>({
    orientation: 'horizontal',
    size: 'md',
    clickable: true,
    linear: false,
  });

  demoOrientation = computed(() => this.defaultValues()['orientation'] as StepperOrientation);
  demoSize = computed(() => this.defaultValues()['size'] as StepperSize);
  demoClickable = computed(() => this.defaultValues()['clickable'] as boolean);
  demoLinear = computed(() => this.defaultValues()['linear'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onStepChange(event: StepChangeEvent): void {
    this.activeStep = event.currentIndex;
    console.log('Step changed:', event);
  }

  previousStep(): void {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  nextStep(): void {
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;
    }
  }
}
