import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faSearch,
  faUser,
  faBell,
  faHeart,
  faComment,
  faShare,
  faBookmark,
  faEllipsisH,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

// Import des composants DS
import { DsCard } from '../../components/ds-card/ds-card';
import { DsAvatar } from '../../components/ds-avatar/ds-avatar';
import { DsBadge } from '../../components/ds-badge/ds-badge';
import { DsButton } from '../../components/ds-button/ds-button';
import { DsSearchInput } from '../../components/ds-search-input/ds-search-input';
import { DsChip } from '../../components/ds-chip/ds-chip';
import { DsList } from '../../components/ds-list/ds-list';
import { DsListItem } from '../../components/ds-list-item/ds-list-item';
import { DsEmpty } from '../../components/ds-empty/ds-empty';
import { DsDivider } from '../../components/ds-divider/ds-divider';

// =============================================================================
// MOBILE APP COMPONENT
// =============================================================================

@Component({
  selector: 'example-mobile-app',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    DsCard,
    DsAvatar,
    DsBadge,
    DsButton,
    DsSearchInput,
    DsChip,
    DsList,
    DsListItem,
    DsEmpty,
    DsDivider,
  ],
  template: `
    <div class="mobile-container">
      <div class="mobile-frame">
        <!-- Status Bar (fake) -->
        <div class="status-bar">
          <span class="time">9:41</span>
          <div class="status-icons">
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        <!-- Header -->
        <header class="app-header">
          <h1 class="app-title">{{ pageTitle() }}</h1>
          <div class="header-actions">
            @if (activeTab() === 'home') {
              <button class="icon-btn" (click)="toggleNotifications()">
                <fa-icon [icon]="faBell" />
                @if (unreadNotifications() > 0) {
                  <span class="notification-dot"></span>
                }
              </button>
            }
            <ds-avatar
              name="Marie Dupont"
              size="sm"
              [showStatus]="true"
              status="online"
            />
          </div>
        </header>

        <!-- Main Content -->
        <main class="app-content" [class.with-search]="activeTab() === 'home' || activeTab() === 'search'">
          <!-- Search (Home & Search tabs) -->
          @if (activeTab() === 'home' || activeTab() === 'search') {
            <div class="search-section">
              <ds-search-input
                placeholder="Rechercher..."
                size="sm"
                [showClearButton]="true"
                (search)="onSearch($event)"
              />
            </div>
          }

          <!-- Filters (Home tab) -->
          @if (activeTab() === 'home') {
            <div class="filters-section">
              @for (filter of filters; track filter.id) {
                <ds-chip
                  [variant]="activeFilter() === filter.id ? 'filled' : 'outlined'"
                  [color]="activeFilter() === filter.id ? 'primary' : 'default'"
                  size="sm"
                  (click)="setActiveFilter(filter.id)"
                >
                  {{ filter.label }}
                </ds-chip>
              }
            </div>
          }

          <!-- Feed (Home tab) -->
          @if (activeTab() === 'home') {
            <div class="feed-section">
              @for (post of filteredPosts(); track post.id) {
                <ds-card variant="default" class="post-card">
                  <div class="post-header">
                    <ds-avatar [name]="post.author" size="sm" />
                    <div class="post-meta">
                      <span class="post-author">{{ post.author }}</span>
                      <span class="post-time">{{ post.time }}</span>
                    </div>
                    <button class="icon-btn">
                      <fa-icon [icon]="faEllipsisH" />
                    </button>
                  </div>

                  <p class="post-content">{{ post.content }}</p>

                  @if (post.image) {
                    <div class="post-image">
                      <img [src]="post.image" [alt]="post.author" />
                    </div>
                  }

                  <div class="post-actions">
                    <button class="action-btn" [class.liked]="post.liked" (click)="toggleLike(post)">
                      <fa-icon [icon]="faHeart" />
                      <span>{{ post.likes }}</span>
                    </button>
                    <button class="action-btn">
                      <fa-icon [icon]="faComment" />
                      <span>{{ post.comments }}</span>
                    </button>
                    <button class="action-btn">
                      <fa-icon [icon]="faShare" />
                    </button>
                    <button class="action-btn" [class.saved]="post.saved" (click)="toggleSave(post)">
                      <fa-icon [icon]="faBookmark" />
                    </button>
                  </div>
                </ds-card>
              }
            </div>
          }

          <!-- Search Results -->
          @if (activeTab() === 'search') {
            <div class="search-results">
              @if (searchQuery()) {
                <h2 class="section-title">Résultats pour "{{ searchQuery() }}"</h2>
                <ds-list variant="divided">
                  @for (result of searchResults(); track result.id) {
                    <ds-list-item
                      [title]="result.name"
                      [subtitle]="result.type"
                      (click)="onResultClick(result)"
                    >
                      <ds-avatar prefix [name]="result.name" size="sm" />
                      <ds-badge suffix variant="info" size="sm">{{ result.count }}</ds-badge>
                    </ds-list-item>
                  }
                </ds-list>
              } @else {
                <div class="suggestions">
                  <h2 class="section-title">Suggestions</h2>
                  <div class="suggestion-chips">
                    @for (suggestion of suggestions; track suggestion) {
                      <ds-chip
                        variant="outlined"
                        size="sm"
                        (click)="onSearch(suggestion)"
                      >
                        {{ suggestion }}
                      </ds-chip>
                    }
                  </div>
                </div>
              }
            </div>
          }

          <!-- Notifications -->
          @if (activeTab() === 'notifications') {
            <div class="notifications-section">
              @if (notifications().length > 0) {
                <ds-list variant="divided">
                  @for (notif of notifications(); track notif.id) {
                    <ds-list-item
                      [title]="notif.title"
                      [subtitle]="notif.time"
                      [class.unread]="!notif.read"
                      (click)="markAsRead(notif)"
                    >
                      <ds-avatar prefix [name]="notif.from" size="sm" />
                      @if (!notif.read) {
                        <span suffix class="unread-indicator"></span>
                      }
                    </ds-list-item>
                  }
                </ds-list>
              } @else {
                <ds-empty
                  title="Aucune notification"
                  description="Vous êtes à jour !"
                  [icon]="faBell"
                />
              }
            </div>
          }

          <!-- Profile -->
          @if (activeTab() === 'profile') {
            <div class="profile-section">
              <div class="profile-header">
                <ds-avatar name="Marie Dupont" size="xl" [showStatus]="true" status="online" />
                <h2 class="profile-name">Marie Dupont</h2>
                <p class="profile-bio">Designer UI/UX passionnée par les interfaces modernes</p>
                <div class="profile-stats">
                  <div class="stat">
                    <span class="stat-value">1,234</span>
                    <span class="stat-label">Abonnés</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">567</span>
                    <span class="stat-label">Abonnements</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">89</span>
                    <span class="stat-label">Posts</span>
                  </div>
                </div>
                <div class="profile-actions">
                  <ds-button variant="primary" size="sm">Modifier</ds-button>
                  <ds-button variant="outline" size="sm">Partager</ds-button>
                </div>
              </div>

              <ds-divider spacing="lg" />

              <div class="profile-menu">
                <ds-list variant="default">
                  <ds-list-item title="Paramètres" subtitle="Compte, notifications, confidentialité" />
                  <ds-list-item title="Posts sauvegardés" subtitle="12 éléments" />
                  <ds-list-item title="Historique" subtitle="Activité récente" />
                  <ds-list-item title="Aide" subtitle="FAQ et support" />
                </ds-list>
              </div>
            </div>
          }
        </main>

        <!-- FAB Button (Home tab) -->
        @if (activeTab() === 'home') {
          <button class="fab-button">
            <fa-icon [icon]="faPlus" />
          </button>
        }

        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
          @for (tab of tabs; track tab.id) {
            <button
              class="nav-tab"
              [class.active]="activeTab() === tab.id"
              (click)="setActiveTab(tab.id)"
            >
              <fa-icon [icon]="tab.icon" />
              <span class="nav-label">{{ tab.label }}</span>
              @if (tab.badge) {
                <span class="nav-badge">{{ tab.badge }}</span>
              }
            </button>
          }
        </nav>
      </div>
    </div>
  `,
  styles: [`
    .mobile-container {
      min-height: 100vh;
      background: var(--background-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-6);
    }

    .mobile-frame {
      width: 375px;
      height: 812px;
      background: var(--background-main);
      border-radius: 40px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Status Bar */
    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-2) var(--space-4);
      padding-top: var(--space-3);
      font-size: 12px;
      font-weight: 600;
    }

    .status-icons {
      display: flex;
      gap: var(--space-1);
      font-size: 10px;
    }

    /* Header */
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-3) var(--space-4);
      border-bottom: 1px solid var(--border-color);
    }

    .app-title {
      margin: 0;
      font-size: var(--font-size-xl);
      font-weight: 700;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .icon-btn {
      background: none;
      border: none;
      padding: var(--space-2);
      cursor: pointer;
      color: var(--text-secondary);
      position: relative;
      border-radius: var(--radius-full);
      transition: background 0.15s ease;
    }

    .icon-btn:hover {
      background: var(--background-hover);
    }

    .notification-dot {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 8px;
      height: 8px;
      background: var(--error);
      border-radius: 50%;
    }

    /* Content */
    .app-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-4);
    }

    .app-content.with-search {
      padding-top: 0;
    }

    /* Search */
    .search-section {
      position: sticky;
      top: 0;
      background: var(--background-main);
      padding: var(--space-4) 0;
      z-index: 10;
    }

    /* Filters */
    .filters-section {
      display: flex;
      gap: var(--space-2);
      overflow-x: auto;
      padding-bottom: var(--space-4);
      margin-bottom: var(--space-2);
      -webkit-overflow-scrolling: touch;
    }

    .filters-section::-webkit-scrollbar {
      display: none;
    }

    /* Feed */
    .feed-section {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .post-card {
      --card-padding: var(--space-4);
    }

    .post-header {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }

    .post-meta {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .post-author {
      font-weight: 600;
      font-size: var(--font-size-sm);
    }

    .post-time {
      font-size: var(--font-size-xs);
      color: var(--text-tertiary);
    }

    .post-content {
      margin: 0 0 var(--space-3) 0;
      font-size: var(--font-size-sm);
      line-height: 1.5;
    }

    .post-image {
      margin: 0 calc(var(--space-4) * -1);
      margin-bottom: var(--space-3);
    }

    .post-image img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .post-actions {
      display: flex;
      gap: var(--space-4);
      padding-top: var(--space-3);
      border-top: 1px solid var(--border-color);
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      background: none;
      border: none;
      padding: var(--space-1);
      cursor: pointer;
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
      transition: color 0.15s ease;
    }

    .action-btn:hover {
      color: var(--text-default);
    }

    .action-btn.liked {
      color: var(--error);
    }

    .action-btn.saved {
      color: var(--color-primary);
    }

    /* Search Results & Suggestions */
    .section-title {
      font-size: var(--font-size-sm);
      font-weight: 600;
      color: var(--text-secondary);
      margin: var(--space-4) 0 var(--space-3) 0;
    }

    .suggestion-chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    /* Notifications */
    .unread-indicator {
      width: 8px;
      height: 8px;
      background: var(--color-primary);
      border-radius: 50%;
    }

    /* Profile */
    .profile-section {
      text-align: center;
    }

    .profile-header {
      padding: var(--space-4) 0;
    }

    .profile-name {
      margin: var(--space-3) 0 var(--space-1) 0;
      font-size: var(--font-size-xl);
      font-weight: 700;
    }

    .profile-bio {
      margin: 0 0 var(--space-4) 0;
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }

    .profile-stats {
      display: flex;
      justify-content: center;
      gap: var(--space-6);
      margin-bottom: var(--space-4);
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: var(--font-size-lg);
      font-weight: 700;
    }

    .stat-label {
      font-size: var(--font-size-xs);
      color: var(--text-secondary);
    }

    .profile-actions {
      display: flex;
      justify-content: center;
      gap: var(--space-3);
    }

    .profile-menu {
      text-align: left;
    }

    /* FAB Button */
    .fab-button {
      position: absolute;
      bottom: 80px;
      right: var(--space-4);
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--color-primary);
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .fab-button:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.5);
    }

    /* Bottom Navigation */
    .bottom-nav {
      display: flex;
      justify-content: space-around;
      padding: var(--space-2) 0;
      padding-bottom: calc(var(--space-2) + env(safe-area-inset-bottom, 0));
      background: var(--background-main);
      border-top: 1px solid var(--border-color);
    }

    .nav-tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-1);
      background: none;
      border: none;
      padding: var(--space-2);
      cursor: pointer;
      color: var(--text-tertiary);
      position: relative;
      transition: color 0.15s ease;
    }

    .nav-tab.active {
      color: var(--color-primary);
    }

    .nav-label {
      font-size: 10px;
      font-weight: 500;
    }

    .nav-badge {
      position: absolute;
      top: 0;
      right: 4px;
      min-width: 16px;
      height: 16px;
      background: var(--error);
      color: white;
      border-radius: var(--radius-full);
      font-size: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
    }
  `],
})
class MobileAppExampleComponent {
  // Icons
  faHome = faHome;
  faSearch = faSearch;
  faUser = faUser;
  faBell = faBell;
  faHeart = faHeart;
  faComment = faComment;
  faShare = faShare;
  faBookmark = faBookmark;
  faEllipsisH = faEllipsisH;
  faPlus = faPlus;

