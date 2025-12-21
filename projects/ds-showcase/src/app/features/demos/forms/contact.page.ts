import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsInputField, DsButton, DsCard, DsInputTextarea } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { CodeSource } from '../../../registry/types';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-contact-page',
  standalone: true,
  imports: [RouterLink, DsInputField, DsButton, DsCard, DsInputTextarea, DemoContainer],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Contact</h1>
        <p class="demo-description">
          Formulaire de contact avec champs texte et zone de message.
        </p>
      </header>

      <section class="demo-section">
        <doc-demo-container [sources]="sources">
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
        </doc-demo-container>
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
    .demo-section { margin-bottom: 32px; }
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

  sources: CodeSource[] = [
    {
      language: 'html',
      filename: 'contact.component.html',
      content: `<ds-card class="contact-card">
  <h2>Contactez-nous</h2>
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="form-row">
      <ds-input-field label="Prénom" formControlName="firstName" />
      <ds-input-field label="Nom" formControlName="lastName" />
    </div>
    <ds-input-field label="Email" type="email" formControlName="email" />
    <ds-input-textarea label="Message" formControlName="message" [rows]="4" />
    <ds-button variant="primary" [block]="true" type="submit" [loading]="isSubmitting">
      Envoyer
    </ds-button>
  </form>
</ds-card>`
    },
    {
      language: 'typescript',
      filename: 'contact.component.ts',
      content: `import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DsInputField, DsInputTextarea, DsButton, DsCard } from 'ds-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, DsInputField, DsInputTextarea, DsButton, DsCard],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      // Envoi du formulaire...
    }
  }
}`
    },
    {
      language: 'scss',
      filename: 'contact.component.scss',
      content: `.contact-card {
  width: 100%;
  max-width: 500px;
  padding: var(--space-8);
}

h2 {
  margin: 0 0 var(--space-6);
  font-size: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}`
    }
  ];
}
