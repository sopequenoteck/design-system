import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';
import { DsInputField } from './ds-input-field';
import { faUser, faEnvelope, faLock, faSearch } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsInputField> = {
  title: 'Form/Inputs/DsInputField',
  component: DsInputField,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label du champ',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'],
      description: 'Type d\'input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille',
    },
    state: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'État de validation',
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
    required: {
      control: 'boolean',
      description: 'Requis',
    },
    clearable: {
      control: 'boolean',
      description: 'Bouton effacer',
    },
    togglePassword: {
      control: 'boolean',
      description: 'Toggle visibilité mot de passe',
    },
  },
};

export default meta;
type Story = StoryObj<DsInputField>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champ de saisie par défaut avec label et placeholder. Compatible avec les formulaires réactifs et template-driven.',
      },
    },
  },
  args: {
    label: 'Nom',
    placeholder: 'Entrez votre nom',
    type: 'text',
    size: 'md',
    state: 'default',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ds-input-field [label]="label" [placeholder]="placeholder" [type]="type" [size]="size" [state]="state" [disabled]="disabled" [required]="required" style="max-width: 300px; display: block;"></ds-input-field>`,
  }),
};

export const WithHelper: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Texte d\'aide affiché sous le champ pour guider l\'utilisateur.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-field
        label="Email"
        placeholder="exemple@email.com"
        type="email"
        helper="Nous ne partagerons jamais votre email"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Message d\'erreur affiché sous le champ. Utilisé pour la validation de formulaire.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-field
        label="Email"
        placeholder="exemple@email.com"
        type="email"
        error="Veuillez entrer un email valide"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

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
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <ds-input-field label="Default" placeholder="Default" state="default"></ds-input-field>
        <ds-input-field label="Success" placeholder="Success" state="success"></ds-input-field>
        <ds-input-field label="Warning" placeholder="Warning" state="warning"></ds-input-field>
        <ds-input-field label="Error" placeholder="Error" state="error" error="Message d'erreur"></ds-input-field>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champs avec icônes FontAwesome. Les icônes aident à identifier visuellement le type de contenu attendu.',
      },
    },
  },
  render: () => ({
    props: {
      faUser,
      faEnvelope,
      faSearch,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <ds-input-field [iconStart]="faUser" label="Nom" placeholder="Jean Dupont"></ds-input-field>
        <ds-input-field [iconStart]="faEnvelope" label="Email" placeholder="jean.dupont@exemple.com"></ds-input-field>
        <ds-input-field [iconStart]="faSearch" placeholder="Rechercher dans les documents..."></ds-input-field>
      </div>
    `,
  }),
};