  // State
  activeTab = signal<'home' | 'search' | 'notifications' | 'profile'>('home');
  activeFilter = signal('all');
  searchQuery = signal('');

  // Tabs
  tabs = [
    { id: 'home' as const, label: 'Accueil', icon: faHome },
    { id: 'search' as const, label: 'Recherche', icon: faSearch },
    { id: 'notifications' as const, label: 'Notifs', icon: faBell, badge: 3 },
    { id: 'profile' as const, label: 'Profil', icon: faUser },
  ];

  // Filters
  filters = [
    { id: 'all', label: 'Tout' },
    { id: 'following', label: 'Abonnements' },
    { id: 'trending', label: 'Tendances' },
    { id: 'news', label: 'Actualités' },
  ];

  // Posts
  posts = signal([
    {
      id: 1,
      author: 'Thomas Bernard',
      time: 'Il y a 2h',
      content: 'Nouveau projet en cours ! Très content de partager cette avancée avec vous. Le design system prend forme 🎨',
      image: 'https://picsum.photos/400/300?random=1',
      likes: 42,
      comments: 8,
      liked: false,
      saved: false,
      category: 'following',
    },
    {
      id: 2,
      author: 'Sophie Martin',
      time: 'Il y a 4h',
      content: 'Les composants Angular standalone sont vraiment une révolution pour la modularité. Qui utilise déjà ?',
      likes: 128,
      comments: 24,
      liked: true,
      saved: true,
      category: 'trending',
    },
    {
      id: 3,
      author: 'Pierre Durand',
      time: 'Il y a 6h',
      content: 'Petit tips : utilisez les signals Angular pour une réactivité optimale ! Le code devient beaucoup plus lisible.',
      image: 'https://picsum.photos/400/300?random=2',
      likes: 89,
      comments: 15,
      liked: false,
      saved: false,
      category: 'news',
    },
  ]);

