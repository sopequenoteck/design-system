import { Component, signal, computed } from '@angular/core';
import { DsAvatar, AvatarShape, AvatarSize, DsBadge, DsButton, DsCard } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsAvatarDefinition } from '../../../registry/definitions/ds-avatar.definition';
import { ControlValues } from '../../../registry/types';

import { UsedInSection } from '../../../shared/used-in/used-in-section';
interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'away' | 'busy' | 'offline';
}

interface Participant {
  id: number;
  name: string;
  avatar?: string;
  role: string;
}

interface Comment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  date: string;
  likes: number;
}

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-avatar-page',
  standalone: true,
  imports: [DsAvatar, DsBadge, DsButton, DsCard, DemoContainer, PropsTable, ComponentPageHeader, DocIcon, UsedInSection],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="data-display"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-avatar"
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
          <div class="demo-row">
            <ds-avatar
              src="https://i.pravatar.cc/150?img=1"
              name="John Doe"
              [shape]="demoShape()"
              [size]="demoSize()"
              [autoColor]="demoAutoColor()"
            />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 2: Avec image -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Avec image</h2>
          <p class="section-desc">Avatar affichant une image d'utilisateur.</p>
        </div>

        <doc-demo-container [code]="definition.demos[1].code">
          <div class="demo-row">
            <ds-avatar
              src="https://i.pravatar.cc/150?img=1"
              alt="John Doe"
            />
            <ds-avatar
              src="https://i.pravatar.cc/150?img=5"
              alt="Jane Doe"
            />
            <ds-avatar
              src="https://i.pravatar.cc/150?img=12"
              alt="Bob Smith"
            />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: Avec initiales -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Avec initiales</h2>
          <p class="section-desc">Avatar affichant les initiales générées à partir du nom.</p>
        </div>

        <doc-demo-container [code]="definition.demos[2].code">
          <div class="demo-row">
            <ds-avatar name="John Doe" />
            <ds-avatar initials="AB" />
            <ds-avatar name="Marie Claire Dupont" />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Formes -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Formes</h2>
          <p class="section-desc">Trois formes disponibles : circle, rounded et square.</p>
        </div>

        <doc-demo-container [code]="definition.demos[3].code">
          <div class="demo-row">
            <ds-avatar name="Circle" shape="circle" />
            <ds-avatar name="Rounded" shape="rounded" />
            <ds-avatar name="Square" shape="square" />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 5: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Quatre tailles pour s'adapter à différents contextes.</p>
        </div>

        <doc-demo-container [code]="definition.demos[4].code">
          <div class="demo-row">
            <ds-avatar name="SM" size="sm" />
            <ds-avatar name="MD" size="md" />
            <ds-avatar name="LG" size="lg" />
            <ds-avatar name="XL" size="xl" />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 6: Couleur automatique -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Couleur automatique</h2>
          <p class="section-desc">Couleur de fond générée automatiquement à partir des initiales.</p>
        </div>

        <doc-demo-container [code]="definition.demos[5].code">
          <div class="demo-row">
            <ds-avatar name="Alice" [autoColor]="true" />
            <ds-avatar name="Bob" [autoColor]="true" />
            <ds-avatar name="Charlie" [autoColor]="true" />
            <ds-avatar name="Diana" [autoColor]="true" />
            <ds-avatar name="Emma" [autoColor]="true" />
            <ds-avatar name="Frank" [autoColor]="true" />
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

        <!-- Use Case 1: Header utilisateur -->
        <div class="use-case">
          <h3 class="use-case__title">Header utilisateur</h3>
          <p class="use-case__desc">Avatar dans un header d'application avec menu utilisateur.</p>
          <doc-demo-container [code]="headerUserCode">
            <div class="header-demo">
              <div class="header-logo">Mon App</div>
              <div class="header-user" (click)="toggleUserMenu()">
                <ds-avatar
                  [src]="currentUser.avatar"
                  [name]="currentUser.name"
                  size="md"
                />
                <div class="header-user__info">
                  <span class="header-user__name">{{ currentUser.name }}</span>
                  <span class="header-user__role">{{ currentUser.role }}</span>
                </div>
                <span class="header-user__arrow">▼</span>
              </div>
            </div>
            @if (userMenuOpen()) {
              <div class="user-menu">
                <a class="user-menu__item">Mon profil</a>
                <a class="user-menu__item">Paramètres</a>
                <a class="user-menu__item user-menu__item--danger">Déconnexion</a>
              </div>
            }
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Liste de participants -->
        <div class="use-case">
          <h3 class="use-case__title">Liste de participants</h3>
          <p class="use-case__desc">Afficher les participants d'une réunion ou d'un projet.</p>
          <doc-demo-container [code]="participantsCode">
            <div class="participants-demo">
              <div class="participants-header">
                <h4 class="participants-title">Participants ({{ participants.length }})</h4>
                <ds-button variant="secondary" size="sm">Inviter</ds-button>
              </div>
              <div class="participants-list">
                @for (participant of participants; track participant.id) {
                  <div class="participant-row">
                    <ds-avatar
                      [src]="participant.avatar"
                      [name]="participant.name"
                      size="md"
                      [autoColor]="!participant.avatar"
                    />
                    <div class="participant-info">
                      <span class="participant-name">{{ participant.name }}</span>
                      <span class="participant-role">{{ participant.role }}</span>
                    </div>
                    <ds-badge type="primary" size="sm" variant="outline">
                      {{ participant.role }}
                    </ds-badge>
                  </div>
                }
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Commentaires -->
        <div class="use-case">
          <h3 class="use-case__title">Section commentaires</h3>
          <p class="use-case__desc">Avatars dans une section de commentaires.</p>
          <doc-demo-container [code]="commentsCode">
            <div class="comments-demo">
              @for (comment of comments(); track comment.id) {
                <div class="comment">
                  <ds-avatar
                    [src]="comment.avatar"
                    [name]="comment.author"
                    size="md"
                    [autoColor]="!comment.avatar"
                  />
                  <div class="comment-content">
                    <div class="comment-header">
                      <span class="comment-author">{{ comment.author }}</span>
                      <span class="comment-date">{{ comment.date }}</span>
                    </div>
                    <p class="comment-text">{{ comment.content }}</p>
                    <div class="comment-actions">
                      <button class="comment-action" (click)="likeComment(comment.id)">
                        ♥ {{ comment.likes }}
                      </button>
                      <button class="comment-action">Répondre</button>
                    </div>
                  </div>
                </div>
              }
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

        <!-- Composition 1: Avatar avec Badge de statut -->
        <div class="use-case">
          <h3 class="use-case__title">Avatar avec statut</h3>
          <p class="use-case__desc">Indicateur de statut superposé sur l'avatar.</p>
          <doc-demo-container [code]="avatarStatusCode">
            <div class="status-demo">
              @for (user of usersWithStatus; track user.id) {
                <div class="user-status">
                  <div class="avatar-with-status">
                    <ds-avatar
                      [src]="user.avatar"
                      [name]="user.name"
                      size="lg"
                    />
                    <span class="status-indicator" [class]="'status-indicator--' + user.status"></span>
                  </div>
                  <span class="user-status__name">{{ user.name }}</span>
                  <ds-badge
                    [type]="getStatusType(user.status)"
                    size="sm"
                    shape="pill"
                  >
                    {{ getStatusLabel(user.status) }}
                  </ds-badge>
                </div>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Avatar Group (Stack) -->
        <div class="use-case">
          <h3 class="use-case__title">Groupe d'avatars</h3>
          <p class="use-case__desc">Avatars empilés pour afficher un groupe.</p>
          <doc-demo-container [code]="avatarGroupCode">
            <div class="groups-demo">
              <div class="group-example">
                <h4 class="group-label">Équipe projet ({{ teamMembers.length }})</h4>
                <div class="avatar-group">
                  @for (member of teamMembers.slice(0, maxVisibleAvatars); track member.id) {
                    <ds-avatar
                      [src]="member.avatar"
                      [name]="member.name"
                      size="md"
                    />
                  }
                  @if (teamMembers.length > maxVisibleAvatars) {
                    <div class="avatar-more">
                      +{{ teamMembers.length - maxVisibleAvatars }}
                    </div>
                  }
                </div>
              </div>

              <div class="group-example">
                <h4 class="group-label">Petite équipe</h4>
                <div class="avatar-group avatar-group--sm">
                  @for (member of teamMembers.slice(0, 3); track member.id) {
                    <ds-avatar
                      [src]="member.avatar"
                      [name]="member.name"
                      size="sm"
                    />
                  }
                </div>
              </div>

              <div class="group-example">
                <h4 class="group-label">Grande équipe</h4>
                <div class="avatar-group avatar-group--lg">
                  @for (member of teamMembers.slice(0, 4); track member.id) {
                    <ds-avatar
                      [src]="member.avatar"
                      [name]="member.name"
                      size="lg"
                    />
                  }
                  <div class="avatar-more avatar-more--lg">+{{ teamMembers.length - 4 }}</div>
                </div>
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Avatar dans Card -->
        <div class="use-case">
          <h3 class="use-case__title">Avatar dans carte profil</h3>
          <p class="use-case__desc">Avatar comme élément central d'une carte de profil.</p>
          <doc-demo-container [code]="profileCardCode">
            <div class="profile-cards">
              <ds-card variant="outlined">
                <div class="profile-card">
                  <ds-avatar
                    src="https://i.pravatar.cc/150?img=32"
                    name="Sophie Laurent"
                    size="xl"
                  />
                  <h4 class="profile-card__name">Sophie Laurent</h4>
                  <p class="profile-card__role">Lead Designer</p>
                  <div class="profile-card__tags">
                    <ds-badge type="primary" size="sm">UI/UX</ds-badge>
                    <ds-badge type="info" size="sm" variant="outline">Figma</ds-badge>
                  </div>
                  <div class="profile-card__stats">
                    <div class="stat">
                      <span class="stat__value">24</span>
                      <span class="stat__label">Projets</span>
                    </div>
                    <div class="stat">
                      <span class="stat__value">156</span>
                      <span class="stat__label">Designs</span>
                    </div>
                    <div class="stat">
                      <span class="stat__value">12</span>
                      <span class="stat__label">Équipes</span>
                    </div>
                  </div>
                  <ds-button variant="primary">Voir profil</ds-button>
                </div>
              </ds-card>

              <ds-card variant="outlined">
                <div class="profile-card">
                  <ds-avatar
                    name="Marc Dubois"
                    size="xl"
                    [autoColor]="true"
                  />
                  <h4 class="profile-card__name">Marc Dubois</h4>
                  <p class="profile-card__role">Développeur Senior</p>
                  <div class="profile-card__tags">
                    <ds-badge type="success" size="sm">Angular</ds-badge>
                    <ds-badge type="warning" size="sm" variant="outline">TypeScript</ds-badge>
                  </div>
                  <div class="profile-card__stats">
                    <div class="stat">
                      <span class="stat__value">42</span>
                      <span class="stat__label">Projets</span>
                    </div>
                    <div class="stat">
                      <span class="stat__value">1.2k</span>
                      <span class="stat__label">Commits</span>
                    </div>
                    <div class="stat">
                      <span class="stat__value">8</span>
                      <span class="stat__label">Équipes</span>
                    </div>
                  </div>
                  <ds-button variant="secondary">Contacter</ds-button>
                </div>
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

    .demo-row {
      display: flex;
      gap: var(--doc-space-md, 16px);
      flex-wrap: wrap;
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

    /* Header Demo */
    .header-demo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--doc-space-md, 16px) var(--doc-space-lg, 24px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
    }

    .header-logo {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .header-user {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-xs, 4px);
      border-radius: var(--doc-radius-md, 8px);
      cursor: pointer;
      transition: background 150ms ease;

      &:hover {
        background: var(--doc-surface-hover, #e2e8f0);
      }
    }

    .header-user__info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .header-user__name {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .header-user__role {
      font-size: 0.75rem;
      color: var(--doc-text-secondary, #64748b);
    }

    .header-user__arrow {
      font-size: 0.625rem;
      color: var(--doc-text-secondary, #64748b);
    }

    .user-menu {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: var(--doc-space-sm, 8px);
      padding: var(--doc-space-xs, 4px);
      background: white;
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 200px;
      margin-left: auto;
    }

    .user-menu__item {
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      font-size: 0.875rem;
      color: var(--doc-text-primary, #0f172a);
      border-radius: var(--doc-radius-sm, 4px);
      cursor: pointer;
      transition: background 150ms ease;

      &:hover {
        background: var(--doc-surface-elevated, #f8fafc);
      }

      &--danger {
        color: var(--color-error, #ef4444);
      }
    }

    /* Participants */
    .participants-demo {
      max-width: 400px;
    }

    .participants-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--doc-space-md, 16px);
    }

    .participants-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .participants-list {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-sm, 8px);
    }

    .participant-row {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-sm, 8px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
    }

    .participant-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .participant-name {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
    }

    .participant-role {
      font-size: 0.8125rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Comments */
    .comments-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
      max-width: 500px;
    }

    .comment {
      display: flex;
      gap: var(--doc-space-md, 16px);
    }

    .comment-content {
      flex: 1;
    }

    .comment-header {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin-bottom: var(--doc-space-xs, 4px);
    }

    .comment-author {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .comment-date {
      font-size: 0.75rem;
      color: var(--doc-text-secondary, #64748b);
    }

    .comment-text {
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 0.875rem;
      color: var(--doc-text-primary, #0f172a);
      line-height: 1.5;
    }

    .comment-actions {
      display: flex;
      gap: var(--doc-space-md, 16px);
    }

    .comment-action {
      padding: 0;
      background: none;
      border: none;
      font-size: 0.8125rem;
      color: var(--doc-text-secondary, #64748b);
      cursor: pointer;
      transition: color 150ms ease;

      &:hover {
        color: var(--color-primary, #3b82f6);
      }
    }

    /* Status Demo */
    .status-demo {
      display: flex;
      gap: var(--doc-space-xl, 32px);
      flex-wrap: wrap;
    }

    .user-status {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
    }

    .avatar-with-status {
      position: relative;
    }

    .status-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 14px;
      height: 14px;
      border: 2px solid white;
      border-radius: 50%;

      &--online { background: #22c55e; }
      &--away { background: #f59e0b; }
      &--busy { background: #ef4444; }
      &--offline { background: #9ca3af; }
    }

    .user-status__name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
    }

    /* Avatar Group */
    .groups-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-xl, 32px);
    }

    .group-example {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-sm, 8px);
    }

    .group-label {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .avatar-group {
      display: flex;

      ds-avatar {
        margin-left: -8px;
        border: 2px solid white;
        border-radius: 50%;

        &:first-child {
          margin-left: 0;
        }
      }

      &--sm ds-avatar {
        margin-left: -6px;
      }

      &--lg ds-avatar {
        margin-left: -12px;
      }
    }

    .avatar-more {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin-left: -8px;
      background: var(--doc-surface-elevated, #e2e8f0);
      border: 2px solid white;
      border-radius: 50%;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--doc-text-secondary, #64748b);

      &--lg {
        width: 56px;
        height: 56px;
        margin-left: -12px;
        font-size: 0.875rem;
      }
    }

    /* Profile Cards */
    .profile-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .profile-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      text-align: center;
    }

    .profile-card__name {
      margin: var(--doc-space-sm, 8px) 0 0 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .profile-card__role {
      margin: 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    .profile-card__tags {
      display: flex;
      gap: var(--doc-space-xs, 4px);
      margin: var(--doc-space-sm, 8px) 0;
    }

    .profile-card__stats {
      display: flex;
      gap: var(--doc-space-lg, 24px);
      margin: var(--doc-space-md, 16px) 0;
      padding: var(--doc-space-md, 16px) 0;
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      width: 100%;
      justify-content: center;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .stat__value {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .stat__label {
      font-size: 0.75rem;
      color: var(--doc-text-secondary, #64748b);
    }
  `]
})
export class AvatarPage {
  definition = DsAvatarDefinition;

  // Playground values
  defaultValues = signal<ControlValues>({
    shape: 'circle',
    size: 'md',
    autoColor: false,
  });

  demoShape = computed(() => this.defaultValues()['shape'] as AvatarShape);
  demoSize = computed(() => this.defaultValues()['size'] as AvatarSize);
  demoAutoColor = computed(() => this.defaultValues()['autoColor'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  // Use Case 1: Header User
  currentUser: User = {
    id: 1,
    name: 'Marie Dupont',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'Administrateur',
    status: 'online',
  };

  userMenuOpen = signal(false);

  toggleUserMenu(): void {
    this.userMenuOpen.update(open => !open);
  }

  // Use Case 2: Participants
  participants: Participant[] = [
    { id: 1, name: 'Alice Martin', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Organisateur' },
    { id: 2, name: 'Bob Dupont', avatar: 'https://i.pravatar.cc/150?img=2', role: 'Participant' },
    { id: 3, name: 'Claire Bernard', role: 'Participant' },
    { id: 4, name: 'David Leroy', avatar: 'https://i.pravatar.cc/150?img=4', role: 'Invité' },
  ];

  // Use Case 3: Comments
  comments = signal<Comment[]>([
    {
      id: 1,
      author: 'Jean-Pierre Martin',
      avatar: 'https://i.pravatar.cc/150?img=11',
      content: 'Excellent article, très instructif ! J\'ai particulièrement apprécié la section sur les bonnes pratiques.',
      date: 'Il y a 2h',
      likes: 12,
    },
    {
      id: 2,
      author: 'Sophie Laurent',
      content: 'Merci pour ce partage. Est-ce que vous pourriez approfondir le sujet de la composition ?',
      date: 'Il y a 1h',
      likes: 5,
    },
    {
      id: 3,
      author: 'Marc Dubois',
      avatar: 'https://i.pravatar.cc/150?img=15',
      content: 'Très utile pour mon projet actuel !',
      date: 'Il y a 30min',
      likes: 3,
    },
  ]);

  likeComment(id: number): void {
    this.comments.update(comments =>
      comments.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c)
    );
  }

  // Composition 1: Status
  usersWithStatus: User[] = [
    { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Designer', status: 'online' },
    { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2', role: 'Dev', status: 'away' },
    { id: 3, name: 'Claire', avatar: 'https://i.pravatar.cc/150?img=3', role: 'PM', status: 'busy' },
    { id: 4, name: 'David', avatar: 'https://i.pravatar.cc/150?img=4', role: 'DevOps', status: 'offline' },
  ];

  getStatusType(status: User['status']): 'success' | 'warning' | 'error' | 'default' {
    const typeMap: Record<User['status'], 'success' | 'warning' | 'error' | 'default'> = {
      online: 'success',
      away: 'warning',
      busy: 'error',
      offline: 'default',
    };
    return typeMap[status];
  }

  getStatusLabel(status: User['status']): string {
    const labelMap: Record<User['status'], string> = {
      online: 'En ligne',
      away: 'Absent',
      busy: 'Occupé',
      offline: 'Hors ligne',
    };
    return labelMap[status];
  }

  // Composition 2: Avatar Group
  teamMembers: TeamMember[] = [
    { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Claire', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'David', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Emma', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Frank', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'Grace', avatar: 'https://i.pravatar.cc/150?img=7' },
  ];

  maxVisibleAvatars = 4;

  // Code snippets
  headerUserCode = `<div class="header-user" (click)="toggleUserMenu()">
  <ds-avatar
    [src]="currentUser.avatar"
    [name]="currentUser.name"
    size="md"
  />
  <div class="header-user__info">
    <span class="header-user__name">{{ currentUser.name }}</span>
    <span class="header-user__role">{{ currentUser.role }}</span>
  </div>
</div>`;

  participantsCode = `<div class="participant-row">
  <ds-avatar
    [src]="participant.avatar"
    [name]="participant.name"
    size="md"
    [autoColor]="!participant.avatar"
  />
  <div class="participant-info">
    <span class="participant-name">{{ participant.name }}</span>
    <span class="participant-role">{{ participant.role }}</span>
  </div>
  <ds-badge type="primary" size="sm" variant="outline">
    {{ participant.role }}
  </ds-badge>
</div>`;

  commentsCode = `<div class="comment">
  <ds-avatar
    [src]="comment.avatar"
    [name]="comment.author"
    size="md"
    [autoColor]="!comment.avatar"
  />
  <div class="comment-content">
    <div class="comment-header">
      <span class="comment-author">{{ comment.author }}</span>
      <span class="comment-date">{{ comment.date }}</span>
    </div>
    <p class="comment-text">{{ comment.content }}</p>
    <div class="comment-actions">
      <button (click)="likeComment(comment.id)">♥ {{ comment.likes }}</button>
      <button>Répondre</button>
    </div>
  </div>
</div>`;

  avatarStatusCode = `<div class="avatar-with-status">
  <ds-avatar [src]="user.avatar" [name]="user.name" size="lg" />
  <span class="status-indicator" [class]="'status-indicator--' + user.status"></span>
</div>
<ds-badge [type]="getStatusType(user.status)" size="sm" shape="pill">
  {{ getStatusLabel(user.status) }}
</ds-badge>`;

  avatarGroupCode = `<div class="avatar-group">
  @for (member of teamMembers.slice(0, maxVisible); track member.id) {
    <ds-avatar [src]="member.avatar" [name]="member.name" size="md" />
  }
  @if (teamMembers.length > maxVisible) {
    <div class="avatar-more">+{{ teamMembers.length - maxVisible }}</div>
  }
</div>`;

  profileCardCode = `<ds-card variant="outlined">
  <div class="profile-card">
    <ds-avatar src="..." name="Sophie Laurent" size="xl" />
    <h4 class="profile-card__name">Sophie Laurent</h4>
    <p class="profile-card__role">Lead Designer</p>
    <div class="profile-card__tags">
      <ds-badge type="primary" size="sm">UI/UX</ds-badge>
      <ds-badge type="info" size="sm" variant="outline">Figma</ds-badge>
    </div>
    <div class="profile-card__stats">
      <div class="stat">
        <span class="stat__value">24</span>
        <span class="stat__label">Projets</span>
      </div>
      ...
    </div>
    <ds-button variant="primary">Voir profil</ds-button>
  </div>
</ds-card>`;
}
