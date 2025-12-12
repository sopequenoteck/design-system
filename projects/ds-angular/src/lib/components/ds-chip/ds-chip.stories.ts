import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsChip } from './ds-chip';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsChip> = {
  title: 'Data Display/DsChip',
  component: DsChip,
  decorators: [
    moduleMetadata({
      imports: [DsChip, FontAwesomeModule],
      providers: [
        {
          provide: FaIconLibrary,
          useFactory: () => {
            const library = new FaIconLibrary();
            library.addIconPacks(fas);
            return library;
          },
        },
      ],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip label text',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'Chip variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chip size',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: 'Chip color',
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button',
    },
    clickable: {
      control: 'boolean',
      description: 'Make chip clickable',
    },
    selected: {
      control: 'boolean',
      description: 'Selected state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    icon: {
      control: 'text',
      description: 'FontAwesome icon name (without fas- prefix)',
    },
    avatar: {
      control: 'text',
      description: 'Avatar image URL',
    },
    removed: {
      action: 'removed',
      description: 'Event emitted when chip is removed',
    },
    clicked: {
      action: 'clicked',
      description: 'Event emitted when chip is clicked',
    },
    selectedChange: {
      action: 'selectedChange',
      description: 'Event emitted when selected state changes',
    },
  },
};

export default meta;
type Story = StoryObj<DsChip>;

/**
 * Default chip with filled variant
 */
export const Default: Story = {
  args: {
    label: 'Default Chip',
    variant: 'filled',
    size: 'md',
    color: 'default',
    removable: false,
    clickable: false,
    selected: false,
    disabled: false,
  },
};

/**
 * Outlined variant
 */
export const Outlined: Story = {
  args: {
    label: 'Outlined Chip',
    variant: 'outlined',
    size: 'md',
    color: 'default',
  },
};

/**
 * Chip with icon
 */
export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    icon: 'star',
    color: 'primary',
  },
};

/**
 * Chip with avatar
 */
export const WithAvatar: Story = {
  args: {
    label: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
};

/**
 * Removable chip
 */
export const Removable: Story = {
  args: {
    label: 'Removable Chip',
    removable: true,
    color: 'primary',
  },
};

/**
 * Clickable chip
 */
export const Clickable: Story = {
  args: {
    label: 'Clickable Chip',
    clickable: true,
    color: 'primary',
  },
};

/**
 * All colors showcase
 */
export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ds-chip label="Default" color="default" />
        <ds-chip label="Primary" color="primary" />
        <ds-chip label="Success" color="success" />
        <ds-chip label="Warning" color="warning" />
        <ds-chip label="Error" color="error" />
      </div>
      <br />
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ds-chip label="Default" color="default" variant="outlined" />
        <ds-chip label="Primary" color="primary" variant="outlined" />
        <ds-chip label="Success" color="success" variant="outlined" />
        <ds-chip label="Warning" color="warning" variant="outlined" />
        <ds-chip label="Error" color="error" variant="outlined" />
      </div>
    `,
  }),
};

/**
 * All sizes showcase
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <ds-chip label="Small" size="sm" color="primary" />
        <ds-chip label="Medium" size="md" color="primary" />
        <ds-chip label="Large" size="lg" color="primary" />
      </div>
      <br />
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <ds-chip label="Small" size="sm" color="primary" icon="star" />
        <ds-chip label="Medium" size="md" color="primary" icon="star" />
        <ds-chip label="Large" size="lg" color="primary" icon="star" />
      </div>
      <br />
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <ds-chip label="Small" size="sm" color="primary" [removable]="true" />
        <ds-chip label="Medium" size="md" color="primary" [removable]="true" />
        <ds-chip label="Large" size="lg" color="primary" [removable]="true" />
      </div>
    `,
  }),
};

/**
 * Selected state
 */
