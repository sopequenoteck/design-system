import type { Meta, StoryObj } from '@storybook/angular';
import { DsCard } from './ds-card';

const meta: Meta<DsCard> = {
  title: 'Components/Card',
  component: DsCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined'],
      description: 'Variante visuelle de la carte',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de la carte (padding)',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive l\'interaction',
    },
    clickable: {
      control: 'boolean',
      description: 'Rend la carte cliquable avec effet hover',
    },
  },
};

export default meta;
type Story = StoryObj<DsCard>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    clickable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-card [variant]="variant" [size]="size" [disabled]="disabled" [clickable]="clickable">
        <div header>Titre de la carte</div>
        <p>Ceci est le contenu principal de la carte avec du texte d'exemple.</p>
        <div footer>Footer avec actions</div>
      </ds-card>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <ds-card variant="default">
          <div header>Carte Default</div>
          <p>Carte simple avec bordure standard.</p>
          <div footer>Actions</div>
        </ds-card>

        <ds-card variant="elevated">
          <div header>Carte Elevated</div>
          <p>Carte avec ombre portée pour un effet d'élévation.</p>
          <div footer>Actions</div>
        </ds-card>

        <ds-card variant="outlined">
          <div header>Carte Outlined</div>
          <p>Carte avec bordure accentuée pour plus de contraste.</p>
          <div footer>Actions</div>
        </ds-card>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <ds-card size="sm">
          <div header>Small Card</div>
          <p>Carte avec padding réduit (12px).</p>
          <div footer>Footer compact</div>
        </ds-card>

        <ds-card size="md">
          <div header>Medium Card</div>
          <p>Carte avec padding standard (16px).</p>
          <div footer>Footer standard</div>
        </ds-card>

        <ds-card size="lg">
          <div header>Large Card</div>
          <p>Carte avec padding large (24px) pour plus d'espace.</p>
          <div footer>Footer spacieux</div>
        </ds-card>
      </div>
    `,
  }),
};

export const WithHeaderOnly: Story = {
  render: () => ({
    template: `
      <ds-card variant="elevated" style="max-width: 400px;">
        <div header>Notification</div>
        <p>Carte sans footer, uniquement avec un en-tête et du contenu.</p>
        <p>Le footer est automatiquement masqué s'il est vide.</p>
      </ds-card>
    `,
  }),
};

export const WithFooterOnly: Story = {
  render: () => ({
    template: `
      <ds-card variant="outlined" style="max-width: 400px;">
        <p>Carte sans en-tête, uniquement avec du contenu et un footer.</p>
        <p>Le header est automatiquement masqué s'il est vide.</p>
        <div footer>
          <button style="padding: 8px 16px; border: none; background: var(--color-primary); color: white; border-radius: 4px; cursor: pointer;">
            Action principale
          </button>
        </div>
      </ds-card>
    `,
  }),
};

export const BodyOnly: Story = {
  render: () => ({
    template: `
      <ds-card variant="default" style="max-width: 400px;">
        <p>Carte simple avec uniquement du contenu, sans header ni footer.</p>
        <p>Parfait pour des messages ou des informations courtes.</p>
      </ds-card>
    `,
  }),
};

export const Clickable: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
        <ds-card variant="elevated" clickable="true">
          <div header>Carte Interactive 1</div>
          <p>Cette carte réagit au survol et au clic avec une animation.</p>
          <div footer>Cliquez pour interagir</div>
        </ds-card>

        <ds-card variant="elevated" clickable="true">
          <div header>Carte Interactive 2</div>
          <p>Idéal pour des liens ou des actions sur toute la carte.</p>
          <div footer>Cliquez pour interagir</div>
        </ds-card>

        <ds-card variant="elevated" clickable="true">
          <div header>Carte Interactive 3</div>
          <p>L'effet hover élève légèrement la carte.</p>
          <div footer>Cliquez pour interagir</div>
        </ds-card>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <ds-card variant="default">
          <div header>Carte Active</div>
          <p>Cette carte est dans son état normal, pleinement interactive.</p>
          <div footer>État actif</div>
        </ds-card>

        <ds-card variant="default" disabled="true">
          <div header>Carte Désactivée</div>
          <p>Cette carte est désactivée : opacité réduite et pas d'interaction.</p>
          <div footer>État désactivé</div>
        </ds-card>
      </div>
    `,
  }),
};

