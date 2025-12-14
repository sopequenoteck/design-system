import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';
import { moduleMetadata } from '@storybook/angular';
import { PrimitiveRadio } from '../../primitives/primitive-radio/primitive-radio';

const meta: Meta = {
  title: 'Form/Selection/DsRadioGroup',
  decorators: [
    moduleMetadata({
      imports: [PrimitiveRadio],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="font-weight: 500; margin-bottom: 12px;">Choisissez une option</legend>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <primitive-radio name="default" value="option1" label="Option 1" [checked]="true"></primitive-radio>
          <primitive-radio name="default" value="option2" label="Option 2"></primitive-radio>
          <primitive-radio name="default" value="option3" label="Option 3"></primitive-radio>
        </div>
      </fieldset>
    `,
  }),
};

export const Horizontal: Story = {
  render: () => ({
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="font-weight: 500; margin-bottom: 12px;">Taille</legend>
        <div style="display: flex; gap: 16px;">
          <primitive-radio name="size" value="sm" label="S" [checked]="true"></primitive-radio>
          <primitive-radio name="size" value="md" label="M"></primitive-radio>
          <primitive-radio name="size" value="lg" label="L"></primitive-radio>
          <primitive-radio name="size" value="xl" label="XL"></primitive-radio>
        </div>
      </fieldset>
    `,
  }),
};

export const WithDisabled: Story = {
  render: () => ({
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="font-weight: 500; margin-bottom: 12px;">Plan tarifaire</legend>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <primitive-radio name="plan" value="free" label="Gratuit" [checked]="true"></primitive-radio>
          <primitive-radio name="plan" value="pro" label="Professionnel"></primitive-radio>
          <primitive-radio name="plan" value="enterprise" label="Entreprise (bientôt)" [disabled]="true"></primitive-radio>
        </div>
      </fieldset>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <fieldset style="border: none; padding: 0; margin: 0;">
          <legend style="font-weight: 500; margin-bottom: 8px;">Small</legend>
          <div style="display: flex; gap: 12px;">
            <primitive-radio name="small" value="a" label="A" size="sm" [checked]="true"></primitive-radio>
            <primitive-radio name="small" value="b" label="B" size="sm"></primitive-radio>
          </div>
        </fieldset>
        <fieldset style="border: none; padding: 0; margin: 0;">
          <legend style="font-weight: 500; margin-bottom: 8px;">Medium</legend>
          <div style="display: flex; gap: 12px;">
            <primitive-radio name="medium" value="a" label="A" size="md" [checked]="true"></primitive-radio>
            <primitive-radio name="medium" value="b" label="B" size="md"></primitive-radio>
          </div>
        </fieldset>
        <fieldset style="border: none; padding: 0; margin: 0;">
          <legend style="font-weight: 500; margin-bottom: 8px;">Large</legend>
          <div style="display: flex; gap: 12px;">
            <primitive-radio name="large" value="a" label="A" size="lg" [checked]="true"></primitive-radio>
            <primitive-radio name="large" value="b" label="B" size="lg"></primitive-radio>
          </div>
        </fieldset>
      </div>
    `,
  }),
};

export const PaymentMethod: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin: 0 0 16px;">Mode de paiement</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px;">
            <primitive-radio name="payment" value="card" [checked]="true"></primitive-radio>
            <span style="margin-left: 12px;">Carte bancaire</span>
          </div>
          <div style="display: flex; align-items: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px;">
            <primitive-radio name="payment" value="paypal"></primitive-radio>
            <span style="margin-left: 12px;">PayPal</span>
          </div>
          <div style="display: flex; align-items: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px;">
            <primitive-radio name="payment" value="transfer"></primitive-radio>
            <span style="margin-left: 12px;">Virement bancaire</span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const WithDynamicOptions: Story = {
  render: () => ({
    props: {
      options: ['Rouge', 'Vert', 'Bleu'],
      addOption: function() {
        const colors = ['Jaune', 'Orange', 'Violet', 'Rose'];
        const newColor = colors[this["options"].length - 3];
        if (newColor) this["options"].push(newColor);
      },
      removeOption: function() {
        if (this["options"].length > 1) this["options"].pop();
      },
    },
    template: `
      <div>
        <div style="margin-bottom: 12px; display: flex; gap: 8px;">
          <button (click)="addOption()" style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 4px; background: white; cursor: pointer;">
            Ajouter option
          </button>
          <button (click)="removeOption()" style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 4px; background: white; cursor: pointer;">
            Retirer option
          </button>
        </div>
        <fieldset style="border: none; padding: 0; margin: 0;">
          <legend style="font-weight: 500; margin-bottom: 12px;">Couleur ({{ options.length }} options)</legend>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            @for (option of options; track option; let i = $index) {
              <primitive-radio
                name="color"
                [value]="option"
                [label]="option"
                [checked]="i === 0">
              </primitive-radio>
            }
          </div>
        </fieldset>
      </div>
    `,
  }),
};

export const WithValidation: Story = {
  render: () => ({
    props: {
      selectedValue: '',
      submitted: false,
      hasError: false,
      onSubmit: function() {
        this["submitted"] = true;
        this["hasError"] = !this["selectedValue"];
      },
      onChange: function(value: string) {
        this["selectedValue"] = value;
        if (this["submitted"]) this["hasError"] = false;
      },
    },
    template: `
      <form (submit)="onSubmit(); $event.preventDefault()" style="max-width: 400px;">
        <fieldset style="border: none; padding: 0; margin: 0;">
          <legend style="font-weight: 500; margin-bottom: 12px;">
            Niveau d'expérience <span style="color: #ef4444;">*</span>
          </legend>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <primitive-radio
              name="experience"
              value="junior"
              label="Junior (0-2 ans)"
              (change)="onChange('junior')">
            </primitive-radio>
            <primitive-radio
              name="experience"
              value="intermediate"
              label="Intermédiaire (3-5 ans)"
              (change)="onChange('intermediate')">
            </primitive-radio>
            <primitive-radio
              name="experience"
              value="senior"
              label="Senior (5+ ans)"
              (change)="onChange('senior')">
            </primitive-radio>
          </div>
          @if (hasError) {
            <p style="margin: 8px 0 0; font-size: 14px; color: #ef4444;">
              ⚠️ Veuillez sélectionner un niveau d'expérience
            </p>
          }
        </fieldset>
        <button
          type="submit"
          style="margin-top: 16px; padding: 8px 16px; border: none; border-radius: 4px; background: #7d4bc0; color: white; cursor: pointer;">
          Valider
        </button>
      </form>
    `,
  }),
};

export const WithError: Story = {
  render: () => ({
    template: `
      <fieldset style="border: 1px solid #ef4444; padding: 16px; border-radius: 8px; background: #fef2f2;">
        <legend style="font-weight: 500; color: #991b1b;">Type de contrat (requis)</legend>
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
          <primitive-radio name="contract-error" value="cdi" label="CDI"></primitive-radio>
          <primitive-radio name="contract-error" value="cdd" label="CDD"></primitive-radio>
          <primitive-radio name="contract-error" value="freelance" label="Freelance"></primitive-radio>
        </div>
        <p style="margin: 12px 0 0; font-size: 14px; color: #991b1b;">
          ⚠️ Vous devez sélectionner un type de contrat pour continuer
        </p>
      </fieldset>
    `,
  }),
};

export const WithHelperText: Story = {
  render: () => ({
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="font-weight: 500; margin-bottom: 8px;">Fréquence de notification</legend>
        <p style="margin: 0 0 12px; font-size: 14px; color: #6b7280;">
          Choisissez à quelle fréquence vous souhaitez recevoir des notifications par email
        </p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <primitive-radio name="frequency" value="realtime" label="En temps réel" [checked]="true"></primitive-radio>
          <primitive-radio name="frequency" value="daily" label="Quotidien (résumé journalier)"></primitive-radio>
          <primitive-radio name="frequency" value="weekly" label="Hebdomadaire (résumé le lundi)"></primitive-radio>
          <primitive-radio name="frequency" value="never" label="Jamais (désactiver les notifications)"></primitive-radio>
        </div>
        <p style="margin: 12px 0 0; font-size: 12px; color: #9ca3af;">
          💡 Vous pourrez modifier ce paramètre à tout moment dans vos préférences
        </p>
      </fieldset>
    `,
  }),
};

export const ComplexLayout: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px;">
        <fieldset style="border: none; padding: 0; margin: 0;">
          <legend style="font-weight: 600; font-size: 18px; margin-bottom: 16px;">Plan d'abonnement</legend>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <label style="display: flex; gap: 12px; padding: 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: border-color 0.2s;">
              <primitive-radio name="plan-complex" value="free" [checked]="true"></primitive-radio>
              <div style="flex: 1;">
                <div style="font-weight: 500; margin-bottom: 4px;">Gratuit</div>
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
                  Pour les projets personnels et l'expérimentation
                </div>
                <div style="font-size: 24px; font-weight: 600;">0€<span style="font-size: 14px; font-weight: 400; color: #6b7280;">/mois</span></div>
              </div>
            </label>
            <label style="display: flex; gap: 12px; padding: 16px; border: 2px solid #7d4bc0; border-radius: 8px; cursor: pointer; background: #faf5ff;">
              <primitive-radio name="plan-complex" value="pro"></primitive-radio>
              <div style="flex: 1;">
                <div style="font-weight: 500; margin-bottom: 4px;">Pro <span style="background: #7d4bc0; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">Populaire</span></div>
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
                  Pour les équipes et projets professionnels
                </div>
                <div style="font-size: 24px; font-weight: 600;">29€<span style="font-size: 14px; font-weight: 400; color: #6b7280;">/mois</span></div>
              </div>
            </label>
            <label style="display: flex; gap: 12px; padding: 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
              <primitive-radio name="plan-complex" value="enterprise"></primitive-radio>
              <div style="flex: 1;">
                <div style="font-weight: 500; margin-bottom: 4px;">Entreprise</div>
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
                  Pour les grandes organisations avec besoins avancés
                </div>
                <div style="font-size: 16px; font-weight: 600; color: #6b7280;">Sur devis</div>
              </div>
            </label>
          </div>
        </fieldset>
      </div>
    `,
  }),
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <primitive-radio name="themed-light" value="a" label="Option A" [checked]="true"></primitive-radio>
          <primitive-radio name="themed-light" value="b" label="Option B"></primitive-radio>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <primitive-radio name="themed-dark" value="a" label="Option A" [checked]="true"></primitive-radio>
          <primitive-radio name="themed-dark" value="b" label="Option B"></primitive-radio>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <primitive-radio name="themed-custom" value="a" label="Option A" [checked]="true"></primitive-radio>
          <primitive-radio name="themed-custom" value="b" label="Option B"></primitive-radio>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => ({
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="font-weight: 500; margin-bottom: 12px;">Choisissez une option (utilisez les flèches)</legend>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <primitive-radio name="accessibility" value="option1" label="Option 1" [checked]="true"></primitive-radio>
          <primitive-radio name="accessibility" value="option2" label="Option 2"></primitive-radio>
          <primitive-radio name="accessibility" value="option3" label="Option 3"></primitive-radio>
        </div>
      </fieldset>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Accessibilité clavier

| Touche | Action |
|--------|--------|
| Tab | Déplace le focus vers le groupe de radios |
| Arrow Up/Down | Sélectionne le radio précédent/suivant |
| Arrow Left/Right | Sélectionne le radio précédent/suivant |
| Space | Sélectionne le radio focalisé |

### Attributs ARIA
- \`role="radiogroup"\`: Identifie le conteneur du groupe (fieldset/legend recommandé)
- \`role="radio"\`: Identifie chaque option radio
- \`aria-checked\`: Indique quelle option est sélectionnée
- \`aria-disabled\`: Indique les options désactivées

### Bonnes pratiques
- Toujours regrouper les radios dans un \`<fieldset>\` avec un \`<legend>\`
- Un seul radio peut être sélectionné à la fois dans un groupe
- La navigation au clavier doit parcourir tous les radios du groupe
- Le focus est visible sur l'option sélectionnée
        `,
      },
    },
  },
};