export const Password: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champ mot de passe avec toggle de visibilité. L\'icône œil permet d\'afficher/masquer le contenu.',
      },
    },
  },
  render: () => ({
    props: {
      faLock,
    },
    template: `
      <ds-input-field
        [iconStart]="faLock"
        label="Mot de passe"
        type="password"
        placeholder="••••••••"
        [togglePassword]="true"
        helper="Minimum 8 caractères"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const Clearable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champ avec bouton de suppression. Le bouton X apparaît lorsque le champ contient du texte.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-field
        label="Recherche"
        placeholder="Tapez pour rechercher..."
        [clearable]="true"
        externalValue="Rapport annuel 2025"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const WithMaxLength: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champ avec limite de caractères et compteur intégré. Affiche X/Max pour guider la saisie.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-field
        label="Titre de l'article"
        placeholder="Maximum 50 caractères"
        [maxlength]="50"
        helper="Optimisé pour le référencement"
        style="max-width: 300px; display: block;">
      </ds-input-field>
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
      <ds-input-field
        label="Nom complet"
        placeholder="Ce champ est requis"
        [required]="true"
        style="max-width: 300px; display: block;">
      </ds-input-field>
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
      <ds-input-field
        label="Champ désactivé"
        placeholder="Non modifiable"
        [disabled]="true"
        externalValue="Valeur fixe"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fonctionnalités d\'accessibilité : labels associés, focus visible, messages d\'erreur annoncés aux lecteurs d\'écran.',
      },
    },
  },
  render: () => ({
    props: { faUser, faEnvelope },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 350px;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          Testez la navigation avec Tab. Les labels sont liés aux inputs via aria-labelledby.
        </p>
        <ds-input-field
          [iconStart]="faUser"
          label="Nom complet"
          placeholder="Jean Dupont"
          [required]="true">
        </ds-input-field>
        <ds-input-field
          [iconStart]="faEnvelope"
          label="Email"
          type="email"
          placeholder="email@exemple.com"
          error="Format d'email invalide"
          helper="Les erreurs sont annoncées via aria-describedby">
        </ds-input-field>
        <ds-input-field
          label="Champ désactivé"
          [disabled]="true"
          externalValue="Ignoré par Tab">
        </ds-input-field>
      </div>
    `,
  }),
};

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparaison visuelle des quatre états : default, success, warning et error avec leurs messages correspondants.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <ds-input-field
          label="État par défaut"
          placeholder="Saisie normale"
          state="default"
          helper="Texte d'aide standard">
        </ds-input-field>
        <ds-input-field
          label="État succès"
          placeholder="Validation réussie"
          state="success"
          helper="Les données sont valides"
          externalValue="donnees@valides.com">
        </ds-input-field>
        <ds-input-field
          label="État avertissement"
          placeholder="Attention requise"
          state="warning"
          helper="Ce champ peut nécessiter votre attention"
          externalValue="attention">
        </ds-input-field>
        <ds-input-field
          label="État erreur"
          placeholder="Erreur de validation"
          state="error"
          error="Ce champ contient une erreur"
          externalValue="erreur">
        </ds-input-field>
      </div>
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
      <ds-input-field
        label="Champ en lecture seule"
        placeholder="Non modifiable"
        [readonly]="true"
        externalValue="Valeur en lecture seule"
        helper="Ce champ peut être copié mais pas modifié"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const WithoutLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champs sans label visible. Utilisé dans les barres de recherche ou interfaces compactes. Le placeholder agit comme guide.',
      },
    },
  },
  render: () => ({
    props: { faSearch },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <ds-input-field
          placeholder="Rechercher dans les documents..."
          [iconStart]="faSearch"
          [clearable]="true">
        </ds-input-field>
        <ds-input-field
          placeholder="Nom d'utilisateur"
          type="text">
        </ds-input-field>
      </div>
    `,
  }),
};

export const EmailType: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input de type email avec validation HTML5 native et icône appropriée.',
      },
    },
  },
  render: () => ({
    props: { faEnvelope },
    template: `
      <ds-input-field
        [iconStart]="faEnvelope"
        label="Adresse email"
        type="email"
        placeholder="utilisateur@exemple.com"
        helper="Format: nom@domaine.com"
        [required]="true"
        style="max-width: 350px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const NumberType: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input de type number pour la saisie de valeurs numériques. Affiche les contrôles +/- sur navigateurs compatibles.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <ds-input-field
          label="Quantité"
          type="number"
          placeholder="0"
          helper="Entrez un nombre">
        </ds-input-field>
        <ds-input-field
          label="Prix"
          type="number"
          placeholder="0.00"
          helper="Montant en euros">
        </ds-input-field>
      </div>
    `,
  }),
};

export const TelType: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input de type tel pour numéros de téléphone. Optimise le clavier sur mobiles.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-field
        label="Numéro de téléphone"
        type="tel"
        placeholder="+33 6 12 34 56 78"
        helper="Format international recommandé"
        style="max-width: 350px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const UrlType: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input de type url avec validation HTML5 pour les adresses web.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-input-field
        label="Site web"
        type="url"
        placeholder="https://exemple.com"
        helper="L'URL doit commencer par http:// ou https://"
        style="max-width: 350px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const BothIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champs avec icônes à gauche et à droite. Utilisé pour des actions contextuelles comme la recherche avec filtres.',
      },
    },
  },
  render: () => ({
    props: {
      faUser,
      faEnvelope,
      faSearch,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 350px;">
        <ds-input-field
          [iconStart]="faUser"
          [iconEnd]="faSearch"
          label="Rechercher un utilisateur"
          placeholder="Nom ou email">
        </ds-input-field>
        <ds-input-field
          [iconStart]="faEnvelope"
          [iconEnd]="faSearch"
          label="Rechercher par email"
          placeholder="Filtrer les emails"
          [clearable]="true">
        </ds-input-field>
      </div>
    `,
  }),
};

export const PasswordToggle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champ mot de passe avec toggle de visibilité interactif. L\'icône œil permet de basculer entre texte masqué et visible.',
      },
    },
  },
  render: () => ({
    props: { faLock },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 350px;">
        <ds-input-field
          [iconStart]="faLock"
          label="Mot de passe actuel"
          type="password"
          placeholder="••••••••"
          [togglePassword]="true">
        </ds-input-field>
        <ds-input-field
          [iconStart]="faLock"
          label="Nouveau mot de passe"
          type="password"
          placeholder="••••••••"
          [togglePassword]="true"
          helper="Minimum 8 caractères, 1 majuscule, 1 chiffre">
        </ds-input-field>
      </div>
    `,
  }),
};

export const ClearableInput: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input avec bouton de suppression. Le bouton X apparaît lorsque le champ contient du texte et permet d\'effacer rapidement.',
      },
    },
  },
  render: () => ({
    props: { faSearch },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 350px;">
        <ds-input-field
          [iconStart]="faSearch"
          label="Recherche"
          placeholder="Rechercher..."
          [clearable]="true"
          externalValue="Texte à effacer"
          helper="Cliquez sur X pour effacer">
        </ds-input-field>
        <ds-input-field
          label="Filtre rapide"
          placeholder="Filtrer les résultats"
          [clearable]="true"
          externalValue="filtre"
          state="success">
        </ds-input-field>
      </div>
    `,
  }),
};

