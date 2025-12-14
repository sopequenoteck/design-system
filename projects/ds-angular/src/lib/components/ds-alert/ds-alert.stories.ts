import type { Meta, StoryObj } from '@storybook/angular';
import { within, expect, userEvent } from '@storybook/test';
import { DsAlert } from './ds-alert';

const meta: Meta<DsAlert> = {
  title: 'Feedback/Alert',
  component: DsAlert,
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Type de feedback',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de l\'alerte',
    },
    showIcon: {
      control: 'boolean',
      description: 'Affiche une icône selon le type',
    },
    closable: {
      control: 'boolean',
      description: 'Permet de fermer l\'alerte',
    },
    hidden: {
      control: 'boolean',
      description: 'Masque l\'alerte',
    },
  },
};

export default meta;
type Story = StoryObj<DsAlert>;

export const Default: Story = {
  args: {
    type: 'info',
    size: 'md',
    showIcon: true,
    closable: false,
    hidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-alert [type]="type" [size]="size" [showIcon]="showIcon" [closable]="closable" [hidden]="hidden">
        <p><strong>Information :</strong> Ceci est un message d'information standard.</p>
      </ds-alert>
    `,
  }),
};

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ds-alert type="success">
          <p><strong>Succès !</strong> Votre opération a été effectuée avec succès.</p>
        </ds-alert>

        <ds-alert type="warning">
          <p><strong>Attention !</strong> Cette action nécessite une confirmation.</p>
        </ds-alert>

        <ds-alert type="error">
          <p><strong>Erreur !</strong> Une erreur s'est produite lors du traitement.</p>
        </ds-alert>

        <ds-alert type="info">
          <p><strong>Information :</strong> Voici une information importante pour vous.</p>
        </ds-alert>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ds-alert type="success" size="sm">
          <p>Alerte small avec padding et icône réduits.</p>
        </ds-alert>

        <ds-alert type="info" size="md">
          <p>Alerte medium avec padding et icône standard.</p>
        </ds-alert>

        <ds-alert type="warning" size="lg">
          <p>Alerte large avec padding et icône augmentés.</p>
        </ds-alert>
      </div>
    `,
  }),
};

export const WithoutIcon: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ds-alert type="success" [showIcon]="false">
          <p>Alerte de succès sans icône.</p>
        </ds-alert>

        <ds-alert type="warning" [showIcon]="false">
          <p>Alerte d'avertissement sans icône.</p>
        </ds-alert>
      </div>
    `,
  }),
};

export const Closable: Story = {
  render: () => ({
    props: {
      alerts: [
        { id: 1, type: 'success' as const, visible: true },
        { id: 2, type: 'info' as const, visible: true },
        { id: 3, type: 'warning' as const, visible: true },
      ],
      allClosed: false,
      closeAlert: function(id: number) {
        const alert = this['alerts'].find((a: { id: number }) => a.id === id);
        if (alert) {
          alert.visible = false;
          this['allClosed'] = this['alerts'].filter((a: { visible: boolean }) => a.visible).length === 0;
        }
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        @for (alert of alerts; track alert.id) {
          @if (alert.visible) {
            <ds-alert [type]="alert.type" [closable]="true" (closed)="closeAlert(alert.id)">
              <p>Alerte {{ alert.id }} - Cliquez sur la croix pour fermer cette alerte.</p>
            </ds-alert>
          }
        }
        @if (allClosed) {
          <p style="color: var(--text-muted); text-align: center;">Toutes les alertes ont été fermées !</p>
        }
      </div>
    `,
  }),
};

