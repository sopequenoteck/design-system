import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsDrawer, DrawerPosition, DrawerSize, DsButton, DsInputField, DsCheckbox, DsAvatar, DsBadge } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsDrawerDefinition } from '../../../registry/definitions/ds-drawer.definition';
import { ControlValues } from '../../../registry/types';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface FilterCategory {
  name: string;
  options: { value: string; label: string; checked: boolean }[];
}

@Component({
  selector: 'app-drawer-page',
  standalone: true,
  imports: [FormsModule, DsDrawer, DsButton, DsInputField, DsCheckbox, DsAvatar, DsBadge, DemoContainer, PropsTable, ComponentPageHeader, DocIcon],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="overlays"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-drawer"
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
          <ds-button variant="primary" (click)="openDefault()">Ouvrir le drawer</ds-button>
          <ds-drawer
            [visible]="isDefaultOpen"
            [position]="demoPosition()"
            [size]="demoSize()"
            [closable]="demoClosable()"
            title="Détails"
            (closed)="closeDefault()"
          >
            <p>Contenu du drawer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </ds-drawer>
        </doc-demo-container>
      </section>

      <!-- Section 2: Positions -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Positions</h2>
          <p class="section-desc">Le drawer peut apparaître à gauche ou à droite de l'écran.</p>
        </div>

        <doc-demo-container [code]="positionsCode">
          <div class="demo-row">
            <ds-button variant="secondary" (click)="openLeft()">← Gauche</ds-button>
            <ds-button variant="secondary" (click)="openRight()">Droite →</ds-button>
          </div>
          <ds-drawer
            [visible]="isLeftOpen"
            position="left"
            title="Position gauche"
            (closed)="closeLeft()"
          >
            <p>Ce drawer s'ouvre depuis la gauche.</p>
          </ds-drawer>
          <ds-drawer
            [visible]="isRightOpen"
            position="right"
            title="Position droite"
            (closed)="closeRight()"
          >
            <p>Ce drawer s'ouvre depuis la droite.</p>
          </ds-drawer>
        </doc-demo-container>
      </section>

      <!-- Section 3: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Quatre tailles disponibles : small, medium, large et full.</p>
        </div>

        <doc-demo-container [code]="sizesCode">
          <div class="demo-row">
            <ds-button variant="secondary" size="sm" (click)="openSize('sm')">Small</ds-button>
            <ds-button variant="secondary" size="sm" (click)="openSize('md')">Medium</ds-button>
            <ds-button variant="secondary" size="sm" (click)="openSize('lg')">Large</ds-button>
            <ds-button variant="secondary" size="sm" (click)="openSize('full')">Full</ds-button>
          </div>
          <ds-drawer
            [visible]="isSizeOpen()"
            [size]="currentSize()"
            [title]="'Taille: ' + currentSize()"
            (closed)="closeSizeDrawer()"
          >
            <p>Ce drawer utilise la taille <strong>{{ currentSize() }}</strong>.</p>
            <p>Les tailles disponibles sont :</p>
            <ul>
              <li><strong>sm</strong> : 256px</li>
              <li><strong>md</strong> : 384px</li>
              <li><strong>lg</strong> : 512px</li>
              <li><strong>full</strong> : 100%</li>
            </ul>
          </ds-drawer>
        </doc-demo-container>
      </section>

      <!-- Section 4: Options de fermeture -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Options de fermeture</h2>
          <p class="section-desc">Contrôlez comment le drawer peut être fermé.</p>
        </div>

        <doc-demo-container [code]="closeOptionsCode">
          <div class="demo-row">
            <ds-button variant="secondary" (click)="openNoClose()">Sans bouton ✕</ds-button>
            <ds-button variant="secondary" (click)="openNoMask()">Sans fermeture backdrop</ds-button>
          </div>
          <ds-drawer
            [visible]="isNoCloseOpen"
            [closable]="false"
            title="Sans bouton de fermeture"
            (closed)="closeNoClose()"
          >
            <p>Ce drawer n'a pas de bouton de fermeture. Utilisez le bouton ci-dessous.</p>
            <ds-button variant="primary" (click)="closeNoClose()">Fermer</ds-button>
          </ds-drawer>
          <ds-drawer
            [visible]="isNoMaskOpen"
            [maskClosable]="false"
            title="Backdrop non cliquable"
            (closed)="closeNoMask()"
          >
            <p>Le clic sur le backdrop ne ferme pas ce drawer. Utilisez le bouton ✕.</p>
          </ds-drawer>
        </doc-demo-container>
      </section>

      <!-- Section 5: Avec footer -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Avec footer</h2>
          <p class="section-desc">Ajoutez un footer avec des actions via ng-template.</p>
        </div>

        <doc-demo-container [code]="footerCode">
          <ds-button variant="primary" (click)="openWithFooter()">Ouvrir avec footer</ds-button>
          <ds-drawer
            [visible]="isFooterOpen"
            title="Formulaire avec actions"
            (closed)="closeWithFooter()"
          >
            <div class="drawer-form">
              <ds-input-field label="Nom" placeholder="Entrez votre nom" />
              <ds-input-field label="Email" type="email" placeholder="email@exemple.com" />
            </div>
            <ng-template #footer>
              <div class="drawer-footer">
                <ds-button variant="ghost" (click)="closeWithFooter()">Annuler</ds-button>
                <ds-button variant="primary" (click)="saveAndClose()">Enregistrer</ds-button>
              </div>
            </ng-template>
          </ds-drawer>
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

        <!-- Use Case 1: Navigation mobile -->
        <div class="use-case">
          <h3 class="use-case__title">Navigation mobile</h3>
          <p class="use-case__desc">Menu hamburger avec navigation latérale pour mobile.</p>
          <doc-demo-container [code]="mobileNavCode">
            <div class="mobile-header">
              <ds-button variant="ghost" size="sm" (click)="openMobileNav()">☰ Menu</ds-button>
              <span class="mobile-header__title">MonApp</span>
              <ds-avatar name="User" size="sm" shape="circle" />
            </div>
            <ds-drawer
              [visible]="isMobileNavOpen"
              position="left"
              size="sm"
              title="Menu"
              (closed)="closeMobileNav()"
            >
              <nav class="mobile-nav">
                <a class="mobile-nav__item mobile-nav__item--active" (click)="closeMobileNav()">
                  <span class="mobile-nav__icon">🏠</span>
                  Accueil
                </a>
                <a class="mobile-nav__item" (click)="closeMobileNav()">
                  <span class="mobile-nav__icon">📦</span>
                  Produits
                </a>
                <a class="mobile-nav__item" (click)="closeMobileNav()">
                  <span class="mobile-nav__icon">📊</span>
                  Dashboard
                </a>
                <a class="mobile-nav__item" (click)="closeMobileNav()">
                  <span class="mobile-nav__icon">⚙️</span>
                  Paramètres
                </a>
                <a class="mobile-nav__item" (click)="closeMobileNav()">
                  <span class="mobile-nav__icon">❓</span>
                  Aide
                </a>
              </nav>
              <ng-template #footer>
                <div class="mobile-nav-footer">
                  <ds-button variant="ghost" class="w-full" (click)="closeMobileNav()">
                    Déconnexion
                  </ds-button>
                </div>
              </ng-template>
            </ds-drawer>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Panier latéral -->
        <div class="use-case">
          <h3 class="use-case__title">Panier latéral</h3>
          <p class="use-case__desc">Panier e-commerce accessible depuis n'importe quelle page.</p>
          <doc-demo-container [code]="cartCode">
            <ds-button variant="primary" (click)="openCart()">
              🛒 Panier ({{ cartItems.length }})
            </ds-button>
            <ds-drawer
              [visible]="isCartOpen"
              position="right"
              size="md"
              title="Votre panier"
              (closed)="closeCart()"
            >
              @if (cartItems.length === 0) {
                <div class="cart-empty">
                  <span class="cart-empty__icon">🛒</span>
                  <p>Votre panier est vide</p>
                  <ds-button variant="primary" (click)="closeCart()">Continuer mes achats</ds-button>
                </div>
              } @else {
                <div class="cart-items">
                  @for (item of cartItems; track item.id) {
                    <div class="cart-item">
                      <div class="cart-item__image">📦</div>
                      <div class="cart-item__details">
                        <span class="cart-item__name">{{ item.name }}</span>
                        <span class="cart-item__price">{{ item.price }} €</span>
                      </div>
                      <div class="cart-item__quantity">
                        <ds-button variant="ghost" size="sm" (click)="updateQuantity(item, -1)">−</ds-button>
                        <span>{{ item.quantity }}</span>
                        <ds-button variant="ghost" size="sm" (click)="updateQuantity(item, 1)">+</ds-button>
                      </div>
                      <ds-button variant="ghost" size="sm" (click)="removeFromCart(item)">✕</ds-button>
                    </div>
                  }
                </div>
                <div class="cart-summary">
                  <div class="cart-summary__row">
                    <span>Sous-total</span>
                    <strong>{{ cartSubtotal() }} €</strong>
                  </div>
                  <div class="cart-summary__row">
                    <span>Livraison</span>
                    <span>Gratuite</span>
                  </div>
                  <div class="cart-summary__row cart-summary__row--total">
                    <span>Total</span>
                    <strong>{{ cartSubtotal() }} €</strong>
                  </div>
                </div>
              }
              <ng-template #footer>
                <div class="cart-footer">
                  <ds-button variant="ghost" (click)="closeCart()">Continuer</ds-button>
                  <ds-button variant="primary" [disabled]="cartItems.length === 0">
                    Commander
                  </ds-button>
                </div>
              </ng-template>
            </ds-drawer>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Filtres avancés -->
        <div class="use-case">
          <h3 class="use-case__title">Filtres avancés</h3>
          <p class="use-case__desc">Panneau de filtres pour une liste ou un catalogue.</p>
          <doc-demo-container [code]="filtersCode">
            <div class="filters-header">
              <span>{{ filteredCount() }} produits</span>
              <ds-button variant="secondary" size="sm" (click)="openFilters()">
                Filtres ({{ activeFiltersCount() }})
              </ds-button>
            </div>
            <ds-drawer
              [visible]="isFiltersOpen"
              position="right"
              size="sm"
              title="Filtres"
              (closed)="closeFilters()"
            >
              @for (category of filterCategories; track category.name) {
                <div class="filter-category">
                  <h4 class="filter-category__title">{{ category.name }}</h4>
                  <div class="filter-category__options">
                    @for (option of category.options; track option.value) {
                      <ds-checkbox
                        [label]="option.label"
                        [(ngModel)]="option.checked"
                        (ngModelChange)="updateFilters()"
                      />
                    }
                  </div>
                </div>
              }
              <ng-template #footer>
                <div class="filters-footer">
                  <ds-button variant="ghost" (click)="resetFilters()">Réinitialiser</ds-button>
                  <ds-button variant="primary" (click)="applyFilters()">
                    Appliquer ({{ activeFiltersCount() }})
                  </ds-button>
                </div>
              </ng-template>
            </ds-drawer>
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

        <!-- Composition 1: Drawer + Form complet -->
        <div class="use-case">
          <h3 class="use-case__title">Formulaire de profil</h3>
          <p class="use-case__desc">Drawer avec formulaire complet et validation.</p>
          <doc-demo-container [code]="profileFormCode">
            <ds-button variant="primary" (click)="openProfileForm()">Modifier le profil</ds-button>
            <ds-drawer
              [visible]="isProfileFormOpen"
              position="right"
              size="md"
              title="Modifier le profil"
              (closed)="closeProfileForm()"
            >
              <div class="profile-form">
                <div class="profile-form__avatar">
                  <ds-avatar name="Jean Dupont" size="xl" shape="circle" />
                  <ds-button variant="ghost" size="sm">Changer la photo</ds-button>
                </div>
                <ds-input-field
                  label="Nom complet"
                  [(ngModel)]="profileName"
                  [required]="true"
                />
                <ds-input-field
                  label="Email"
                  type="email"
                  [(ngModel)]="profileEmail"
                  [required]="true"
                />
                <ds-input-field
                  label="Téléphone"
                  type="tel"
                  [(ngModel)]="profilePhone"
                  placeholder="+33 6 00 00 00 00"
                />
                <ds-input-field
                  label="Bio"
                  [(ngModel)]="profileBio"
                  hint="Maximum 200 caractères"
                />
              </div>
              <ng-template #footer>
                <div class="drawer-footer">
                  <ds-button variant="ghost" (click)="closeProfileForm()">Annuler</ds-button>
                  <ds-button variant="primary" (click)="saveProfile()">Enregistrer</ds-button>
                </div>
              </ng-template>
            </ds-drawer>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Drawer + Détails produit -->
        <div class="use-case">
          <h3 class="use-case__title">Détails produit rapide</h3>
          <p class="use-case__desc">Aperçu rapide d'un produit sans quitter la page.</p>
          <doc-demo-container [code]="quickViewCode">
            <div class="product-grid">
              @for (product of products; track product.id) {
                <div class="product-card" (click)="openQuickView(product)">
                  <div class="product-card__image">📦</div>
                  <div class="product-card__info">
                    <span class="product-card__name">{{ product.name }}</span>
                    <span class="product-card__price">{{ product.price }} €</span>
                  </div>
                </div>
              }
            </div>
            <ds-drawer
              [visible]="isQuickViewOpen"
              position="right"
              size="lg"
              [title]="selectedProduct?.name || ''"
              (closed)="closeQuickView()"
            >
              @if (selectedProduct) {
                <div class="quick-view">
                  <div class="quick-view__image">📦</div>
                  <div class="quick-view__details">
                    <div class="quick-view__price">{{ selectedProduct.price }} €</div>
                    <p class="quick-view__desc">{{ selectedProduct.description }}</p>
                    <div class="quick-view__tags">
                      <ds-badge type="success">En stock</ds-badge>
                      <ds-badge type="info">Livraison gratuite</ds-badge>
                    </div>
                    <div class="quick-view__quantity">
                      <span>Quantité :</span>
                      <ds-button variant="ghost" size="sm" (click)="quickViewQuantity.set(Math.max(1, quickViewQuantity() - 1))">−</ds-button>
                      <span>{{ quickViewQuantity() }}</span>
                      <ds-button variant="ghost" size="sm" (click)="quickViewQuantity.set(quickViewQuantity() + 1)">+</ds-button>
                    </div>
                  </div>
                </div>
              }
              <ng-template #footer>
                <div class="quick-view-footer">
                  <ds-button variant="secondary" (click)="closeQuickView()">Voir la fiche</ds-button>
                  <ds-button variant="primary" (click)="addToCartFromQuickView()">
                    Ajouter au panier
                  </ds-button>
                </div>
              </ng-template>
            </ds-drawer>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Drawer imbriqués -->
        <div class="use-case">
          <h3 class="use-case__title">Drawers imbriqués</h3>
          <p class="use-case__desc">Ouvrir un drawer depuis un autre drawer.</p>
          <doc-demo-container [code]="nestedCode">
            <ds-button variant="primary" (click)="openNestedParent()">Ouvrir premier drawer</ds-button>
            <ds-drawer
              [visible]="isNestedParentOpen"
              position="right"
              size="md"
              title="Premier drawer"
              (closed)="closeNestedParent()"
            >
              <p>Ceci est le premier drawer. Vous pouvez en ouvrir un second.</p>
              <ds-button variant="secondary" (click)="openNestedChild()">Ouvrir second drawer</ds-button>
              <ds-drawer
                [visible]="isNestedChildOpen"
                position="right"
                size="sm"
                title="Second drawer"
                (closed)="closeNestedChild()"
              >
                <p>Ceci est le second drawer, empilé au-dessus du premier.</p>
              </ds-drawer>
            </ds-drawer>
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

    .demo-row {
      display: flex;
      flex-wrap: wrap;
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

    /* Drawer form */
    .drawer-form {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .drawer-footer {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      justify-content: flex-end;
    }

    /* Mobile navigation */
    .mobile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
    }

    .mobile-header__title {
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .mobile-nav__item {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      color: var(--doc-text-primary, #0f172a);
      text-decoration: none;
      border-radius: var(--doc-radius-sm, 4px);
      cursor: pointer;

      &:hover {
        background: var(--doc-surface-elevated, #f1f5f9);
      }

      &--active {
        background: var(--color-primary-light, #eff6ff);
        color: var(--color-primary, #3b82f6);
      }
    }

    .mobile-nav__icon {
      font-size: 1.25rem;
    }

    .mobile-nav-footer {
      padding: var(--doc-space-md, 16px) 0;
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
    }

    /* Cart */
    .cart-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--doc-space-2xl, 48px) 0;
      text-align: center;
    }

    .cart-empty__icon {
      font-size: 3rem;
      margin-bottom: var(--doc-space-md, 16px);
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .cart-item {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-sm, 8px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
    }

    .cart-item__image {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--doc-surface-base, #fff);
      border-radius: var(--doc-radius-sm, 4px);
      font-size: 1.5rem;
    }

    .cart-item__details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .cart-item__name {
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
    }

    .cart-item__price {
      font-size: 0.875rem;
      color: var(--doc-text-muted, #94a3b8);
    }

    .cart-item__quantity {
      display: flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
    }

    .cart-summary {
      margin-top: var(--doc-space-lg, 24px);
      padding-top: var(--doc-space-md, 16px);
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
    }

    .cart-summary__row {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--doc-space-sm, 8px);
      color: var(--doc-text-secondary, #64748b);

      &--total {
        margin-top: var(--doc-space-sm, 8px);
        padding-top: var(--doc-space-sm, 8px);
        border-top: 1px solid var(--doc-border-default, #e2e8f0);
        font-size: 1.125rem;
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .cart-footer {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      justify-content: flex-end;
    }

    /* Filters */
    .filters-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
    }

    .filter-category {
      margin-bottom: var(--doc-space-lg, 24px);

      &:last-child {
        margin-bottom: 0;
      }
    }

    .filter-category__title {
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .filter-category__options {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-sm, 8px);
    }

    .filters-footer {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      justify-content: flex-end;
    }

    /* Profile form */
    .profile-form {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .profile-form__avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin-bottom: var(--doc-space-md, 16px);
    }

    /* Product grid */
    .product-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--doc-space-md, 16px);
    }

    .product-card {
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
      cursor: pointer;
      transition: border-color 0.2s;

      &:hover {
        border-color: var(--color-primary, #3b82f6);
      }
    }

    .product-card__image {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin-bottom: var(--doc-space-sm, 8px);
    }

    .product-card__info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .product-card__name {
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
    }

    .product-card__price {
      font-size: 0.875rem;
      color: var(--color-primary, #3b82f6);
      font-weight: 600;
    }

    /* Quick view */
    .quick-view {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-lg, 24px);
    }

    .quick-view__image {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
    }

    .quick-view__details {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .quick-view__price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .quick-view__desc {
      margin: 0;
      color: var(--doc-text-secondary, #64748b);
      line-height: 1.6;
    }

    .quick-view__tags {
      display: flex;
      gap: var(--doc-space-sm, 8px);
    }

    .quick-view__quantity {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
    }

    .quick-view-footer {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      justify-content: flex-end;
    }
  `]
})
export class DrawerPage {
  definition = DsDrawerDefinition;
  Math = Math;

  // Playground state
  isDefaultOpen = false;
  defaultValues = signal<ControlValues>({
    position: 'right',
    size: 'md',
    closable: true,
  });

  demoPosition = computed(() => this.defaultValues()['position'] as DrawerPosition);
  demoSize = computed(() => this.defaultValues()['size'] as DrawerSize);
  demoClosable = computed(() => this.defaultValues()['closable'] as boolean);

  // Position demos
  isLeftOpen = false;
  isRightOpen = false;

  // Size demos
  isSizeOpen = signal(false);
  currentSize = signal<DrawerSize>('md');

  // Close options demos
  isNoCloseOpen = false;
  isNoMaskOpen = false;

  // Footer demo
  isFooterOpen = false;

  // Use Case: Mobile navigation
  isMobileNavOpen = false;

  // Use Case: Cart
  isCartOpen = false;
  cartItems: CartItem[] = [
    { id: '1', name: 'Produit A', price: 29.99, quantity: 2 },
    { id: '2', name: 'Produit B', price: 49.99, quantity: 1 },
    { id: '3', name: 'Produit C', price: 19.99, quantity: 3 },
  ];

  cartSubtotal = computed(() => {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  });

  // Use Case: Filters
  isFiltersOpen = false;
  filterCategories: FilterCategory[] = [
    {
      name: 'Catégorie',
      options: [
        { value: 'electronics', label: 'Électronique', checked: false },
        { value: 'clothing', label: 'Vêtements', checked: true },
        { value: 'books', label: 'Livres', checked: false },
      ],
    },
    {
      name: 'Prix',
      options: [
        { value: 'under-50', label: 'Moins de 50€', checked: true },
        { value: '50-100', label: '50€ - 100€', checked: false },
        { value: 'over-100', label: 'Plus de 100€', checked: false },
      ],
    },
    {
      name: 'Disponibilité',
      options: [
        { value: 'in-stock', label: 'En stock', checked: true },
        { value: 'pre-order', label: 'Précommande', checked: false },
      ],
    },
  ];

  activeFiltersCount = signal(3);
  filteredCount = signal(42);

  // Composition: Profile form
  isProfileFormOpen = false;
  profileName = 'Jean Dupont';
  profileEmail = 'jean@example.com';
  profilePhone = '';
  profileBio = '';

  // Composition: Quick view
  isQuickViewOpen = false;
  products = [
    { id: '1', name: 'Casque Audio Pro', price: 199, description: 'Casque audio haute qualité avec réduction de bruit active.' },
    { id: '2', name: 'Souris Ergonomique', price: 79, description: 'Souris sans fil ergonomique pour une utilisation confortable.' },
    { id: '3', name: 'Clavier Mécanique', price: 149, description: 'Clavier mécanique RGB avec switches Cherry MX.' },
  ];
  selectedProduct: typeof this.products[0] | null = null;
  quickViewQuantity = signal(1);

  // Composition: Nested drawers
  isNestedParentOpen = false;
  isNestedChildOpen = false;

  // Playground methods
  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  openDefault(): void { this.isDefaultOpen = true; }
  closeDefault(): void { this.isDefaultOpen = false; }

  // Position methods
  openLeft(): void { this.isLeftOpen = true; }
  closeLeft(): void { this.isLeftOpen = false; }
  openRight(): void { this.isRightOpen = true; }
  closeRight(): void { this.isRightOpen = false; }

  // Size methods
  openSize(size: DrawerSize): void {
    this.currentSize.set(size);
    this.isSizeOpen.set(true);
  }
  closeSizeDrawer(): void { this.isSizeOpen.set(false); }

  // Close options methods
  openNoClose(): void { this.isNoCloseOpen = true; }
  closeNoClose(): void { this.isNoCloseOpen = false; }
  openNoMask(): void { this.isNoMaskOpen = true; }
  closeNoMask(): void { this.isNoMaskOpen = false; }

  // Footer methods
  openWithFooter(): void { this.isFooterOpen = true; }
  closeWithFooter(): void { this.isFooterOpen = false; }
  saveAndClose(): void {
    console.log('Saved!');
    this.isFooterOpen = false;
  }

  // Mobile nav methods
  openMobileNav(): void { this.isMobileNavOpen = true; }
  closeMobileNav(): void { this.isMobileNavOpen = false; }

  // Cart methods
  openCart(): void { this.isCartOpen = true; }
  closeCart(): void { this.isCartOpen = false; }

  updateQuantity(item: CartItem, delta: number): void {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1) {
      item.quantity = newQuantity;
    }
  }

  removeFromCart(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  // Filters methods
  openFilters(): void { this.isFiltersOpen = true; }
  closeFilters(): void { this.isFiltersOpen = false; }

  updateFilters(): void {
    let count = 0;
    this.filterCategories.forEach(category => {
      category.options.forEach(option => {
        if (option.checked) count++;
      });
    });
    this.activeFiltersCount.set(count);
  }

  resetFilters(): void {
    this.filterCategories.forEach(category => {
      category.options.forEach(option => {
        option.checked = false;
      });
    });
    this.activeFiltersCount.set(0);
  }

  applyFilters(): void {
    this.filteredCount.set(Math.floor(Math.random() * 100) + 10);
    this.closeFilters();
  }

  // Profile form methods
  openProfileForm(): void { this.isProfileFormOpen = true; }
  closeProfileForm(): void { this.isProfileFormOpen = false; }
  saveProfile(): void {
    console.log('Profile saved:', { name: this.profileName, email: this.profileEmail });
    this.closeProfileForm();
  }

  // Quick view methods
  openQuickView(product: typeof this.products[0]): void {
    this.selectedProduct = product;
    this.quickViewQuantity.set(1);
    this.isQuickViewOpen = true;
  }
  closeQuickView(): void { this.isQuickViewOpen = false; }
  addToCartFromQuickView(): void {
    if (this.selectedProduct) {
      this.cartItems.push({
        id: Date.now().toString(),
        name: this.selectedProduct.name,
        price: this.selectedProduct.price,
        quantity: this.quickViewQuantity(),
      });
      this.closeQuickView();
    }
  }

  // Nested drawer methods
  openNestedParent(): void { this.isNestedParentOpen = true; }
  closeNestedParent(): void { this.isNestedParentOpen = false; }
  openNestedChild(): void { this.isNestedChildOpen = true; }
  closeNestedChild(): void { this.isNestedChildOpen = false; }

  // Code snippets
  positionsCode = `<ds-button (click)="openLeft()">← Gauche</ds-button>
<ds-button (click)="openRight()">Droite →</ds-button>

<ds-drawer [visible]="isLeftOpen" position="left" title="Position gauche" (closed)="isLeftOpen = false">
  <p>Ce drawer s'ouvre depuis la gauche.</p>
</ds-drawer>

<ds-drawer [visible]="isRightOpen" position="right" title="Position droite" (closed)="isRightOpen = false">
  <p>Ce drawer s'ouvre depuis la droite.</p>
</ds-drawer>`;

  sizesCode = `<ds-button (click)="openSize('sm')">Small</ds-button>
<ds-button (click)="openSize('md')">Medium</ds-button>
<ds-button (click)="openSize('lg')">Large</ds-button>
<ds-button (click)="openSize('full')">Full</ds-button>

<ds-drawer [visible]="isOpen" [size]="size" [title]="'Taille: ' + size" (closed)="isOpen = false">
  <p>Ce drawer utilise la taille {{ size }}.</p>
</ds-drawer>`;

  closeOptionsCode = `// Sans bouton de fermeture
<ds-drawer [visible]="isOpen" [closable]="false" title="Sans bouton X">
  <ds-button (click)="isOpen = false">Fermer</ds-button>
</ds-drawer>

// Backdrop non cliquable
<ds-drawer [visible]="isOpen" [maskClosable]="false" title="Backdrop désactivé">
  <p>Utilisez le bouton X pour fermer.</p>
</ds-drawer>`;

  footerCode = `<ds-drawer [visible]="isOpen" title="Formulaire avec actions" (closed)="isOpen = false">
  <div class="drawer-form">
    <ds-input-field label="Nom" />
    <ds-input-field label="Email" type="email" />
  </div>
  <ng-template #footer>
    <ds-button variant="ghost" (click)="isOpen = false">Annuler</ds-button>
    <ds-button variant="primary" (click)="save()">Enregistrer</ds-button>
  </ng-template>
</ds-drawer>`;

  mobileNavCode = `// Header mobile avec menu hamburger
<div class="mobile-header">
  <ds-button variant="ghost" (click)="openMenu()">☰ Menu</ds-button>
  <span>MonApp</span>
  <ds-avatar name="User" size="sm" />
</div>

<ds-drawer [visible]="isMenuOpen" position="left" size="sm" title="Menu" (closed)="isMenuOpen = false">
  <nav class="mobile-nav">
    <a class="mobile-nav__item" (click)="navigate('/')">🏠 Accueil</a>
    <a class="mobile-nav__item" (click)="navigate('/products')">📦 Produits</a>
    <a class="mobile-nav__item" (click)="navigate('/settings')">⚙️ Paramètres</a>
  </nav>
  <ng-template #footer>
    <ds-button variant="ghost" [fullWidth]="true">Déconnexion</ds-button>
  </ng-template>
</ds-drawer>`;

  cartCode = `// Panier latéral e-commerce
<ds-button (click)="openCart()">🛒 Panier ({{ items.length }})</ds-button>

<ds-drawer [visible]="isCartOpen" position="right" size="md" title="Votre panier" (closed)="isCartOpen = false">
  @for (item of items; track item.id) {
    <div class="cart-item">
      <span>{{ item.name }}</span>
      <span>{{ item.price }} €</span>
      <div class="quantity">
        <ds-button size="sm" (click)="decrementQuantity(item)">−</ds-button>
        <span>{{ item.quantity }}</span>
        <ds-button size="sm" (click)="incrementQuantity(item)">+</ds-button>
      </div>
    </div>
  }
  <div class="cart-total">Total: {{ total }} €</div>
  <ng-template #footer>
    <ds-button variant="primary">Commander</ds-button>
  </ng-template>
</ds-drawer>`;

  filtersCode = `// Panneau de filtres avancés
<ds-button (click)="openFilters()">Filtres ({{ activeFiltersCount }})</ds-button>

<ds-drawer [visible]="isFiltersOpen" position="right" size="sm" title="Filtres" (closed)="isFiltersOpen = false">
  @for (category of categories; track category.name) {
    <div class="filter-category">
      <h4>{{ category.name }}</h4>
      @for (option of category.options; track option.value) {
        <ds-checkbox [label]="option.label" [(ngModel)]="option.checked" />
      }
    </div>
  }
  <ng-template #footer>
    <ds-button variant="ghost" (click)="resetFilters()">Réinitialiser</ds-button>
    <ds-button variant="primary" (click)="applyFilters()">Appliquer</ds-button>
  </ng-template>
</ds-drawer>`;

  profileFormCode = `// Formulaire de profil complet
<ds-drawer [visible]="isOpen" position="right" size="md" title="Modifier le profil" (closed)="isOpen = false">
  <div class="profile-form">
    <div class="profile-avatar">
      <ds-avatar name="Jean Dupont" size="xl" />
      <ds-button variant="ghost" size="sm">Changer la photo</ds-button>
    </div>
    <ds-input-field label="Nom complet" [(ngModel)]="profileName" [required]="true" />
    <ds-input-field label="Email" type="email" [(ngModel)]="profileEmail" [required]="true" />
    <ds-input-field label="Téléphone" type="tel" [(ngModel)]="profilePhone" />
    <ds-input-field label="Bio" [(ngModel)]="profileBio" hint="Maximum 200 caractères" />
  </div>
  <ng-template #footer>
    <ds-button variant="ghost" (click)="isOpen = false">Annuler</ds-button>
    <ds-button variant="primary" (click)="saveProfile()">Enregistrer</ds-button>
  </ng-template>
</ds-drawer>`;

  quickViewCode = `// Aperçu rapide d'un produit
<ds-drawer [visible]="isOpen" position="right" size="lg" [title]="product?.name" (closed)="isOpen = false">
  <div class="quick-view">
    <div class="quick-view__image">📦</div>
    <div class="quick-view__price">{{ product?.price }} €</div>
    <p>{{ product?.description }}</p>
    <div class="tags">
      <ds-badge variant="success">En stock</ds-badge>
      <ds-badge variant="info">Livraison gratuite</ds-badge>
    </div>
    <div class="quantity">
      <ds-button size="sm" (click)="quantity = quantity - 1">−</ds-button>
      <span>{{ quantity }}</span>
      <ds-button size="sm" (click)="quantity = quantity + 1">+</ds-button>
    </div>
  </div>
  <ng-template #footer>
    <ds-button variant="secondary">Voir la fiche</ds-button>
    <ds-button variant="primary">Ajouter au panier</ds-button>
  </ng-template>
</ds-drawer>`;

  nestedCode = `// Drawers imbriqués
<ds-drawer [visible]="isParentOpen" position="right" size="md" title="Premier drawer" (closed)="isParentOpen = false">
  <p>Contenu du premier drawer.</p>
  <ds-button (click)="isChildOpen = true">Ouvrir second drawer</ds-button>

  <ds-drawer [visible]="isChildOpen" position="right" size="sm" title="Second drawer" (closed)="isChildOpen = false">
    <p>Contenu du second drawer, empilé au-dessus du premier.</p>
  </ds-drawer>
</ds-drawer>`;
}
