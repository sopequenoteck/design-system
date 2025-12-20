import { Component, input, output, computed } from '@angular/core';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { SidebarMode } from './ds-sidebar.types';

@Component({
  selector: 'ds-sidebar-footer-item',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './ds-sidebar-footer-item.component.html',
  styleUrl: './ds-sidebar-footer-item.component.scss',
})
export class DsSidebarFooterItemComponent {
  // Inputs (signals)
  readonly icon = input.required<IconDefinition>();
  readonly label = input.required<string>();
  readonly mode = input<SidebarMode>('full');
  readonly variant = input<'default' | 'danger'>('default');

  // Outputs (signals)
  readonly clicked = output<void>();

  // Computed
  readonly isCollapsed = computed(() => this.mode() === 'collapsed');
}
