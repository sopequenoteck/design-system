import type { StorybookConfig } from '@storybook/angular';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    {
      directory: '../projects/ds-angular/src/lib',
      files: '**/*.mdx'
    },
    {
      directory: '../projects/ds-angular/src/lib',
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx)'
    }
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook/experimental-addon-test'
  ],
  staticDirs: ['../projects/ds-angular/src/public'],
  docs: {
    autodocs: true
  },
  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: true
    }
  },
  core: {
    disableTelemetry: true
  },
  webpackFinal: async (webpackConfig) => {
    const alias = webpackConfig.resolve?.alias ?? {};

    return {
      ...webpackConfig,
      resolve: {
        ...webpackConfig.resolve,
        alias: {
          ...alias,
          '@ds/utils': path.resolve(__dirname, '../projects/ds-angular/src/lib/utils'),
          '@ds/themes': path.resolve(__dirname, '../projects/ds-angular/src/styles/themes')
        }
      }
    };
  }
};

export default config;
