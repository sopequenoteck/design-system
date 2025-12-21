import { Component, signal, computed, inject } from '@angular/core';
import { DsToastContainerComponent, DsToastService, ToastType, ToastPosition, DsButton, DsInputField } from 'ds-angular';
import { FormsModule } from '@angular/forms';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsToastDefinition } from '../../../registry/definitions';
import { ControlValues } from '../../../registry/types';

import { UsedInSection } from '../../../shared/used-in/used-in-section';
interface Task {
  id: string;
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-toast-page',
  standalone: true,
  imports: [FormsModule, DsToastContainerComponent, DsButton, DsInputField, DemoContainer, PropsTable, ComponentPageHeader, DocIcon, UsedInSection],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="feedback"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-toast"
      />

      <!-- Section 1: Playground -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="eye" size="sm" />
            Playground
          </h2>
          <p class="section-desc">Explorez les différentes options du composant de manière interactive.</p>
        </div>

        <doc-demo-container
          [sources]="definition.demos[0].sources ?? []"
          [code]="definition.demos[0].code"
          [controls]="definition.demos[0].controls"
          [initialValues]="defaultValues()"
          (controlChange)="onDefaultChange($event)"
        >
          <ds-button variant="primary" (click)="showToast()">
            Afficher un toast
          </ds-button>
        </doc-demo-container>
      </section>

      <!-- Section 2: Types -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Types</h2>
          <p class="section-desc">Les quatre types de toast pour différents contextes de feedback.</p>
        </div>

        <doc-demo-container [code]="typesCode">
          <div class="demo-row">
            <ds-button variant="success" (click)="showType('success')">Success</ds-button>
            <ds-button variant="warning" (click)="showType('warning')">Warning</ds-button>
            <ds-button variant="error" (click)="showType('error')">Error</ds-button>
            <ds-button variant="info" (click)="showType('info')">Info</ds-button>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: Positions -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Positions</h2>
          <p class="section-desc">Quatre positions d'affichage possibles.</p>
        </div>

        <doc-demo-container [code]="positionsCode">
          <div class="demo-grid">
            <ds-button variant="secondary" size="sm" (click)="showPosition('top-left')">↖ Top Left</ds-button>
            <ds-button variant="secondary" size="sm" (click)="showPosition('top-right')">↗ Top Right</ds-button>
            <ds-button variant="secondary" size="sm" (click)="showPosition('bottom-left')">↙ Bottom Left</ds-button>
            <ds-button variant="secondary" size="sm" (click)="showPosition('bottom-right')">↘ Bottom Right</ds-button>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Durée et persistance -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Durée et persistance</h2>
          <p class="section-desc">Contrôlez la durée d'affichage du toast.</p>
        </div>

        <doc-demo-container [code]="durationCode">
          <div class="demo-row">
            <ds-button variant="secondary" (click)="showDuration(1000)">1 seconde</ds-button>
            <ds-button variant="secondary" (click)="showDuration(3000)">3 secondes</ds-button>
            <ds-button variant="secondary" (click)="showDuration(5000)">5 secondes</ds-button>
            <ds-button variant="secondary" (click)="showPersistent()">Persistant</ds-button>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 5: Avec action -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Avec action</h2>
          <p class="section-desc">Ajoutez un bouton d'action pour permettre à l'utilisateur de réagir.</p>
        </div>

        <doc-demo-container [code]="actionCode">
          <ds-button variant="primary" (click)="showWithAction()">
            Toast avec action
          </ds-button>
        </doc-demo-container>
      </section>

      <!-- Section 6: Empilement -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Empilement</h2>
          <p class="section-desc">Plusieurs toasts peuvent s'afficher simultanément.</p>
        </div>

        <doc-demo-container [code]="stackCode">
          <div class="demo-row">
            <ds-button variant="primary" (click)="showMultiple()">Afficher 4 toasts</ds-button>
            <ds-button variant="ghost" (click)="clearAll()">Tout effacer</ds-button>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 7: Use Cases -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="zap" size="sm" />
            Use Cases
          </h2>
          <p class="section-desc">Scénarios d'utilisation concrets dans une application.</p>
        </div>

