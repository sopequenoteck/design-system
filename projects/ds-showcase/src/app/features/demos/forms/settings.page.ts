import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsInputField, DsButton, DsCard, DsToggle, DsSelect, DsDivider } from 'ds-angular';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-settings-page',
  standalone: true,
  imports: [RouterLink, DsInputField, DsButton, DsCard, DsToggle, DsSelect, DsDivider],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Settings</h1>
        <p class="demo-description">Page de paramètres avec différents types de contrôles.</p>
      </header>

      <section class="demo-preview">
        <div class="demo-preview__container">
          <ds-card class="settings-card">
            <h2>Préférences</h2>

            <div class="settings-section">
              <h3>Profil</h3>
              <ds-input-field label="Nom d'affichage" value="John Doe" />
              <ds-input-field label="Email" type="email" value="john@example.com" />
            </div>

            <ds-divider />

            <div class="settings-section">
              <h3>Notifications</h3>
              <div class="setting-row">
                <span>Notifications email</span>
                <ds-toggle label="" />
              </div>
              <div class="setting-row">
                <span>Notifications push</span>
                <ds-toggle label="" />
              </div>
            </div>

            <ds-divider />

            <div class="settings-section">
              <h3>Apparence</h3>
              <ds-select label="Thème" [options]="themeOptions" />
              <ds-select label="Langue" [options]="langOptions" />
            </div>

            <div class="settings-actions">
              <ds-button variant="secondary">Annuler</ds-button>
              <ds-button variant="primary">Sauvegarder</ds-button>
            </div>
          </ds-card>
        </div>
      </section>

      <section class="demo-components">
        <h2>Composants utilisés</h2>
        <div class="component-list">
          @for (comp of usedComponents; track comp.id) {
            <a [routerLink]="comp.path" class="component-chip">{{ comp.label }}</a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 1200px; margin: 0 auto; }
    .demo-header { margin-bottom: 32px; }
    .demo-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 8px; }
    .demo-description { font-size: 1.125rem; color: var(--doc-text-secondary); margin: 0; }
    .demo-preview { background: var(--doc-surface-sunken); border-radius: 12px; padding: 32px; margin-bottom: 32px; }
    .demo-preview__container { display: flex; justify-content: center; }
    .settings-card { width: 100%; max-width: 600px; padding: 32px; }
    .settings-card h2 { margin: 0 0 24px; font-size: 1.5rem; }
    .settings-card h3 { margin: 0 0 16px; font-size: 1rem; font-weight: 600; color: var(--doc-text-secondary); }
    .settings-section { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .setting-row { display: flex; justify-content: space-between; align-items: center; }
    .settings-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
    .demo-components h2 { font-size: 1.25rem; margin: 0 0 16px; }
    .component-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .component-chip {
      padding: 4px 16px; background: var(--doc-surface-elevated); border: 1px solid var(--doc-border-default);
      border-radius: 9999px; color: var(--doc-text-primary); font-size: 0.875rem; text-decoration: none;
    }
    .component-chip:hover { border-color: var(--doc-accent-primary); color: var(--doc-accent-primary); }
  `]
})
export class SettingsDemoPage {
  themeOptions = [
    { value: 'light', label: 'Clair' },
    { value: 'dark', label: 'Sombre' },
    { value: 'system', label: 'Système' },
  ];
  langOptions = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
  ];
  usedComponents: UsedComponent[] = [
    { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
    { id: 'ds-input-field', label: 'Input Field', path: '/components/forms/text-inputs/ds-input-field' },
    { id: 'ds-toggle', label: 'Toggle', path: '/components/forms/selection/ds-toggle' },
    { id: 'ds-select', label: 'Select', path: '/components/forms/pickers/ds-select' },
    { id: 'ds-divider', label: 'Divider', path: '/components/layout/ds-divider' },
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
  ];
}
