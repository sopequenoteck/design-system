import { Component, signal, computed } from '@angular/core';
import { DsDrawer, DrawerPosition, DrawerSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsDrawerDefinition } from '../../../registry/definitions/ds-drawer.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-drawer-page',
  standalone: true,
  imports: [DsDrawer, DemoContainer, PropsTable],
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

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Drawer avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <button class="demo-btn" (click)="openDefault()">Ouvrir le drawer</button>
            <ds-drawer
              [visible]="isDefaultOpen"
              [position]="demoPosition()"
              [size]="demoSize()"
              [closable]="demoClosable()"
              title="Détails"
              (closed)="closeDefault()"
            >
              <p>Contenu du drawer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </ds-drawer>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Left Position</h3>
          <p class="demo-block__desc">Drawer à gauche.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <button class="demo-btn" (click)="openLeft()">Ouvrir à gauche</button>
            <ds-drawer
              [visible]="isLeftOpen"
              position="left"
              title="Menu"
              (closed)="closeLeft()"
            >
              <nav class="drawer-nav">
                <a href="#">Accueil</a>
                <a href="#">Produits</a>
                <a href="#">Contact</a>
              </nav>
            </ds-drawer>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Footer</h3>
          <p class="demo-block__desc">Drawer avec footer personnalisé.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <button class="demo-btn" (click)="openWithFooter()">Ouvrir avec footer</button>
            <ds-drawer
              [visible]="isFooterOpen"
              title="Formulaire"
              (closed)="closeWithFooter()"
            >
              <div class="drawer-form">
                <label>
                  Nom
                  <input type="text" placeholder="Votre nom" />
                </label>
                <label>
                  Email
                  <input type="email" placeholder="email@exemple.com" />
                </label>
              </div>
              <ng-template #footer>
                <div class="drawer-footer">
                  <button class="demo-btn demo-btn--secondary" (click)="closeWithFooter()">Annuler</button>
                  <button class="demo-btn" (click)="saveAndClose()">Enregistrer</button>
                </div>
              </ng-template>
            </ds-drawer>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Full Width</h3>
          <p class="demo-block__desc">Drawer pleine largeur.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <button class="demo-btn" (click)="openFull()">Ouvrir pleine largeur</button>
            <ds-drawer
              [visible]="isFullOpen"
              size="full"
              title="Vue détaillée"
              (closed)="closeFull()"
            >
              <div class="full-content">
                <h4>Contenu pleine largeur</h4>
                <p>Ce drawer occupe toute la largeur de l'écran.</p>
              </div>
            </ds-drawer>
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
    .demo-btn {
      padding: 8px 16px; border: none; border-radius: 4px;
      background: var(--color-primary, #3b82f6); color: white; cursor: pointer;
      font-size: 0.875rem;
      &:hover { opacity: 0.9; }
    }
    .demo-btn--secondary {
      background: var(--background-secondary, #e5e7eb);
      color: var(--text-default, #374151);
    }
    .drawer-nav {
      display: flex;
      flex-direction: column;
      gap: 12px;
      a {
        color: var(--text-default, #374151);
        text-decoration: none;
        padding: 8px 0;
        &:hover { color: var(--color-primary, #3b82f6); }
      }
    }
    .drawer-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.875rem;
        color: var(--text-default, #374151);
      }
      input {
        padding: 8px 12px;
        border: 1px solid var(--border-default, #e5e7eb);
        border-radius: 4px;
      }
    }
    .drawer-footer {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
    .full-content {
      h4 { margin: 0 0 16px 0; }
    }
  `]
})
export class DrawerPage {
  definition = DsDrawerDefinition;

  isDefaultOpen = false;
  isLeftOpen = false;
  isFooterOpen = false;
  isFullOpen = false;

  defaultValues = signal<ControlValues>({
    position: 'right',
    size: 'md',
    closable: true,
  });

  demoPosition = computed(() => this.defaultValues()['position'] as DrawerPosition);
  demoSize = computed(() => this.defaultValues()['size'] as DrawerSize);
  demoClosable = computed(() => this.defaultValues()['closable'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  openDefault(): void { this.isDefaultOpen = true; }
  closeDefault(): void { this.isDefaultOpen = false; }

  openLeft(): void { this.isLeftOpen = true; }
  closeLeft(): void { this.isLeftOpen = false; }

  openWithFooter(): void { this.isFooterOpen = true; }
  closeWithFooter(): void { this.isFooterOpen = false; }
  saveAndClose(): void {
    console.log('Saved!');
    this.isFooterOpen = false;
  }

  openFull(): void { this.isFullOpen = true; }
  closeFull(): void { this.isFullOpen = false; }
}
