import { StoryFn } from '@storybook/angular';

type ThemeName = 'light' | 'dark';

const SUPPORTED_THEMES: ThemeName[] = ['light', 'dark'];

export const withThemeFromTokens = (storyFn: StoryFn, context: any) => {
  const theme = (context.globals['theme'] as ThemeName) ?? 'light';
  const root = document.documentElement;

  root.classList.remove(...SUPPORTED_THEMES.map((value) => `theme-${value}`));
  root.classList.add(`theme-${theme}`);

  return storyFn({}, context);
};