        <!-- Use Case 1: Notifications de succès -->
        <div class="use-case">
          <h3 class="use-case__title">Notifications de succès</h3>
          <p class="use-case__desc">Feedback positif après une action utilisateur.</p>
          <doc-demo-container [code]="successNotifCode">
            <div class="demo-form">
              <ds-input-field
                label="Email"
                type="email"
                placeholder="newsletter@exemple.com"
                [(ngModel)]="emailValue"
              />
              <ds-button variant="primary" (click)="subscribeNewsletter()">
                S'abonner
              </ds-button>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Gestion des erreurs -->
        <div class="use-case">
          <h3 class="use-case__title">Gestion des erreurs</h3>
          <p class="use-case__desc">Afficher les erreurs de manière non-bloquante.</p>
          <doc-demo-container [code]="errorHandlingCode">
            <div class="demo-row">
              <ds-button variant="secondary" (click)="simulateNetworkError()">
                Erreur réseau
              </ds-button>
              <ds-button variant="secondary" (click)="simulateValidationError()">
                Erreur validation
              </ds-button>
              <ds-button variant="secondary" (click)="simulateSessionError()">
                Session expirée
              </ds-button>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Action Undo -->
        <div class="use-case">
          <h3 class="use-case__title">Action Undo</h3>
          <p class="use-case__desc">Permettre d'annuler une action destructive.</p>
          <doc-demo-container [code]="undoCode">
            <div class="task-list">
              <h4 class="task-list__title">Mes tâches</h4>
              @for (task of tasks(); track task.id) {
                <div class="task-item">
                  <span class="task-item__name" [class.task-item__name--completed]="task.completed">
                    {{ task.name }}
                  </span>
                  <div class="task-item__actions">
                    @if (!task.completed) {
                      <ds-button variant="ghost" size="sm" (click)="completeTask(task)">✓</ds-button>
                    }
                    <ds-button variant="ghost" size="sm" (click)="deleteTask(task)">✕</ds-button>
                  </div>
                </div>
              }
              @if (tasks().length === 0) {
                <p class="task-list__empty">Aucune tâche</p>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 4: Notifications en temps réel -->
        <div class="use-case">
          <h3 class="use-case__title">Notifications en temps réel</h3>
          <p class="use-case__desc">Simuler des notifications push.</p>
          <doc-demo-container [code]="realtimeCode">
            <div class="demo-row">
              <ds-button variant="primary" (click)="startRealtimeDemo()">
                Démarrer la démo
              </ds-button>
              <ds-button variant="ghost" (click)="stopRealtimeDemo()">
                Arrêter
              </ds-button>
            </div>
            @if (isRealtimeRunning()) {
              <p class="realtime-status">Réception de notifications en cours...</p>
            }
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 8: Composition -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="grid" size="sm" />
            Composition
          </h2>
          <p class="section-desc">Combinaisons avec d'autres composants du Design System.</p>
        </div>

        <!-- Composition 1: Formulaire avec feedback -->
        <div class="use-case">
          <h3 class="use-case__title">Formulaire avec feedback</h3>
          <p class="use-case__desc">Toast intégré au workflow de soumission de formulaire.</p>
          <doc-demo-container [code]="formFeedbackCode">
            <div class="contact-form">
              <ds-input-field
                label="Nom"
                [(ngModel)]="contactName"
                [required]="true"
              />
              <ds-input-field
                label="Email"
                type="email"
                [(ngModel)]="contactEmail"
                [required]="true"
              />
              <ds-input-field
                label="Message"
                [(ngModel)]="contactMessage"
              />
              <div class="form-actions">
                <ds-button variant="ghost" (click)="resetContactForm()">Réinitialiser</ds-button>
                <ds-button
                  variant="primary"
                  [loading]="isSubmitting()"
                  (click)="submitContactForm()"
                >
                  Envoyer
                </ds-button>
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Workflow avec étapes -->
        <div class="use-case">
          <h3 class="use-case__title">Workflow avec étapes</h3>
          <p class="use-case__desc">Feedback à chaque étape d'un processus.</p>
          <doc-demo-container [code]="workflowCode">
            <div class="workflow-demo">
              <div class="workflow-steps">
                @for (step of workflowSteps; track step.id; let i = $index) {
                  <div
                    class="workflow-step"
                    [class.workflow-step--completed]="step.completed"
                    [class.workflow-step--current]="i === currentStep()"
                  >
                    <span class="workflow-step__number">{{ i + 1 }}</span>
                    <span class="workflow-step__label">{{ step.label }}</span>
                  </div>
                }
              </div>
              <div class="workflow-actions">
                <ds-button
                  variant="secondary"
                  [disabled]="currentStep() === 0"
                  (click)="previousStep()"
                >
                  Précédent
                </ds-button>
                <ds-button
                  variant="primary"
                  [disabled]="currentStep() >= workflowSteps.length - 1"
                  (click)="nextStep()"
                >
                  {{ currentStep() === workflowSteps.length - 2 ? 'Finaliser' : 'Suivant' }}
                </ds-button>
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Actions rapides -->
        <div class="use-case">
          <h3 class="use-case__title">Actions rapides</h3>
          <p class="use-case__desc">Feedback instantané pour des actions fréquentes.</p>
          <doc-demo-container [code]="quickActionsCode">
            <div class="quick-actions">
              <ds-button variant="ghost" (click)="quickAction('copy')">📋 Copier</ds-button>
              <ds-button variant="ghost" (click)="quickAction('save')">💾 Sauvegarder</ds-button>
              <ds-button variant="ghost" (click)="quickAction('share')">🔗 Partager</ds-button>
              <ds-button variant="ghost" (click)="quickAction('bookmark')">⭐ Favoris</ds-button>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 9: API Reference -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="code" size="sm" />
            API Reference
          </h2>
          <p class="section-desc">Documentation complète des propriétés et méthodes du service.</p>
        </div>

        <doc-props-table [props]="definition.props" />
      </section>

      <!-- Utilisé dans -->
      <doc-used-in-section [componentId]="definition.id" />
    </div>

    <ds-toast-container />
  `,
  styles: [`
    .component-page {
      max-width: 900px;
    }

    .page-section {
      margin-bottom: var(--doc-space-2xl, 48px);
      animation: doc-fade-in-up 300ms ease-out;
      animation-fill-mode: both;

      &:nth-child(2) { animation-delay: 50ms; }
      &:nth-child(3) { animation-delay: 100ms; }
      &:nth-child(4) { animation-delay: 150ms; }
      &:nth-child(5) { animation-delay: 200ms; }
      &:nth-child(6) { animation-delay: 250ms; }
      &:nth-child(7) { animation-delay: 300ms; }
      &:nth-child(8) { animation-delay: 350ms; }
      &:nth-child(9) { animation-delay: 400ms; }
      &:nth-child(10) { animation-delay: 450ms; }
    }

    .section-header {
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .section-desc {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--doc-text-secondary, #475569);
      line-height: 1.6;
    }

    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--doc-space-md, 16px);
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--doc-space-sm, 8px);
      max-width: 300px;
    }

    /* Use Cases */
    .use-case {
      margin-bottom: var(--doc-space-xl, 32px);

      &:last-child {
        margin-bottom: 0;
      }
    }

    .use-case__title {
      margin: 0 0 var(--doc-space-xs, 4px) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .use-case__desc {
      margin: 0 0 var(--doc-space-md, 16px) 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Demo form */
    .demo-form {
      display: flex;
      gap: var(--doc-space-md, 16px);
      align-items: flex-end;
      max-width: 400px;

      ds-input-field {
        flex: 1;
      }
    }

    /* Task list */
    .task-list {
      max-width: 350px;
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
    }

    .task-list__title {
      margin: 0 0 var(--doc-space-md, 16px) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .task-list__empty {
      margin: 0;
      text-align: center;
      color: var(--doc-text-muted, #94a3b8);
      font-style: italic;
    }

    .task-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--doc-space-sm, 8px);
      margin-bottom: var(--doc-space-xs, 4px);
      background: var(--doc-surface-base, #fff);
      border-radius: var(--doc-radius-sm, 4px);

      &:last-child {
        margin-bottom: 0;
      }
    }

    .task-item__name {
      color: var(--doc-text-primary, #0f172a);

      &--completed {
        text-decoration: line-through;
        color: var(--doc-text-muted, #94a3b8);
      }
    }

    .task-item__actions {
      display: flex;
      gap: var(--doc-space-xs, 4px);
    }

    /* Realtime status */
    .realtime-status {
      margin: var(--doc-space-md, 16px) 0 0 0;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--color-primary-light, #eff6ff);
      border-radius: var(--doc-radius-md, 8px);
      font-size: 0.875rem;
      color: var(--color-primary, #3b82f6);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    /* Contact form */
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
      max-width: 400px;
    }

    .form-actions {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      justify-content: flex-end;
    }

    /* Workflow */
    .workflow-demo {
      max-width: 500px;
    }

    .workflow-steps {
      display: flex;
      gap: var(--doc-space-md, 16px);
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .workflow-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      flex: 1;
      padding: var(--doc-space-sm, 8px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 2px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
      transition: all 0.2s;

      &--current {
        border-color: var(--color-primary, #3b82f6);
        background: var(--color-primary-light, #eff6ff);
      }

      &--completed {
        border-color: var(--success, #22c55e);
        background: rgba(34, 197, 94, 0.1);
      }
    }

    .workflow-step__number {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--doc-border-default, #e2e8f0);
      border-radius: 50%;
      font-size: 0.75rem;
      font-weight: 600;

      .workflow-step--current & {
        background: var(--color-primary, #3b82f6);
        color: white;
      }

      .workflow-step--completed & {
        background: var(--success, #22c55e);
        color: white;
      }
    }

    .workflow-step__label {
      font-size: 0.75rem;
      color: var(--doc-text-secondary, #64748b);

      .workflow-step--current & {
        color: var(--color-primary, #3b82f6);
        font-weight: 500;
      }
    }

    .workflow-actions {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      justify-content: center;
    }

    /* Quick actions */
    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--doc-space-sm, 8px);
    }
  `]
})
export class ToastPage {
  definition = DsToastDefinition;
  private toastService = inject(DsToastService);

  // Playground state
  defaultValues = signal<ControlValues>({
    type: 'info',
    position: 'top-right',
    duration: 3000,
  });

  demoType = computed(() => this.defaultValues()['type'] as ToastType);
  demoPosition = computed(() => this.defaultValues()['position'] as ToastPosition);
  demoDuration = computed(() => this.defaultValues()['duration'] as number);

  // Use Case: Newsletter
  emailValue = '';

  // Use Case: Undo
  tasks = signal<Task[]>([
    { id: '1', name: 'Finaliser le rapport', completed: false },
    { id: '2', name: 'Envoyer les emails', completed: true },
    { id: '3', name: 'Préparer la réunion', completed: false },
  ]);
  deletedTask: Task | null = null;

  // Use Case: Realtime
  isRealtimeRunning = signal(false);
  private realtimeInterval: ReturnType<typeof setInterval> | null = null;

  // Composition: Contact form
  contactName = '';
  contactEmail = '';
  contactMessage = '';
  isSubmitting = signal(false);

  // Composition: Workflow
  workflowSteps = [
    { id: '1', label: 'Infos', completed: false },
    { id: '2', label: 'Paiement', completed: false },
    { id: '3', label: 'Livraison', completed: false },
    { id: '4', label: 'Confirmation', completed: false },
  ];
  currentStep = signal(0);

  // Playground methods
  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  showToast(): void {
    this.toastService.show({
      message: 'Action effectuée avec succès',
      type: this.demoType(),
      position: this.demoPosition(),
      duration: this.demoDuration(),
    });
  }

  showType(type: ToastType): void {
    const messages = {
      success: '✓ Opération réussie !',
      warning: '⚠ Attention requise',
      error: '✕ Une erreur est survenue',
      info: 'ℹ Information importante',
    };
    this.toastService.show({ message: messages[type], type });
  }

  showPosition(position: ToastPosition): void {
    this.toastService.show({
      message: `Position: ${position}`,
      type: 'info',
      position,
    });
  }

  showDuration(duration: number): void {
    this.toastService.show({
      message: `Ce toast dure ${duration / 1000} seconde(s)`,
      type: 'info',
      duration,
    });
  }

  showPersistent(): void {
    this.toastService.show({
      message: 'Ce toast ne disparaît pas automatiquement',
      type: 'warning',
      duration: 0,
      closable: true,
    });
  }

  showWithAction(): void {
    this.toastService.show({
      message: 'Élément déplacé vers la corbeille',
      type: 'info',
      actionLabel: 'Annuler',
      onAction: () => {
        this.toastService.show({
          message: 'Action annulée',
          type: 'success',
          duration: 2000,
        });
      },
    });
  }

  showMultiple(): void {
    const types: ToastType[] = ['success', 'info', 'warning', 'error'];
    const messages = [
      'Premier toast - Succès',
      'Deuxième toast - Info',
      'Troisième toast - Attention',
      'Quatrième toast - Erreur',
    ];

    types.forEach((type, i) => {
      setTimeout(() => {
        this.toastService.show({ message: messages[i], type });
      }, i * 300);
    });
  }

  clearAll(): void {
    this.toastService.clear();
  }

  // Use Case: Newsletter
  subscribeNewsletter(): void {
    if (!this.emailValue || !this.emailValue.includes('@')) {
      this.toastService.show({
        message: 'Veuillez entrer un email valide',
        type: 'error',
      });
      return;
    }

    this.toastService.show({
      message: `Inscription confirmée pour ${this.emailValue}`,
      type: 'success',
    });
    this.emailValue = '';
  }

  // Use Case: Errors
  simulateNetworkError(): void {
    this.toastService.show({
      message: 'Erreur de connexion. Veuillez vérifier votre réseau.',
      type: 'error',
      duration: 5000,
      actionLabel: 'Réessayer',
      onAction: () => {
        this.toastService.show({
          message: 'Reconnexion en cours...',
          type: 'info',
        });
      },
    });
  }

  simulateValidationError(): void {
    this.toastService.show({
      message: 'Le formulaire contient des erreurs',
      type: 'error',
    });
  }

  simulateSessionError(): void {
    this.toastService.show({
      message: 'Votre session a expiré',
      type: 'warning',
      duration: 0,
      closable: true,
      actionLabel: 'Se reconnecter',
      onAction: () => {
        this.toastService.show({
          message: 'Redirection vers la connexion...',
          type: 'info',
        });
      },
    });
  }

  // Use Case: Undo
  completeTask(task: Task): void {
    task.completed = true;
    this.tasks.update(tasks => [...tasks]);
    this.toastService.show({
      message: `Tâche "${task.name}" terminée`,
      type: 'success',
      duration: 2000,
    });
  }

  deleteTask(task: Task): void {
    this.deletedTask = task;
    this.tasks.update(tasks => tasks.filter(t => t.id !== task.id));

    this.toastService.show({
      message: `Tâche "${task.name}" supprimée`,
      type: 'info',
      actionLabel: 'Annuler',
      onAction: () => {
        if (this.deletedTask) {
          this.tasks.update(tasks => [...tasks, this.deletedTask!]);
          this.deletedTask = null;
          this.toastService.show({
            message: 'Tâche restaurée',
            type: 'success',
            duration: 2000,
          });
        }
      },
    });
  }

  // Use Case: Realtime
  startRealtimeDemo(): void {
    if (this.isRealtimeRunning()) return;

    this.isRealtimeRunning.set(true);
    const notifications = [
      { message: 'Nouveau message de Marie', type: 'info' as ToastType },
      { message: 'Commande #1234 validée', type: 'success' as ToastType },
      { message: 'Stock bas sur Produit X', type: 'warning' as ToastType },
      { message: 'Jean a commenté votre post', type: 'info' as ToastType },
      { message: 'Paiement reçu: 150€', type: 'success' as ToastType },
    ];

    let index = 0;
    this.realtimeInterval = setInterval(() => {
      const notif = notifications[index % notifications.length];
      this.toastService.show({
        message: notif.message,
        type: notif.type,
        duration: 3000,
      });
      index++;
    }, 2500);
  }

  stopRealtimeDemo(): void {
    if (this.realtimeInterval) {
      clearInterval(this.realtimeInterval);
      this.realtimeInterval = null;
    }
    this.isRealtimeRunning.set(false);
    this.toastService.show({
      message: 'Notifications arrêtées',
      type: 'info',
      duration: 2000,
    });
  }

  // Composition: Contact form
  resetContactForm(): void {
    this.contactName = '';
    this.contactEmail = '';
    this.contactMessage = '';
  }

  submitContactForm(): void {
    if (!this.contactName || !this.contactEmail) {
      this.toastService.show({
        message: 'Veuillez remplir les champs obligatoires',
        type: 'error',
      });
      return;
    }

    this.isSubmitting.set(true);

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.toastService.show({
        message: 'Message envoyé avec succès !',
        type: 'success',
      });
      this.resetContactForm();
    }, 1500);
  }

  // Composition: Workflow
  nextStep(): void {
    if (this.currentStep() < this.workflowSteps.length - 1) {
      this.workflowSteps[this.currentStep()].completed = true;
      this.currentStep.update(s => s + 1);

      const stepName = this.workflowSteps[this.currentStep()].label;
      this.toastService.show({
        message: `Étape ${stepName} atteinte`,
        type: 'success',
        duration: 2000,
      });
    }
  }

  previousStep(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
      this.workflowSteps[this.currentStep()].completed = false;
    }
  }

  // Composition: Quick actions
  quickAction(action: string): void {
    const messages: Record<string, string> = {
      copy: 'Copié dans le presse-papier',
      save: 'Modifications enregistrées',
      share: 'Lien copié !',
      bookmark: 'Ajouté aux favoris',
    };

    this.toastService.show({
      message: messages[action] || 'Action effectuée',
      type: 'success',
      duration: 2000,
    });
  }

  // Code snippets
  typesCode = `// Les 4 types de toast
toastService.show({ message: 'Succès !', type: 'success' });
toastService.show({ message: 'Attention', type: 'warning' });
toastService.show({ message: 'Erreur', type: 'error' });
toastService.show({ message: 'Info', type: 'info' });`;

  positionsCode = `// 4 positions disponibles
toastService.show({ message: 'Top Right', position: 'top-right' });
toastService.show({ message: 'Top Left', position: 'top-left' });
toastService.show({ message: 'Bottom Right', position: 'bottom-right' });
toastService.show({ message: 'Bottom Left', position: 'bottom-left' });`;

  durationCode = `// Durée personnalisée
toastService.show({ message: 'Court', duration: 1000 });
toastService.show({ message: 'Normal', duration: 3000 });
toastService.show({ message: 'Long', duration: 5000 });

// Toast persistant (ne disparaît pas)
toastService.show({
  message: 'Persistant',
  duration: 0,
  closable: true,
});`;

  actionCode = `// Toast avec action
toastService.show({
  message: 'Élément supprimé',
  type: 'info',
  actionLabel: 'Annuler',
  onAction: () => restoreElement(),
});`;

  stackCode = `// Plusieurs toasts simultanés
['success', 'info', 'warning', 'error'].forEach((type, i) => {
  setTimeout(() => {
    toastService.show({ message: \`Toast \${i + 1}\`, type });
  }, i * 300);
});

// Effacer tous les toasts
toastService.clearAll();`;

  successNotifCode = `// Feedback positif après action
subscribeNewsletter(): void {
  if (!this.email.includes('@')) {
    this.toastService.show({ message: 'Email invalide', type: 'error' });
    return;
  }

  this.toastService.show({
    message: \`Inscription confirmée pour \${this.email}\`,
    type: 'success',
  });
}`;

  errorHandlingCode = `// Gestion des erreurs réseau
catch (error) {
  this.toastService.show({
    message: 'Erreur de connexion',
    type: 'error',
    duration: 5000,
    actionLabel: 'Réessayer',
    onAction: () => this.retry(),
  });
}

// Session expirée
this.toastService.show({
  message: 'Session expirée',
  type: 'warning',
  duration: 0,
  closable: true,
  actionLabel: 'Se reconnecter',
  onAction: () => this.redirectToLogin(),
});`;

  undoCode = `// Action avec possibilité d'annulation
deleteItem(item: Item): void {
  this.deletedItem = item;
  this.items = this.items.filter(i => i.id !== item.id);

  this.toastService.show({
    message: \`"\${item.name}" supprimé\`,
    type: 'info',
    actionLabel: 'Annuler',
    onAction: () => {
      this.items = [...this.items, this.deletedItem];
      this.toastService.show({ message: 'Restauré', type: 'success' });
    },
  });
}`;

  realtimeCode = `// Notifications en temps réel (WebSocket, SSE, etc.)
this.notificationService.stream$.subscribe(notif => {
  this.toastService.show({
    message: notif.message,
    type: notif.type,
    duration: 3000,
  });
});`;

  formFeedbackCode = `// Formulaire avec feedback toast
async submit(): void {
  if (!this.form.valid) {
    this.toastService.show({ message: 'Formulaire invalide', type: 'error' });
    return;
  }

  this.isSubmitting = true;
  try {
    await this.api.send(this.form.value);
    this.toastService.show({ message: 'Envoyé !', type: 'success' });
    this.form.reset();
  } catch (e) {
    this.toastService.show({ message: 'Échec de l\\'envoi', type: 'error' });
  } finally {
    this.isSubmitting = false;
  }
}`;

  workflowCode = `// Feedback à chaque étape
nextStep(): void {
  this.steps[this.currentStep].completed = true;
  this.currentStep++;

  this.toastService.show({
    message: \`Étape \${this.steps[this.currentStep].label} atteinte\`,
    type: 'success',
    duration: 2000,
  });
}`;

  quickActionsCode = `// Actions rapides avec feedback
quickAction(action: string): void {
  const messages = {
    copy: 'Copié !',
    save: 'Enregistré',
    share: 'Lien copié',
    bookmark: 'Ajouté aux favoris',
  };

  this.toastService.show({
    message: messages[action],
    type: 'success',
    duration: 2000,
  });
}`;
}