  // Search
  suggestions = ['Design System', 'Angular', 'TypeScript', 'Storybook', 'Components'];

  searchResults = signal([
    { id: 1, name: 'Design System', type: 'Projet', count: 12 },
    { id: 2, name: 'Angular Components', type: 'Collection', count: 45 },
    { id: 3, name: 'TypeScript Tips', type: 'Article', count: 8 },
  ]);

  // Notifications
  notifications = signal([
    { id: 1, from: 'Thomas Bernard', title: 'a aimé votre publication', time: 'Il y a 5 min', read: false },
    { id: 2, from: 'Sophie Martin', title: 'vous a mentionné dans un commentaire', time: 'Il y a 1h', read: false },
    { id: 3, from: 'Pierre Durand', title: 'a commencé à vous suivre', time: 'Il y a 2h', read: true },
    { id: 4, from: 'Julie Leroy', title: 'a partagé votre publication', time: 'Hier', read: true },
  ]);

  unreadNotifications = computed(() => this.notifications().filter(n => !n.read).length);

  pageTitle = computed(() => {
    switch (this.activeTab()) {
      case 'home': return 'Fil d\'actualité';
      case 'search': return 'Rechercher';
      case 'notifications': return 'Notifications';
      case 'profile': return 'Profil';
      default: return '';
    }
  });

