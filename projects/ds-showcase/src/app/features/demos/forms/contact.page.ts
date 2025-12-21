import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsInputField, DsButton, DsCard, DsInputTextarea } from 'ds-angular';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-contact-page',
  standalone: true,
  imports: [RouterLink, DsInputField, DsButton, DsCard, DsInputTextarea],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Contact</h1>
        <p class="demo-description">
          Formulaire de contact avec champs texte et zone de message.
        </p>
      </header>

      <section class="demo-preview">
        <div class="demo-preview__container">
          <ds-card class="contact-card">
            <h2>Contactez-nous</h2>
            <form class="contact-form">
              <div class="form-row">
                <ds-input-field label="Prénom" placeholder="John" />
                <ds-input-field label="Nom" placeholder="Doe" />
              </div>
              <ds-input-field label="Email" type="email" placeholder="john.doe@example.com" />
              <ds-input-textarea label="Message" placeholder="Votre message..." [rows]="4" />
              <ds-button variant="primary" [block]="true">Envoyer</ds-button>
            </form>
          </ds-card>
        </div>
      </section>

      <section class="demo-components">
        <h2>Composants utilisés</h2>
        <div class="component-list">
          @for (comp of usedComponents; track comp.id) {
            <a [routerLink]="comp.path" class="component-chip">{{ comp.label }}</a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 1200px; margin: 0 auto; }
    .demo-header { margin-bottom: 32px; }
    .demo-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 8px; }
    .demo-description { font-size: 1.125rem; color: var(--doc-text-secondary); margin: 0; }
    .demo-preview { background: var(--doc-surface-sunken); border-radius: 12px; padding: 32px; margin-bottom: 32px; }
    .demo-preview__container { display: flex; justify-content: center; min-height: 400px; }
    .contact-card { width: 100%; max-width: 500px; padding: 32px; }
    .contact-card h2 { margin: 0 0 24px; font-size: 1.5rem; }
    .contact-form { display: flex; flex-direction: column; gap: 16px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .demo-components h2 { font-size: 1.25rem; margin: 0 0 16px; }
    .component-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .component-chip {
      padding: 4px 16px; background: var(--doc-surface-elevated); border: 1px solid var(--doc-border-default);
      border-radius: 9999px; color: var(--doc-text-primary); font-size: 0.875rem; text-decoration: none;
    }
    .component-chip:hover { border-color: var(--doc-accent-primary); color: var(--doc-accent-primary); }
  `]
})
export class ContactDemoPage {
  usedComponents: UsedComponent[] = [
    { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
    { id: 'ds-input-field', label: 'Input Field', path: '/components/forms/text-inputs/ds-input-field' },
    { id: 'ds-textarea', label: 'Textarea', path: '/components/forms/text-inputs/ds-input-textarea' },
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
  ];
}
