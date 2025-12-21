import { Component, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DsCard, CardVariant, CardSize, DsButton, DsAvatar, DsBadge } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsCardDefinition } from '../../../registry/definitions/ds-card.definition';
import { ControlValues } from '../../../registry/types';

import { UsedInSection } from '../../../shared/used-in/used-in-section';
interface UserProfile {
  id: number;
  name: string;
  role: string;
  avatar: string;
  stats: { label: string; value: number }[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface StatCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [DecimalPipe, DsCard, DsButton, DsAvatar, DsBadge, DemoContainer, PropsTable, ComponentPageHeader, DocIcon, UsedInSection],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="data-display"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-card"
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
          <ds-card
            [variant]="demoVariant()"
            [size]="demoSize()"
            [clickable]="demoClickable()"
            [disabled]="demoDisabled()"
          >
            <div header>Titre de la carte</div>
            <p>Contenu principal de la carte avec du texte d'exemple pour illustrer le composant.</p>
            <div footer>
              <ds-button variant="ghost" size="sm">Annuler</ds-button>
              <ds-button size="sm">Confirmer</ds-button>
            </div>
          </ds-card>
        </doc-demo-container>
      </section>

      <!-- Section 2: Variantes -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Variantes</h2>
          <p class="section-desc">Trois styles visuels pour différents contextes.</p>
        </div>

        <doc-demo-container [code]="variantsCode">
          <div class="cards-grid">
            <ds-card variant="default">
              <div header>Default</div>
              <p>Carte avec bordure simple, idéale pour les listes et contenus standards.</p>
            </ds-card>

            <ds-card variant="elevated">
              <div header>Elevated</div>
              <p>Carte avec ombre portée pour mettre en avant le contenu.</p>
            </ds-card>

            <ds-card variant="outlined">
              <div header>Outlined</div>
              <p>Carte avec bordure accentuée pour une distinction claire.</p>
            </ds-card>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Padding adapté selon le contexte d'utilisation.</p>
        </div>

        <doc-demo-container [code]="sizesCode">
          <div class="sizes-grid">
            <ds-card size="sm">
              <div header>Small</div>
              <p>Padding réduit pour les éléments compacts.</p>
            </ds-card>

            <ds-card size="md">
              <div header>Medium</div>
              <p>Padding standard pour la plupart des cas.</p>
            </ds-card>

            <ds-card size="lg">
              <div header>Large</div>
              <p>Padding étendu pour les contenus importants.</p>
            </ds-card>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Carte cliquable -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Carte cliquable</h2>
          <p class="section-desc">Interaction avec effet hover et focus pour navigation.</p>
        </div>

        <doc-demo-container [code]="clickableCode">
          <div class="cards-row">
            <ds-card [clickable]="true" variant="elevated" (click)="onCardClick('Article 1')">
              <div header>Article interactif</div>
              <p>Cliquez sur cette carte pour naviguer vers le détail.</p>
            </ds-card>

            <ds-card [clickable]="true" [disabled]="true" variant="elevated">
              <div header>Carte désactivée</div>
              <p>Cette carte est cliquable mais désactivée.</p>
            </ds-card>
          </div>
          @if (lastClicked()) {
            <p class="click-feedback">Dernière carte cliquée : {{ lastClicked() }}</p>
          }
        </doc-demo-container>
      </section>

      <!-- Section 5: Use Cases -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="zap" size="sm" />
            Use Cases
          </h2>
          <p class="section-desc">Scénarios d'utilisation concrets dans une application.</p>
        </div>

        <!-- Use Case 1: Profil utilisateur -->
        <div class="use-case">
          <h3 class="use-case__title">Carte de profil utilisateur</h3>
          <p class="use-case__desc">Affichage des informations utilisateur avec avatar et statistiques.</p>
          <doc-demo-container [code]="profileCardCode">
            <ds-card variant="elevated" size="lg">
              <div class="profile-content">
                <div class="profile-header">
                  <ds-avatar [src]="userProfile.avatar" [name]="userProfile.name" size="lg" />
                  <div class="profile-info">
                    <h4>{{ userProfile.name }}</h4>
                    <p>{{ userProfile.role }}</p>
                  </div>
                </div>
                <div class="profile-stats">
                  @for (stat of userProfile.stats; track stat.label) {
                    <div class="stat">
                      <span class="stat-value">{{ stat.value }}</span>
                      <span class="stat-label">{{ stat.label }}</span>
                    </div>
                  }
                </div>
              </div>
              <div footer>
                <ds-button variant="ghost">Message</ds-button>
                <ds-button variant="primary">Suivre</ds-button>
              </div>
            </ds-card>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Produit e-commerce -->
        <div class="use-case">
          <h3 class="use-case__title">Carte produit e-commerce</h3>
          <p class="use-case__desc">Présentation d'un produit avec image, prix et actions.</p>
          <doc-demo-container [code]="productCardCode">
            <div class="products-grid">
              @for (product of products; track product.id) {
                <ds-card variant="default" [clickable]="true">
                  <div class="product-image">{{ product.image }}</div>
                  <div class="product-details">
                    <ds-badge type="info" size="sm">{{ product.category }}</ds-badge>
                    <h4 class="product-name">{{ product.name }}</h4>
                    <div class="product-rating">
                      @for (star of [1, 2, 3, 4, 5]; track star) {
                        <span [class.filled]="star <= product.rating">★</span>
                      }
                    </div>
                    <span class="product-price">{{ product.price | number:'1.2-2' }} €</span>
                  </div>
                  <div footer>
                    <ds-button variant="primary" >Ajouter au panier</ds-button>
                  </div>
                </ds-card>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Statistiques dashboard -->
        <div class="use-case">
          <h3 class="use-case__title">Cartes de statistiques</h3>
          <p class="use-case__desc">Affichage de métriques clés avec indicateurs de tendance.</p>
          <doc-demo-container [code]="statsCardCode">
            <div class="stats-grid">
              @for (stat of stats; track stat.title) {
                <ds-card variant="outlined" size="md">
                  <div class="stat-card">
                    <span class="stat-card__title">{{ stat.title }}</span>
                    <span class="stat-card__value">{{ stat.value }}</span>
                    <span class="stat-card__change" [class.up]="stat.trend === 'up'" [class.down]="stat.trend === 'down'">
                      {{ stat.trend === 'up' ? '↑' : '↓' }} {{ stat.change }}%
                    </span>
                  </div>
                </ds-card>
              }
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 6: Composition -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="grid" size="sm" />
            Composition
          </h2>
          <p class="section-desc">Combinaisons avec d'autres composants du Design System.</p>
        </div>

        <!-- Composition 1: Card + Avatar + Badge -->
        <div class="use-case">
          <h3 class="use-case__title">Carte avec Avatar et Badge</h3>
          <p class="use-case__desc">Combinaison pour afficher un membre d'équipe avec son statut.</p>
          <doc-demo-container [code]="cardAvatarBadgeCode">
            <div class="team-grid">
              @for (member of teamMembers; track member.id) {
                <ds-card variant="elevated" size="sm">
                  <div class="team-member">
                    <ds-avatar [name]="member.name" size="md" />
                    <div class="member-info">
                      <h5>{{ member.name }}</h5>
                      <p>{{ member.role }}</p>
                    </div>
                    <ds-badge [type]="member.status === 'En ligne' ? 'success' : 'warning'">
                      {{ member.status }}
                    </ds-badge>
                  </div>
                </ds-card>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Card Grid Layout -->
        <div class="use-case">
          <h3 class="use-case__title">Grille de cartes responsive</h3>
          <p class="use-case__desc">Layout adaptatif pour galeries et listes.</p>
          <doc-demo-container [code]="cardGridCode">
            <div class="responsive-grid">
              @for (item of gridItems; track item) {
                <ds-card variant="default" [clickable]="true">
                  <div class="grid-item">
                    <span class="grid-icon">{{ item.icon }}</span>
                    <h5>{{ item.title }}</h5>
                    <p>{{ item.description }}</p>
                  </div>
                </ds-card>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Card avec formulaire -->
        <div class="use-case">
          <h3 class="use-case__title">Carte formulaire</h3>
          <p class="use-case__desc">Card contenant un formulaire avec actions.</p>
          <doc-demo-container [code]="cardFormCode">
            <ds-card variant="elevated" size="lg">
              <div header>
                <h4>Créer un compte</h4>
              </div>
              <div class="form-content">
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="email@exemple.com" />
                </div>
                <div class="form-group">
                  <label>Mot de passe</label>
                  <input type="password" placeholder="8 caractères minimum" />
                </div>
              </div>
              <div footer>
                <ds-button variant="ghost">Annuler</ds-button>
                <ds-button variant="primary">S'inscrire</ds-button>
              </div>
            </ds-card>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 7: API Reference -->
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

    /* Cards grids */
    .cards-grid, .sizes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .cards-row {
      display: flex;
      gap: var(--doc-space-md, 16px);
      flex-wrap: wrap;

      ds-card {
        flex: 1;
        min-width: 250px;
      }
    }

    .click-feedback {
      margin-top: var(--doc-space-md, 16px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
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

    /* Profile card */
    .profile-content {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-lg, 24px);
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
    }

    .profile-info {
      h4 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }

      p {
        margin: var(--doc-space-xs, 4px) 0 0;
        font-size: 0.875rem;
        color: var(--doc-text-muted, #94a3b8);
      }
    }

    .profile-stats {
      display: flex;
      gap: var(--doc-space-xl, 32px);
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--doc-text-muted, #94a3b8);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Products grid */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .product-image {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--doc-surface-elevated, #f8fafc);
      font-size: 3rem;
      border-radius: var(--doc-radius-md, 8px);
      margin-bottom: var(--doc-space-md, 16px);
    }

    .product-details {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-xs, 4px);
    }

    .product-name {
      margin: var(--doc-space-sm, 8px) 0 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .product-rating {
      color: #d1d5db;

      .filled {
        color: #fbbf24;
      }
    }

    .product-price {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-primary, #3b82f6);
      margin-top: var(--doc-space-sm, 8px);
    }

    /* Stats cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-xs, 4px);
    }

    .stat-card__title {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--doc-text-muted, #94a3b8);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-card__value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .stat-card__change {
      font-size: 0.875rem;
      font-weight: 500;

      &.up {
        color: var(--success, #10b981);
      }

      &.down {
        color: var(--error, #ef4444);
      }
    }

    /* Team grid */
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .team-member {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
    }

    .member-info {
      flex: 1;

      h5 {
        margin: 0;
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }

      p {
        margin: 2px 0 0;
        font-size: 0.8125rem;
        color: var(--doc-text-muted, #94a3b8);
      }
    }

    /* Responsive grid */
    .responsive-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .grid-item {
      text-align: center;
    }

    .grid-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: var(--doc-space-sm, 8px);
    }

    .grid-item h5 {
      margin: 0 0 var(--doc-space-xs, 4px) 0;
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .grid-item p {
      margin: 0;
      font-size: 0.8125rem;
      color: var(--doc-text-muted, #94a3b8);
    }

    /* Form content */
    .form-content {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-xs, 4px);

      label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--doc-text-primary, #0f172a);
      }

      input {
        padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
        border: 1px solid var(--doc-border-default, #e2e8f0);
        border-radius: var(--doc-radius-md, 8px);
        font-size: 0.9375rem;

        &::placeholder {
          color: var(--doc-text-muted, #94a3b8);
        }

        &:focus {
          outline: none;
          border-color: var(--color-primary, #3b82f6);
        }
      }
    }
  `]
})
export class CardPage {
  definition = DsCardDefinition;

  // Playground
  defaultValues = signal<ControlValues>({
    variant: 'default',
    size: 'md',
    clickable: false,
    disabled: false,
  });

  demoVariant = computed(() => this.defaultValues()['variant'] as CardVariant);
  demoSize = computed(() => this.defaultValues()['size'] as CardSize);
  demoClickable = computed(() => this.defaultValues()['clickable'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  variantsCode = `<!-- Default -->
<ds-card variant="default">
  <div header>Default</div>
  <p>Carte avec bordure simple.</p>
</ds-card>

<!-- Elevated -->
<ds-card variant="elevated">
  <div header>Elevated</div>
  <p>Carte avec ombre portée.</p>
</ds-card>

<!-- Outlined -->
<ds-card variant="outlined">
  <div header>Outlined</div>
  <p>Carte avec bordure accentuée.</p>
</ds-card>`;

  sizesCode = `<ds-card size="sm">Small</ds-card>
<ds-card size="md">Medium (défaut)</ds-card>
<ds-card size="lg">Large</ds-card>`;

  // Clickable cards
  lastClicked = signal('');

  onCardClick(name: string): void {
    this.lastClicked.set(name);
  }

  clickableCode = `<ds-card [clickable]="true" variant="elevated" (click)="onCardClick()">
  <div header>Article interactif</div>
  <p>Cliquez pour naviguer.</p>
</ds-card>

<ds-card [clickable]="true" [disabled]="true" variant="elevated">
  <div header>Carte désactivée</div>
  <p>Cliquable mais désactivée.</p>
</ds-card>`;

  // Use Case 1: User profile
  userProfile: UserProfile = {
    id: 1,
    name: 'Alice Dupont',
    role: 'Product Designer',
    avatar: '',
    stats: [
      { label: 'Projets', value: 42 },
      { label: 'Followers', value: 1200 },
      { label: 'Following', value: 340 },
    ],
  };

  profileCardCode = `<ds-card variant="elevated" size="lg">
  <div class="profile-content">
    <div class="profile-header">
      <ds-avatar [name]="user.name" size="lg" />
      <div class="profile-info">
        <h4>{{ user.name }}</h4>
        <p>{{ user.role }}</p>
      </div>
    </div>
    <div class="profile-stats">
      @for (stat of user.stats; track stat.label) {
        <div class="stat">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      }
    </div>
  </div>
  <div footer>
    <ds-button variant="ghost">Message</ds-button>
    <ds-button variant="primary">Suivre</ds-button>
  </div>
</ds-card>`;

  // Use Case 2: Products
  products: Product[] = [
    { id: 1, name: 'MacBook Pro', price: 2499, image: '💻', category: 'Ordinateurs', rating: 5 },
    { id: 2, name: 'iPhone 15', price: 1199, image: '📱', category: 'Téléphones', rating: 4 },
    { id: 3, name: 'AirPods Pro', price: 279, image: '🎧', category: 'Audio', rating: 5 },
  ];

  productCardCode = `<ds-card variant="default" [clickable]="true">
  <div class="product-image">{{ product.image }}</div>
  <div class="product-details">
    <ds-badge variant="info">{{ product.category }}</ds-badge>
    <h4>{{ product.name }}</h4>
    <div class="product-rating">★★★★☆</div>
    <span class="product-price">{{ product.price }} €</span>
  </div>
  <div footer>
    <ds-button variant="primary" >
      Ajouter au panier
    </ds-button>
  </div>
</ds-card>`;

  // Use Case 3: Stats
  stats: StatCard[] = [
    { title: 'Revenus', value: '48,750 €', change: 12.5, trend: 'up' },
    { title: 'Utilisateurs', value: '2,420', change: 8.2, trend: 'up' },
    { title: 'Commandes', value: '1,210', change: 3.1, trend: 'down' },
    { title: 'Conversion', value: '4.2%', change: 0.8, trend: 'up' },
  ];

  statsCardCode = `<ds-card variant="outlined" size="md">
  <div class="stat-card">
    <span class="stat-card__title">{{ stat.title }}</span>
    <span class="stat-card__value">{{ stat.value }}</span>
    <span class="stat-card__change" [class.up]="stat.trend === 'up'">
      {{ stat.trend === 'up' ? '↑' : '↓' }} {{ stat.change }}%
    </span>
  </div>
</ds-card>`;

  // Composition 1: Team members
  teamMembers = [
    { id: 1, name: 'Alice Dupont', role: 'Designer', status: 'En ligne' },
    { id: 2, name: 'Bob Martin', role: 'Développeur', status: 'Absent' },
    { id: 3, name: 'Claire Bernard', role: 'PM', status: 'En ligne' },
  ];

  cardAvatarBadgeCode = `<ds-card variant="elevated" size="sm">
  <div class="team-member">
    <ds-avatar [name]="member.name" size="md" />
    <div class="member-info">
      <h5>{{ member.name }}</h5>
      <p>{{ member.role }}</p>
    </div>
    <ds-badge [type]="member.online ? 'success' : 'warning'">
      {{ member.status }}
    </ds-badge>
  </div>
</ds-card>`;

  // Composition 2: Grid items
  gridItems = [
    { icon: '📊', title: 'Analytics', description: 'Suivez vos métriques' },
    { icon: '👥', title: 'Utilisateurs', description: 'Gérez vos comptes' },
    { icon: '⚙️', title: 'Paramètres', description: 'Configurez l\'app' },
    { icon: '📦', title: 'Produits', description: 'Catalogue complet' },
    { icon: '📝', title: 'Contenu', description: 'Éditez vos pages' },
    { icon: '🔔', title: 'Notifications', description: 'Alertes et messages' },
  ];

  cardGridCode = `<div class="responsive-grid">
  @for (item of items; track item.title) {
    <ds-card variant="default" [clickable]="true">
      <div class="grid-item">
        <span class="grid-icon">{{ item.icon }}</span>
        <h5>{{ item.title }}</h5>
        <p>{{ item.description }}</p>
      </div>
    </ds-card>
  }
</div>`;

  cardFormCode = `<ds-card variant="elevated" size="lg">
  <div header>
    <h4>Créer un compte</h4>
  </div>
  <div class="form-content">
    <ds-input-field label="Email" type="email" />
    <ds-input-field label="Mot de passe" type="password" />
  </div>
  <div footer>
    <ds-button variant="ghost">Annuler</ds-button>
    <ds-button variant="primary">S'inscrire</ds-button>
  </div>
</ds-card>`;
}