  filteredPosts = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.posts();
    return this.posts().filter(p => p.category === filter);
  });

  // Actions
  setActiveTab(tab: 'home' | 'search' | 'notifications' | 'profile') {
    this.activeTab.set(tab);
  }

  setActiveFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  toggleNotifications() {
    this.activeTab.set('notifications');
  }

  toggleLike(post: any) {
    const posts = this.posts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = {
        ...posts[index],
        liked: !posts[index].liked,
        likes: posts[index].liked ? posts[index].likes - 1 : posts[index].likes + 1,
      };
      this.posts.set([...posts]);
    }
  }

  toggleSave(post: any) {
    const posts = this.posts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = { ...posts[index], saved: !posts[index].saved };
      this.posts.set([...posts]);
    }
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
  }

  onResultClick(result: any) {
    console.log('Result clicked:', result);
  }

  markAsRead(notif: any) {
    const notifications = this.notifications();
    const index = notifications.findIndex(n => n.id === notif.id);
    if (index !== -1) {
      notifications[index] = { ...notifications[index], read: true };
      this.notifications.set([...notifications]);
    }
  }
}

// =============================================================================
// META & STORIES
// =============================================================================

const meta: Meta<MobileAppExampleComponent> = {
  title: 'Examples/Mobile App',
  component: MobileAppExampleComponent,
  decorators: [
    moduleMetadata({
      imports: [MobileAppExampleComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Mobile App

Exemple d'application mobile avec navigation bottom, feed et profil.

## Composants utilisés
- **DsCard** : Cards de posts
- **DsAvatar** : Photos de profil
- **DsBadge** : Compteurs et indicateurs
- **DsButton** : Actions
- **DsSearchInput** : Barre de recherche
- **DsChip** : Filtres et tags
- **DsList / DsListItem** : Listes de résultats et notifications
- **DsEmpty** : États vides
- **DsDivider** : Séparateurs

## Fonctionnalités
- Navigation bottom avec badges
- Feed avec filtres
- Actions like/save sur les posts
- Recherche avec suggestions
- Liste de notifications avec état lu/non-lu
- Page profil avec statistiques
- FAB button pour nouvelle publication
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<MobileAppExampleComponent>;

/**
 * Vue principale avec le feed d'actualités.
 */
export const Feed: Story = {};

/**
 * Vue recherche avec suggestions.
 */
export const Search: Story = {
  render: () => ({
    template: `<example-mobile-app />`,
    moduleMetadata: {
      imports: [MobileAppExampleComponent],
    },
  }),
  play: async ({ canvasElement }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const searchTab = canvasElement.querySelectorAll('.nav-tab')[1] as HTMLButtonElement;
    if (searchTab) searchTab.click();
  },
};

/**
 * Vue notifications.
 */
export const Notifications: Story = {
  render: () => ({
    template: `<example-mobile-app />`,
    moduleMetadata: {
      imports: [MobileAppExampleComponent],
    },
  }),
  play: async ({ canvasElement }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const notifTab = canvasElement.querySelectorAll('.nav-tab')[2] as HTMLButtonElement;
    if (notifTab) notifTab.click();
  },
};

/**
 * Vue profil utilisateur.
 */
export const Profile: Story = {
  render: () => ({
    template: `<example-mobile-app />`,
    moduleMetadata: {
      imports: [MobileAppExampleComponent],
    },
  }),
  play: async ({ canvasElement }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const profileTab = canvasElement.querySelectorAll('.nav-tab')[3] as HTMLButtonElement;
    if (profileTab) profileTab.click();
  },
};