export const ComplexContent: Story = {
  render: () => ({
    template: `
      <ds-card variant="elevated" size="lg" style="max-width: 500px;">
        <div header>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Carte avec contenu riche</span>
            <span style="padding: 2px 8px; background: var(--success); color: white; border-radius: 12px; font-size: 12px;">Actif</span>
          </div>
        </div>
        <div>
          <h3 style="margin: 0 0 8px; color: var(--color-primary);">Titre du contenu</h3>
          <p style="margin: 0 0 16px; color: var(--text-muted);">
            Voici un exemple de carte avec un contenu complexe : titres, paragraphes, listes et boutons.
          </p>
          <ul style="margin: 0 0 16px; padding-left: 20px;">
            <li>Fonctionnalité A</li>
            <li>Fonctionnalité B</li>
            <li>Fonctionnalité C</li>
          </ul>
          <img src="https://via.placeholder.com/450x200" alt="Placeholder" style="width: 100%; border-radius: 8px; margin-bottom: 16px;" />
        </div>
        <div footer>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button style="padding: 8px 16px; border: 1px solid var(--border-color); background: transparent; border-radius: 4px; cursor: pointer;">
              Annuler
            </button>
            <button style="padding: 8px 16px; border: none; background: var(--color-primary); color: white; border-radius: 4px; cursor: pointer;">
              Confirmer
            </button>
          </div>
        </div>
      </ds-card>
    `,
  }),
};

export const CardGrid: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
        <ds-card variant="elevated" clickable="true">
          <div header>Produit A</div>
          <div style="text-align: center; padding: 24px 0;">
            <div style="width: 80px; height: 80px; margin: 0 auto 16px; background: var(--color-primary); border-radius: 50%;"></div>
            <p style="margin: 0; font-size: 24px; font-weight: 600;">29€</p>
          </div>
          <div footer>
            <button style="width: 100%; padding: 10px; border: none; background: var(--color-primary); color: white; border-radius: 4px; cursor: pointer;">
              Ajouter au panier
            </button>
          </div>
        </ds-card>

        <ds-card variant="elevated" clickable="true">
          <div header>Produit B</div>
          <div style="text-align: center; padding: 24px 0;">
            <div style="width: 80px; height: 80px; margin: 0 auto 16px; background: var(--color-secondary); border-radius: 50%;"></div>
            <p style="margin: 0; font-size: 24px; font-weight: 600;">49€</p>
          </div>
          <div footer>
            <button style="width: 100%; padding: 10px; border: none; background: var(--color-primary); color: white; border-radius: 4px; cursor: pointer;">
              Ajouter au panier
            </button>
          </div>
        </ds-card>

        <ds-card variant="elevated" clickable="true">
          <div header>Produit C</div>
          <div style="text-align: center; padding: 24px 0;">
            <div style="width: 80px; height: 80px; margin: 0 auto 16px; background: var(--color-alt); border-radius: 50%;"></div>
            <p style="margin: 0; font-size: 24px; font-weight: 600;">99€</p>
          </div>
          <div footer>
            <button style="width: 100%; padding: 10px; border: none; background: var(--color-primary); color: white; border-radius: 4px; cursor: pointer;">
              Ajouter au panier
            </button>
          </div>
        </ds-card>
      </div>
    `,
  }),
};

export const NestedCards: Story = {
  render: () => ({
    template: `
      <ds-card variant="elevated" size="lg" style="max-width: 600px;">
        <div header>Carte parente</div>
        <p style="margin-bottom: 16px;">Cette carte contient d'autres cartes imbriquées :</p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <ds-card variant="outlined" size="sm">
            <div header>Sous-carte 1</div>
            <p style="margin: 0;">Contenu de la première sous-carte.</p>
          </ds-card>
          <ds-card variant="outlined" size="sm">
            <div header>Sous-carte 2</div>
            <p style="margin: 0;">Contenu de la deuxième sous-carte.</p>
          </ds-card>
        </div>
        <div footer>Footer de la carte parente</div>
      </ds-card>
    `,
  }),
};
