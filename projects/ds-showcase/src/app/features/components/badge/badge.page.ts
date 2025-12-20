import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsBadge, DsButton, DsAvatar, DsCard } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsBadgeDefinition } from '../../../registry/definitions/ds-badge.definition';
import { ControlValues } from '../../../registry/types';

type BadgeType = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeVariant = 'solid' | 'outline';
type BadgeShape = 'default' | 'pill' | 'square';

interface Order {
  id: string;
  product: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
}

interface Notification {
  id: number;
  type: 'message' | 'alert' | 'update' | 'promo';
  count: number;
  label: string;
}

interface Tag {
  id: number;
  label: string;
  color: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
}

interface MenuItem {
  id: string;
  label: string;
  badge?: { label: string; type: BadgeType };
}

@Component({
  selector: 'app-badge-page',
  standalone: true,
  imports: [FormsModule, DsBadge, DsButton, DsAvatar, DsCard, DemoContainer, PropsTable, ComponentPageHeader, DocIcon],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="data-display"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-badge"
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
          [code]="definition.demos[0].code"
          [controls]="definition.demos[0].controls"
          [initialValues]="defaultValues()"
          (controlChange)="onDefaultChange($event)"
        >
          <ds-badge
            [type]="demoType()"
            [size]="demoSize()"
            [variant]="demoVariant()"
            [shape]="demoShape()"
          >
            Badge
          </ds-badge>
        </doc-demo-container>
      </section>

      <!-- Section 2: Types -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Types</h2>
          <p class="section-desc">Les différents types de badges pour représenter des statuts variés.</p>
        </div>

        <doc-demo-container [code]="definition.demos[1].code">
          <div class="demo-row">
            <ds-badge type="default">Default</ds-badge>
            <ds-badge type="primary">Primary</ds-badge>
            <ds-badge type="success">Success</ds-badge>
            <ds-badge type="warning">Warning</ds-badge>
            <ds-badge type="error">Error</ds-badge>
            <ds-badge type="info">Info</ds-badge>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: Variantes -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Variantes</h2>
          <p class="section-desc">Styles solid et outline pour s'adapter à différents contextes visuels.</p>
        </div>

        <doc-demo-container [code]="definition.demos[2].code">
          <div class="demo-column">
            <div class="demo-row">
              <ds-badge type="primary" variant="solid">Solid</ds-badge>
              <ds-badge type="primary" variant="outline">Outline</ds-badge>
            </div>
            <div class="demo-row">
              <ds-badge type="success" variant="solid">Solid</ds-badge>
              <ds-badge type="success" variant="outline">Outline</ds-badge>
            </div>
            <div class="demo-row">
              <ds-badge type="error" variant="solid">Solid</ds-badge>
              <ds-badge type="error" variant="outline">Outline</ds-badge>
            </div>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Formes -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Formes</h2>
          <p class="section-desc">Trois formes disponibles : default, pill et square.</p>
        </div>

        <doc-demo-container [code]="definition.demos[3].code">
          <div class="demo-row">
            <ds-badge shape="default">Default</ds-badge>
            <ds-badge shape="pill">Pill</ds-badge>
            <ds-badge shape="square">Square</ds-badge>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 5: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Trois tailles pour s'adapter à différents contextes.</p>
        </div>

        <doc-demo-container [code]="definition.demos[4].code">
          <div class="demo-row">
            <ds-badge size="sm">Small</ds-badge>
            <ds-badge size="md">Medium</ds-badge>
            <ds-badge size="lg">Large</ds-badge>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 6: Couleurs personnalisées -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Couleurs personnalisées</h2>
          <p class="section-desc">Utilisez des couleurs hex, rgb ou hsl pour des besoins spécifiques.</p>
        </div>

        <doc-demo-container [code]="definition.demos[5].code">
          <div class="demo-row">
            <ds-badge color="#8b5cf6">Custom Purple</ds-badge>
            <ds-badge color="rgb(236, 72, 153)" variant="outline">Custom Pink</ds-badge>
            <ds-badge color="#059669">Custom Green</ds-badge>
            <ds-badge color="#f59e0b">Custom Amber</ds-badge>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 7: Use Cases -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="zap" size="sm" />
            Use Cases
          </h2>
          <p class="section-desc">Scénarios d'utilisation concrets dans une application.</p>
        </div>

        <!-- Use Case 1: Statuts de commande -->
        <div class="use-case">
          <h3 class="use-case__title">Statuts de commande</h3>
          <p class="use-case__desc">Afficher le statut des commandes dans un tableau ou une liste.</p>
          <doc-demo-container [code]="orderStatusCode">
            <div class="orders-list">
              @for (order of orders; track order.id) {
                <div class="order-row">
                  <div class="order-info">
                    <span class="order-id">{{ order.id }}</span>
                    <span class="order-product">{{ order.product }}</span>
                  </div>
                  <div class="order-meta">
                    <span class="order-date">{{ order.date }}</span>
                    <ds-badge
                      [type]="getOrderBadgeType(order.status)"
                      shape="pill"
                      size="sm"
                    >
                      {{ getOrderStatusLabel(order.status) }}
                    </ds-badge>
                  </div>
                </div>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Compteur de notifications -->
        <div class="use-case">
          <h3 class="use-case__title">Compteur de notifications</h3>
          <p class="use-case__desc">Afficher le nombre de notifications non lues par catégorie.</p>
          <doc-demo-container [code]="notificationCountCode">
            <div class="notification-list">
              @for (notif of notifications(); track notif.id) {
                <div class="notification-item" (click)="clearNotification(notif.id)">
                  <span class="notification-label">{{ notif.label }}</span>
                  @if (notif.count > 0) {
                    <ds-badge
                      [type]="getNotifBadgeType(notif.type)"
                      shape="pill"
                      size="sm"
                    >
                      {{ notif.count > 99 ? '99+' : notif.count }}
                    </ds-badge>
                  }
                </div>
              }
              <ds-button variant="ghost" size="sm" (click)="resetNotifications()">
                Réinitialiser
              </ds-button>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Système de tags -->
        <div class="use-case">
          <h3 class="use-case__title">Système de tags</h3>
          <p class="use-case__desc">Tags éditables pour catégoriser du contenu.</p>
          <doc-demo-container [code]="tagsCode">
            <div class="tags-demo">
              <div class="tags-list">
                @for (tag of tags(); track tag.id) {
                  <ds-badge
                    [color]="tag.color"
                    shape="pill"
                    size="sm"
                  >
                    {{ tag.label }}
                    <button class="tag-remove" (click)="removeTag(tag.id)">×</button>
                  </ds-badge>
                }
              </div>
              <div class="tag-input">
                <input
                  type="text"
                  placeholder="Nouveau tag..."
                  class="tag-input__field"
                  [(ngModel)]="newTagLabel"
                  (keyup.enter)="addTag()"
                />
                <ds-button variant="outline" size="sm" (click)="addTag()">
                  Ajouter
                </ds-button>
              </div>
              <div class="tag-colors">
                @for (color of tagColors; track color) {
                  <button
                    class="color-btn"
                    [style.background]="color"
                    [class.selected]="selectedColor() === color"
                    (click)="selectColor(color)"
                  ></button>
                }
              </div>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 8: Composition -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="grid" size="sm" />
            Composition
          </h2>
          <p class="section-desc">Combinaisons avec d'autres composants du Design System.</p>
        </div>

        <!-- Composition 1: Badge sur Avatar -->
        <div class="use-case">
          <h3 class="use-case__title">Badge sur Avatar</h3>
          <p class="use-case__desc">Indicateur de statut sur les avatars utilisateur.</p>
          <doc-demo-container [code]="avatarBadgeCode">
            <div class="team-grid">
              @for (member of teamMembers; track member.id) {
                <div class="team-member">
                  <div class="avatar-wrapper">
                    <ds-avatar
                      [src]="member.avatar"
                      [alt]="member.name"
                      size="lg"
                    />
                    <span class="status-dot" [class]="'status-dot--' + member.status"></span>
                  </div>
                  <div class="member-info">
                    <span class="member-name">{{ member.name }}</span>
                    <span class="member-role">{{ member.role }}</span>
                  </div>
                  <ds-badge
                    [type]="getStatusBadgeType(member.status)"
                    size="sm"
                    variant="outline"
                  >
                    {{ getStatusLabel(member.status) }}
                  </ds-badge>
                </div>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Badge dans Menu -->
        <div class="use-case">
          <h3 class="use-case__title">Badge dans Menu</h3>
          <p class="use-case__desc">Badges pour indiquer des nouveautés ou compteurs dans un menu.</p>
          <doc-demo-container [code]="menuBadgeCode">
            <div class="menu-demo">
              <nav class="menu-nav">
                @for (item of menuItems; track item.id) {
                  <a
                    class="menu-item"
                    [class.active]="activeMenuItem() === item.id"
                    (click)="setActiveMenuItem(item.id)"
                  >
                    {{ item.label }}
                    @if (item.badge) {
                      <ds-badge
                        [type]="item.badge.type"
                        size="sm"
                        shape="pill"
                      >
                        {{ item.badge.label }}
                      </ds-badge>
                    }
                  </a>
                }
              </nav>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Badge dans Card -->
        <div class="use-case">
          <h3 class="use-case__title">Badge dans Card</h3>
          <p class="use-case__desc">Badges pour indiquer le statut ou la catégorie d'une carte.</p>
          <doc-demo-container [code]="cardBadgeCode">
            <div class="cards-grid">
              <ds-card variant="outlined">
                <div class="card-header">
                  <ds-badge type="success" size="sm">Publié</ds-badge>
                  <ds-badge type="info" size="sm" variant="outline">Blog</ds-badge>
                </div>
                <h4 class="card-title">Introduction au Design System</h4>
                <p class="card-desc">Comment créer un système de design cohérent et maintenable.</p>
              </ds-card>

              <ds-card variant="outlined">
                <div class="card-header">
                  <ds-badge type="warning" size="sm">Brouillon</ds-badge>
                  <ds-badge type="primary" size="sm" variant="outline">Tutorial</ds-badge>
                </div>
                <h4 class="card-title">Composants Angular avancés</h4>
                <p class="card-desc">Patterns de composition pour composants réutilisables.</p>
              </ds-card>

              <ds-card variant="outlined">
                <div class="card-header">
                  <ds-badge type="error" size="sm">Archivé</ds-badge>
                  <ds-badge type="default" size="sm" variant="outline">Docs</ds-badge>
                </div>
                <h4 class="card-title">Guide de migration v1.0</h4>
                <p class="card-desc">Documentation de migration depuis l'ancienne version.</p>
              </ds-card>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 9: API Reference -->
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

    .demo-row {
      display: flex;
      gap: var(--doc-space-md, 16px);
      flex-wrap: wrap;
      align-items: center;
    }

    .demo-column {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
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

    /* Orders List */
    .orders-list {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-sm, 8px);
    }

    .order-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
    }

    .order-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .order-id {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--doc-text-secondary, #64748b);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .order-product {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
    }

    .order-meta {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
    }

    .order-date {
      font-size: 0.8125rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Notifications */
    .notification-list {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-xs, 4px);
      max-width: 280px;
    }

    .notification-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
      cursor: pointer;
      transition: background 150ms ease;

      &:hover {
        background: var(--doc-surface-hover, #f1f5f9);
      }
    }

    .notification-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
    }

    /* Tags */
    .tags-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--doc-space-sm, 8px);
    }

    .tag-remove {
      margin-left: 4px;
      padding: 0;
      background: none;
      border: none;
      color: inherit;
      font-size: 1rem;
      line-height: 1;
      cursor: pointer;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }

    .tag-input {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      align-items: center;
    }

    .tag-input__field {
      flex: 1;
      max-width: 200px;
      padding: var(--doc-space-xs, 4px) var(--doc-space-sm, 8px);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-sm, 4px);
      font-size: 0.875rem;

      &:focus {
        outline: none;
        border-color: var(--color-primary, #3b82f6);
      }
    }

    .tag-colors {
      display: flex;
      gap: var(--doc-space-xs, 4px);
    }

    .color-btn {
      width: 24px;
      height: 24px;
      border: 2px solid transparent;
      border-radius: 50%;
      cursor: pointer;
      transition: transform 150ms ease, border-color 150ms ease;

      &:hover {
        transform: scale(1.1);
      }

      &.selected {
        border-color: var(--doc-text-primary, #0f172a);
      }
    }

    /* Team Grid */
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .team-member {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
      text-align: center;
    }

    .avatar-wrapper {
      position: relative;
    }

    .status-dot {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border: 2px solid white;
      border-radius: 50%;

      &--online { background: #22c55e; }
      &--away { background: #f59e0b; }
      &--busy { background: #ef4444; }
      &--offline { background: #9ca3af; }
    }

    .member-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .member-name {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .member-role {
      font-size: 0.8125rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Menu Demo */
    .menu-demo {
      max-width: 280px;
    }

    .menu-nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: var(--doc-space-xs, 4px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
    }

    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      border-radius: var(--doc-radius-sm, 4px);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
      text-decoration: none;
      cursor: pointer;
      transition: background 150ms ease;

      &:hover {
        background: var(--doc-surface-hover, #e2e8f0);
      }

      &.active {
        background: var(--color-primary, #3b82f6);
        color: white;
      }
    }

    /* Cards Grid */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .card-header {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      margin-bottom: var(--doc-space-sm, 8px);
    }

    .card-title {
      margin: 0 0 var(--doc-space-xs, 4px) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .card-desc {
      margin: 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
      line-height: 1.5;
    }
  `]
})
export class BadgePage {
  definition = DsBadgeDefinition;

  // Playground values
  defaultValues = signal<ControlValues>({
    type: 'default',
    size: 'md',
    variant: 'solid',
    shape: 'default',
  });

  demoType = computed(() => this.defaultValues()['type'] as BadgeType);
  demoSize = computed(() => this.defaultValues()['size'] as BadgeSize);
  demoVariant = computed(() => this.defaultValues()['variant'] as BadgeVariant);
  demoShape = computed(() => this.defaultValues()['shape'] as BadgeShape);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  // Use Case 1: Orders
  orders: Order[] = [
    { id: 'CMD-2024-001', product: 'MacBook Pro 14"', date: '15 déc. 2024', status: 'delivered', total: 2499 },
    { id: 'CMD-2024-002', product: 'iPhone 15 Pro', date: '18 déc. 2024', status: 'shipped', total: 1199 },
    { id: 'CMD-2024-003', product: 'AirPods Pro', date: '20 déc. 2024', status: 'processing', total: 279 },
    { id: 'CMD-2024-004', product: 'iPad Air', date: '20 déc. 2024', status: 'pending', total: 799 },
  ];

  getOrderBadgeType(status: Order['status']): BadgeType {
    const typeMap: Record<Order['status'], BadgeType> = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'error',
    };
    return typeMap[status];
  }

  getOrderStatusLabel(status: Order['status']): string {
    const labelMap: Record<Order['status'], string> = {
      pending: 'En attente',
      processing: 'En préparation',
      shipped: 'Expédié',
      delivered: 'Livré',
      cancelled: 'Annulé',
    };
    return labelMap[status];
  }

  // Use Case 2: Notifications
  notifications = signal<Notification[]>([
    { id: 1, type: 'message', count: 12, label: 'Messages' },
    { id: 2, type: 'alert', count: 3, label: 'Alertes' },
    { id: 3, type: 'update', count: 5, label: 'Mises à jour' },
    { id: 4, type: 'promo', count: 0, label: 'Promotions' },
  ]);

  getNotifBadgeType(type: Notification['type']): BadgeType {
    const typeMap: Record<Notification['type'], BadgeType> = {
      message: 'primary',
      alert: 'error',
      update: 'info',
      promo: 'success',
    };
    return typeMap[type];
  }

  clearNotification(id: number): void {
    this.notifications.update(notifs =>
      notifs.map(n => n.id === id ? { ...n, count: 0 } : n)
    );
  }

  resetNotifications(): void {
    this.notifications.set([
      { id: 1, type: 'message', count: 12, label: 'Messages' },
      { id: 2, type: 'alert', count: 3, label: 'Alertes' },
      { id: 3, type: 'update', count: 5, label: 'Mises à jour' },
      { id: 4, type: 'promo', count: 2, label: 'Promotions' },
    ]);
  }

  // Use Case 3: Tags
  tags = signal<Tag[]>([
    { id: 1, label: 'Angular', color: '#dd0031' },
    { id: 2, label: 'TypeScript', color: '#3178c6' },
    { id: 3, label: 'Design System', color: '#8b5cf6' },
  ]);

  tagColors = ['#dd0031', '#3178c6', '#8b5cf6', '#059669', '#f59e0b', '#ec4899'];
  selectedColor = signal('#059669');
  newTagLabel = '';

  selectColor(color: string): void {
    this.selectedColor.set(color);
  }

  addTag(): void {
    if (!this.newTagLabel.trim()) return;
    const newId = Math.max(...this.tags().map(t => t.id), 0) + 1;
    this.tags.update(tags => [...tags, { id: newId, label: this.newTagLabel.trim(), color: this.selectedColor() }]);
    this.newTagLabel = '';
  }

  removeTag(id: number): void {
    this.tags.update(tags => tags.filter(t => t.id !== id));
  }

  // Composition 1: Team members
  teamMembers: TeamMember[] = [
    { id: 1, name: 'Alice Martin', role: 'Designer', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online' },
    { id: 2, name: 'Bob Dupont', role: 'Développeur', avatar: 'https://i.pravatar.cc/150?img=2', status: 'away' },
    { id: 3, name: 'Claire Bernard', role: 'PM', avatar: 'https://i.pravatar.cc/150?img=3', status: 'busy' },
    { id: 4, name: 'David Leroy', role: 'DevOps', avatar: 'https://i.pravatar.cc/150?img=4', status: 'offline' },
  ];

  getStatusBadgeType(status: TeamMember['status']): BadgeType {
    const typeMap: Record<TeamMember['status'], BadgeType> = {
      online: 'success',
      away: 'warning',
      busy: 'error',
      offline: 'default',
    };
    return typeMap[status];
  }

  getStatusLabel(status: TeamMember['status']): string {
    const labelMap: Record<TeamMember['status'], string> = {
      online: 'En ligne',
      away: 'Absent',
      busy: 'Occupé',
      offline: 'Hors ligne',
    };
    return labelMap[status];
  }

  // Composition 2: Menu items
  menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'inbox', label: 'Boîte de réception', badge: { label: '12', type: 'primary' } },
    { id: 'tasks', label: 'Tâches', badge: { label: '3', type: 'warning' } },
    { id: 'notifications', label: 'Notifications', badge: { label: 'Nouveau', type: 'success' } },
    { id: 'settings', label: 'Paramètres' },
  ];

  activeMenuItem = signal('dashboard');

  setActiveMenuItem(id: string): void {
    this.activeMenuItem.set(id);
  }

  // Code snippets
  orderStatusCode = `<div class="orders-list">
  @for (order of orders; track order.id) {
    <div class="order-row">
      <span class="order-id">{{ order.id }}</span>
      <span class="order-product">{{ order.product }}</span>
      <ds-badge
        [type]="getOrderBadgeType(order.status)"
        shape="pill"
        size="sm"
      >
        {{ getOrderStatusLabel(order.status) }}
      </ds-badge>
    </div>
  }
</div>`;

  notificationCountCode = `<div class="notification-list">
  @for (notif of notifications(); track notif.id) {
    <div class="notification-item" (click)="clearNotification(notif.id)">
      <span>{{ notif.label }}</span>
      @if (notif.count > 0) {
        <ds-badge [type]="getNotifBadgeType(notif.type)" shape="pill" size="sm">
          {{ notif.count > 99 ? '99+' : notif.count }}
        </ds-badge>
      }
    </div>
  }
</div>`;

  tagsCode = `// Composant
tags = signal<Tag[]>([
  { id: 1, label: 'Angular', color: '#dd0031' },
  { id: 2, label: 'TypeScript', color: '#3178c6' },
]);

// Template
<div class="tags-list">
  @for (tag of tags(); track tag.id) {
    <ds-badge [color]="tag.color" shape="pill" size="sm">
      {{ tag.label }}
      <button class="tag-remove" (click)="removeTag(tag.id)">×</button>
    </ds-badge>
  }
</div>`;

  avatarBadgeCode = `<div class="team-member">
  <div class="avatar-wrapper">
    <ds-avatar [src]="member.avatar" size="lg" />
    <span class="status-dot" [class]="'status-dot--' + member.status"></span>
  </div>
  <span class="member-name">{{ member.name }}</span>
  <ds-badge
    [type]="getStatusBadgeType(member.status)"
    size="sm"
    variant="outline"
  >
    {{ getStatusLabel(member.status) }}
  </ds-badge>
</div>`;

  menuBadgeCode = `<nav class="menu-nav">
  @for (item of menuItems; track item.id) {
    <a class="menu-item" [class.active]="activeItem === item.id">
      {{ item.label }}
      @if (item.badge) {
        <ds-badge
          [type]="item.badge.type"
          size="sm"
          shape="pill"
        >
          {{ item.badge.label }}
        </ds-badge>
      }
    </a>
  }
</nav>`;

  cardBadgeCode = `<ds-card variant="outlined">
  <div class="card-header">
    <ds-badge type="success" size="sm">Publié</ds-badge>
    <ds-badge type="info" size="sm" variant="outline">Blog</ds-badge>
  </div>
  <h4 class="card-title">Introduction au Design System</h4>
  <p class="card-desc">Comment créer un système cohérent...</p>
</ds-card>`;
}