export const Selected: Story = {
  args: {
    label: 'Selected Chip',
    clickable: true,
    selected: true,
    color: 'primary',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ds-chip label="Disabled" [disabled]="true" />
        <ds-chip label="Disabled Primary" color="primary" [disabled]="true" />
        <ds-chip label="Disabled Removable" [removable]="true" [disabled]="true" />
        <ds-chip label="Disabled Clickable" [clickable]="true" [disabled]="true" />
      </div>
    `,
  }),
};

/**
 * All variants in a grid layout
 */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <!-- Filled Variants -->
        <ds-chip label="Default Filled" variant="filled" color="default" />
        <ds-chip label="Primary Filled" variant="filled" color="primary" />
        <ds-chip label="Success Filled" variant="filled" color="success" />
        <ds-chip label="Warning Filled" variant="filled" color="warning" />
        <ds-chip label="Error Filled" variant="filled" color="error" />

        <!-- Outlined Variants -->
        <ds-chip label="Default Outlined" variant="outlined" color="default" />
        <ds-chip label="Primary Outlined" variant="outlined" color="primary" />
        <ds-chip label="Success Outlined" variant="outlined" color="success" />
        <ds-chip label="Warning Outlined" variant="outlined" color="warning" />
        <ds-chip label="Error Outlined" variant="outlined" color="error" />

        <!-- Sizes -->
        <ds-chip label="Small" size="sm" color="primary" />
        <ds-chip label="Medium" size="md" color="primary" />
        <ds-chip label="Large" size="lg" color="primary" />

        <!-- States -->
        <ds-chip label="With Icon" icon="star" color="primary" />
        <ds-chip label="Removable" [removable]="true" color="primary" />
        <ds-chip label="Selected" [clickable]="true" [selected]="true" color="primary" />
        <ds-chip label="Disabled" [disabled]="true" color="primary" />
        <ds-chip label="With Avatar" avatar="https://i.pravatar.cc/150?img=1" />
      </div>
    `,
  }),
};

/**
 * Complete showcase with all features
 */
export const CompleteShowcase: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h3 style="margin-bottom: 0.5rem;">Filled Variants</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="Default" />
            <ds-chip label="Primary" color="primary" />
            <ds-chip label="Success" color="success" />
            <ds-chip label="Warning" color="warning" />
            <ds-chip label="Error" color="error" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 0.5rem;">Outlined Variants</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="Default" variant="outlined" />
            <ds-chip label="Primary" color="primary" variant="outlined" />
            <ds-chip label="Success" color="success" variant="outlined" />
            <ds-chip label="Warning" color="warning" variant="outlined" />
            <ds-chip label="Error" color="error" variant="outlined" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 0.5rem;">With Icons</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="Star" icon="star" color="primary" />
            <ds-chip label="Heart" icon="heart" color="error" />
            <ds-chip label="Check" icon="check" color="success" />
            <ds-chip label="Info" icon="info-circle" color="primary" />
            <ds-chip label="Warning" icon="triangle-exclamation" color="warning" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 0.5rem;">With Avatars</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="John Doe" avatar="https://i.pravatar.cc/150?img=1" />
            <ds-chip label="Jane Smith" avatar="https://i.pravatar.cc/150?img=2" />
            <ds-chip label="Bob Johnson" avatar="https://i.pravatar.cc/150?img=3" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 0.5rem;">Removable</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="JavaScript" [removable]="true" color="primary" />
            <ds-chip label="TypeScript" [removable]="true" color="primary" />
            <ds-chip label="Angular" [removable]="true" color="error" />
            <ds-chip label="React" [removable]="true" color="primary" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 0.5rem;">Clickable</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="Option 1" [clickable]="true" />
            <ds-chip label="Option 2" [clickable]="true" [selected]="true" color="primary" />
            <ds-chip label="Option 3" [clickable]="true" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 0.5rem;">Sizes</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <ds-chip label="Small" size="sm" color="primary" />
            <ds-chip label="Medium" size="md" color="primary" />
            <ds-chip label="Large" size="lg" color="primary" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 0.5rem;">Disabled</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="Disabled" [disabled]="true" />
            <ds-chip label="Disabled Primary" color="primary" [disabled]="true" />
            <ds-chip label="Disabled Removable" [removable]="true" [disabled]="true" />
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Themed chips (Light/Dark/Custom)
 */
