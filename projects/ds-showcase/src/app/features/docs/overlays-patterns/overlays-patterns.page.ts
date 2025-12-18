import { Component } from '@angular/core';
import { DsDivider, DsCard, DsAlert } from 'ds-angular';

@Component({
  selector: 'app-overlays-patterns-page',
  standalone: true,
  imports: [DsDivider, DsCard, DsAlert],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Patterns</span>
        <h1 class="doc-title">Overlays Patterns</h1>
        <p class="doc-desc">
          Patterns et bonnes pratiques pour les composants superposés : modals, drawers, dropdowns, tooltips et toasts.
        </p>
      </header>

      <!-- Section: Modal Confirmation -->
      <section class="doc-section">
        <h2>1. Modal de confirmation</h2>
        <p class="section-desc">
          Pattern classique pour demander confirmation avant une action destructive.
        </p>

        <div class="code-block">
          <pre><code>{{ confirmModalCode }}</code></pre>
        </div>

        <ds-alert type="warning" [showIcon]="true">
          <strong>Accessibilité</strong><br>
          Le focus est automatiquement piégé dans la modal. Utilisez ESC pour fermer et assurez-vous que le bouton d'annulation est accessible.
        </ds-alert>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Drawer Settings -->
      <section class="doc-section">
        <h2>2. Drawer de paramètres</h2>
        <p class="section-desc">
          Panneau latéral pour les paramètres contextuels.
        </p>

        <div class="code-block">
          <pre><code>{{ drawerSettingsCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Dropdown Menu -->
      <section class="doc-section">
        <h2>3. Dropdown menu contextuel</h2>
        <p class="section-desc">
          Menu déroulant avec actions, séparateurs et raccourcis clavier.
        </p>

        <div class="code-block">
          <pre><code>{{ dropdownMenuCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Tooltip Hints -->
      <section class="doc-section">
        <h2>4. Tooltips d'aide</h2>
        <p class="section-desc">
          Infobulles pour fournir des informations contextuelles.
        </p>

        <div class="code-block">
          <pre><code>{{ tooltipHintsCode }}</code></pre>
        </div>

        <ds-card variant="outlined" class="tip-card">
          <h4>Quand utiliser les tooltips ?</h4>
          <ul>
            <li>Pour expliquer des icônes sans label</li>
            <li>Pour fournir des informations supplémentaires</li>
            <li>Pour afficher des raccourcis clavier</li>
            <li>Pas pour du contenu critique (utilisez un label)</li>
          </ul>
        </ds-card>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Toast Notifications -->
      <section class="doc-section">
        <h2>5. Toast notifications</h2>
        <p class="section-desc">
          Notifications temporaires pour informer l'utilisateur.
        </p>

        <div class="code-block">
          <pre><code>{{ toastNotificationsCode }}</code></pre>
        </div>

        <h3>Service centralisé</h3>
        <div class="code-block">
          <pre><code>{{ toastServiceCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Popover Form -->
      <section class="doc-section">
        <h2>6. Popover avec formulaire</h2>
        <p class="section-desc">
          Popover pour des actions rapides sans quitter le contexte.
        </p>

        <div class="code-block">
          <pre><code>{{ popoverFormCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Composants overlays -->
      <section class="doc-section">
        <h2>Composants overlay disponibles</h2>

        <div class="components-grid">
          <ds-card variant="outlined">
            <h4>ds-modal</h4>
            <p>Dialogue modal avec focus trap, tailles et types sémantiques.</p>
            <code>/components/overlays/ds-modal</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-drawer</h4>
            <p>Panneau latéral (left, right, top, bottom) avec overlay.</p>
            <code>/components/overlays/ds-drawer</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-dropdown</h4>
            <p>Menu déroulant avec items, dividers et navigation clavier.</p>
            <code>/components/overlays/ds-dropdown</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-tooltip</h4>
            <p>Infobulle au survol avec positions et délais configurables.</p>
            <code>/components/overlays/ds-tooltip</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-popover</h4>
            <p>Bulle de contenu enrichi (texte, formulaire, actions).</p>
            <code>/components/overlays/ds-popover</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-toast</h4>
            <p>Notifications temporaires avec stack et positions.</p>
            <code>/components/feedback/ds-toast</code>
          </ds-card>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Bonnes pratiques -->
      <section class="doc-section">
        <h2>Bonnes pratiques</h2>

        <div class="practices-grid">
          <div class="practice-item practice-item--do">
            <span class="practice-icon">&#x2705;</span>
            <div>
              <strong>Focus trap</strong>
              <p>Piégez le focus dans les modals et drawers pour l'accessibilité.</p>
            </div>
          </div>

          <div class="practice-item practice-item--do">
            <span class="practice-icon">&#x2705;</span>
            <div>
              <strong>ESC pour fermer</strong>
              <p>Permettez toujours de fermer les overlays avec la touche Escape.</p>
            </div>
          </div>

          <div class="practice-item practice-item--do">
            <span class="practice-icon">&#x2705;</span>
            <div>
              <strong>Backdrop click</strong>
              <p>Fermez les overlays non-critiques au clic sur le backdrop.</p>
            </div>
          </div>

          <div class="practice-item practice-item--dont">
            <span class="practice-icon">&#x274C;</span>
            <div>
              <strong>Trop de modals</strong>
              <p>Évitez d'empiler les modals. Utilisez un stepper ou un drawer.</p>
            </div>
          </div>

          <div class="practice-item practice-item--dont">
            <span class="practice-icon">&#x274C;</span>
            <div>
              <strong>Tooltips sur mobile</strong>
              <p>Les tooltips ne fonctionnent pas au toucher. Utilisez des labels.</p>
            </div>
          </div>

          <div class="practice-item practice-item--dont">
            <span class="practice-icon">&#x274C;</span>
            <div>
              <strong>Toasts sans action</strong>
              <p>Pour les erreurs, ajoutez une action "Réessayer" ou "Voir détails".</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .doc-page {
      max-width: 900px;
    }

    .doc-header {
      margin-bottom: 48px;
    }

    .doc-badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff);
      color: var(--color-primary, #3b82f6);
      border-radius: 4px;
      margin-bottom: 12px;
    }

    .doc-title {
      margin: 0 0 12px 0;
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-default, #1a1a1a);
    }

    .doc-desc {
      margin: 0;
      font-size: 1.125rem;
      color: var(--text-muted, #6b7280);
      line-height: 1.6;
    }

    .doc-section {
      margin-bottom: 32px;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-default, #1a1a1a);
        margin: 0 0 8px 0;
      }

      h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-default, #374151);
        margin: 24px 0 12px 0;
      }
    }

    .section-desc {
      margin: 0 0 20px 0;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);
    }

    .code-block {
      background: var(--gray-900, #111827);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;

      pre {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
      }

      code {
        font-family: 'SF Mono', Monaco, monospace;
        font-size: 0.8125rem;
        line-height: 1.6;
        color: #e5e7eb;
        white-space: pre;
      }
    }

    .tip-card {
      margin-top: 16px;

      h4 {
        margin: 0 0 12px 0;
        font-size: 1rem;
      }

      ul {
        margin: 0;
        padding-left: 20px;

        li {
          font-size: 0.875rem;
          color: var(--text-muted, #6b7280);
          margin-bottom: 4px;
        }
      }
    }

    .components-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      h4 {
        margin: 0 0 8px 0;
        font-size: 1rem;
        color: var(--color-primary, #3b82f6);
      }

      p {
        margin: 0 0 12px 0;
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
      }

      code {
        font-size: 0.6875rem;
        color: var(--text-muted, #9ca3af);
      }
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .practice-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 8px;

      &--do {
        background: #ecfdf5;
      }

      &--dont {
        background: #fef2f2;
      }

      .practice-icon {
        font-size: 18px;
        flex-shrink: 0;
      }

      strong {
        display: block;
        margin-bottom: 4px;
        font-size: 0.9375rem;
        color: var(--text-default, #1a1a1a);
      }

      p {
        margin: 0;
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
      }
    }
  `]
})
export class OverlaysPatternsPage {
  confirmModalCode = `import { Component, signal } from '@angular/core';
import { DsModal, DsButton } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsModal, DsButton],
  template: \`
    <ds-button variant="error" (click)="openConfirm()">
      Supprimer l'élément
    </ds-button>

    <ds-modal
      [open]="isConfirmOpen()"
      title="Confirmer la suppression"
      size="sm"
      (close)="closeConfirm()"
    >
      <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
      <p class="text-muted">Cette action est irréversible.</p>

      <footer slot="footer">
        <ds-button variant="secondary" (click)="closeConfirm()">
          Annuler
        </ds-button>
        <ds-button
          variant="error"
          [loading]="isDeleting()"
          (click)="confirmDelete()"
        >
          Supprimer
        </ds-button>
      </footer>
    </ds-modal>
  \`
})
export class ConfirmDeleteComponent {
  isConfirmOpen = signal(false);
  isDeleting = signal(false);

  openConfirm() {
    this.isConfirmOpen.set(true);
  }

  closeConfirm() {
    this.isConfirmOpen.set(false);
  }

  async confirmDelete() {
    this.isDeleting.set(true);
    try {
      await this.deleteItem();
      this.closeConfirm();
      // Show success toast
    } catch (error) {
      // Show error toast
    } finally {
      this.isDeleting.set(false);
    }
  }
}`;

  drawerSettingsCode = `import { Component, signal } from '@angular/core';
import { DsDrawer, DsButton, DsToggle, DsSelect, DsDivider } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsDrawer, DsButton, DsToggle, DsSelect, DsDivider],
  template: \`
    <ds-button variant="secondary" (click)="openSettings()">
      Paramètres
    </ds-button>

    <ds-drawer
      [open]="isOpen()"
      position="right"
      size="md"
      title="Paramètres"
      (close)="closeSettings()"
    >
      <!-- Section Notifications -->
      <div class="settings-section">
        <h3>Notifications</h3>

        <div class="setting-item">
          <div class="setting-info">
            <strong>Notifications par email</strong>
            <p>Recevoir des mises à jour par email</p>
          </div>
          <ds-toggle [(ngModel)]="settings.emailNotifications" />
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <strong>Notifications push</strong>
            <p>Recevoir des notifications sur votre appareil</p>
          </div>
          <ds-toggle [(ngModel)]="settings.pushNotifications" />
        </div>
      </div>

      <ds-divider />

      <!-- Section Apparence -->
      <div class="settings-section">
        <h3>Apparence</h3>

        <ds-select
          label="Thème"
          [(ngModel)]="settings.theme"
          [options]="themeOptions"
        />

        <ds-select
          label="Langue"
          [(ngModel)]="settings.language"
          [options]="languageOptions"
        />
      </div>

      <!-- Footer -->
      <footer slot="footer">
        <ds-button variant="secondary" (click)="closeSettings()">
          Annuler
        </ds-button>
        <ds-button variant="primary" (click)="saveSettings()">
          Enregistrer
        </ds-button>
      </footer>
    </ds-drawer>
  \`
})
export class SettingsDrawerComponent {
  isOpen = signal(false);

  settings = {
    emailNotifications: true,
    pushNotifications: false,
    theme: 'light',
    language: 'fr'
  };

  themeOptions = [
    { value: 'light', label: 'Clair' },
    { value: 'dark', label: 'Sombre' },
    { value: 'auto', label: 'Système' }
  ];

  languageOptions = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' }
  ];

  openSettings() { this.isOpen.set(true); }
  closeSettings() { this.isOpen.set(false); }

  saveSettings() {
    // Save to API/localStorage
    this.closeSettings();
  }
}`;

  dropdownMenuCode = `import { Component } from '@angular/core';
import { DsDropdown, DsButton, DropdownItem } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsDropdown, DsButton],
  template: \`
    <ds-dropdown [items]="menuItems" (itemClick)="onAction($event)">
      <ds-button variant="secondary">
        Actions
        <span class="dropdown-arrow">▼</span>
      </ds-button>
    </ds-dropdown>
  \`
})
export class ActionMenuComponent {
  menuItems: DropdownItem[] = [
    { id: 'edit', label: 'Modifier', icon: 'edit', shortcut: 'Ctrl+E' },
    { id: 'duplicate', label: 'Dupliquer', icon: 'copy', shortcut: 'Ctrl+D' },
    { id: 'divider', type: 'divider' },
    { id: 'archive', label: 'Archiver', icon: 'archive' },
    { id: 'delete', label: 'Supprimer', icon: 'trash', variant: 'danger' },
  ];

  onAction(item: DropdownItem) {
    switch (item.id) {
      case 'edit':
        this.openEditModal();
        break;
      case 'duplicate':
        this.duplicateItem();
        break;
      case 'archive':
        this.archiveItem();
        break;
      case 'delete':
        this.openDeleteConfirm();
        break;
    }
  }
}`;

  tooltipHintsCode = `import { Component } from '@angular/core';
import { DsTooltip, DsButton } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsTooltip, DsButton],
  template: \`
    <!-- Tooltip simple -->
    <ds-button
      variant="secondary"
      dsTooltip="Enregistrer les modifications"
    >
      💾
    </ds-button>

    <!-- Tooltip avec position -->
    <ds-button
      variant="secondary"
      dsTooltip="Supprimer l'élément"
      tooltipPosition="bottom"
    >
      🗑️
    </ds-button>

    <!-- Tooltip avec délai -->
    <ds-button
      variant="secondary"
      dsTooltip="Cette action prend du temps"
      [tooltipDelay]="500"
    >
      ⏳
    </ds-button>

    <!-- Tooltip avec raccourci clavier -->
    <ds-button
      variant="secondary"
      dsTooltip="Copier (Ctrl+C)"
      tooltipPosition="top"
    >
      📋
    </ds-button>
  \`
})
export class TooltipExamplesComponent {}`;

  toastNotificationsCode = `import { Component, inject } from '@angular/core';
import { DsButton } from '@kksdev/ds-angular';
import { ToastService } from './toast.service';

@Component({
  standalone: true,
  imports: [DsButton],
  template: \`
    <ds-button variant="success" (click)="showSuccess()">
      Succès
    </ds-button>

    <ds-button variant="error" (click)="showError()">
      Erreur
    </ds-button>

    <ds-button variant="warning" (click)="showWarning()">
      Warning
    </ds-button>

    <ds-button variant="info" (click)="showInfo()">
      Info
    </ds-button>
  \`
})
export class ToastDemoComponent {
  private toast = inject(ToastService);

  showSuccess() {
    this.toast.success('Modifications enregistrées avec succès !');
  }

  showError() {
    this.toast.error('Une erreur est survenue. Veuillez réessayer.', {
      duration: 0, // Persistent
      action: { label: 'Réessayer', onClick: () => this.retry() }
    });
  }

  showWarning() {
    this.toast.warning('Votre session expire dans 5 minutes.');
  }

  showInfo() {
    this.toast.info('Nouvelle mise à jour disponible.');
  }
}`;

  toastServiceCode = `import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = signal<Toast[]>([]);
  readonly toasts$ = this.toasts.asReadonly();

  private show(type: Toast['type'], message: string, options?: Partial<Toast>) {
    const toast: Toast = {
      id: crypto.randomUUID(),
      type,
      message,
      duration: options?.duration ?? 5000,
      ...options
    };

    this.toasts.update(t => [...t, toast]);

    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(toast.id), toast.duration);
    }
  }

  success(message: string, options?: Partial<Toast>) {
    this.show('success', message, options);
  }

  error(message: string, options?: Partial<Toast>) {
    this.show('error', message, { duration: 0, ...options });
  }

  warning(message: string, options?: Partial<Toast>) {
    this.show('warning', message, options);
  }

  info(message: string, options?: Partial<Toast>) {
    this.show('info', message, options);
  }

  dismiss(id: string) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }

  dismissAll() {
    this.toasts.set([]);
  }
}`;

  popoverFormCode = `import { Component, signal } from '@angular/core';
import { DsPopover, DsButton, DsInputField } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsPopover, DsButton, DsInputField],
  template: \`
    <ds-popover
      [open]="isOpen()"
      position="bottom-start"
      (close)="close()"
    >
      <!-- Trigger -->
      <ds-button variant="secondary" (click)="toggle()">
        + Ajouter une note
      </ds-button>

      <!-- Contenu du popover -->
      <div slot="content" class="popover-form">
        <h4>Nouvelle note</h4>

        <ds-input-field
          label="Titre"
          [(ngModel)]="note.title"
          [autofocus]="true"
        />

        <ds-input-field
          type="textarea"
          label="Contenu"
          [(ngModel)]="note.content"
          [rows]="3"
        />

        <div class="popover-actions">
          <ds-button variant="ghost" size="sm" (click)="close()">
            Annuler
          </ds-button>
          <ds-button variant="primary" size="sm" (click)="save()">
            Ajouter
          </ds-button>
        </div>
      </div>
    </ds-popover>
  \`,
  styles: [\`
    .popover-form {
      width: 280px;
      padding: var(--space-4);

      h4 {
        margin: 0 0 var(--space-3) 0;
      }
    }

    .popover-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-2);
      margin-top: var(--space-3);
    }
  \`]
})
export class QuickNoteComponent {
  isOpen = signal(false);
  note = { title: '', content: '' };

  toggle() { this.isOpen.update(v => !v); }
  close() { this.isOpen.set(false); }

  save() {
    // Save note...
    this.note = { title: '', content: '' };
    this.close();
  }
}`;
}
