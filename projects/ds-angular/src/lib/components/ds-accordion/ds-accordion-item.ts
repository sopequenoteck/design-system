import { Component, input, signal, TemplateRef, ViewChild } from '@angular/core';

let accordionItemIdCounter = 0;

/**
 * # DsAccordionItem
 *
 * Composant enfant pour le mode template-driven de DsAccordion.
 * Permet d'injecter du contenu Angular riche (composants, HTML, etc.).
 *
 * ## Usage
 *
 * ```html
 * <ds-accordion [multiple]="true">
 *   <ds-accordion-item header="Section 1" [badge]="items.length">
 *     <div>Contenu riche ici</div>
 *     <my-component />
 *   </ds-accordion-item>
 * </ds-accordion>
 * ```
 *
 * @component
 */
@Component({
  selector: 'ds-accordion-item',
  standalone: true,
  template: `
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
})
export class DsAccordionItem {
  /**
   * Texte du header.
   */
  readonly header = input<string>('');

  /**
   * Badge optionnel affiché à côté du header (ex: compteur).
   */
  readonly badge = input<string | number | undefined>(undefined);

  /**
   * ID unique de l'item. Auto-généré si non fourni.
   */
  readonly id = input<string>(`accordion-item-${++accordionItemIdCounter}`);

  /**
   * Désactiver cet item.
   * @default false
   */
  readonly disabled = input<boolean>(false);

  /**
   * Template du contenu projeté.
   * @internal
   */
  @ViewChild('contentTemplate', { static: true })
  contentTemplate!: TemplateRef<unknown>;

  /**
   * État d'expansion (contrôlé par le parent DsAccordion).
   * @internal
   */
  readonly _expanded = signal<boolean>(false);

  /**
   * Index dans la liste (injecté par le parent).
   * @internal
   */
  readonly _index = signal<number>(0);
}
