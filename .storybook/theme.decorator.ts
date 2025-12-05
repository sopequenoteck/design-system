import { StoryFn } from '@storybook/angular';

type ThemeName = 'light' | 'dark';

const SUPPORTED_THEMES: ThemeName[] = ['light', 'dark'];

export const withThemeFromTokens = (storyFn: StoryFn, context: any) => {
  const theme = (context.globals['theme'] as ThemeName) ?? 'light';
  const root = document.documentElement;

  SUPPORTED_THEMES.forEach((value) => {
    root.classList.remove(`theme-${value}`);
    document.body.classList.remove(`theme-${value}`);
  });

  root.classList.add(`theme-${theme}`);
  document.body.classList.add(`theme-${theme}`);
  root.dataset.theme = theme;
  document.body.dataset.theme = theme;

  return storyFn({}, context);
};