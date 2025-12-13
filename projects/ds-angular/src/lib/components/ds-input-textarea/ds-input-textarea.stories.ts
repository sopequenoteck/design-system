import type { Meta, StoryObj } from '@storybook/angular';
import { DsInputTextarea } from './ds-input-textarea';
import { faComment, faFileAlt, faPen, faSearch } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsInputTextarea> = {
  title: 'Form/Inputs/DsInputTextarea',
  component: DsInputTextarea,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label du champ',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled'],
      description: 'Variante visuelle',
    },
    state: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'État de validation',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Mode de redimensionnement',
    },
    rows: {
      control: 'number',
      description: 'Nombre de lignes visibles',
    },
    cols: {
      control: 'number',
      description: 'Nombre de colonnes',
    },
    maxlength: {
      control: 'number',
      description: 'Limite de caractères',
    },
    resizeAuto: {
      control: 'number',
      description: 'Hauteur max pour auto-resize (px)',
    },
    helper: {
      control: 'text',
      description: 'Texte d\'aide',
    },
    error: {
      control: 'text',
      description: 'Message d\'erreur',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactivé',
    },
    readonly: {
      control: 'boolean',
      description: 'Lecture seule',
    },
    required: {
      control: 'boolean',
      description: 'Champ obligatoire',
    },
    clearable: {
      control: 'boolean',
      description: 'Bouton pour effacer',
    },
  },
};

export default meta;
type Story = StoryObj<DsInputTextarea>;

// =============================================================================
// STORIES DE BASE
// =============================================================================

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea par défaut avec label et placeholder. Compatible avec les formulaires réactifs et template-driven via ControlValueAccessor.',
      },
    },
  },
  args: {
    label: 'Description',
    placeholder: 'Entrez votre description...',
    size: 'md',
    state: 'default',
    resize: 'vertical',
    rows: 4,
    disabled: false,
    readonly: false,
    required: false,
    clearable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-input-textarea
        [label]="label"
        [placeholder]="placeholder"
        [size]="size"
        [state]="state"
        [resize]="resize"
        [rows]="rows"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [clearable]="clearable"
        style="max-width: 400px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea avec label visible. Le label est associé au champ via l\'attribut `for` pour l\'accessibilité.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-textarea
        label="Bio"
        placeholder="Parlez-nous de vous..."
        [rows]="4"
        style="max-width: 400px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

export const WithHelper: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Texte d\'aide affiché sous le champ pour guider l\'utilisateur. Lié via aria-describedby.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-textarea
        label="Commentaire"
        placeholder="Votre commentaire..."
        helper="Maximum 500 caractères recommandés"
        [rows]="4"
        style="max-width: 400px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Message d\'erreur affiché sous le champ. L\'erreur est annoncée aux lecteurs d\'écran via role="alert".',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-textarea
        label="Message"
        placeholder="Votre message..."
        error="Ce champ est obligatoire"
        [rows]="4"
        style="max-width: 400px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

// =============================================================================
// ÉTATS
// =============================================================================

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les quatre états visuels de validation : default, success, warning et error.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <ds-input-textarea
          label="État par défaut"
          placeholder="Saisie normale"
          state="default"
          helper="Texte d'aide standard"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="État succès"
          placeholder="Validation réussie"
          state="success"
          helper="Le contenu est valide"
          externalValue="Ce texte est validé."
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="État avertissement"
          placeholder="Attention requise"
          state="warning"
          helper="Ce champ peut nécessiter votre attention"
          externalValue="Vérifiez ce contenu."
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="État erreur"
          placeholder="Erreur de validation"
          error="Ce champ contient une erreur"
          externalValue="Contenu invalide"
          [rows]="3">
        </ds-input-textarea>
      </div>
    `,
  }),
};

// =============================================================================
// TAILLES
// =============================================================================

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les trois tailles disponibles : small, medium (par défaut) et large.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <ds-input-textarea
          label="Small (sm)"
          size="sm"
          placeholder="Taille compacte"
          helper="Pour interfaces denses"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="Medium (md)"
          size="md"
          placeholder="Taille standard"
          helper="Taille par défaut"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="Large (lg)"
          size="lg"
          placeholder="Taille confortable"
          helper="Pour formulaires principaux"
          [rows]="3">
        </ds-input-textarea>
      </div>
    `,
  }),
};

// =============================================================================
// MODES DE REDIMENSIONNEMENT
// =============================================================================

