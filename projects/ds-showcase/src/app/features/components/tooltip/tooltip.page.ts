import { Component } from '@angular/core';
import { DsTooltip } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsTooltipDefinition } from '../../../registry/definitions/ds-tooltip.definition';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  imports: [DsTooltip, DemoContainer, PropsTable, FaIconComponent],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">{{ definition.selector }}</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Tooltip basique au survol.</p>
          <doc-demo-container [code]="definition.demos[0].code">
            <button class="demo-btn" dsTooltip="Cliquez pour enregistrer">
              Enregistrer
            </button>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">On Icons</h3>
          <p class="demo-block__desc">Tooltip sur des icônes.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-row">
              <button class="icon-btn" dsTooltip="Modifier">
                <fa-icon [icon]="faEdit" />
              </button>
              <button class="icon-btn" dsTooltip="Supprimer">
                <fa-icon [icon]="faTrash" />
              </button>
              <button class="icon-btn" dsTooltip="Télécharger">
                <fa-icon [icon]="faDownload" />
              </button>
              <button class="icon-btn" dsTooltip="Plus d'informations">
                <fa-icon [icon]="faInfoCircle" />
              </button>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">On Disabled Elements</h3>
          <p class="demo-block__desc">Tooltip sur éléments désactivés (wrapper requis).</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <span dsTooltip="Cette action n'est pas disponible actuellement">
              <button class="demo-btn" disabled>Action indisponible</button>
            </span>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Long Text</h3>
          <p class="demo-block__desc">Tooltip avec texte long.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <button
              class="demo-btn"
              dsTooltip="Cette action va exporter toutes les données au format CSV. Le fichier sera téléchargé automatiquement dans votre dossier de téléchargements."
            >
              Exporter les données
            </button>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Multiple Elements</h3>
          <p class="demo-block__desc">Plusieurs tooltips sur une même ligne.</p>
          <doc-demo-container [code]="multipleCode">
            <div class="demo-row">
              <button class="demo-btn demo-btn--secondary" dsTooltip="Annuler les modifications">
                Annuler
              </button>
              <button class="demo-btn" dsTooltip="Sauvegarder les modifications">
                Sauvegarder
              </button>
              <button class="demo-btn demo-btn--success" dsTooltip="Publier maintenant">
                Publier
              </button>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .demo-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .demo-btn {
      padding: 8px 16px; border: none; border-radius: 4px;
      background: var(--color-primary, #3b82f6); color: white; cursor: pointer;
      font-size: 0.875rem;
      &:hover:not(:disabled) { opacity: 0.9; }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
    .demo-btn--secondary {
      background: var(--background-secondary, #e5e7eb);
      color: var(--text-default, #374151);
    }
    .demo-btn--success {
      background: var(--success, #22c55e);
    }
    .icon-btn {
      width: 40px;
      height: 40px;
      padding: 0;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 4px;
      background: var(--background-panel, #ffffff);
      color: var(--text-default, #374151);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: var(--background-secondary, #f3f4f6);
      }
    }
  `]
})
export class TooltipPage {
  definition = DsTooltipDefinition;

  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;
  faInfoCircle = faInfoCircle;

  multipleCode = `<button dsTooltip="Annuler les modifications">Annuler</button>
<button dsTooltip="Sauvegarder les modifications">Sauvegarder</button>
<button dsTooltip="Publier maintenant">Publier</button>`;
}
