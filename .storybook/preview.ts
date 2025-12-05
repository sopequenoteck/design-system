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
      default: 'light',
      values: []
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
