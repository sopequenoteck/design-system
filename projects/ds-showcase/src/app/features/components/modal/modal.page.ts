import { Component, signal, computed } from '@angular/core';
import { DsModalComponent, DsButton } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsModalDefinition } from '../../../registry/definitions/ds-modal.definition';
import { ControlValues } from '../../../registry/types';

type ModalSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-modal-page',
  standalone: true,
  imports: [DsModalComponent, DsButton, DemoContainer, PropsTable],
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

      <!-- Demo 1: Default avec controls -->
      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Modale par défaut avec contrôles interactifs.</p>

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
              <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
                <ds-button variant="ghost" (clicked)="closeModal()">Annuler</ds-button>
                <ds-button variant="primary" (clicked)="closeModal()">Confirmer</ds-button>
              </div>
            </ds-modal>
          </doc-demo-container>
        </div>

        <!-- Demo 2: Sizes -->
        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les différentes tailles disponibles.</p>

          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-row">
              <ds-button variant="secondary" (clicked)="openSizeModal('sm')">Small</ds-button>
              <ds-button variant="secondary" (clicked)="openSizeModal('md')">Medium</ds-button>
              <ds-button variant="secondary" (clicked)="openSizeModal('lg')">Large</ds-button>
              <!-- Note: Modal DS supporte sm, md, lg seulement -->
            </div>

            <ds-modal
              [open]="isSizeModalOpen()"
              [title]="'Modale ' + currentSizeModal()"
              [size]="currentSizeModal()"
              (closed)="closeSizeModal()"
            >
              <p>Cette modale est de taille {{ currentSizeModal() }}.</p>
            </ds-modal>
          </doc-demo-container>
        </div>

        <!-- Demo 3: Semantic Types -->
        <div class="demo-block">
          <h3 class="demo-block__title">Semantic Types</h3>
          <p class="demo-block__desc">Types sémantiques pour différents contextes.</p>

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
        </div>
      </section>

      <!-- API Reference -->
      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page {
      max-width: 900px;
    }

    .component-header {
      margin-bottom: 48px;
    }

    .component-header__meta {
      margin-bottom: 12px;
    }

    .component-badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff);
      color: var(--color-primary, #3b82f6);
      border-radius: 4px;
    }

    .component-title {
      margin: 0 0 12px 0;
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-default, #1a1a1a);
    }

    .component-desc {
      margin: 0 0 16px 0;
      font-size: 1.125rem;
      color: var(--text-muted, #6b7280);
      line-height: 1.6;
    }

    .component-selector {
      display: inline-block;
      padding: 6px 12px;
      font-family: var(--doc-code-font, monospace);
      font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6);
      color: var(--text-default, #374151);
      border-radius: 4px;
    }

    .component-section {
      margin-bottom: 48px;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-default, #1a1a1a);
        margin: 0 0 24px 0;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-default, #e5e7eb);
      }
    }

    .demo-block {
      margin-bottom: 32px;
    }

    .demo-block__title {
      margin: 0 0 8px 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-default, #1a1a1a);
    }

    .demo-block__desc {
      margin: 0 0 16px 0;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);
    }

    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
  `]
})
export class ModalPage {
  definition = DsModalDefinition;

  // Default demo state
  isModalOpen = signal(false);
  defaultValues = signal<ControlValues>({
    size: 'md',
    closable: true,
    closeOnBackdrop: true,
  });

  demoSize = computed(() => this.defaultValues()['size'] as ModalSize);
  demoClosable = computed(() => this.defaultValues()['closable'] as boolean);
  demoCloseOnBackdrop = computed(() => this.defaultValues()['closeOnBackdrop'] as boolean);

  // Size demo state
  isSizeModalOpen = signal(false);
  currentSizeModal = signal<ModalSize>('md');

  // Type demo state
  isTypeModalOpen = signal(false);
  currentTypeModal = signal<'success' | 'warning' | 'error' | 'info' | null>(null);

  typeModalTitle = computed(() => {
    const type = this.currentTypeModal();
    const titles: Record<string, string> = {
      success: 'Succès',
      warning: 'Attention',
      error: 'Erreur',
      info: 'Information'
    };
    return type ? titles[type] : 'Modale';
  });

  typeModalContent = computed(() => {
    const type = this.currentTypeModal();
    const contents: Record<string, string> = {
      success: 'Opération réussie avec succès !',
      warning: 'Êtes-vous sûr de vouloir continuer ?',
      error: 'Une erreur est survenue lors de l\'opération.',
      info: 'Voici une information importante à noter.'
    };
    return type ? contents[type] : '';
  });

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  openSizeModal(size: ModalSize): void {
    this.currentSizeModal.set(size);
    this.isSizeModalOpen.set(true);
  }

  closeSizeModal(): void {
    this.isSizeModalOpen.set(false);
  }

  openTypeModal(type: 'success' | 'warning' | 'error' | 'info'): void {
    this.currentTypeModal.set(type);
    this.isTypeModalOpen.set(true);
  }

  closeTypeModal(): void {
    this.isTypeModalOpen.set(false);
  }
}
