import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { DsDropdown } from './ds-dropdown';
import { provideAnimations } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { faChevronDown, faUser, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsDropdown> = {
  title: 'Components/DsDropdown',
  component: DsDropdown,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()]
    }),
    moduleMetadata({
      imports: [OverlayModule]
    })
  ],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Texte placeholder'
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé'
    }
  }
};

export default meta;
type Story = StoryObj<DsDropdown>;

const items = [
  { code: '1', label: 'Option 1' },
  { code: '2', label: 'Option 2' },
  { code: '3', label: 'Option 3' }
];

const itemsWithIcons = [
  { code: 'profile', label: 'Profile', startIcon: faUser },
  { code: 'settings', label: 'Settings', startIcon: faGear },
  { code: 'logout', label: 'Logout', startIcon: faSignOut }
];

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
    disabled: false
  },
  render: (args) => ({
    props: { ...args, items },
    template: `
      <div style="padding: 2rem;">
        <ds-dropdown
          [placeholder]="placeholder"
          [disabled]="disabled"
          [items]="items"
        ></ds-dropdown>
      </div>
    `
  })
};

export const WithIcons: Story = {
  render: () => ({
    props: { itemsWithIcons, faChevronDown },
    template: `
      <div style="padding: 2rem;">
        <ds-dropdown
          placeholder="User menu"
          [items]="itemsWithIcons"
        ></ds-dropdown>
      </div>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    props: { items },
    template: `
      <div style="padding: 2rem;">
        <ds-dropdown
          placeholder="Disabled dropdown"
          [disabled]="true"
          [items]="items"
        ></ds-dropdown>
      </div>
    `
  })
};
