import type { StoryFnAngularReturnType } from '@storybook/angular';
import type { DecoratorFunction } from '@storybook/types';

type ThemeName = 'light' | 'dark';

type BackgroundSwatch = {
  name: string;
  value: string;
};

const SUPPORTED_THEMES: ThemeName[] = ['light', 'dark'];
const BACKGROUND_TOKENS = ['--background-main', '--background-panel', '--background-secondary'];

const withThemeFromTokens: DecoratorFunction<StoryFnAngularReturnType> = (storyFn, context) => {
  const theme = (context.globals['theme'] as ThemeName) ?? 'light';
  const root = document.documentElement;
  const storyResult = storyFn();

  root.classList.remove(...SUPPORTED_THEMES.map((value) => `theme-${value}`));
  root.classList.add(`theme-${theme}`);

  const backgrounds = readBackgrounds(theme);

  if (!storyResult || typeof storyResult !== 'object') {
    return storyResult;
  }

  return {
    ...storyResult,
    parameters: {
      ...storyResult.parameters,
      backgrounds: {
        default: backgrounds[0]?.name ?? theme,
        values: backgrounds
      }
    }
  };
};

const readBackgrounds = (theme: ThemeName): BackgroundSwatch[] => {
  const styles = getComputedStyle(document.documentElement);

  return BACKGROUND_TOKENS.map((token) => {
    const value = styles.getPropertyValue(token).trim();

    return {
      name: `${theme} · ${token.replace('--', '')}`,
      value: value || '#ffffff'
    };
  });
};

export { withThemeFromTokens };