export const ComplexContent: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
        <ds-alert type="success" size="lg" [closable]="true">
          <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Mise à jour réussie</h3>
          <p style="margin: 0 0 12px;">Vos modifications ont été enregistrées avec succès. Les changements sont maintenant visibles pour tous les utilisateurs.</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Profil mis à jour</li>
            <li>Photo modifiée</li>
            <li>Paramètres de confidentialité appliqués</li>
          </ul>
        </ds-alert>

        <ds-alert type="warning" size="lg" [closable]="true">
          <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Action requise</h3>
          <p style="margin: 0 0 12px;">Votre abonnement expire dans 7 jours. Renouvelez dès maintenant pour continuer à profiter de tous nos services.</p>
          <button style="padding: 8px 16px; border: none; background: var(--warning); color: var(--gray-900); border-radius: 4px; cursor: pointer; font-weight: 500;">
            Renouveler maintenant
          </button>
        </ds-alert>
      </div>
    `,
  }),
};

export const InlineAlert: Story = {
  render: () => ({
    template: `
      <div style="max-width: 500px;">
        <h2 style="margin: 0 0 16px;">Formulaire d'inscription</h2>
        <form style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500;">Nom d'utilisateur</label>
            <input type="text" style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px;" />
            <ds-alert type="error" size="sm" style="margin-top: 4px;">
              <p style="margin: 0; font-size: 13px;">Ce nom d'utilisateur est déjà pris.</p>
            </ds-alert>
          </div>

          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500;">Email</label>
            <input type="email" style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px;" />
            <ds-alert type="success" size="sm" style="margin-top: 4px;">
              <p style="margin: 0; font-size: 13px;">Cette adresse email est disponible.</p>
            </ds-alert>
          </div>

          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500;">Mot de passe</label>
            <input type="password" style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px;" />
            <ds-alert type="warning" size="sm" style="margin-top: 4px;">
              <p style="margin: 0; font-size: 13px;">Le mot de passe doit contenir au moins 8 caractères.</p>
            </ds-alert>
          </div>
        </form>
      </div>
    `,
  }),
};

export const StackedAlerts: Story = {
  render: () => ({
    template: `
      <div style="position: fixed; top: 16px; right: 16px; width: 400px; display: flex; flex-direction: column; gap: 12px; z-index: 1000;">
        <ds-alert type="success" [closable]="true">
          <p><strong>Fichier téléchargé</strong></p>
          <p style="margin: 4px 0 0; font-size: 14px;">document.pdf a été téléchargé avec succès.</p>
        </ds-alert>

        <ds-alert type="info" [closable]="true">
          <p><strong>Nouvelle notification</strong></p>
          <p style="margin: 4px 0 0; font-size: 14px;">Vous avez 3 nouveaux messages non lus.</p>
        </ds-alert>

        <ds-alert type="warning" [closable]="true">
          <p><strong>Espace de stockage</strong></p>
          <p style="margin: 4px 0 0; font-size: 14px;">Vous avez utilisé 85% de votre espace disponible.</p>
        </ds-alert>
      </div>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
        <ds-alert type="info" size="lg">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;">
              <p style="margin: 0;"><strong>Nouvelle version disponible</strong></p>
              <p style="margin: 4px 0 0; font-size: 14px;">Une mise à jour est disponible. Installez-la maintenant pour bénéficier des dernières fonctionnalités.</p>
            </div>
            <div style="display: flex; gap: 8px; margin-left: 16px;">
              <button style="padding: 6px 12px; border: 1px solid currentColor; background: transparent; border-radius: 4px; cursor: pointer; font-size: 14px;">
                Plus tard
              </button>
              <button style="padding: 6px 12px; border: none; background: var(--info); color: white; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 14px;">
                Mettre à jour
              </button>
            </div>
          </div>
        </ds-alert>

        <ds-alert type="warning" size="lg" [closable]="true">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="flex: 1;">
              <p style="margin: 0;"><strong>Confirmation requise</strong></p>
              <p style="margin: 4px 0 0; font-size: 14px;">Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?</p>
            </div>
            <div style="display: flex; gap: 8px; margin-left: 16px;">
              <button style="padding: 6px 12px; border: 1px solid currentColor; background: transparent; border-radius: 4px; cursor: pointer; font-size: 14px;">
                Annuler
              </button>
              <button style="padding: 6px 12px; border: none; background: var(--error); color: white; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 14px;">
                Confirmer
              </button>
            </div>
          </div>
        </ds-alert>
      </div>
    `,
  }),
};

export const AllVariations: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
        <ds-alert type="success" size="sm">
          <p>Success SM</p>
        </ds-alert>
        <ds-alert type="success" size="md">
          <p>Success MD</p>
        </ds-alert>
        <ds-alert type="success" size="lg">
          <p>Success LG</p>
        </ds-alert>

        <ds-alert type="warning" size="sm" [closable]="true">
          <p>Warning SM closable</p>
        </ds-alert>
        <ds-alert type="warning" size="md" [closable]="true">
          <p>Warning MD closable</p>
        </ds-alert>
        <ds-alert type="warning" size="lg" [closable]="true">
          <p>Warning LG closable</p>
        </ds-alert>

        <ds-alert type="error" size="sm" [showIcon]="false">
          <p>Error SM no icon</p>
        </ds-alert>
        <ds-alert type="error" size="md" [showIcon]="false">
          <p>Error MD no icon</p>
        </ds-alert>
        <ds-alert type="error" size="lg" [showIcon]="false">
          <p>Error LG no icon</p>
        </ds-alert>

        <ds-alert type="info" size="sm" [closable]="true">
          <p>Info SM closable</p>
        </ds-alert>
        <ds-alert type="info" size="md" [closable]="true">
          <p>Info MD closable</p>
        </ds-alert>
        <ds-alert type="info" size="lg" [closable]="true">
          <p>Info LG closable</p>
        </ds-alert>
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
          <ds-alert type="info" [showIcon]="true">Message d'information</ds-alert>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-alert type="info" [showIcon]="true">Message d'information</ds-alert>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-alert type="info" [showIcon]="true">Message d'information</ds-alert>
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
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
        <ds-alert type="error" [closable]="true" data-testid="accessible-alert">
          <p><strong>Erreur critique !</strong> Veuillez corriger les champs invalides.</p>
        </ds-alert>

        <ds-alert type="info" [showIcon]="true">
          <p>Cette alerte utilise <code>role="alert"</code> pour les lecteurs d'écran.</p>
        </ds-alert>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
## Accessibilité WCAG 2.1 AA

### Rôles ARIA

| Type | Rôle | Description |
|------|------|-------------|
| \`error\` | \`role="alert"\` | Annonce immédiate pour les erreurs critiques |
| \`warning\` | \`role="alert"\` | Annonce pour les avertissements importants |
| \`success\` | \`role="status"\` | Feedback non-intrusif de succès |
| \`info\` | \`role="status"\` | Information générale non-urgente |

### Navigation clavier

| Touche | Action |
|--------|--------|
| \`Tab\` | Focus le bouton de fermeture (si closable) |
| \`Enter\` | Ferme l'alerte |
| \`Space\` | Ferme l'alerte |
| \`Escape\` | Ferme l'alerte (focus dans l'alerte) |

### Bonnes pratiques

- Utilisez \`type="error"\` pour les erreurs critiques uniquement
- Le contenu doit être explicite et actionnable
- Évitez les alertes auto-dismiss pour les messages importants
- Les alertes closable gardent le focus après fermeture
        `,
      },
    },
  },
};

