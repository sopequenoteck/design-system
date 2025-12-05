import { Component, input, output, computed, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

/**
 * Orientation du stepper.
 */
export type StepperOrientation = 'horizontal' | 'vertical';

/**
 * État d'une étape.
 */
export type StepState = 'pending' | 'active' | 'completed' | 'error';

/**
 * Taille du stepper.
 */
export type StepperSize = 'sm' | 'md' | 'lg';

/**
 * Configuration d'une étape.
 */
export interface Step {
  label: string;
  description?: string;
  state?: StepState;
  disabled?: boolean;
  optional?: boolean;
}

/**
 * Événement émis lors du changement d'étape.
 */
export interface StepChangeEvent {
  previousIndex: number;
  currentIndex: number;
  step: Step;
}

/**
 * # DsStepper
 *
 * Composant de stepper pour guider l'utilisateur à travers un processus multi-étapes.
 *
 * ## Usage
 *
 * ```html
 * <ds-stepper
 *   [steps]="steps"
 *   [activeStep]="0"
 *   [orientation]="'horizontal'"
 *   (stepChange)="onStepChange($event)">
 * </ds-stepper>
 * ```
 *
 * ## Accessibilité
 *
 * - Utilise `role="tablist"` avec `aria-orientation`
 * - Chaque étape utilise `role="tab"` avec `aria-selected`
 * - Navigation clavier : ArrowLeft/Right (horizontal), ArrowUp/Down (vertical)
 * - Indicateurs d'état visuels et sémantiques
 *
 * @component
 */
@Component({
  selector: 'ds-stepper',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-stepper.html',
  styleUrl: './ds-stepper.scss',
})
export class DsStepper {
  // Icônes FontAwesome
  readonly faCheck = faCheck;
  readonly faExclamationTriangle = faExclamationTriangle;

  /**
   * Liste des étapes.
   */
  steps = input.required<Step[]>();

  /**
   * Index de l'étape active (0-indexed).
   * @default 0
   */
  activeStep = input<number>(0);

  /**
   * Orientation du stepper.
   * @default 'horizontal'
   */
  orientation = input<StepperOrientation>('horizontal');

  /**
   * Taille du stepper.
   * @default 'md'
   */
  size = input<StepperSize>('md');

  /**
   * Permettre la navigation en cliquant sur les étapes.
   * @default true
   */
  clickable = input<boolean>(true);

  /**
   * Navigation linéaire (doit compléter chaque étape dans l'ordre).
   * @default false
   */
  linear = input<boolean>(false);

  /**
   * Afficher les descriptions.
   * @default true
   */
  showDescriptions = input<boolean>(true);

  /**
   * Afficher le connecteur entre les étapes.
   * @default true
   */
  showConnector = input<boolean>(true);

  /**
   * Événement émis lors du changement d'étape.
   */
  stepChange = output<StepChangeEvent>();

  /**
   * Index actif normalisé.
   */
  readonly normalizedActiveStep = computed(() => {
    const active = this.activeStep();
    const stepsArr = this.steps();
    return Math.max(0, Math.min(active, stepsArr.length - 1));
  });

  /**
   * Classes CSS du conteneur.
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-stepper',
      `ds-stepper--${this.orientation()}`,
      `ds-stepper--${this.size()}`,
      this.clickable() ? 'ds-stepper--clickable' : '',
    ].filter(Boolean);
  });

  /**
   * Obtenir l'état d'une étape.
   */
  getStepState(step: Step, index: number): StepState {
    // État explicite
    if (step.state) return step.state;

    const active = this.normalizedActiveStep();

    if (index < active) return 'completed';
    if (index === active) return 'active';
    return 'pending';
  }

  /**
   * Vérifie si une étape est navigable.
   */
  isStepClickable(step: Step, index: number): boolean {
    if (!this.clickable()) return false;
    if (step.disabled) return false;

    // En mode linéaire, on ne peut naviguer qu'aux étapes complétées ou à l'étape suivante
    if (this.linear()) {
      const active = this.normalizedActiveStep();
      return index <= active + 1;
    }

    return true;
  }

  /**
   * Naviguer vers une étape.
   */
  goToStep(index: number): void {
    const stepsArr = this.steps();
    if (index < 0 || index >= stepsArr.length) return;

    const step = stepsArr[index];
    if (!this.isStepClickable(step, index)) return;

    const previousIndex = this.normalizedActiveStep();
    if (index !== previousIndex) {
      this.stepChange.emit({
        previousIndex,
        currentIndex: index,
        step,
      });
    }
  }

  /**
   * Aller à l'étape suivante.
   */
  next(): void {
    this.goToStep(this.normalizedActiveStep() + 1);
  }

  /**
   * Aller à l'étape précédente.
   */
  previous(): void {
    this.goToStep(this.normalizedActiveStep() - 1);
  }

  /**
   * Gestion du clavier.
   */
  onKeydown(event: KeyboardEvent, index: number): void {
    const stepsArr = this.steps();
    const isHorizontal = this.orientation() === 'horizontal';

    let newIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = Math.min(index + 1, stepsArr.length - 1);
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = Math.max(index - 1, 0);
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = Math.min(index + 1, stepsArr.length - 1);
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = Math.max(index - 1, 0);
        }
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = stepsArr.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.goToStep(index);
        return;
    }

    if (newIndex !== index) {
      // Focus sur la nouvelle étape
      const stepElements = document.querySelectorAll('.ds-stepper__step');
      const targetElement = stepElements[newIndex] as HTMLElement;
      targetElement?.focus();
    }
  }

  /**
   * Classes CSS pour une étape.
   */
  getStepClasses(step: Step, index: number): string[] {
    const state = this.getStepState(step, index);
    return [
      'ds-stepper__step',
      `ds-stepper__step--${state}`,
      step.disabled ? 'ds-stepper__step--disabled' : '',
      step.optional ? 'ds-stepper__step--optional' : '',
    ].filter(Boolean);
  }

  /**
   * Label ARIA pour une étape.
   */
  getStepAriaLabel(step: Step, index: number): string {
    const state = this.getStepState(step, index);
    const stateLabels: Record<StepState, string> = {
      pending: 'En attente',
      active: 'En cours',
      completed: 'Terminée',
      error: 'Erreur',
    };
    return `Étape ${index + 1}: ${step.label} - ${stateLabels[state]}`;
  }
}