export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Light Theme -->
        <div class="theme-light" style="padding: 1.5rem; background: var(--background-main); border-radius: 8px;">
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Light Theme</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="Default" />
            <ds-chip label="Primary" color="primary" />
            <ds-chip label="Success" color="success" />
            <ds-chip label="With Icon" icon="star" color="primary" />
            <ds-chip label="Removable" [removable]="true" color="primary" />
            <ds-chip label="Clickable" [clickable]="true" [selected]="true" color="primary" />
          </div>
        </div>

        <!-- Dark Theme -->
        <div class="theme-dark" style="padding: 1.5rem; background: var(--background-main); border-radius: 8px;">
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Dark Theme</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="Default" />
            <ds-chip label="Primary" color="primary" />
            <ds-chip label="Success" color="success" />
            <ds-chip label="With Icon" icon="star" color="primary" />
            <ds-chip label="Removable" [removable]="true" color="primary" />
            <ds-chip label="Clickable" [clickable]="true" [selected]="true" color="primary" />
          </div>
        </div>

        <!-- Custom Theme -->
        <div class="theme-custom" style="padding: 1.5rem; background: var(--background-main); border-radius: 8px;">
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Custom Theme</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ds-chip label="Default" />
            <ds-chip label="Primary" color="primary" />
            <ds-chip label="Success" color="success" />
            <ds-chip label="With Icon" icon="star" color="primary" />
            <ds-chip label="Removable" [removable]="true" color="primary" />
            <ds-chip label="Clickable" [clickable]="true" [selected]="true" color="primary" />
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Tags example (removable chips)
 */
export const TagsExample: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-bottom: 1rem;">Selected Technologies</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 1rem; border: 1px solid var(--gray-300); border-radius: 8px; background: var(--gray-50);">
          <ds-chip label="JavaScript" [removable]="true" color="warning" />
          <ds-chip label="TypeScript" [removable]="true" color="primary" />
          <ds-chip label="Angular" [removable]="true" color="error" />
          <ds-chip label="RxJS" [removable]="true" color="primary" />
          <ds-chip label="SCSS" [removable]="true" color="primary" />
          <ds-chip label="HTML5" [removable]="true" color="error" />
          <ds-chip label="CSS3" [removable]="true" color="primary" />
        </div>
      </div>
    `,
  }),
};

/**
 * Filter chips example (clickable/selectable)
 */
export const FilterExample: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-bottom: 1rem;">Filter by Status</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <ds-chip label="All" [clickable]="true" [selected]="true" color="primary" />
          <ds-chip label="Active" [clickable]="true" color="success" icon="circle-check" />
          <ds-chip label="Pending" [clickable]="true" color="warning" icon="clock" />
          <ds-chip label="Completed" [clickable]="true" color="success" icon="check" />
          <ds-chip label="Cancelled" [clickable]="true" color="error" icon="xmark" />
        </div>
      </div>
    `,
  }),
};

/**
 * User chips with avatars
 */
export const UserChipsExample: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-bottom: 1rem;">Assigned Users</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <ds-chip label="John Doe" avatar="https://i.pravatar.cc/150?img=1" [removable]="true" />
          <ds-chip label="Jane Smith" avatar="https://i.pravatar.cc/150?img=2" [removable]="true" />
          <ds-chip label="Bob Johnson" avatar="https://i.pravatar.cc/150?img=3" [removable]="true" />
          <ds-chip label="Alice Williams" avatar="https://i.pravatar.cc/150?img=4" [removable]="true" />
        </div>
      </div>
    `,
  }),
};
