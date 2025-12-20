import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsTabs, TabItem, DsButton, DsInputField, DsTable, DsModal, DsBadge } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsTabsDefinition } from '../../../registry/definitions/ds-tabs.definition';

interface SettingSection {
  id: string;
  label: string;
  icon?: string;
}

interface ProductTab {
  id: string;
  label: string;
  count?: number;
}

interface WizardStep {
  id: string;
  label: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-tabs-page',
  standalone: true,
  imports: [FormsModule, DsTabs, DsButton, DsInputField, DsTable, DsModal, DsBadge, DemoContainer, PropsTable, ComponentPageHeader, DocIcon],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="navigation"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-tabs"
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

        <doc-demo-container [code]="definition.demos[0].code">
          <ds-tabs
            [tabs]="playgroundTabs"
            [activeTabId]="activePlayground()"
            (tabChanged)="onPlaygroundChange($event)"
          />
          <div class="tab-content">
            @switch (activePlayground()) {
              @case ('tab1') {
                <h4>Paramètres généraux</h4>
                <p>Configurez les options principales de votre application.</p>
              }
              @case ('tab2') {
                <h4>Préférences utilisateur</h4>
                <p>Personnalisez votre expérience selon vos besoins.</p>
              }
              @case ('tab3') {
                <h4>Options avancées</h4>
                <p>Configurations expertes pour utilisateurs avertis.</p>
              }
            }
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 2: Plusieurs onglets -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Plusieurs onglets</h2>
          <p class="section-desc">Navigation fluide avec de nombreux onglets.</p>
        </div>

        <doc-demo-container [code]="multipleTabsCode">
          <ds-tabs [tabs]="multipleTabs" />
        </doc-demo-container>
      </section>

      <!-- Section 3: Avec badges -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Avec badges</h2>
          <p class="section-desc">Indication du nombre d'éléments dans chaque section.</p>
        </div>

        <doc-demo-container [code]="withBadgesCode">
          <div class="tabs-with-badges">
            <ds-tabs
              [tabs]="tabsWithBadges"
              [activeTabId]="activeWithBadges()"
              (tabChanged)="onBadgesTabChange($event)"
            />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: États désactivés -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">États désactivés</h2>
          <p class="section-desc">Onglets non accessibles selon le contexte.</p>
        </div>

        <doc-demo-container [code]="disabledCode">
          <ds-tabs [tabs]="tabsWithDisabled" />
          <p class="demo-note">L'onglet "Premium" est désactivé et non cliquable.</p>
        </doc-demo-container>
      </section>

      <!-- Section 5: Navigation clavier -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Navigation clavier</h2>
          <p class="section-desc">Support complet de la navigation au clavier (ArrowLeft/Right, Home, End).</p>
        </div>

        <doc-demo-container [code]="keyboardCode">
          <ds-tabs
            [tabs]="keyboardTabs"
            [activeTabId]="activeKeyboard()"
            (tabChanged)="onKeyboardChange($event)"
          />
          <div class="keyboard-hints">
            <span class="hint"><kbd>←</kbd> <kbd>→</kbd> Navigation</span>
            <span class="hint"><kbd>Home</kbd> Premier</span>
            <span class="hint"><kbd>End</kbd> Dernier</span>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 6: Use Cases -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="zap" size="sm" />
            Use Cases
          </h2>
          <p class="section-desc">Scénarios d'utilisation concrets dans une application.</p>
        </div>

