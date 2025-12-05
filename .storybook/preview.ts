import type { Preview } from '@storybook/angular';

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
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' }
      ]
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
  decorators: [
    (story, context) => {
      const theme = context.globals['theme'] || 'light';

      // Appliquer la classe theme-X sur :root (documentElement)
      // Les thèmes utilisent le sélecteur :root.theme-light / :root.theme-dark
      document.documentElement.className = `theme-${theme}`;
      return story();
    }
  ]
};

export default preview;