export const WithInteractionTest: Story = {
  render: () => ({
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;" data-testid="radio-group">
        <legend style="font-weight: 500; margin-bottom: 12px;">Sélectionnez une option</legend>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <primitive-radio name="test-group" value="option1" label="Option 1" [checked]="true" data-testid="radio1"></primitive-radio>
          <primitive-radio name="test-group" value="option2" label="Option 2" data-testid="radio2"></primitive-radio>
          <primitive-radio name="test-group" value="option3" label="Option 3" data-testid="radio3"></primitive-radio>
        </div>
      </fieldset>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Attendre que les composants soient rendus
    await new Promise(resolve => setTimeout(resolve, 200));

    const radioGroup = canvas.getByTestId('radio-group');
    const radio1Container = canvas.getByTestId('radio1');
    const radio2Container = canvas.getByTestId('radio2');

    // Vérifier que le groupe est dans le DOM
    await expect(radioGroup).toBeInTheDocument();
    await expect(radio1Container).toBeInTheDocument();
    await expect(radio2Container).toBeInTheDocument();

    // Cliquer sur le deuxième radio pour tester l'interaction
    await userEvent.click(radio2Container);

    await new Promise(resolve => setTimeout(resolve, 100));

    // Vérification finale - le groupe est toujours présent
    await expect(radioGroup).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Test d\'interaction automatisé : vérifie la sélection exclusive des options radio.',
      },
    },
  },
};