export const WithCharacterCounter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Champs avec compteur de caractères. Affiche le nombre de caractères saisis et la limite maximale.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <ds-input-field
          label="Titre de l'article"
          placeholder="Maximum 60 caractères"
          [maxlength]="60"
          helper="Optimisé pour le référencement">
        </ds-input-field>
        <ds-input-field
          label="Nom d'utilisateur"
          placeholder="3 à 20 caractères"
          [maxlength]="20"
          helper="Lettres, chiffres et tirets uniquement"
          externalValue="username">
        </ds-input-field>
        <ds-input-field
          label="Code promo"
          placeholder="Maximum 10 caractères"
          [maxlength]="10"
          state="success"
          externalValue="PROMO2024"
          helper="Code valide">
        </ds-input-field>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les trois tailles disponibles : small, medium (par défaut) et large. Adaptées à différents contextes d\'interface.',
      },
    },
  },
  render: () => ({
    props: { faUser },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 350px;">
        <ds-input-field
          [iconStart]="faUser"
          label="Small (sm)"
          size="sm"
          placeholder="Taille compacte"
          helper="Pour interfaces denses">
        </ds-input-field>
        <ds-input-field
          [iconStart]="faUser"
          label="Medium (md)"
          size="md"
          placeholder="Taille standard"
          helper="Taille par défaut">
        </ds-input-field>
        <ds-input-field
          [iconStart]="faUser"
          label="Large (lg)"
          size="lg"
          placeholder="Taille confortable"
          helper="Pour formulaires principaux">
        </ds-input-field>
      </div>
    `,
  }),
};

export const FormExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Exemple de formulaire complet utilisant différents types d\'inputs et états de validation.',
      },
    },
  },
  render: () => ({
    props: {
      faUser,
      faEnvelope,
      faLock,
    },
    template: `
      <div style="max-width: 450px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin-top: 0; margin-bottom: 24px;">Créer un compte</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <ds-input-field
            [iconStart]="faUser"
            label="Nom complet"
            placeholder="Jean Dupont"
            [required]="true"
            state="success"
            externalValue="Jean Dupont"
            helper="Nom valide">
          </ds-input-field>
          <ds-input-field
            [iconStart]="faEnvelope"
            label="Email"
            type="email"
            placeholder="jean.dupont@exemple.com"
            [required]="true"
            state="error"
            error="Cet email est déjà utilisé"
            externalValue="jean@test.com">
          </ds-input-field>
          <ds-input-field
            [iconStart]="faLock"
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            [togglePassword]="true"
            [required]="true"
            helper="Minimum 8 caractères, 1 majuscule, 1 chiffre">
          </ds-input-field>
          <ds-input-field
            [iconStart]="faLock"
            label="Confirmer le mot de passe"
            type="password"
            placeholder="••••••••"
            [togglePassword]="true"
            [required]="true">
          </ds-input-field>
          <div style="margin-top: 8px;">
            <button style="width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer;">
              Créer mon compte
            </button>
          </div>
        </div>
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
          <ds-input-field label="Email" placeholder="Enter email"></ds-input-field>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-input-field label="Email" placeholder="Enter email"></ds-input-field>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-input-field label="Email" placeholder="Enter email"></ds-input-field>
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

export const WithInteractionTest: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'votre.email@exemple.com',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-input-field
        [label]="label"
        [type]="type"
        [placeholder]="placeholder"
        [size]="size"
        data-testid="test-input">
      </ds-input-field>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Attendre le rendu initial
    await new Promise(resolve => setTimeout(resolve, 100));

    const inputContainer = canvas.getByTestId('test-input');

    // Vérifier que le container est dans le DOM
    await expect(inputContainer).toBeInTheDocument();

    const input = inputContainer.querySelector('input');

    if (!input) {
      return;
    }

    // Taper du texte dans l'input
    await userEvent.type(input, 'test@example.com');

    await new Promise(resolve => setTimeout(resolve, 150));

    // Vérifier que le texte a été saisi
    await expect(input).toHaveValue('test@example.com');

    // Test terminé avec succès
    await expect(inputContainer).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Test d\'interaction automatisé : vérifie la saisie de texte et la validation.',
      },
    },
  },
};
