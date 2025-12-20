import { Component, signal, computed } from '@angular/core';
import { DsDropdown, DropdownItem, DropdownPosition, ButtonVariant, ButtonSize, DsButton, DsAvatar } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsDropdownDefinition } from '../../../registry/definitions/ds-dropdown.definition';
import { ControlValues } from '../../../registry/types';
import { faEdit, faTrash, faDownload, faUser, faCog, faSignOutAlt, faEllipsisV, faCopy, faShare, faArchive, faBell, faShield, faPalette, faLanguage, faStar, faFlag, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown-page',
  standalone: true,
  imports: [DsDropdown, DsButton, DsAvatar, DemoContainer, PropsTable, ComponentPageHeader, DocIcon],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="overlays"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-dropdown"
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
          <ds-dropdown
            [dropdownItems]="items"
            [type]="demoType()"
            [size]="demoSize()"
            [position]="demoPosition()"
            (selectedItemChanged)="onSelect($event)"
          >
            Sélectionner
          </ds-dropdown>
        </doc-demo-container>
      </section>

      <!-- Section 2: Variantes -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Variantes</h2>
          <p class="section-desc">Toutes les variantes de style disponibles.</p>
        </div>

        <doc-demo-container [code]="variantsCode">
          <div class="demo-row">
            <ds-dropdown [dropdownItems]="items" type="primary">Primary</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" type="secondary">Secondary</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" type="success">Success</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" type="warning">Warning</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" type="error">Error</ds-dropdown>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Les trois tailles disponibles : small, medium et large.</p>
        </div>

        <doc-demo-container [code]="sizesCode">
          <div class="demo-row demo-row--align-center">
            <ds-dropdown [dropdownItems]="items" size="sm">Small</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" size="md">Medium</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" size="lg">Large</ds-dropdown>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Apparences -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Apparences</h2>
          <p class="section-desc">Style solid (plein) ou outline (bordure).</p>
        </div>

        <doc-demo-container [code]="appearancesCode">
          <div class="demo-row">
            <ds-dropdown [dropdownItems]="items" variant="solid" type="primary">Solid</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" variant="outline" type="primary">Outline</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" variant="outline" type="secondary">Outline Secondary</ds-dropdown>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 5: Avec icônes -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Avec icônes</h2>
          <p class="section-desc">Items avec icônes pour une meilleure identification visuelle.</p>
        </div>

        <doc-demo-container [code]="iconsCode">
          <ds-dropdown
            [dropdownItems]="itemsWithIcons"
            [dropdownStartIcon]="faUser"
            (selectedItemChanged)="onSelect($event)"
          >
            Actions
          </ds-dropdown>
        </doc-demo-container>
      </section>

      <!-- Section 6: Positions -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Positions</h2>
          <p class="section-desc">Direction d'ouverture du menu.</p>
        </div>

        <doc-demo-container [code]="positionsCode">
          <div class="demo-row">
            <ds-dropdown [dropdownItems]="items" position="bottom">Bottom ↓</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" position="top">Top ↑</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" position="right">Right →</ds-dropdown>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 7: États -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">États</h2>
          <p class="section-desc">États disabled et loading.</p>
        </div>

        <doc-demo-container [code]="statesCode">
          <div class="demo-row">
            <ds-dropdown [dropdownItems]="items" [disabled]="true">Disabled</ds-dropdown>
            <ds-dropdown [dropdownItems]="items" [loading]="true">Loading</ds-dropdown>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 8: Use Cases -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="zap" size="sm" />
            Use Cases
          </h2>
          <p class="section-desc">Scénarios d'utilisation concrets dans une application.</p>
        </div>

        <!-- Use Case 1: Actions contextuelles -->
        <div class="use-case">
          <h3 class="use-case__title">Actions contextuelles</h3>
          <p class="use-case__desc">Menu d'actions sur un élément (modifier, supprimer, partager).</p>
          <doc-demo-container [code]="contextActionsCode">
            <div class="context-demo">
              <div class="item-card">
                <div class="item-card__content">
                  <span class="item-card__title">Document_rapport_Q4.pdf</span>
                  <span class="item-card__meta">2.4 MB • Modifié il y a 2h</span>
                </div>
                <ds-dropdown
                  [dropdownItems]="contextActions"
                  variant="outline"
                  type="secondary"
                  size="sm"
                  (selectedItemChanged)="onContextAction($event)"
                >
                  Actions
                </ds-dropdown>
              </div>
              @if (lastContextAction()) {
                <p class="action-feedback">Action : {{ lastContextAction() }}</p>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Menu utilisateur -->
        <div class="use-case">
          <h3 class="use-case__title">Menu utilisateur</h3>
          <p class="use-case__desc">Menu de profil avec avatar et options de compte.</p>
          <doc-demo-container [code]="userMenuCode">
            <ds-dropdown
              [dropdownItems]="userMenuItems"
              variant="outline"
              type="secondary"
              (selectedItemChanged)="onUserMenuAction($event)"
            >
              <div class="user-trigger">
                <ds-avatar
                  name="Marie Laurent"
                  size="sm"
                  shape="circle"
                />
                <span class="user-trigger__name">Marie Laurent</span>
              </div>
            </ds-dropdown>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: More actions -->
        <div class="use-case">
          <h3 class="use-case__title">More actions (⋮)</h3>
          <p class="use-case__desc">Bouton "trois points" pour actions secondaires.</p>
          <doc-demo-container [code]="moreActionsCode">
            <div class="more-actions-demo">
              <div class="notification-item">
                <div class="notification-item__content">
                  <strong>Nouvelle mise à jour disponible</strong>
                  <span>Version 2.5.0 avec correctifs de sécurité</span>
                </div>
                <ds-dropdown
                  [dropdownItems]="moreActions"
                  [dropdownStartIcon]="faEllipsisV"
                  variant="outline"
                  type="secondary"
                  size="sm"
                  (selectedItemChanged)="onMoreAction($event)"
                >
                </ds-dropdown>
              </div>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 9: Composition -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="grid" size="sm" />
            Composition
          </h2>
          <p class="section-desc">Combinaisons avec d'autres composants du Design System.</p>
        </div>

        <!-- Composition 1: Dropdown + Avatar (Menu header) -->
        <div class="use-case">
          <h3 class="use-case__title">Header avec menu utilisateur</h3>
          <p class="use-case__desc">Dropdown intégré dans une barre de navigation.</p>
          <doc-demo-container [code]="headerMenuCode">
            <div class="header-demo">
              <div class="header-demo__logo">MonApp</div>
              <div class="header-demo__nav">
                <ds-button variant="ghost" size="sm">Dashboard</ds-button>
                <ds-button variant="ghost" size="sm">Projets</ds-button>
                <ds-button variant="ghost" size="sm">Équipe</ds-button>
              </div>
              <ds-dropdown
                [dropdownItems]="headerUserItems"
                variant="outline"
                type="secondary"
                size="sm"
                (selectedItemChanged)="onHeaderAction($event)"
              >
                <div class="header-user">
                  <ds-avatar name="Jean Dupont" size="sm" shape="circle" />
                </div>
              </ds-dropdown>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Dropdown dans Table row -->
        <div class="use-case">
          <h3 class="use-case__title">Actions dans tableau</h3>
          <p class="use-case__desc">Dropdown d'actions sur chaque ligne de tableau.</p>
          <doc-demo-container [code]="tableActionsCode">
            <div class="table-demo">
              <table class="demo-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @for (user of tableUsers; track user.email) {
                    <tr>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td><span class="role-badge">{{ user.role }}</span></td>
                      <td>
                        <ds-dropdown
                          [dropdownItems]="tableActions"
                          [dropdownStartIcon]="faEllipsisV"
                          variant="outline"
                          type="secondary"
                          size="sm"
                          (selectedItemChanged)="onTableAction($event, user)"
                        >
                        </ds-dropdown>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Toolbar avec dropdowns -->
        <div class="use-case">
          <h3 class="use-case__title">Toolbar avec filtres</h3>
          <p class="use-case__desc">Plusieurs dropdowns dans une barre d'outils.</p>
          <doc-demo-container [code]="toolbarCode">
            <div class="toolbar-demo">
              <ds-dropdown
                [dropdownItems]="statusFilters"
                variant="outline"
                type="secondary"
                size="sm"
                (selectedItemChanged)="onStatusFilter($event)"
              >
                Statut: {{ selectedStatus() || 'Tous' }}
              </ds-dropdown>
              <ds-dropdown
                [dropdownItems]="dateFilters"
                variant="outline"
                type="secondary"
                size="sm"
                (selectedItemChanged)="onDateFilter($event)"
              >
                Date: {{ selectedDate() || 'Toutes' }}
              </ds-dropdown>
              <ds-dropdown
                [dropdownItems]="sortOptions"
                variant="outline"
                type="secondary"
                size="sm"
                (selectedItemChanged)="onSort($event)"
              >
                Tri: {{ selectedSort() || 'Récent' }}
              </ds-dropdown>
              <div class="toolbar-demo__spacer"></div>
              <ds-button variant="primary" size="sm">Appliquer</ds-button>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 10: API Reference -->
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
      &:nth-child(10) { animation-delay: 450ms; }
      &:nth-child(11) { animation-delay: 500ms; }
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

    .demo-row--align-center {
      align-items: center;
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

    /* Context actions demo */
    .context-demo {
      max-width: 450px;
    }

    .item-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
    }

    .item-card__content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .item-card__title {
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
    }

    .item-card__meta {
      font-size: 0.75rem;
      color: var(--doc-text-muted, #94a3b8);
    }

    .action-feedback {
      margin: var(--doc-space-md, 16px) 0 0 0;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--color-primary-light, #eff6ff);
      border-radius: var(--doc-radius-md, 8px);
      font-size: 0.875rem;
      color: var(--color-primary, #3b82f6);
    }

    /* User trigger */
    .user-trigger {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
    }

    .user-trigger__name {
      font-weight: 500;
    }

    /* More actions demo */
    .more-actions-demo {
      max-width: 500px;
    }

    .notification-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
    }

    .notification-item__content {
      display: flex;
      flex-direction: column;
      gap: 4px;

      strong {
        color: var(--doc-text-primary, #0f172a);
      }

      span {
        font-size: 0.875rem;
        color: var(--doc-text-muted, #94a3b8);
      }
    }

    /* Header demo */
    .header-demo {
      display: flex;
      align-items: center;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
    }

    .header-demo__logo {
      font-weight: 700;
      font-size: 1.125rem;
      color: var(--color-primary, #3b82f6);
      margin-right: var(--doc-space-xl, 32px);
    }

    .header-demo__nav {
      display: flex;
      gap: var(--doc-space-xs, 4px);
      flex: 1;
    }

    .header-user {
      display: flex;
      align-items: center;
    }

    /* Table demo */
    .table-demo {
      overflow-x: auto;
    }

    .demo-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;

      th, td {
        padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
        text-align: left;
        border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      }

      th {
        font-weight: 600;
        color: var(--doc-text-muted, #64748b);
        background: var(--doc-surface-elevated, #f8fafc);
      }

      td {
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .role-badge {
      display: inline-block;
      padding: 2px 8px;
      font-size: 0.75rem;
      font-weight: 500;
      background: var(--color-primary-light, #eff6ff);
      color: var(--color-primary, #3b82f6);
      border-radius: 9999px;
    }

    /* Toolbar demo */
    .toolbar-demo {
      display: flex;
      flex-wrap: wrap;
      gap: var(--doc-space-sm, 8px);
      align-items: center;
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
    }

    .toolbar-demo__spacer {
      flex: 1;
    }
  `]
})
export class DropdownPage {
  definition = DsDropdownDefinition;

  // FontAwesome icons
  faUser = faUser;
  faEllipsisV = faEllipsisV;

  // Basic items
  items: DropdownItem[] = [
    { code: 'option1', label: 'Option 1' },
    { code: 'option2', label: 'Option 2' },
    { code: 'option3', label: 'Option 3' },
  ];

  itemsWithIcons: DropdownItem[] = [
    { code: 'edit', label: 'Modifier', startIcon: faEdit },
    { code: 'download', label: 'Télécharger', startIcon: faDownload },
    { code: 'delete', label: 'Supprimer', startIcon: faTrash },
  ];

  // Use Case: Context actions
  contextActions: DropdownItem[] = [
    { code: 'edit', label: 'Modifier', startIcon: faEdit },
    { code: 'download', label: 'Télécharger', startIcon: faDownload },
    { code: 'share', label: 'Partager', startIcon: faShare },
    { code: 'copy', label: 'Copier le lien', startIcon: faCopy },
    { code: 'archive', label: 'Archiver', startIcon: faArchive },
    { code: 'delete', label: 'Supprimer', startIcon: faTrash },
  ];

  // Use Case: User menu
  userMenuItems: DropdownItem[] = [
    { code: 'profile', label: 'Mon profil', startIcon: faUser },
    { code: 'settings', label: 'Paramètres', startIcon: faCog },
    { code: 'notifications', label: 'Notifications', startIcon: faBell },
    { code: 'security', label: 'Sécurité', startIcon: faShield },
    { code: 'logout', label: 'Déconnexion', startIcon: faSignOutAlt },
  ];

  // Use Case: More actions
  moreActions: DropdownItem[] = [
    { code: 'star', label: 'Marquer important', startIcon: faStar },
    { code: 'flag', label: 'Signaler', startIcon: faFlag },
    { code: 'hide', label: 'Masquer', startIcon: faEyeSlash },
  ];

  // Composition: Header user menu
  headerUserItems: DropdownItem[] = [
    { code: 'profile', label: 'Mon profil', startIcon: faUser },
    { code: 'settings', label: 'Paramètres', startIcon: faCog },
    { code: 'theme', label: 'Thème', startIcon: faPalette },
    { code: 'language', label: 'Langue', startIcon: faLanguage },
    { code: 'logout', label: 'Déconnexion', startIcon: faSignOutAlt },
  ];

  // Composition: Table actions
  tableUsers = [
    { name: 'Marie Laurent', email: 'marie@example.com', role: 'Admin' },
    { name: 'Jean Dupont', email: 'jean@example.com', role: 'Éditeur' },
    { name: 'Sophie Martin', email: 'sophie@example.com', role: 'Lecteur' },
  ];

  tableActions: DropdownItem[] = [
    { code: 'edit', label: 'Modifier', startIcon: faEdit },
    { code: 'permissions', label: 'Permissions', startIcon: faShield },
    { code: 'delete', label: 'Supprimer', startIcon: faTrash },
  ];

  // Composition: Toolbar filters
  statusFilters: DropdownItem[] = [
    { code: 'all', label: 'Tous' },
    { code: 'active', label: 'Actif' },
    { code: 'pending', label: 'En attente' },
    { code: 'closed', label: 'Fermé' },
  ];

  dateFilters: DropdownItem[] = [
    { code: 'all', label: 'Toutes' },
    { code: 'today', label: "Aujourd'hui" },
    { code: 'week', label: 'Cette semaine' },
    { code: 'month', label: 'Ce mois' },
  ];

  sortOptions: DropdownItem[] = [
    { code: 'recent', label: 'Plus récent' },
    { code: 'oldest', label: 'Plus ancien' },
    { code: 'name', label: 'Nom A-Z' },
    { code: 'name-desc', label: 'Nom Z-A' },
  ];

  // Playground state
  defaultValues = signal<ControlValues>({
    type: 'primary',
    size: 'md',
    position: 'bottom',
  });

  demoType = computed(() => this.defaultValues()['type'] as ButtonVariant);
  demoSize = computed(() => this.defaultValues()['size'] as ButtonSize);
  demoPosition = computed(() => this.defaultValues()['position'] as DropdownPosition);

  // Use Case signals
  lastContextAction = signal('');
  selectedStatus = signal('');
  selectedDate = signal('');
  selectedSort = signal('');

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onSelect(code: string): void {
    console.log('Selected:', code);
  }

  onContextAction(code: string): void {
    this.lastContextAction.set(code);
  }

  onUserMenuAction(code: string): void {
    console.log('User menu action:', code);
  }

  onMoreAction(code: string): void {
    console.log('More action:', code);
  }

  onHeaderAction(code: string): void {
    console.log('Header action:', code);
  }

  onTableAction(code: string, user: { name: string; email: string; role: string }): void {
    console.log('Table action:', code, 'for user:', user.name);
  }

  onStatusFilter(code: string): void {
    this.selectedStatus.set(code === 'all' ? '' : this.statusFilters.find(f => f.code === code)?.label || '');
  }

  onDateFilter(code: string): void {
    this.selectedDate.set(code === 'all' ? '' : this.dateFilters.find(f => f.code === code)?.label || '');
  }

  onSort(code: string): void {
    this.selectedSort.set(this.sortOptions.find(s => s.code === code)?.label || '');
  }

  // Code snippets
  variantsCode = `<ds-dropdown [dropdownItems]="items" type="primary">Primary</ds-dropdown>
<ds-dropdown [dropdownItems]="items" type="secondary">Secondary</ds-dropdown>
<ds-dropdown [dropdownItems]="items" type="success">Success</ds-dropdown>
<ds-dropdown [dropdownItems]="items" type="warning">Warning</ds-dropdown>
<ds-dropdown [dropdownItems]="items" type="error">Error</ds-dropdown>`;

  sizesCode = `<ds-dropdown [dropdownItems]="items" size="sm">Small</ds-dropdown>
<ds-dropdown [dropdownItems]="items" size="md">Medium</ds-dropdown>
<ds-dropdown [dropdownItems]="items" size="lg">Large</ds-dropdown>`;

  appearancesCode = `<ds-dropdown [dropdownItems]="items" variant="solid" type="primary">Solid</ds-dropdown>
<ds-dropdown [dropdownItems]="items" variant="outline" type="primary">Outline</ds-dropdown>
<ds-dropdown [dropdownItems]="items" variant="outline" type="secondary">Outline Secondary</ds-dropdown>`;

  iconsCode = `// Items avec icônes
itemsWithIcons: DropdownItem[] = [
  { code: 'edit', label: 'Modifier', startIcon: faEdit },
  { code: 'download', label: 'Télécharger', startIcon: faDownload },
  { code: 'delete', label: 'Supprimer', startIcon: faTrash },
];

<ds-dropdown
  [dropdownItems]="itemsWithIcons"
  [dropdownStartIcon]="faUser"
>
  Actions
</ds-dropdown>`;

  positionsCode = `<ds-dropdown [dropdownItems]="items" position="bottom">Bottom ↓</ds-dropdown>
<ds-dropdown [dropdownItems]="items" position="top">Top ↑</ds-dropdown>
<ds-dropdown [dropdownItems]="items" position="right">Right →</ds-dropdown>`;

  statesCode = `<ds-dropdown [dropdownItems]="items" [disabled]="true">Disabled</ds-dropdown>
<ds-dropdown [dropdownItems]="items" [loading]="true">Loading</ds-dropdown>`;

  contextActionsCode = `// Actions contextuelles sur un document
contextActions: DropdownItem[] = [
  { code: 'edit', label: 'Modifier', startIcon: faEdit },
  { code: 'download', label: 'Télécharger', startIcon: faDownload },
  { code: 'share', label: 'Partager', startIcon: faShare },
  { code: 'delete', label: 'Supprimer', startIcon: faTrash },
];

<ds-dropdown
  [dropdownItems]="contextActions"
  variant="outline"
  type="secondary"
  size="sm"
  (selectedItemChanged)="onAction($event)"
>
  Actions
</ds-dropdown>`;

  userMenuCode = `// Menu utilisateur
userMenuItems: DropdownItem[] = [
  { code: 'profile', label: 'Mon profil', startIcon: faUser },
  { code: 'settings', label: 'Paramètres', startIcon: faCog },
  { code: 'logout', label: 'Déconnexion', startIcon: faSignOutAlt },
];

<ds-dropdown [dropdownItems]="userMenuItems" variant="outline" type="secondary">
  <div class="user-trigger">
    <ds-avatar name="Marie Laurent" size="sm" shape="circle" />
    <span>Marie Laurent</span>
  </div>
</ds-dropdown>`;

  moreActionsCode = `// Bouton "trois points" pour actions secondaires
<ds-dropdown
  [dropdownItems]="moreActions"
  [dropdownStartIcon]="faEllipsisV"
  variant="outline"
  type="secondary"
  size="sm"
>
</ds-dropdown>`;

  headerMenuCode = `<header class="app-header">
  <div class="logo">MonApp</div>
  <nav class="nav">
    <ds-button variant="ghost">Dashboard</ds-button>
    <ds-button variant="ghost">Projets</ds-button>
  </nav>
  <ds-dropdown [dropdownItems]="userItems" variant="outline" type="secondary" size="sm">
    <ds-avatar name="Jean Dupont" size="sm" shape="circle" />
  </ds-dropdown>
</header>`;

  tableActionsCode = `// Actions par ligne de tableau
tableActions: DropdownItem[] = [
  { code: 'edit', label: 'Modifier', startIcon: faEdit },
  { code: 'permissions', label: 'Permissions', startIcon: faShield },
  { code: 'delete', label: 'Supprimer', startIcon: faTrash },
];

<table>
  <tr *ngFor="let user of users">
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
    <td>
      <ds-dropdown
        [dropdownItems]="tableActions"
        [dropdownStartIcon]="faEllipsisV"
        variant="outline"
        type="secondary"
        size="sm"
      />
    </td>
  </tr>
</table>`;

  toolbarCode = `// Barre d'outils avec filtres
<div class="toolbar">
  <ds-dropdown [dropdownItems]="statusFilters" variant="outline" size="sm">
    Statut: {{ selectedStatus || 'Tous' }}
  </ds-dropdown>
  <ds-dropdown [dropdownItems]="dateFilters" variant="outline" size="sm">
    Date: {{ selectedDate || 'Toutes' }}
  </ds-dropdown>
  <ds-dropdown [dropdownItems]="sortOptions" variant="outline" size="sm">
    Tri: {{ selectedSort || 'Récent' }}
  </ds-dropdown>
  <ds-button variant="primary" size="sm">Appliquer</ds-button>
</div>`;
}
