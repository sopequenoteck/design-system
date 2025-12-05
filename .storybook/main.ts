import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../projects/ds-angular/src/**/*.mdx',
    '../projects/ds-angular/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: true
    }
  },
  core: {
    disableTelemetry: true
  },

};

export default config;
