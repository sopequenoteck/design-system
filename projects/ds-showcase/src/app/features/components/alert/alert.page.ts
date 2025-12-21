import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsAlert, DsButton, DsInputField, DsCard } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsAlertDefinition } from '../../../registry/definitions/ds-alert.definition';
import { ControlValues } from '../../../registry/types';

import { UsedInSection } from '../../../shared/used-in/used-in-section';
type AlertType = 'success' | 'warning' | 'error' | 'info';
type SizeType = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-alert-page',
  standalone: true,
  imports: [FormsModule, DsAlert, DsButton, DsInputField, DsCard, DemoContainer, PropsTable, ComponentPageHeader, DocIcon, UsedInSection],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="feedback"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-alert"
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
          <ds-alert
            [type]="demoType()"
            [size]="demoSize()"
            [showIcon]="demoShowIcon()"
            [closable]="demoClosable()"
            (closed)="onClose()"
          >
            Ceci est un message d'alerte avec du contenu informatif.
          </ds-alert>
        </doc-demo-container>
      </section>

      <!-- Section 2: Types -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Types</h2>
          <p class="section-desc">Les quatre types de feedback visuel disponibles.</p>
        </div>

        <doc-demo-container [code]="typesCode">
          <div class="demo-stack">
            <ds-alert type="success">✓ Opération réussie ! Vos modifications ont été enregistrées.</ds-alert>
            <ds-alert type="warning">⚠ Attention : cette action est irréversible.</ds-alert>
            <ds-alert type="error">✕ Une erreur est survenue. Veuillez réessayer.</ds-alert>
            <ds-alert type="info">ℹ Information : une mise à jour est disponible.</ds-alert>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Trois tailles pour s'adapter à différents contextes.</p>
        </div>

        <doc-demo-container [code]="sizesCode">
          <div class="demo-stack">
            <ds-alert type="info" size="sm">Petite alerte pour informations secondaires</ds-alert>
            <ds-alert type="info" size="md">Alerte de taille moyenne (par défaut)</ds-alert>
            <ds-alert type="info" size="lg">Grande alerte pour messages importants</ds-alert>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Avec fermeture -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Avec fermeture</h2>
          <p class="section-desc">Permettez à l'utilisateur de fermer l'alerte.</p>
        </div>

        <doc-demo-container [code]="closableCode">
          @if (!alertClosed()) {
            <ds-alert
              type="warning"
              [closable]="true"
              (closed)="alertClosed.set(true)"
            >
              Cette alerte peut être fermée par l'utilisateur.
            </ds-alert>
          } @else {
            <div class="closed-state">
              <span>Alerte fermée</span>
              <ds-button variant="secondary" size="sm" (click)="alertClosed.set(false)">Réafficher</ds-button>
            </div>
          }
        </doc-demo-container>
      </section>

      <!-- Section 5: Sans icône -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Sans icône</h2>
          <p class="section-desc">Masquez l'icône pour un style plus minimaliste.</p>
        </div>

        <doc-demo-container [code]="noIconCode">
          <div class="demo-stack">
            <ds-alert type="success" [showIcon]="false">Message de succès sans icône</ds-alert>
            <ds-alert type="info" [showIcon]="false">Message d'information sans icône</ds-alert>
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

        <!-- Use Case 1: Message système -->
        <div class="use-case">
          <h3 class="use-case__title">Messages système</h3>
          <p class="use-case__desc">Alertes globales pour informer les utilisateurs d'événements système.</p>
          <doc-demo-container [code]="systemMessageCode">
            <div class="demo-stack">
              @if (showUpdateAlert()) {
                <ds-alert type="info" [closable]="true" (closed)="showUpdateAlert.set(false)">
                  <strong>Nouvelle version disponible !</strong> Rafraîchissez la page pour bénéficier des dernières fonctionnalités.
                </ds-alert>
              }
              @if (showMaintenanceAlert()) {
                <ds-alert type="warning" [closable]="true" (closed)="showMaintenanceAlert.set(false)">
                  <strong>Maintenance prévue</strong> le 25 décembre de 2h à 4h. Certains services seront indisponibles.
                </ds-alert>
              }
              <div class="demo-row">
                <ds-button variant="ghost" size="sm" (click)="showUpdateAlert.set(true)">Afficher update</ds-button>
                <ds-button variant="ghost" size="sm" (click)="showMaintenanceAlert.set(true)">Afficher maintenance</ds-button>
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Validation de formulaire -->
        <div class="use-case">
          <h3 class="use-case__title">Validation de formulaire</h3>
          <p class="use-case__desc">Afficher le résultat de validation après soumission.</p>
          <doc-demo-container [code]="formValidationCode">
            <div class="form-demo">
              <ds-input-field
                label="Email"
                type="email"
                [(ngModel)]="formEmail"
                placeholder="votre@email.com"
                [required]="true"
              />
              <ds-input-field
                label="Mot de passe"
                type="password"
                [(ngModel)]="formPassword"
                placeholder="Minimum 8 caractères"
                [required]="true"
              />
              <ds-button variant="primary" (click)="validateForm()">Valider</ds-button>

              @if (formValidationResult()) {
                <ds-alert
                  [type]="formValidationResult()!.type"
                  [closable]="true"
                  (closed)="formValidationResult.set(null)"
                >
                  {{ formValidationResult()!.message }}
                </ds-alert>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Page de maintenance -->
        <div class="use-case">
          <h3 class="use-case__title">Page de maintenance</h3>
          <p class="use-case__desc">Bannière d'alerte en haut de page lors d'une maintenance.</p>
          <doc-demo-container [code]="maintenancePageCode">
            <div class="maintenance-demo">
              <ds-alert type="warning" size="lg">
                <div class="maintenance-content">
                  <strong>🔧 Maintenance en cours</strong>
                  <p>Nous effectuons des mises à jour. Temps estimé : 30 minutes.</p>
                  <div class="maintenance-status">
                    <span class="status-dot"></span>
                    Progression : 65%
                  </div>
                </div>
              </ds-alert>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 4: Alertes contextuelles -->
        <div class="use-case">
          <h3 class="use-case__title">Alertes contextuelles</h3>
          <p class="use-case__desc">Différents types d'alertes selon le contexte d'utilisation.</p>
          <doc-demo-container [code]="contextualCode">
            <div class="demo-stack">
              <ds-alert type="success" size="sm">
                ✓ Email de confirmation envoyé à user@example.com
              </ds-alert>
              <ds-alert type="warning" size="sm">
                ⚠ Votre abonnement expire dans 3 jours
              </ds-alert>
              <ds-alert type="error" size="sm">
                ✕ Impossible de charger les données. <a href="#">Réessayer</a>
              </ds-alert>
              <ds-alert type="info" size="sm">
                ℹ Astuce : utilisez Ctrl+S pour sauvegarder rapidement
              </ds-alert>
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

        <!-- Composition 1: Alert dans Card -->
        <div class="use-case">
          <h3 class="use-case__title">Alert dans Card</h3>
          <p class="use-case__desc">Intégrer une alerte dans une carte pour un contexte spécifique.</p>
          <doc-demo-container [code]="alertInCardCode">
            <ds-card variant="outlined" class="account-card">
              <div class="account-header">
                <h4>Mon compte</h4>
                <span class="account-status">Actif</span>
              </div>
              <ds-alert type="warning" size="sm">
                Votre mot de passe n'a pas été changé depuis 90 jours.
                <a href="#">Modifier maintenant</a>
              </ds-alert>
              <div class="account-info">
                <div class="info-row">
                  <span>Email</span>
                  <strong>user@example.com</strong>
                </div>
                <div class="info-row">
                  <span>Dernière connexion</span>
                  <strong>Aujourd'hui, 14:30</strong>
                </div>
              </div>
            </ds-card>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Banner sticky -->
        <div class="use-case">
          <h3 class="use-case__title">Banner sticky</h3>
          <p class="use-case__desc">Alerte fixée en haut de page qui persiste lors du scroll.</p>
          <doc-demo-container [code]="stickyBannerCode">
            <div class="sticky-demo">
              @if (showStickyBanner()) {
                <div class="sticky-banner">
                  <ds-alert type="info" [closable]="true" (closed)="showStickyBanner.set(false)">
                    <div class="banner-content">
                      <span>🎉 <strong>Offre spéciale :</strong> -20% sur tous les produits avec le code NOEL2025</span>
                      <ds-button variant="secondary" size="sm">En profiter</ds-button>
                    </div>
                  </ds-alert>
                </div>
              }
              <div class="page-content">
                <p>Contenu de la page qui défile sous la bannière...</p>
                <p>La bannière reste visible en haut de l'écran.</p>
                @if (!showStickyBanner()) {
                  <ds-button variant="ghost" (click)="showStickyBanner.set(true)">
                    Réafficher la bannière
                  </ds-button>
                }
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Stack d'alertes -->
        <div class="use-case">
          <h3 class="use-case__title">Stack d'alertes</h3>
          <p class="use-case__desc">Plusieurs alertes empilées pour différents messages.</p>
          <doc-demo-container [code]="alertStackCode">
            <div class="demo-stack">
              @for (alert of visibleAlerts(); track alert.id) {
                <ds-alert
                  [type]="alert.type"
                  [closable]="true"
                  (closed)="dismissAlert(alert.id)"
                >
                  {{ alert.message }}
                </ds-alert>
              }
              @if (visibleAlerts().length === 0) {
                <div class="no-alerts">
                  <span>Aucune alerte</span>
                </div>
              }
              <div class="demo-row">
                <ds-button variant="success" size="sm" (click)="addAlert('success')">+ Succès</ds-button>
                <ds-button variant="warning" size="sm" (click)="addAlert('warning')">+ Warning</ds-button>
                <ds-button variant="error" size="sm" (click)="addAlert('error')">+ Error</ds-button>
                <ds-button variant="info" size="sm" (click)="addAlert('info')">+ Info</ds-button>
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 4: Alert avec actions -->
        <div class="use-case">
          <h3 class="use-case__title">Alert avec actions</h3>
          <p class="use-case__desc">Ajouter des boutons d'action dans l'alerte.</p>
          <doc-demo-container [code]="alertWithActionsCode">
            <ds-alert type="info" size="lg">
              <div class="alert-with-actions">
                <div class="alert-content">
                  <strong>Mise à jour disponible</strong>
                  <p>Une nouvelle version (v2.5.0) est disponible avec des améliorations de performance.</p>
                </div>
                <div class="alert-actions">
                  <ds-button variant="ghost" size="sm">Plus tard</ds-button>
                  <ds-button variant="primary" size="sm">Mettre à jour</ds-button>
                </div>
              </div>
            </ds-alert>
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

      <!-- Utilisé dans -->
      <doc-used-in-section [componentId]="definition.id" />
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

    .demo-stack {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--doc-space-sm, 8px);
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

    /* Closed state */
    .closed-state {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px dashed var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
      color: var(--doc-text-muted, #94a3b8);
    }

    /* Form demo */
    .form-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
      max-width: 400px;
    }

    /* Maintenance content */
    .maintenance-demo {
      max-width: 600px;
    }

    .maintenance-content {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-sm, 8px);

      p {
        margin: 0;
      }
    }

    .maintenance-status {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      font-size: 0.875rem;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: var(--success, #22c55e);
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Account card */
    .account-card {
      max-width: 400px;
    }

    .account-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--doc-space-md, 16px);

      h4 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .account-status {
      padding: 2px 8px;
      font-size: 0.75rem;
      font-weight: 500;
      background: rgba(34, 197, 94, 0.1);
      color: var(--success, #22c55e);
      border-radius: 9999px;
    }

    .account-info {
      margin-top: var(--doc-space-md, 16px);
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: var(--doc-space-sm, 8px) 0;
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      font-size: 0.875rem;

      &:last-child {
        border-bottom: none;
      }

      span {
        color: var(--doc-text-muted, #64748b);
      }

      strong {
        color: var(--doc-text-primary, #0f172a);
      }
    }

    /* Sticky banner demo */
    .sticky-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
      overflow: hidden;
      max-height: 200px;
      overflow-y: auto;
    }

    .sticky-banner {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .banner-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--doc-space-md, 16px);
      flex-wrap: wrap;
    }

    .page-content {
      padding: var(--doc-space-lg, 24px);

      p {
        margin: 0 0 var(--doc-space-md, 16px) 0;
        color: var(--doc-text-secondary, #64748b);
      }
    }

    /* No alerts */
    .no-alerts {
      padding: var(--doc-space-lg, 24px);
      text-align: center;
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px dashed var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
      color: var(--doc-text-muted, #94a3b8);
    }

    /* Alert with actions */
    .alert-with-actions {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);

      @media (min-width: 576px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .alert-content {
      flex: 1;

      strong {
        display: block;
        margin-bottom: var(--doc-space-xs, 4px);
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        opacity: 0.9;
      }
    }

    .alert-actions {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      flex-shrink: 0;
    }
  `]
})
export class AlertPage {
  definition = DsAlertDefinition;

  // Playground state
  alertClosed = signal(false);
  defaultValues = signal<ControlValues>({
    type: 'info',
    size: 'md',
    showIcon: true,
    closable: false,
  });

  demoType = computed(() => this.defaultValues()['type'] as AlertType);
  demoSize = computed(() => this.defaultValues()['size'] as SizeType);
  demoShowIcon = computed(() => this.defaultValues()['showIcon'] as boolean);
  demoClosable = computed(() => this.defaultValues()['closable'] as boolean);

  // Use Case: System messages
  showUpdateAlert = signal(true);
  showMaintenanceAlert = signal(true);

  // Use Case: Form validation
  formEmail = '';
  formPassword = '';
  formValidationResult = signal<{ type: AlertType; message: string } | null>(null);

  // Composition: Sticky banner
  showStickyBanner = signal(true);

  // Composition: Alert stack
  private alertCounter = 0;
  alerts = signal<{ id: number; type: AlertType; message: string }[]>([
    { id: 1, type: 'info', message: 'Bienvenue ! Découvrez les nouvelles fonctionnalités.' },
    { id: 2, type: 'warning', message: 'Votre session expire dans 5 minutes.' },
  ]);

  visibleAlerts = computed(() => this.alerts());

  // Methods
  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onClose(): void {
    console.log('Alert closed');
  }

  validateForm(): void {
    if (!this.formEmail || !this.formEmail.includes('@')) {
      this.formValidationResult.set({
        type: 'error',
        message: 'Veuillez entrer une adresse email valide.',
      });
      return;
    }

    if (!this.formPassword || this.formPassword.length < 8) {
      this.formValidationResult.set({
        type: 'error',
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
      });
      return;
    }

    this.formValidationResult.set({
      type: 'success',
      message: 'Formulaire validé avec succès !',
    });
    this.formEmail = '';
    this.formPassword = '';
  }

  addAlert(type: AlertType): void {
    this.alertCounter++;
    const messages: Record<AlertType, string> = {
      success: 'Opération réussie !',
      warning: 'Attention requise',
      error: 'Une erreur est survenue',
      info: 'Nouvelle information',
    };

    this.alerts.update(alerts => [
      ...alerts,
      { id: this.alertCounter, type, message: `${messages[type]} (${this.alertCounter})` },
    ]);
  }

  dismissAlert(id: number): void {
    this.alerts.update(alerts => alerts.filter(a => a.id !== id));
  }

  // Code snippets
  typesCode = `<ds-alert type="success">Opération réussie !</ds-alert>
<ds-alert type="warning">Attention à cette action.</ds-alert>
<ds-alert type="error">Une erreur est survenue.</ds-alert>
<ds-alert type="info">Information importante.</ds-alert>`;

  sizesCode = `<ds-alert type="info" size="sm">Petite alerte</ds-alert>
<ds-alert type="info" size="md">Alerte moyenne (défaut)</ds-alert>
<ds-alert type="info" size="lg">Grande alerte</ds-alert>`;

  closableCode = `<ds-alert
  type="warning"
  [closable]="true"
  (closed)="onClose()"
>
  Cette alerte peut être fermée.
</ds-alert>`;

  noIconCode = `<ds-alert type="success" [showIcon]="false">
  Message sans icône
</ds-alert>`;

  systemMessageCode = `// Messages système globaux
@if (showUpdateAlert) {
  <ds-alert type="info" [closable]="true" (closed)="showUpdateAlert = false">
    <strong>Nouvelle version disponible !</strong>
    Rafraîchissez la page pour les dernières fonctionnalités.
  </ds-alert>
}

@if (showMaintenanceAlert) {
  <ds-alert type="warning" [closable]="true" (closed)="showMaintenanceAlert = false">
    <strong>Maintenance prévue</strong> le 25 décembre de 2h à 4h.
  </ds-alert>
}`;

  formValidationCode = `// Validation de formulaire avec feedback
validateForm(): void {
  if (!this.email.includes('@')) {
    this.validationResult = { type: 'error', message: 'Email invalide' };
    return;
  }
  if (this.password.length < 8) {
    this.validationResult = { type: 'error', message: 'Mot de passe trop court' };
    return;
  }
  this.validationResult = { type: 'success', message: 'Formulaire validé !' };
}

<ds-alert [type]="validationResult.type" [closable]="true">
  {{ validationResult.message }}
</ds-alert>`;

  maintenancePageCode = `// Bannière de maintenance
<ds-alert type="warning" size="lg">
  <div class="maintenance-content">
    <strong>🔧 Maintenance en cours</strong>
    <p>Temps estimé : 30 minutes.</p>
    <div class="status">
      <span class="dot"></span>
      Progression : 65%
    </div>
  </div>
</ds-alert>`;

  contextualCode = `// Alertes contextuelles
<ds-alert type="success" size="sm">
  ✓ Email envoyé à user@example.com
</ds-alert>
<ds-alert type="warning" size="sm">
  ⚠ Abonnement expire dans 3 jours
</ds-alert>
<ds-alert type="error" size="sm">
  ✕ Impossible de charger les données
</ds-alert>`;

  alertInCardCode = `// Alert dans une Card
<ds-card variant="outlined">
  <h4>Mon compte</h4>
  <ds-alert type="warning" size="sm">
    Mot de passe non changé depuis 90 jours.
    <a href="#">Modifier</a>
  </ds-alert>
  <div class="account-info">
    <span>Email: user@example.com</span>
  </div>
</ds-card>`;

  stickyBannerCode = `// Banner sticky en haut de page
<div class="sticky-banner" style="position: sticky; top: 0;">
  <ds-alert type="info" [closable]="true" (closed)="hideBanner()">
    <div class="banner-content">
      <span>🎉 Offre spéciale : -20% avec le code NOEL2025</span>
      <ds-button variant="secondary" size="sm">En profiter</ds-button>
    </div>
  </ds-alert>
</div>`;

  alertStackCode = `// Stack d'alertes dynamiques
alerts = signal<Alert[]>([]);

addAlert(type: AlertType): void {
  this.alerts.update(a => [...a, { id: ++this.counter, type, message: '...' }]);
}

dismissAlert(id: number): void {
  this.alerts.update(a => a.filter(alert => alert.id !== id));
}

@for (alert of alerts(); track alert.id) {
  <ds-alert [type]="alert.type" [closable]="true" (closed)="dismissAlert(alert.id)">
    {{ alert.message }}
  </ds-alert>
}`;

  alertWithActionsCode = `// Alert avec boutons d'action
<ds-alert type="info" size="lg">
  <div class="alert-with-actions">
    <div class="content">
      <strong>Mise à jour disponible</strong>
      <p>Version 2.5.0 avec améliorations de performance.</p>
    </div>
    <div class="actions">
      <ds-button variant="ghost" size="sm">Plus tard</ds-button>
      <ds-button variant="primary" size="sm">Mettre à jour</ds-button>
    </div>
  </div>
</ds-alert>`;
}
