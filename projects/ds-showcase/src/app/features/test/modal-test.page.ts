import { Component, signal } from '@angular/core';
import { DsModalComponent, DsButton } from 'ds-angular';

/**
 * Page de test isolée pour ds-modal.
 * Utilisée par les tests e2e Playwright.
 */
@Component({
  selector: 'app-modal-test',
  standalone: true,
  imports: [DsModalComponent, DsButton],
  template: `
    <!-- Test: Default Modal -->
    <div class="test-section" data-testid="modal-default">
      <ds-button (clicked)="openDefault()">Ouvrir la modale</ds-button>
      <ds-modal
        [open]="defaultOpen()"
        title="Titre de la modale"
        (closed)="defaultOpen.set(false)"
      >
        <p>Contenu de la modale par défaut.</p>
        <div slot="footer">
          <ds-button variant="secondary" (clicked)="defaultOpen.set(false)">Annuler</ds-button>
          <ds-button variant="primary" (clicked)="defaultOpen.set(false)">Confirmer</ds-button>
        </div>
      </ds-modal>
    </div>

    <!-- Test: Form Modal -->
    <div class="test-section" data-testid="modal-form">
      <ds-button (clicked)="formOpen.set(true)">Créer un compte</ds-button>
      <ds-modal
        [open]="formOpen()"
        title="Créer un compte"
        (closed)="formOpen.set(false)"
      >
        <form>
          <input type="text" placeholder="Nom" tabindex="0" />
          <input type="email" placeholder="Email" tabindex="0" />
          <input type="password" placeholder="Mot de passe" tabindex="0" />
        </form>
        <div slot="footer">
          <ds-button variant="secondary" (clicked)="formOpen.set(false)">Annuler</ds-button>
          <ds-button variant="primary" type="submit">Créer</ds-button>
        </div>
      </ds-modal>
    </div>

    <!-- Test: Small Modal -->
    <div class="test-section" data-testid="modal-small">
      <ds-button (clicked)="smallOpen.set(true)">Small Modal</ds-button>
      <ds-modal
        [open]="smallOpen()"
        title="Petite modale"
        size="sm"
        (closed)="smallOpen.set(false)"
      >
        <p>Contenu court.</p>
      </ds-modal>
    </div>

    <!-- Test: Large Modal -->
    <div class="test-section" data-testid="modal-large">
      <ds-button (clicked)="largeOpen.set(true)">Large Modal</ds-button>
      <ds-modal
        [open]="largeOpen()"
        title="Grande modale"
        size="lg"
        (closed)="largeOpen.set(false)"
      >
        <p>Contenu de la grande modale avec beaucoup de texte.</p>
      </ds-modal>
    </div>

    <!-- Test: Success Modal -->
    <div class="test-section" data-testid="modal-success">
      <ds-button (clicked)="successOpen.set(true)">Afficher succès</ds-button>
      <ds-modal
        [open]="successOpen()"
        title="Succès"
        type="success"
        (closed)="successOpen.set(false)"
      >
        <p>Opération réussie !</p>
      </ds-modal>
    </div>

    <!-- Test: Error Modal -->
    <div class="test-section" data-testid="modal-error">
      <ds-button (clicked)="errorOpen.set(true)">Afficher erreur</ds-button>
      <ds-modal
        [open]="errorOpen()"
        title="Erreur"
        type="error"
        (closed)="errorOpen.set(false)"
      >
        <p>Une erreur est survenue.</p>
      </ds-modal>
    </div>

    <!-- Test: Warning Modal -->
    <div class="test-section" data-testid="modal-warning">
      <ds-button (clicked)="warningOpen.set(true)">Afficher avertissement</ds-button>
      <ds-modal
        [open]="warningOpen()"
        title="Avertissement"
        type="warning"
        (closed)="warningOpen.set(false)"
      >
        <p>Attention à cette action.</p>
      </ds-modal>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 24px;
    }
    .test-section {
      margin-bottom: 24px;
      padding: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    input {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
    }
  `]
})
export class ModalTestPage {
  defaultOpen = signal(false);
  formOpen = signal(false);
  smallOpen = signal(false);
  largeOpen = signal(false);
  successOpen = signal(false);
  errorOpen = signal(false);
  warningOpen = signal(false);

  openDefault() {
    this.defaultOpen.set(true);
  }
}