        <!-- Use Case 1: Settings panels -->
        <div class="use-case">
          <h3 class="use-case__title">Panneau de paramètres</h3>
          <p class="use-case__desc">Organisation des réglages par catégorie.</p>
          <doc-demo-container [code]="settingsPanelCode">
            <div class="settings-demo">
              <ds-tabs
                [tabs]="settingsTabs"
                [activeTabId]="activeSettings()"
                (tabChanged)="onSettingsChange($event)"
              />
              <div class="settings-panel">
                @switch (activeSettings()) {
                  @case ('profile') {
                    <h4>Profil utilisateur</h4>
                    <div class="settings-form">
                      <ds-input-field label="Nom" placeholder="Votre nom" />
                      <ds-input-field label="Email" type="email" placeholder="email@exemple.com" />
                      <ds-button variant="primary">Enregistrer</ds-button>
                    </div>
                  }
                  @case ('security') {
                    <h4>Sécurité</h4>
                    <div class="settings-form">
                      <ds-input-field label="Mot de passe actuel" type="password" />
                      <ds-input-field label="Nouveau mot de passe" type="password" />
                      <ds-button variant="primary">Modifier</ds-button>
                    </div>
                  }
                  @case ('notifications') {
                    <h4>Notifications</h4>
                    <p>Gérez vos préférences de notifications email et push.</p>
                  }
                  @case ('billing') {
                    <h4>Facturation</h4>
                    <p>Consultez vos factures et moyens de paiement.</p>
                  }
                }
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Navigation produit -->
        <div class="use-case">
          <h3 class="use-case__title">Navigation produit</h3>
          <p class="use-case__desc">Sections de détail d'un produit avec compteurs.</p>
          <doc-demo-container [code]="productNavCode">
            <div class="product-demo">
              <ds-tabs
                [tabs]="productTabs"
                [activeTabId]="activeProduct()"
                (tabChanged)="onProductChange($event)"
              />
              <div class="product-content">
                @switch (activeProduct()) {
                  @case ('description') {
                    <h4>Description</h4>
                    <p>MacBook Pro 16" avec puce M3 Max, 36 Go de mémoire unifiée et 1 To de stockage SSD. Écran Liquid Retina XDR avec technologie ProMotion.</p>
                    <ul class="product-features">
                      <li>Puce Apple M3 Max</li>
                      <li>Jusqu'à 22 heures d'autonomie</li>
                      <li>Écran Liquid Retina XDR 16,2"</li>
                    </ul>
                  }
                  @case ('specs') {
                    <h4>Caractéristiques techniques</h4>
                    <table class="specs-table">
                      <tr><td>Processeur</td><td>Apple M3 Max</td></tr>
                      <tr><td>Mémoire</td><td>36 Go unifiée</td></tr>
                      <tr><td>Stockage</td><td>1 To SSD</td></tr>
                      <tr><td>Écran</td><td>16,2" Liquid Retina XDR</td></tr>
                    </table>
                  }
                  @case ('reviews') {
                    <h4>Avis clients ({{ reviewsCount }})</h4>
                    <div class="reviews-summary">
                      <span class="rating">4.8/5</span>
                      <span class="count">Basé sur {{ reviewsCount }} avis</span>
                    </div>
                  }
                  @case ('qa') {
                    <h4>Questions & Réponses</h4>
                    <p>{{ qaCount }} questions ont reçu une réponse de la communauté.</p>
                  }
                }
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Wizard horizontal -->
        <div class="use-case">
          <h3 class="use-case__title">Wizard horizontal</h3>
          <p class="use-case__desc">Processus multi-étapes avec progression visuelle.</p>
          <doc-demo-container [code]="wizardCode">
            <div class="wizard-demo">
              <ds-tabs
                [tabs]="wizardTabs()"
                [activeTabId]="activeWizard()"
                (tabChanged)="onWizardChange($event)"
              />
              <div class="wizard-content">
                @switch (activeWizard()) {
                  @case ('step1') {
                    <h4>1. Informations personnelles</h4>
                    <div class="wizard-form">
                      <ds-input-field label="Prénom" [(ngModel)]="wizardData.firstName" />
                      <ds-input-field label="Nom" [(ngModel)]="wizardData.lastName" />
                    </div>
                  }
                  @case ('step2') {
                    <h4>2. Adresse de livraison</h4>
                    <div class="wizard-form">
                      <ds-input-field label="Adresse" [(ngModel)]="wizardData.address" />
                      <ds-input-field label="Ville" [(ngModel)]="wizardData.city" />
                    </div>
                  }
                  @case ('step3') {
                    <h4>3. Paiement</h4>
                    <div class="wizard-form">
                      <ds-input-field label="Numéro de carte" placeholder="4242 4242 4242 4242" />
                    </div>
                  }
                  @case ('step4') {
                    <h4>4. Confirmation</h4>
                    <div class="wizard-summary">
                      <p><strong>{{ wizardData.firstName }} {{ wizardData.lastName }}</strong></p>
                      <p>{{ wizardData.address }}, {{ wizardData.city }}</p>
                    </div>
                  }
                }
              </div>
              <div class="wizard-actions">
                @if (activeWizard() !== 'step1') {
                  <ds-button variant="ghost" (click)="previousStep()">Précédent</ds-button>
                }
                @if (activeWizard() !== 'step4') {
                  <ds-button variant="primary" (click)="nextStep()">Suivant</ds-button>
                } @else {
                  <ds-button variant="primary" (click)="completeWizard()">Confirmer</ds-button>
                }
              </div>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 7: Composition -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="grid" size="sm" />
            Composition
          </h2>
          <p class="section-desc">Combinaisons avec d'autres composants du Design System.</p>
        </div>

