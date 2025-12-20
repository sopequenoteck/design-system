import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsModalComponent, DsButton, DsInputField, DsStepper, DsAlert } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsModalDefinition } from '../../../registry/definitions/ds-modal.definition';
import { ControlValues } from '../../../registry/types';

type ModalSize = 'sm' | 'md' | 'lg';
type ModalType = 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'app-modal-page',
  standalone: true,
  imports: [FormsModule, DsModalComponent, DsButton, DsInputField, DsStepper, DsAlert, DemoContainer, PropsTable, ComponentPageHeader, DocIcon],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="overlays"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-modal"
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
          [code]="definition.demos[0].code"
          [controls]="definition.demos[0].controls"
          [initialValues]="defaultValues()"
          (controlChange)="onDefaultChange($event)"
        >
          <ds-button (clicked)="openModal()">Ouvrir la modale</ds-button>

          <ds-modal
            [open]="isModalOpen()"
            title="Titre de la modale"
            [size]="demoSize()"
            [closable]="demoClosable()"
            [closeOnBackdrop]="demoCloseOnBackdrop()"
            (closed)="closeModal()"
          >
            <p>Contenu de la modale. Vous pouvez mettre n'importe quel contenu ici.</p>
            <div class="modal-actions">
              <ds-button variant="ghost" (clicked)="closeModal()">Annuler</ds-button>
              <ds-button variant="primary" (clicked)="closeModal()">Confirmer</ds-button>
            </div>
          </ds-modal>
        </doc-demo-container>
      </section>

      <!-- Section 2: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Trois tailles pour différents contenus.</p>
        </div>

        <doc-demo-container [code]="definition.demos[1].code">
          <div class="demo-row">
            <ds-button variant="secondary" (clicked)="openSizeModal('sm')">Small</ds-button>
            <ds-button variant="secondary" (clicked)="openSizeModal('md')">Medium</ds-button>
            <ds-button variant="secondary" (clicked)="openSizeModal('lg')">Large</ds-button>
          </div>

          <ds-modal
            [open]="isSizeModalOpen()"
            [title]="'Modale ' + currentSizeModal()"
            [size]="currentSizeModal()"
            (closed)="closeSizeModal()"
          >
            <p>Cette modale est de taille <strong>{{ currentSizeModal() }}</strong>.</p>
            <p class="size-info">{{ sizeDescription() }}</p>
          </ds-modal>
        </doc-demo-container>
      </section>

      <!-- Section 3: Types sémantiques -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Types sémantiques</h2>
          <p class="section-desc">Types visuels pour différents contextes : succès, warning, erreur, info.</p>
        </div>

        <doc-demo-container [code]="definition.demos[2].code">
          <div class="demo-row">
            <ds-button variant="success" (clicked)="openTypeModal('success')">Success</ds-button>
            <ds-button variant="warning" (clicked)="openTypeModal('warning')">Warning</ds-button>
            <ds-button variant="error" (clicked)="openTypeModal('error')">Error</ds-button>
            <ds-button variant="info" (clicked)="openTypeModal('info')">Info</ds-button>
          </div>

          <ds-modal
            [open]="isTypeModalOpen()"
            [title]="typeModalTitle()"
            [type]="currentTypeModal()"
            (closed)="closeTypeModal()"
          >
            <p>{{ typeModalContent() }}</p>
          </ds-modal>
        </doc-demo-container>
      </section>

      <!-- Section 4: Options de fermeture -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Options de fermeture</h2>
          <p class="section-desc">Contrôle de la fermeture : bouton X, clic sur backdrop, touche Escape.</p>
        </div>

        <doc-demo-container [code]="closeOptionsCode">
          <div class="demo-row">
            <ds-button variant="secondary" (clicked)="openNonClosableModal()">Non closable</ds-button>
            <ds-button variant="secondary" (clicked)="openNoBackdropCloseModal()">Sans backdrop close</ds-button>
          </div>

          <ds-modal
            [open]="isNonClosableOpen()"
            title="Modale non closable"
            [closable]="false"
            [closeOnBackdrop]="false"
          >
            <p>Cette modale ne peut être fermée que par le bouton ci-dessous.</p>
            <div class="modal-actions">
              <ds-button variant="primary" (clicked)="closeNonClosableModal()">J'ai compris</ds-button>
            </div>
          </ds-modal>

          <ds-modal
            [open]="isNoBackdropCloseOpen()"
            title="Sans fermeture backdrop"
            [closable]="true"
            [closeOnBackdrop]="false"
            (closed)="closeNoBackdropCloseModal()"
          >
            <p>Cliquer sur le backdrop ne ferme pas cette modale.</p>
            <p>Utilisez le bouton X ou Escape.</p>
          </ds-modal>
        </doc-demo-container>
      </section>

      <!-- Section 5: Use Cases -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="zap" size="sm" />
            Use Cases
          </h2>
          <p class="section-desc">Scénarios d'utilisation concrets dans une application.</p>
        </div>

        <!-- Use Case 1: Confirmation -->
        <div class="use-case">
          <h3 class="use-case__title">Confirmation d'action</h3>
          <p class="use-case__desc">Demande de confirmation avant une action destructive.</p>
          <doc-demo-container [code]="confirmCode">
            <ds-button variant="error" (clicked)="openDeleteModal()">
              Supprimer le projet
            </ds-button>

            <ds-modal
              [open]="isDeleteModalOpen()"
              title="Supprimer le projet ?"
              type="error"
              size="sm"
              (closed)="closeDeleteModal()"
            >
              <p>Cette action est irréversible. Toutes les données du projet seront définitivement supprimées.</p>
              <div class="modal-actions">
                <ds-button variant="ghost" (clicked)="closeDeleteModal()">Annuler</ds-button>
                <ds-button variant="error" (clicked)="confirmDelete()">Supprimer</ds-button>
              </div>
            </ds-modal>

            @if (deleteConfirmed()) {
              <ds-alert type="success" class="action-feedback">
                Projet supprimé avec succès
              </ds-alert>
            }
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Formulaire overlay -->
        <div class="use-case">
          <h3 class="use-case__title">Formulaire dans modale</h3>
          <p class="use-case__desc">Formulaire de création rapide sans quitter la page.</p>
          <doc-demo-container [code]="formModalCode">
            <ds-button variant="primary" (clicked)="openFormModal()">
              Nouveau contact
            </ds-button>

            <ds-modal
              [open]="isFormModalOpen()"
              title="Ajouter un contact"
              size="md"
              (closed)="closeFormModal()"
            >
              <div class="form-modal-content">
                <ds-input-field
                  label="Nom complet"
                  placeholder="Jean Dupont"
                  [(ngModel)]="contactName"
                  [required]="true"
                />
                <ds-input-field
                  label="Email"
                  type="email"
                  placeholder="jean@exemple.com"
                  [(ngModel)]="contactEmail"
                  [required]="true"
                />
                <ds-input-field
                  label="Téléphone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  [(ngModel)]="contactPhone"
                />
              </div>
              <div class="modal-actions">
                <ds-button variant="ghost" (clicked)="closeFormModal()">Annuler</ds-button>
                <ds-button
                  variant="primary"
                  [disabled]="!isContactFormValid()"
                  (clicked)="saveContact()"
                >
                  Ajouter
                </ds-button>
              </div>
            </ds-modal>

            @if (contactSaved()) {
              <ds-alert type="success" class="action-feedback">
                Contact "{{ savedContactName() }}" ajouté
              </ds-alert>
            }
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Wizard -->
        <div class="use-case">
          <h3 class="use-case__title">Assistant multi-étapes</h3>
          <p class="use-case__desc">Processus guidé en plusieurs étapes.</p>
          <doc-demo-container [code]="wizardCode">
            <ds-button variant="primary" (clicked)="openWizardModal()">
              Démarrer l'assistant
            </ds-button>

            <ds-modal
              [open]="isWizardModalOpen()"
              [title]="wizardTitle()"
              size="lg"
              [closable]="true"
              (closed)="closeWizardModal()"
            >
              <div class="wizard-content">
                <div class="wizard-progress">
                  Étape {{ wizardStep() }} sur 3
                </div>

                @switch (wizardStep()) {
                  @case (1) {
                    <div class="wizard-step">
                      <h4>Informations de base</h4>
                      <ds-input-field
                        label="Nom du projet"
                        placeholder="Mon super projet"
                        [(ngModel)]="projectName"
                      />
                    </div>
                  }
                  @case (2) {
                    <div class="wizard-step">
                      <h4>Configuration</h4>
                      <p>Choisissez les options de votre projet.</p>
                    </div>
                  }
                  @case (3) {
                    <div class="wizard-step">
                      <h4>Confirmation</h4>
                      <p>Projet : <strong>{{ projectName() || 'Non défini' }}</strong></p>
                      <p>Prêt à créer votre projet ?</p>
                    </div>
                  }
                }
              </div>
              <div class="modal-actions">
                @if (wizardStep() > 1) {
                  <ds-button variant="ghost" (clicked)="prevWizardStep()">Précédent</ds-button>
                }
                @if (wizardStep() < 3) {
                  <ds-button variant="primary" (clicked)="nextWizardStep()">Suivant</ds-button>
                } @else {
                  <ds-button variant="success" (clicked)="finishWizard()">Créer le projet</ds-button>
                }
              </div>
            </ds-modal>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 6: Composition -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="grid" size="sm" />
            Composition
          </h2>
          <p class="section-desc">Combinaisons avec d'autres composants du Design System.</p>
        </div>

        <!-- Composition 1: Modal + Stepper -->
        <div class="use-case">
          <h3 class="use-case__title">Modal avec Stepper</h3>
          <p class="use-case__desc">Processus multi-étapes avec indicateur visuel.</p>
          <doc-demo-container [code]="stepperModalCode">
            <ds-button variant="primary" (clicked)="openStepperModal()">
              Inscription en 3 étapes
            </ds-button>

            <ds-modal
              [open]="isStepperModalOpen()"
              title="Créer votre compte"
              size="lg"
              (closed)="closeStepperModal()"
            >
              <div class="stepper-modal-content">
                <ds-stepper
                  [steps]="registrationSteps"
                  [currentStep]="currentRegistrationStep()"
                  orientation="horizontal"
                />
                <div class="stepper-step-content">
                  @switch (currentRegistrationStep()) {
                    @case (0) {
                      <ds-input-field label="Email" type="email" placeholder="votre@email.com" />
                    }
                    @case (1) {
                      <ds-input-field label="Mot de passe" type="password" placeholder="••••••••" />
                    }
                    @case (2) {
                      <p>Vérifiez vos informations et confirmez.</p>
                    }
                  }
                </div>
              </div>
              <div class="modal-actions">
                @if (currentRegistrationStep() > 0) {
                  <ds-button variant="ghost" (clicked)="prevRegistrationStep()">Retour</ds-button>
                }
                @if (currentRegistrationStep() < 2) {
                  <ds-button variant="primary" (clicked)="nextRegistrationStep()">Continuer</ds-button>
                } @else {
                  <ds-button variant="success" (clicked)="completeRegistration()">Créer le compte</ds-button>
                }
              </div>
            </ds-modal>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Stacked modals -->
        <div class="use-case">
          <h3 class="use-case__title">Modales empilées</h3>
          <p class="use-case__desc">Ouvrir une modale depuis une autre modale.</p>
          <doc-demo-container [code]="stackedCode">
            <ds-button variant="secondary" (clicked)="openParentModal()">
              Ouvrir modale parent
            </ds-button>

            <ds-modal
              [open]="isParentModalOpen()"
              title="Modale parent"
              size="md"
              (closed)="closeParentModal()"
            >
              <p>Ceci est la modale principale.</p>
              <ds-button variant="primary" (clicked)="openChildModal()">
                Ouvrir modale enfant
              </ds-button>

              <ds-modal
                [open]="isChildModalOpen()"
                title="Modale enfant"
                size="sm"
                (closed)="closeChildModal()"
              >
                <p>Ceci est une modale imbriquée.</p>
                <div class="modal-actions">
                  <ds-button variant="primary" (clicked)="closeChildModal()">Fermer</ds-button>
                </div>
              </ds-modal>
            </ds-modal>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 7: API Reference -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="code" size="sm" />
            API Reference
          </h2>
          <p class="section-desc">Documentation complète des propriétés et événements.</p>
        </div>

        <doc-props-table [props]="definition.props" />
      </section>
    </div>
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

    .modal-actions {
      margin-top: var(--doc-space-lg, 24px);
      display: flex;
      gap: var(--doc-space-sm, 8px);
      justify-content: flex-end;
    }

    .size-info {
      margin-top: var(--doc-space-sm, 8px);
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
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

    .action-feedback {
      margin-top: var(--doc-space-md, 16px);
    }

    /* Form modal */
    .form-modal-content {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    /* Wizard */
    .wizard-content {
      min-height: 150px;
    }

    .wizard-progress {
      margin-bottom: var(--doc-space-md, 16px);
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    .wizard-step {
      h4 {
        margin: 0 0 var(--doc-space-md, 16px) 0;
        font-size: 1rem;
        font-weight: 600;
      }
    }

    /* Stepper modal */
    .stepper-modal-content {
      min-height: 200px;
    }

    .stepper-step-content {
      margin-top: var(--doc-space-lg, 24px);
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
    }
  `]
})
export class ModalPage {
  definition = DsModalDefinition;

  // Playground state
  isModalOpen = signal(false);
  defaultValues = signal<ControlValues>({
    size: 'md',
    closable: true,
    closeOnBackdrop: true,
  });

  demoSize = computed(() => this.defaultValues()['size'] as ModalSize);
  demoClosable = computed(() => this.defaultValues()['closable'] as boolean);
  demoCloseOnBackdrop = computed(() => this.defaultValues()['closeOnBackdrop'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  openModal(): void { this.isModalOpen.set(true); }
  closeModal(): void { this.isModalOpen.set(false); }

  // Size demo
  isSizeModalOpen = signal(false);
  currentSizeModal = signal<ModalSize>('md');

  sizeDescription = computed(() => {
    const descriptions: Record<ModalSize, string> = {
      sm: 'Idéale pour les confirmations simples (400px)',
      md: 'Taille par défaut pour la plupart des cas (560px)',
      lg: 'Pour les formulaires complexes ou contenus longs (720px)',
    };
    return descriptions[this.currentSizeModal()];
  });

  openSizeModal(size: ModalSize): void {
    this.currentSizeModal.set(size);
    this.isSizeModalOpen.set(true);
  }
  closeSizeModal(): void { this.isSizeModalOpen.set(false); }

  // Type demo
  isTypeModalOpen = signal(false);
  currentTypeModal = signal<ModalType | null>(null);

  typeModalTitle = computed(() => {
    const titles: Record<ModalType, string> = {
      success: 'Succès',
      warning: 'Attention',
      error: 'Erreur',
      info: 'Information'
    };
    return this.currentTypeModal() ? titles[this.currentTypeModal()!] : '';
  });

  typeModalContent = computed(() => {
    const contents: Record<ModalType, string> = {
      success: 'Opération réussie avec succès !',
      warning: 'Êtes-vous sûr de vouloir continuer ?',
      error: 'Une erreur est survenue lors de l\'opération.',
      info: 'Voici une information importante à noter.'
    };
    return this.currentTypeModal() ? contents[this.currentTypeModal()!] : '';
  });

  openTypeModal(type: ModalType): void {
    this.currentTypeModal.set(type);
    this.isTypeModalOpen.set(true);
  }
  closeTypeModal(): void { this.isTypeModalOpen.set(false); }

  // Close options demo
  isNonClosableOpen = signal(false);
  isNoBackdropCloseOpen = signal(false);

  openNonClosableModal(): void { this.isNonClosableOpen.set(true); }
  closeNonClosableModal(): void { this.isNonClosableOpen.set(false); }
  openNoBackdropCloseModal(): void { this.isNoBackdropCloseOpen.set(true); }
  closeNoBackdropCloseModal(): void { this.isNoBackdropCloseOpen.set(false); }

  // Use Case 1: Delete confirmation
  isDeleteModalOpen = signal(false);
  deleteConfirmed = signal(false);

  openDeleteModal(): void {
    this.deleteConfirmed.set(false);
    this.isDeleteModalOpen.set(true);
  }
  closeDeleteModal(): void { this.isDeleteModalOpen.set(false); }
  confirmDelete(): void {
    this.deleteConfirmed.set(true);
    this.closeDeleteModal();
  }

  // Use Case 2: Form modal
  isFormModalOpen = signal(false);
  contactName = signal('');
  contactEmail = signal('');
  contactPhone = signal('');
  contactSaved = signal(false);
  savedContactName = signal('');

  isContactFormValid = computed(() =>
    this.contactName().length > 0 && this.contactEmail().includes('@')
  );

  openFormModal(): void {
    this.contactSaved.set(false);
    this.isFormModalOpen.set(true);
  }
  closeFormModal(): void {
    this.isFormModalOpen.set(false);
    this.contactName.set('');
    this.contactEmail.set('');
    this.contactPhone.set('');
  }
  saveContact(): void {
    this.savedContactName.set(this.contactName());
    this.contactSaved.set(true);
    this.closeFormModal();
  }

  // Use Case 3: Wizard
  isWizardModalOpen = signal(false);
  wizardStep = signal(1);
  projectName = signal('');

  wizardTitle = computed(() => {
    const titles = ['Créer un projet', 'Configuration', 'Confirmation'];
    return titles[this.wizardStep() - 1];
  });

  openWizardModal(): void {
    this.wizardStep.set(1);
    this.projectName.set('');
    this.isWizardModalOpen.set(true);
  }
  closeWizardModal(): void { this.isWizardModalOpen.set(false); }
  nextWizardStep(): void { this.wizardStep.update(s => Math.min(s + 1, 3)); }
  prevWizardStep(): void { this.wizardStep.update(s => Math.max(s - 1, 1)); }
  finishWizard(): void { this.closeWizardModal(); }

  // Composition 1: Stepper modal
  isStepperModalOpen = signal(false);
  currentRegistrationStep = signal(0);
  registrationSteps = [
    { label: 'Email', completed: false },
    { label: 'Mot de passe', completed: false },
    { label: 'Confirmation', completed: false },
  ];

  openStepperModal(): void {
    this.currentRegistrationStep.set(0);
    this.isStepperModalOpen.set(true);
  }
  closeStepperModal(): void { this.isStepperModalOpen.set(false); }
  nextRegistrationStep(): void { this.currentRegistrationStep.update(s => Math.min(s + 1, 2)); }
  prevRegistrationStep(): void { this.currentRegistrationStep.update(s => Math.max(s - 1, 0)); }
  completeRegistration(): void { this.closeStepperModal(); }

  // Composition 2: Stacked modals
  isParentModalOpen = signal(false);
  isChildModalOpen = signal(false);

  openParentModal(): void { this.isParentModalOpen.set(true); }
  closeParentModal(): void {
    this.isChildModalOpen.set(false);
    this.isParentModalOpen.set(false);
  }
  openChildModal(): void { this.isChildModalOpen.set(true); }
  closeChildModal(): void { this.isChildModalOpen.set(false); }

  // Code snippets
  closeOptionsCode = `<!-- Non closable -->
<ds-modal [open]="open" [closable]="false" [closeOnBackdrop]="false">
  <p>Contenu</p>
  <ds-button (clicked)="close()">Fermer</ds-button>
</ds-modal>

<!-- Sans backdrop close -->
<ds-modal [open]="open" [closable]="true" [closeOnBackdrop]="false">
  ...
</ds-modal>`;

  confirmCode = `<ds-button variant="error" (clicked)="openDeleteModal()">
  Supprimer
</ds-button>

<ds-modal
  [open]="isOpen()"
  title="Supprimer ?"
  type="error"
  size="sm"
  (closed)="close()"
>
  <p>Cette action est irréversible.</p>
  <ds-button variant="ghost" (clicked)="close()">Annuler</ds-button>
  <ds-button variant="error" (clicked)="confirm()">Supprimer</ds-button>
</ds-modal>`;

  formModalCode = `<ds-modal [open]="isOpen()" title="Ajouter un contact" size="md">
  <ds-input-field label="Nom" [(ngModel)]="name" [required]="true" />
  <ds-input-field label="Email" type="email" [(ngModel)]="email" />

  <ds-button variant="ghost" (clicked)="close()">Annuler</ds-button>
  <ds-button variant="primary" [disabled]="!isValid()" (clicked)="save()">
    Ajouter
  </ds-button>
</ds-modal>`;

  wizardCode = `<ds-modal [open]="isOpen()" [title]="wizardTitle()" size="lg">
  <div class="wizard-progress">Étape {{ step() }} sur 3</div>

  @switch (step()) {
    @case (1) { <ds-input-field label="Nom du projet" /> }
    @case (2) { <p>Configuration...</p> }
    @case (3) { <p>Confirmation</p> }
  }

  @if (step() > 1) {
    <ds-button variant="ghost" (clicked)="prev()">Précédent</ds-button>
  }
  @if (step() < 3) {
    <ds-button variant="primary" (clicked)="next()">Suivant</ds-button>
  } @else {
    <ds-button variant="success" (clicked)="finish()">Créer</ds-button>
  }
</ds-modal>`;

  stepperModalCode = `<ds-modal [open]="isOpen()" title="Inscription" size="lg">
  <ds-stepper
    [steps]="steps"
    [currentStep]="currentStep()"
    orientation="horizontal"
  />

  @switch (currentStep()) {
    @case (0) { <ds-input-field label="Email" /> }
    @case (1) { <ds-input-field label="Mot de passe" type="password" /> }
    @case (2) { <p>Confirmation</p> }
  }

  <ds-button (clicked)="prev()">Retour</ds-button>
  <ds-button variant="primary" (clicked)="next()">Continuer</ds-button>
</ds-modal>`;

  stackedCode = `<ds-modal [open]="isParentOpen()" title="Parent" size="md">
  <p>Modale principale</p>

  <ds-button (clicked)="openChild()">Ouvrir enfant</ds-button>

  <!-- Modale imbriquée -->
  <ds-modal [open]="isChildOpen()" title="Enfant" size="sm">
    <p>Modale imbriquée</p>
    <ds-button (clicked)="closeChild()">Fermer</ds-button>
  </ds-modal>
</ds-modal>`;
}