export const ResizeModes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les quatre modes de redimensionnement : vertical (défaut), horizontal, both et none.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <ds-input-textarea
          label="Vertical (défaut)"
          resize="vertical"
          placeholder="Redimensionnable verticalement"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="Horizontal"
          resize="horizontal"
          placeholder="Redimensionnable horizontalement"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="Les deux"
          resize="both"
          placeholder="Redimensionnable dans les deux sens"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="Aucun"
          resize="none"
          placeholder="Non redimensionnable"
          [rows]="3">
        </ds-input-textarea>
      </div>
    `,
  }),
};

export const AutoResize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Mode auto-resize : le textarea s\'agrandit automatiquement avec le contenu jusqu\'à une hauteur maximum.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <ds-input-textarea
          label="Auto-resize (max 200px)"
          placeholder="Tapez du texte, le champ s'agrandit automatiquement..."
          [resizeAuto]="200"
          helper="Le champ grandit jusqu'à 200px de hauteur">
        </ds-input-textarea>
        <ds-input-textarea
          label="Auto-resize (max 300px)"
          placeholder="Plus d'espace disponible..."
          [resizeAuto]="300"
          helper="Le champ grandit jusqu'à 300px de hauteur">
        </ds-input-textarea>
      </div>
    `,
  }),
};

// =============================================================================
// LIMITE DE CARACTÈRES
// =============================================================================

export const WithMaxLength: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea avec limite de caractères et compteur intégré. Le compteur est lié via aria-describedby.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <ds-input-textarea
          label="Tweet"
          placeholder="Quoi de neuf ?"
          [maxlength]="280"
          helper="Comme sur Twitter/X"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="Description courte"
          placeholder="Résumez en quelques mots..."
          [maxlength]="150"
          externalValue="Ceci est un exemple de description courte pour tester le compteur de caractères."
          [rows]="3">
        </ds-input-textarea>
      </div>
    `,
  }),
};

// =============================================================================
// FONCTIONNALITÉS INTERACTIVES
// =============================================================================

export const Clearable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea avec bouton de suppression. Le bouton X apparaît lorsque le champ contient du texte.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-textarea
        label="Notes"
        placeholder="Vos notes..."
        [clearable]="true"
        externalValue="Cliquez sur le X pour effacer ce texte."
        helper="Cliquez sur X pour effacer"
        [rows]="4"
        style="max-width: 400px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'État désactivé : le champ n\'est pas modifiable et est exclu de la navigation clavier.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-textarea
        label="Champ désactivé"
        placeholder="Non modifiable"
        [disabled]="true"
        externalValue="Ce contenu ne peut pas être modifié car le champ est désactivé."
        [rows]="4"
        style="max-width: 400px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

export const Readonly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champ en lecture seule. L\'utilisateur peut voir et sélectionner le contenu mais ne peut pas le modifier.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-textarea
        label="Conditions d'utilisation"
        [readonly]="true"
        externalValue="En utilisant ce service, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.

Vos données personnelles seront traitées conformément au RGPD.

Ce contenu est en lecture seule et ne peut pas être modifié."
        helper="Lecture seule - copiable mais non modifiable"
        [rows]="6"
        resize="none"
        style="max-width: 400px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champ obligatoire avec indicateur visuel (*). L\'attribut required est propagé pour la validation HTML5.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-textarea
        label="Feedback obligatoire"
        placeholder="Ce champ est requis"
        [required]="true"
        helper="Merci de remplir ce champ"
        [rows]="4"
        style="max-width: 400px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

// =============================================================================
// ICÔNES
// =============================================================================

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea avec icônes FontAwesome. Les icônes aident à identifier visuellement le type de contenu attendu.',
      },
    },
  },
  render: () => ({
    props: {
      faComment,
      faFileAlt,
      faPen,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <ds-input-textarea
          [iconStart]="faComment"
          label="Commentaire"
          placeholder="Votre commentaire..."
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          [iconStart]="faFileAlt"
          label="Description du document"
          placeholder="Décrivez le document..."
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          [iconStart]="faPen"
          label="Notes personnelles"
          placeholder="Vos notes..."
          [rows]="3">
        </ds-input-textarea>
      </div>
    `,
  }),
};

// =============================================================================
// THÈMES
// =============================================================================

