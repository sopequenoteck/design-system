import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-tooltip" role="tooltip">
      <div class="ds-tooltip__content">{{ text() }}</div>
    </div>
  `,
  styleUrl: './ds-tooltip.component.scss',
})
export class DsTooltipComponent {
  text = input.required<string>();
}
