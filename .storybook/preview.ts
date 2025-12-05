import type { Preview } from '@storybook/angular';
import { withThemeFromTokens } from './theme.decorator';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'Background / Main (light)',
      values: [
        { name: 'Background / Main (light)', value: 'var(--background-main)' },
        { name: 'Background / Secondary', value: 'var(--background-secondary)' },
        { name: 'Background / Panel', value: 'var(--background-panel)' },
        { name: 'Surface / Raised', value: 'var(--surface-raised)' },
        { name: 'Brand / Primary', value: 'var(--brand-primary)' },
        { name: 'Brand / Secondary', value: 'var(--brand-secondary)' },
        { name: 'Brand / Alt', value: 'var(--brand-alt)' },
        { name: 'Feedback / Success', value: 'var(--success)' },
        { name: 'Feedback / Warning', value: 'var(--warning)' },
        { name: 'Feedback / Error', value: 'var(--error)' },
        { name: 'Feedback / Info', value: 'var(--info)' }
      ]
    },
    options: {
      storySort: {
        order: ['Introduction', 'Tokens', 'Components', 'Primitives']
      }
    },
    docs: {
      toc: {
        headingSelector: 'h2, h3',
        title: 'Sommaire'
      }
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' }
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' }
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' }
        }
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true }
        ]
      }
    }
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light theme' },
          { value: 'dark', icon: 'moon', title: 'Dark theme' }
        ],
        showName: true,
        dynamicTitle: true
      }
    }
  },
  decorators: [withThemeFromTokens]
};

export default preview;