export const Themed: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-input-textarea
            label="Message"
            placeholder="Entrez votre message..."
            [rows]="3">
          </ds-input-textarea>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-input-textarea
            label="Message"
            placeholder="Entrez votre message..."
            [rows]="3">
          </ds-input-textarea>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-input-textarea
            label="Message"
            placeholder="Entrez votre message..."
            [rows]="3">
          </ds-input-textarea>
        </div>
      </div>
    `,
  }),
};

// =============================================================================
// ACCESSIBILITÉ
// =============================================================================

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: `
### Fonctionnalités d'accessibilité

**Navigation clavier :**
| Touche | Action |
|--------|--------|
| Tab | Déplace le focus vers le textarea |
| Shift+Tab | Quitte le textarea |
| Entrée | Nouvelle ligne |

**Attributs ARIA :**
- \`aria-label\` ou \`<label>\` : Décrit le champ
- \`aria-describedby\` : Lie le texte d'aide, l'erreur et le compteur
- \`aria-invalid\` : Indique l'état d'erreur (via primitive)
- \`aria-required\` : Champ obligatoire
- \`role="alert"\` : Annonce les erreurs

**Bonnes pratiques :**
- Label visible associé via for/id
- Compteur de caractères accessible
- Messages d'aide et d'erreur liés au champ
- États readonly et disabled distincts visuellement
        `,
      },
    },
  },
  render: () => ({
    props: { faComment },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          Testez la navigation avec Tab. Les labels sont liés aux textareas via for/id.
        </p>
        <ds-input-textarea
          [iconStart]="faComment"
          label="Commentaire"
          placeholder="Votre commentaire..."
          [required]="true"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="Message"
          placeholder="Votre message..."
          error="Ce champ contient une erreur"
          helper="Les erreurs sont annoncées via aria-describedby"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="Champ désactivé"
          [disabled]="true"
          externalValue="Ignoré par Tab"
          [rows]="2">
        </ds-input-textarea>
      </div>
    `,
  }),
};

// =============================================================================
// EXEMPLE DE FORMULAIRE
// =============================================================================

export const FormExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Exemple de formulaire complet utilisant différentes configurations du textarea.',
      },
    },
  },
  render: () => ({
    props: { faComment, faFileAlt },
    template: `
      <div style="max-width: 500px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin-top: 0; margin-bottom: 24px;">Formulaire de contact</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <ds-input-textarea
            [iconStart]="faComment"
            label="Objet du message"
            placeholder="Résumez votre demande en quelques mots..."
            [required]="true"
            [maxlength]="100"
            [rows]="2"
            state="success"
            externalValue="Demande de renseignements">
          </ds-input-textarea>
          <ds-input-textarea
            [iconStart]="faFileAlt"
            label="Message détaillé"
            placeholder="Décrivez votre demande en détail..."
            [required]="true"
            [rows]="6"
            [resizeAuto]="300"
            helper="Soyez le plus précis possible">
          </ds-input-textarea>
          <ds-input-textarea
            label="Informations complémentaires"
            placeholder="Optionnel - ajoutez des détails si nécessaire..."
            [rows]="3"
            [clearable]="true"
            helper="Ce champ est facultatif">
          </ds-input-textarea>
          <div style="margin-top: 8px;">
            <button style="width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer;">
              Envoyer le message
            </button>
          </div>
        </div>
      </div>
    `,
  }),
};

// =============================================================================
// VARIANTES
// =============================================================================

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les deux variantes visuelles : default (outline) et filled (fond coloré).',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <ds-input-textarea
          label="Variante Default"
          variant="default"
          placeholder="Style avec bordure"
          [rows]="3">
        </ds-input-textarea>
        <ds-input-textarea
          label="Variante Filled"
          variant="filled"
          placeholder="Style avec fond"
          [rows]="3">
        </ds-input-textarea>
      </div>
    `,
  }),
};

// =============================================================================
// COMBINAISONS AVANCÉES
// =============================================================================

export const ClearableWithMaxLength: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combinaison clearable + maxlength : bouton d\'effacement avec compteur de caractères.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-textarea
        label="Tweet avec effacement"
        placeholder="Quoi de neuf ?"
        [clearable]="true"
        [maxlength]="280"
        externalValue="Ceci est un exemple de tweet avec la possibilité d'effacer rapidement le contenu."
        helper="Effaçable + compteur"
        [rows]="3"
        style="max-width: 400px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