export const WithInteractionTest: Story = {
  args: {
    type: 'warning',
    closable: true,
    showIcon: true,
  },
  render: (args) => ({
    props: {
      ...args,
      alertClosed: false,
      onClosed: function() {
        this['alertClosed'] = true;
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        @if (!alertClosed) {
          <ds-alert
            [type]="type"
            [closable]="closable"
            [showIcon]="showIcon"
            (closed)="onClosed()"
            data-testid="interactive-alert"
          >
            <p><strong>Test d'interaction</strong> : Cliquez sur la croix ou utilisez le clavier pour fermer.</p>
          </ds-alert>
        }
        @if (alertClosed) {
          <p style="color: var(--success); font-weight: 500;" data-testid="closed-message">
            ✓ Alerte fermée avec succès !
          </p>
        }
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Vérifier que l'alerte est présente
    const alert = canvasElement.querySelector('[data-testid="interactive-alert"]');
    await expect(alert).toBeInTheDocument();

    // 2. Vérifier le rôle ARIA
    await expect(alert).toHaveAttribute('role');

    // 3. Trouver et cliquer sur le bouton de fermeture
    const closeButton = canvas.getByRole('button');
    await expect(closeButton).toBeInTheDocument();

    // 4. Tester le focus clavier
    await userEvent.tab();

    // 5. Fermer avec Enter
    await userEvent.keyboard('{Enter}');

    // 6. Vérifier que l'alerte est fermée
    const closedMessage = canvasElement.querySelector('[data-testid="closed-message"]');
    await expect(closedMessage).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Story avec test d\'interaction automatisé. Le test vérifie : présence de l\'alerte, rôle ARIA, bouton de fermeture, navigation clavier et fermeture effective.',
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  render: () => ({
    props: {
      alerts: [
        { id: 1, type: 'success' as const, visible: true },
        { id: 2, type: 'warning' as const, visible: true },
        { id: 3, type: 'error' as const, visible: true },
      ],
      closeAlert: function(id: number) {
        const alert = this['alerts'].find((a: { id: number }) => a.id === id);
        if (alert) alert.visible = false;
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <p style="margin-bottom: 8px; font-size: 14px; color: var(--text-muted);">
          Utilisez <kbd style="padding: 2px 6px; background: var(--gray-100); border-radius: 4px;">Tab</kbd>
          pour naviguer et
          <kbd style="padding: 2px 6px; background: var(--gray-100); border-radius: 4px;">Enter</kbd>
          pour fermer
        </p>

        @for (alert of alerts; track alert.id) {
          @if (alert.visible) {
            <ds-alert [type]="alert.type" [closable]="true" (closed)="closeAlert(alert.id)">
              <p>Alerte {{ alert.id }} - Fermez-moi avec le clavier !</p>
            </ds-alert>
          }
        }

        @if (alerts | json; as alertsJson) {
          @if (!alerts[0].visible && !alerts[1].visible && !alerts[2].visible) {
            <p style="color: var(--success); text-align: center; font-weight: 500;">
              🎉 Toutes les alertes ont été fermées au clavier !
            </p>
          }
        }
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Démonstration de la navigation clavier. Utilisez Tab pour naviguer entre les boutons de fermeture et Enter/Space pour fermer chaque alerte.',
      },
    },
  },
};
