import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../core/breadcrumb.service';

@Component({
  selector: 'doc-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (breadcrumbService.breadcrumb().length > 0) {
      <nav class="breadcrumb" aria-label="Fil d'Ariane">
        <ol class="breadcrumb__list">
          @for (item of breadcrumbService.breadcrumb(); track item.label; let last = $last) {
            <li class="breadcrumb__item">
              @if (item.href && !last) {
                <a
                  class="breadcrumb__link"
                  [routerLink]="item.href"
                >
                  {{ item.label }}
                </a>
              } @else {
                <span
                  class="breadcrumb__current"
                  [attr.aria-current]="last ? 'page' : null"
                >
                  {{ item.label }}
                </span>
              }
              @if (!last) {
                <span class="breadcrumb__separator" aria-hidden="true">›</span>
              }
            </li>
          }
        </ol>
      </nav>
    }
  `,
  styles: [`
    .breadcrumb {
      display: flex;
      align-items: center;
    }

    .breadcrumb__list {
      display: flex;
      align-items: center;
      gap: 0;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .breadcrumb__item {
      display: flex;
      align-items: center;
    }

    .breadcrumb__link {
      color: var(--text-muted, #6b7280);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.15s ease;

      &:hover {
        color: var(--color-primary, #3b82f6);
      }
    }

    .breadcrumb__current {
      color: var(--text-default, #1a1a1a);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .breadcrumb__separator {
      margin: 0 8px;
      color: var(--text-muted, #9ca3af);
      font-size: 0.875rem;
    }
  `],
})
export class DynamicBreadcrumb {
  protected breadcrumbService = inject(BreadcrumbService);
}