export const AllFeatures: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea avec toutes les fonctionnalités activées : label, icône, clearable, maxlength, required, helper.',
      },
    },
  },
  render: () => ({
    props: { faComment },
    template: `
      <ds-input-textarea
        [iconStart]="faComment"
        label="Commentaire complet"
        placeholder="Votre commentaire..."
        [required]="true"
        [clearable]="true"
        [maxlength]="500"
        [rows]="5"
        [resizeAuto]="250"
        helper="Toutes les fonctionnalités sont activées"
        externalValue="Ceci est un exemple de commentaire qui utilise toutes les fonctionnalités du composant."
        state="success"
        style="max-width: 450px; display: block;">
      </ds-input-textarea>
    `,
  }),
};

// =============================================================================
// MATRICES DE TESTS VISUELS
// =============================================================================

export const MatrixStatesAndSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Matrice de combinaisons États × Tailles (12 combinaisons). Permet de vérifier que les états s\'affichent correctement à toutes les tailles.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1200px;">
        <!-- Header row -->
        <div style="font-weight: bold; text-align: center;">Default</div>
        <div style="font-weight: bold; text-align: center;">Success</div>
        <div style="font-weight: bold; text-align: center;">Warning</div>
        <div style="font-weight: bold; text-align: center;">Error</div>

        <!-- Small row -->
        <ds-input-textarea size="sm" state="default" label="Small" placeholder="Default" [rows]="2"></ds-input-textarea>
        <ds-input-textarea size="sm" state="success" label="Small" placeholder="Success" [rows]="2"></ds-input-textarea>
        <ds-input-textarea size="sm" state="warning" label="Small" placeholder="Warning" [rows]="2"></ds-input-textarea>
        <ds-input-textarea size="sm" state="error" label="Small" error="Erreur" [rows]="2"></ds-input-textarea>

        <!-- Medium row -->
        <ds-input-textarea size="md" state="default" label="Medium" placeholder="Default" [rows]="2"></ds-input-textarea>
        <ds-input-textarea size="md" state="success" label="Medium" placeholder="Success" [rows]="2"></ds-input-textarea>
        <ds-input-textarea size="md" state="warning" label="Medium" placeholder="Warning" [rows]="2"></ds-input-textarea>
        <ds-input-textarea size="md" state="error" label="Medium" error="Erreur" [rows]="2"></ds-input-textarea>

        <!-- Large row -->
        <ds-input-textarea size="lg" state="default" label="Large" placeholder="Default" [rows]="2"></ds-input-textarea>
        <ds-input-textarea size="lg" state="success" label="Large" placeholder="Success" [rows]="2"></ds-input-textarea>
        <ds-input-textarea size="lg" state="warning" label="Large" placeholder="Warning" [rows]="2"></ds-input-textarea>
        <ds-input-textarea size="lg" state="error" label="Large" error="Erreur" [rows]="2"></ds-input-textarea>
      </div>
    `,
  }),
};

export const MatrixStatesAndVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Matrice de combinaisons États × Variantes (8 combinaisons). Vérifie les couleurs d\'état sur les variantes default et filled.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1200px;">
        <!-- Header row -->
        <div style="font-weight: bold; text-align: center;">Default</div>
        <div style="font-weight: bold; text-align: center;">Success</div>
        <div style="font-weight: bold; text-align: center;">Warning</div>
        <div style="font-weight: bold; text-align: center;">Error</div>

        <!-- Variant: default -->
        <ds-input-textarea variant="default" state="default" label="Variant: Default" placeholder="State: default" [rows]="3"></ds-input-textarea>
        <ds-input-textarea variant="default" state="success" label="Variant: Default" placeholder="State: success" helper="Validé" [rows]="3"></ds-input-textarea>
        <ds-input-textarea variant="default" state="warning" label="Variant: Default" placeholder="State: warning" helper="Attention" [rows]="3"></ds-input-textarea>
        <ds-input-textarea variant="default" state="error" label="Variant: Default" error="Message d'erreur" [rows]="3"></ds-input-textarea>

        <!-- Variant: filled -->
        <ds-input-textarea variant="filled" state="default" label="Variant: Filled" placeholder="State: default" [rows]="3"></ds-input-textarea>
        <ds-input-textarea variant="filled" state="success" label="Variant: Filled" placeholder="State: success" helper="Validé" [rows]="3"></ds-input-textarea>
        <ds-input-textarea variant="filled" state="warning" label="Variant: Filled" placeholder="State: warning" helper="Attention" [rows]="3"></ds-input-textarea>
        <ds-input-textarea variant="filled" state="error" label="Variant: Filled" error="Message d'erreur" [rows]="3"></ds-input-textarea>
      </div>
    `,
  }),
};