        <!-- Composition 1: Tabs + Table -->
        <div class="use-case">
          <h3 class="use-case__title">Tabs avec tableau</h3>
          <p class="use-case__desc">Filtrage de données par onglets avec affichage en tableau.</p>
          <doc-demo-container [code]="tabsTableCode">
            <div class="tabs-table-demo">
              <ds-tabs
                [tabs]="userStatusTabs"
                [activeTabId]="activeUserStatus()"
                (tabChanged)="onUserStatusChange($event)"
              />
              <div class="table-container">
                @if (filteredUsers().length > 0) {
                  <table class="users-table">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (user of filteredUsers(); track user.id) {
                        <tr>
                          <td>{{ user.name }}</td>
                          <td>{{ user.email }}</td>
                          <td>{{ user.role }}</td>
                          <td>
                            <ds-badge [variant]="getStatusVariant(user.status)">{{ user.status }}</ds-badge>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                } @else {
                  <div class="empty-state">
                    <p>Aucun utilisateur dans cette catégorie.</p>
                  </div>
                }
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Tabs dans Modal -->
        <div class="use-case">
          <h3 class="use-case__title">Tabs dans une modal</h3>
          <p class="use-case__desc">Navigation par onglets intégrée dans une fenêtre modale.</p>
          <doc-demo-container [code]="tabsModalCode">
            <ds-button variant="primary" (click)="openModalWithTabs()">
              Ouvrir les paramètres
            </ds-button>

            <ds-modal
              [open]="isModalOpen()"
              title="Paramètres du compte"
              size="lg"
              (closed)="closeModal()"
            >
              <ds-tabs
                [tabs]="modalTabs"
                [activeTabId]="activeModalTab()"
                (tabChanged)="onModalTabChange($event)"
              />
              <div class="modal-tab-content">
                @switch (activeModalTab()) {
                  @case ('general') {
                    <h4>Général</h4>
                    <ds-input-field label="Nom d'affichage" placeholder="Votre pseudo" />
                    <ds-input-field label="Langue" placeholder="Français" />
                  }
                  @case ('privacy') {
                    <h4>Confidentialité</h4>
                    <p>Gérez qui peut voir votre profil et vos activités.</p>
                  }
                  @case ('integrations') {
                    <h4>Intégrations</h4>
                    <p>Connectez des services tiers à votre compte.</p>
                  }
                }
              </div>
              <div class="modal-footer" slot="footer">
                <ds-button variant="ghost" (click)="closeModal()">Annuler</ds-button>
                <ds-button variant="primary" (click)="closeModal()">Enregistrer</ds-button>
              </div>
            </ds-modal>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Tabs avec recherche -->
        <div class="use-case">
          <h3 class="use-case__title">Tabs avec recherche</h3>
          <p class="use-case__desc">Barre de recherche contextuelle selon l'onglet actif.</p>
          <doc-demo-container [code]="tabsSearchCode">
            <div class="tabs-search-demo">
              <div class="tabs-search-header">
                <ds-tabs
                  [tabs]="searchContextTabs"
                  [activeTabId]="activeSearchContext()"
                  (tabChanged)="onSearchContextChange($event)"
                />
                <ds-input-field
                  [placeholder]="searchPlaceholder()"
                  [(ngModel)]="searchQuery"
                />
              </div>
              <div class="search-results">
                <p class="search-context">
                  Recherche dans : <strong>{{ activeSearchContext() }}</strong>
                  @if (searchQuery()) {
                    <span> — "{{ searchQuery() }}"</span>
                  }
                </p>
              </div>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 8: API Reference -->
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
      &:nth-child(9) { animation-delay: 400ms; }
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

    /* Tab content */
    .tab-content {
      margin-top: var(--doc-space-md, 16px);
      padding: var(--doc-space-lg, 24px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);

      h4 {
        margin: 0 0 var(--doc-space-sm, 8px) 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }

      p {
        margin: 0;
        color: var(--doc-text-secondary, #64748b);
      }
    }

    .demo-note {
      margin-top: var(--doc-space-sm, 8px);
      font-size: 0.875rem;
      color: var(--doc-text-muted, #94a3b8);
      font-style: italic;
    }

    /* Keyboard hints */
    .keyboard-hints {
      display: flex;
      gap: var(--doc-space-lg, 24px);
      margin-top: var(--doc-space-md, 16px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
    }

    .hint {
      display: flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);

      kbd {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        height: 24px;
        padding: 0 6px;
        font-family: inherit;
        font-size: 0.75rem;
        background: var(--doc-surface-inset, #e2e8f0);
        border-radius: var(--doc-radius-sm, 4px);
        border: 1px solid var(--doc-border-default, #cbd5e1);
      }
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

    /* Settings demo */
    .settings-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    .settings-panel {
      padding: var(--doc-space-lg, 24px);

      h4 {
        margin: 0 0 var(--doc-space-md, 16px) 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }

      p {
        color: var(--doc-text-secondary, #64748b);
      }
    }

    .settings-form {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
      max-width: 320px;
    }

    /* Product demo */
    .product-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    .product-content {
      padding: var(--doc-space-lg, 24px);

      h4 {
        margin: 0 0 var(--doc-space-md, 16px) 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }

      p {
        margin: 0 0 var(--doc-space-md, 16px) 0;
        color: var(--doc-text-secondary, #64748b);
        line-height: 1.6;
      }
    }

    .product-features {
      margin: 0;
      padding-left: var(--doc-space-lg, 24px);
      color: var(--doc-text-secondary, #64748b);

      li {
        margin-bottom: var(--doc-space-xs, 4px);
      }
    }

    .specs-table {
      width: 100%;
      border-collapse: collapse;

      td {
        padding: var(--doc-space-sm, 8px);
        border-bottom: 1px solid var(--doc-border-default, #e2e8f0);

        &:first-child {
          font-weight: 500;
          color: var(--doc-text-primary, #0f172a);
          width: 40%;
        }

        &:last-child {
          color: var(--doc-text-secondary, #64748b);
        }
      }
    }

    .reviews-summary {
      display: flex;
      align-items: baseline;
      gap: var(--doc-space-md, 16px);

      .rating {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-primary, #3b82f6);
      }

      .count {
        font-size: 0.875rem;
        color: var(--doc-text-muted, #94a3b8);
      }
    }

    /* Wizard demo */
    .wizard-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    .wizard-content {
      padding: var(--doc-space-lg, 24px);

      h4 {
        margin: 0 0 var(--doc-space-md, 16px) 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .wizard-form {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
      max-width: 320px;
    }

    .wizard-summary {
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);

      p {
        margin: 0 0 var(--doc-space-xs, 4px) 0;
        color: var(--doc-text-secondary, #64748b);

        strong {
          color: var(--doc-text-primary, #0f172a);
        }
      }
    }

    .wizard-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-md, 16px) var(--doc-space-lg, 24px);
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
      background: var(--doc-surface-elevated, #f8fafc);
    }

    /* Tabs + Table demo */
    .tabs-table-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    .table-container {
      padding: var(--doc-space-md, 16px);
    }

    .users-table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
        text-align: left;
      }

      th {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--doc-text-muted, #94a3b8);
        border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      }

      td {
        font-size: 0.875rem;
        color: var(--doc-text-primary, #0f172a);
        border-bottom: 1px solid var(--doc-border-subtle, #f1f5f9);
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .empty-state {
      padding: var(--doc-space-xl, 32px);
      text-align: center;
      color: var(--doc-text-muted, #94a3b8);
    }

    /* Modal tab content */
    .modal-tab-content {
      padding: var(--doc-space-lg, 24px) 0;

      h4 {
        margin: 0 0 var(--doc-space-md, 16px) 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }

      p {
        margin: 0;
        color: var(--doc-text-secondary, #64748b);
      }

      ds-input-field {
        margin-bottom: var(--doc-space-md, 16px);
      }
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--doc-space-sm, 8px);
    }

    /* Tabs with search */
    .tabs-search-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    .tabs-search-header {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);

      ds-tabs {
        flex: 1;
      }

      ds-input-field {
        width: 200px;
      }
    }

    .search-results {
      padding: var(--doc-space-lg, 24px);
    }

    .search-context {
      margin: 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);

      strong {
        color: var(--doc-text-primary, #0f172a);
      }
    }
  `]
})
export class TabsPage {
  definition = DsTabsDefinition;

  // Playground
  playgroundTabs: TabItem[] = [
    { id: 'tab1', label: 'Général' },
    { id: 'tab2', label: 'Paramètres' },
    { id: 'tab3', label: 'Avancé' },
  ];
  activePlayground = signal('tab1');

  onPlaygroundChange(tab: TabItem): void {
    this.activePlayground.set(tab.id);
  }

  // Multiple tabs
  multipleTabs: TabItem[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'products', label: 'Produits' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ];

  multipleTabsCode = `<ds-tabs
  [tabs]="[
    { id: 'home', label: 'Accueil' },
    { id: 'products', label: 'Produits' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' }
  ]"
/>`;

  // With badges
  tabsWithBadges: TabItem[] = [
    { id: 'inbox', label: 'Boîte de réception (12)' },
    { id: 'sent', label: 'Envoyés (5)' },
    { id: 'drafts', label: 'Brouillons (3)' },
    { id: 'trash', label: 'Corbeille' },
  ];
  activeWithBadges = signal('inbox');

  onBadgesTabChange(tab: TabItem): void {
    this.activeWithBadges.set(tab.id);
  }

  withBadgesCode = `<ds-tabs
  [tabs]="[
    { id: 'inbox', label: 'Boîte de réception (12)' },
    { id: 'sent', label: 'Envoyés (5)' },
    { id: 'drafts', label: 'Brouillons (3)' },
    { id: 'trash', label: 'Corbeille' }
  ]"
  activeTabId="inbox"
  (tabChanged)="onTabChange($event)"
/>`;

  // Disabled tabs
  tabsWithDisabled: TabItem[] = [
    { id: 'free', label: 'Gratuit' },
    { id: 'pro', label: 'Pro' },
    { id: 'premium', label: 'Premium', disabled: true },
    { id: 'enterprise', label: 'Enterprise' },
  ];

  disabledCode = `<ds-tabs
  [tabs]="[
    { id: 'free', label: 'Gratuit' },
    { id: 'pro', label: 'Pro' },
    { id: 'premium', label: 'Premium', disabled: true },
    { id: 'enterprise', label: 'Enterprise' }
  ]"
/>`;

  // Keyboard navigation
  keyboardTabs: TabItem[] = [
    { id: 'first', label: 'Premier' },
    { id: 'second', label: 'Deuxième' },
    { id: 'third', label: 'Troisième' },
    { id: 'fourth', label: 'Quatrième' },
  ];
  activeKeyboard = signal('first');

  onKeyboardChange(tab: TabItem): void {
    this.activeKeyboard.set(tab.id);
  }

  keyboardCode = `<ds-tabs
  [tabs]="tabs"
  [activeTabId]="activeTab()"
  (tabChanged)="onTabChange($event)"
/>

<!-- Navigation clavier supportée:
- ArrowLeft/ArrowRight: Naviguer entre onglets
- Home: Aller au premier onglet
- End: Aller au dernier onglet
- Enter/Space: Activer l'onglet focalisé
-->`;

  // Use Case 1: Settings panels
  settingsTabs: TabItem[] = [
    { id: 'profile', label: 'Profil' },
    { id: 'security', label: 'Sécurité' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'billing', label: 'Facturation' },
  ];
  activeSettings = signal('profile');

  onSettingsChange(tab: TabItem): void {
    this.activeSettings.set(tab.id);
  }

  settingsPanelCode = `<ds-tabs
  [tabs]="[
    { id: 'profile', label: 'Profil' },
    { id: 'security', label: 'Sécurité' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'billing', label: 'Facturation' }
  ]"
  [activeTabId]="activeTab()"
  (tabChanged)="onTabChange($event)"
/>

<div class="settings-panel">
  @switch (activeTab()) {
    @case ('profile') {
      <h4>Profil utilisateur</h4>
      <ds-input-field label="Nom" />
      <ds-input-field label="Email" />
      <ds-button variant="primary">Enregistrer</ds-button>
    }
    <!-- autres cas... -->
  }
</div>`;

  // Use Case 2: Product navigation
  productTabs: TabItem[] = [
    { id: 'description', label: 'Description' },
    { id: 'specs', label: 'Caractéristiques' },
    { id: 'reviews', label: 'Avis (128)' },
    { id: 'qa', label: 'Questions (24)' },
  ];
  activeProduct = signal('description');
  reviewsCount = 128;
  qaCount = 24;

  onProductChange(tab: TabItem): void {
    this.activeProduct.set(tab.id);
  }

  productNavCode = `<ds-tabs
  [tabs]="[
    { id: 'description', label: 'Description' },
    { id: 'specs', label: 'Caractéristiques' },
    { id: 'reviews', label: 'Avis (128)' },
    { id: 'qa', label: 'Questions (24)' }
  ]"
  [activeTabId]="activeProduct()"
  (tabChanged)="onProductChange($event)"
/>

<div class="product-content">
  @switch (activeProduct()) {
    @case ('description') { ... }
    @case ('specs') { ... }
    @case ('reviews') { ... }
  }
</div>`;

  // Use Case 3: Wizard horizontal
  wizardSteps = signal<WizardStep[]>([
    { id: 'step1', label: '1. Informations', completed: false },
    { id: 'step2', label: '2. Adresse', completed: false },
    { id: 'step3', label: '3. Paiement', completed: false },
    { id: 'step4', label: '4. Confirmation', completed: false },
  ]);
  activeWizard = signal('step1');
  wizardData = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
  };

  wizardTabs = computed(() =>
    this.wizardSteps().map((step) => ({
      id: step.id,
      label: step.completed ? `✓ ${step.label}` : step.label,
    }))
  );

  onWizardChange(tab: TabItem): void {
    this.activeWizard.set(tab.id);
  }

  nextStep(): void {
    const steps = this.wizardSteps();
    const currentIndex = steps.findIndex((s) => s.id === this.activeWizard());
    if (currentIndex < steps.length - 1) {
      // Mark current as completed
      this.wizardSteps.update((s) =>
        s.map((step, i) => (i === currentIndex ? { ...step, completed: true } : step))
      );
      this.activeWizard.set(steps[currentIndex + 1].id);
    }
  }

  previousStep(): void {
    const steps = this.wizardSteps();
    const currentIndex = steps.findIndex((s) => s.id === this.activeWizard());
    if (currentIndex > 0) {
      this.activeWizard.set(steps[currentIndex - 1].id);
    }
  }

  completeWizard(): void {
    this.wizardSteps.update((s) => s.map((step) => ({ ...step, completed: true })));
    alert('Commande confirmée !');
  }

  wizardCode = `// Wizard avec progression
wizardSteps = signal<WizardStep[]>([
  { id: 'step1', label: '1. Informations', completed: false },
  { id: 'step2', label: '2. Adresse', completed: false },
  { id: 'step3', label: '3. Paiement', completed: false },
  { id: 'step4', label: '4. Confirmation', completed: false }
]);

wizardTabs = computed(() =>
  this.wizardSteps().map(step => ({
    id: step.id,
    label: step.completed ? '✓ ' + step.label : step.label
  }))
);

<ds-tabs
  [tabs]="wizardTabs()"
  [activeTabId]="activeWizard()"
  (tabChanged)="onWizardChange($event)"
/>`;

  // Composition 1: Tabs + Table
  userStatusTabs: TabItem[] = [
    { id: 'all', label: 'Tous' },
    { id: 'active', label: 'Actifs' },
    { id: 'pending', label: 'En attente' },
    { id: 'inactive', label: 'Inactifs' },
  ];
  activeUserStatus = signal('all');

  users: User[] = [
    { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'Actif' },
    { id: 2, name: 'Bob Dupont', email: 'bob@example.com', role: 'Éditeur', status: 'Actif' },
    { id: 3, name: 'Claire Leroy', email: 'claire@example.com', role: 'Viewer', status: 'En attente' },
    { id: 4, name: 'David Bernard', email: 'david@example.com', role: 'Éditeur', status: 'Inactif' },
    { id: 5, name: 'Emma Petit', email: 'emma@example.com', role: 'Admin', status: 'Actif' },
  ];

  filteredUsers = computed(() => {
    const status = this.activeUserStatus();
    if (status === 'all') return this.users;

    const statusMap: Record<string, string> = {
      active: 'Actif',
      pending: 'En attente',
      inactive: 'Inactif',
    };
    return this.users.filter((u) => u.status === statusMap[status]);
  });

  onUserStatusChange(tab: TabItem): void {
    this.activeUserStatus.set(tab.id);
  }

  getStatusVariant(status: string): 'success' | 'warning' | 'error' | 'info' {
    switch (status) {
      case 'Actif':
        return 'success';
      case 'En attente':
        return 'warning';
      case 'Inactif':
        return 'error';
      default:
        return 'info';
    }
  }

  tabsTableCode = `<ds-tabs
  [tabs]="[
    { id: 'all', label: 'Tous' },
    { id: 'active', label: 'Actifs' },
    { id: 'pending', label: 'En attente' },
    { id: 'inactive', label: 'Inactifs' }
  ]"
  [activeTabId]="activeUserStatus()"
  (tabChanged)="onUserStatusChange($event)"
/>

<table>
  @for (user of filteredUsers(); track user.id) {
    <tr>
      <td>{{ user.name }}</td>
      <td><ds-badge [variant]="getStatusVariant(user.status)">{{ user.status }}</ds-badge></td>
    </tr>
  }
</table>`;

  // Composition 2: Tabs dans Modal
  isModalOpen = signal(false);
  modalTabs: TabItem[] = [
    { id: 'general', label: 'Général' },
    { id: 'privacy', label: 'Confidentialité' },
    { id: 'integrations', label: 'Intégrations' },
  ];
  activeModalTab = signal('general');

  openModalWithTabs(): void {
    this.isModalOpen.set(true);
    this.activeModalTab.set('general');
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  onModalTabChange(tab: TabItem): void {
    this.activeModalTab.set(tab.id);
  }

  tabsModalCode = `<ds-button variant="primary" (click)="openModal()">
  Ouvrir les paramètres
</ds-button>

<ds-modal
  [open]="isModalOpen()"
  title="Paramètres du compte"
  size="lg"
  (closed)="closeModal()"
>
  <ds-tabs
    [tabs]="modalTabs"
    [activeTabId]="activeTab()"
    (tabChanged)="onTabChange($event)"
  />
  <div class="modal-content">
    @switch (activeTab()) {
      @case ('general') { ... }
      @case ('privacy') { ... }
      @case ('integrations') { ... }
    }
  </div>
</ds-modal>`;

  // Composition 3: Tabs avec recherche
  searchContextTabs: TabItem[] = [
    { id: 'articles', label: 'Articles' },
    { id: 'users', label: 'Utilisateurs' },
    { id: 'files', label: 'Fichiers' },
  ];
  activeSearchContext = signal('articles');
  searchQuery = signal('');

  searchPlaceholder = computed(() => {
    const placeholders: Record<string, string> = {
      articles: 'Rechercher un article...',
      users: 'Rechercher un utilisateur...',
      files: 'Rechercher un fichier...',
    };
    return placeholders[this.activeSearchContext()];
  });

  onSearchContextChange(tab: TabItem): void {
    this.activeSearchContext.set(tab.id);
    this.searchQuery.set('');
  }

  tabsSearchCode = `<div class="tabs-search-header">
  <ds-tabs
    [tabs]="searchContextTabs"
    [activeTabId]="activeContext()"
    (tabChanged)="onContextChange($event)"
  />
  <ds-input-field
    [placeholder]="searchPlaceholder()"
    [(ngModel)]="searchQuery"
  />
</div>

// Placeholder dynamique selon l'onglet actif
searchPlaceholder = computed(() => {
  const placeholders = {
    articles: 'Rechercher un article...',
    users: 'Rechercher un utilisateur...',
    files: 'Rechercher un fichier...'
  };
  return placeholders[this.activeContext()];
});`;
}
