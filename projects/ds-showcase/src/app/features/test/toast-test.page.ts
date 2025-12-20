import { Component, inject } from '@angular/core';
import { DsButton, DsToastService } from 'ds-angular';

/**
 * Page de test isolée pour ds-toast.
 * Utilisée par les tests e2e Playwright.
 */
@Component({
  selector: 'app-toast-test',
  standalone: true,
  imports: [DsButton],
  template: `
    <!-- Test: Basic Toasts -->
    <div class="test-section" data-testid="toast-basic">
      <ds-button (clicked)="showSuccess()">Toast Success</ds-button>
      <ds-button (clicked)="showError()">Toast Error</ds-button>
      <ds-button (clicked)="showWarning()">Toast Warning</ds-button>
      <ds-button (clicked)="showInfo()">Toast Info</ds-button>
    </div>

    <!-- Test: Duration -->
    <div class="test-section" data-testid="toast-duration">
      <ds-button (clicked)="showShort()">Toast court (2s)</ds-button>
      <ds-button (clicked)="showLong()">Toast long (10s)</ds-button>
      <ds-button (clicked)="showPersistent()">Toast persistant</ds-button>
    </div>

    <!-- Test: Position -->
    <div class="test-section" data-testid="toast-position">
      <ds-button (clicked)="showTopRight()">Top Right</ds-button>
      <ds-button (clicked)="showTopLeft()">Top Left</ds-button>
      <ds-button (clicked)="showBottomRight()">Bottom Right</ds-button>
      <ds-button (clicked)="showBottomLeft()">Bottom Left</ds-button>
    </div>

    <!-- Test: Multiple -->
    <div class="test-section" data-testid="toast-multiple">
      <ds-button (clicked)="showMultiple()">Afficher 3 toasts</ds-button>
      <ds-button (clicked)="clearAll()">Fermer tous</ds-button>
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
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
  `]
})
export class ToastTestPage {
  private toastService = inject(DsToastService);

  showSuccess() {
    this.toastService.show({ message: 'Opération réussie !', type: 'success' });
  }

  showError() {
    this.toastService.show({ message: 'Une erreur est survenue.', type: 'error' });
  }

  showWarning() {
    this.toastService.show({ message: 'Attention à cette action.', type: 'warning' });
  }

  showInfo() {
    this.toastService.show({ message: 'Information importante.', type: 'info' });
  }

  showShort() {
    this.toastService.show({ message: 'Toast court', type: 'success', duration: 2000 });
  }

  showLong() {
    this.toastService.show({ message: 'Toast long', type: 'success', duration: 10000 });
  }

  showPersistent() {
    this.toastService.show({ message: 'Toast persistant', type: 'info', duration: 0 });
  }

  showTopRight() {
    this.toastService.show({ message: 'Top Right', type: 'success', position: 'top-right' });
  }

  showTopLeft() {
    this.toastService.show({ message: 'Top Left', type: 'success', position: 'top-left' });
  }

  showBottomRight() {
    this.toastService.show({ message: 'Bottom Right', type: 'success', position: 'bottom-right' });
  }

  showBottomLeft() {
    this.toastService.show({ message: 'Bottom Left', type: 'success', position: 'bottom-left' });
  }

  showMultiple() {
    this.toastService.show({ message: 'Premier toast', type: 'success' });
    setTimeout(() => this.toastService.show({ message: 'Deuxième toast', type: 'info' }), 300);
    setTimeout(() => this.toastService.show({ message: 'Troisième toast', type: 'warning' }), 600);
  }

  clearAll() {
    this.toastService.clear();
  }
}
