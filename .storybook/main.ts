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
    '@storybook/addon-a11y'
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
      },
      // Optimizations for production build
      optimization: {
        ...webpackConfig.optimization,
        splitChunks: {
          chunks: 'async', // Only split async chunks (lazy loaded)
          minSize: 20000,
          maxSize: 244000, // Target 244 KiB max per chunk
          cacheGroups: {
            // Default vendors
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            }
          }
        },
        // Enable tree shaking
        usedExports: true,
        // Enable module concatenation
        concatenateModules: true,
      },
      // Performance hints with higher limits for Storybook
      performance: {
        maxAssetSize: 1024000, // 1 MiB (Storybook needs more)
        maxEntrypointSize: 1024000, // 1 MiB
        hints: 'warning'
      }
    };
  }
};

export default config;
