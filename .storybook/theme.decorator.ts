import type { AngularRenderer } from '@storybook/angular';
import type { DecoratorFunction, Globals } from '@storybook/types';

const SUPPORTED_THEMES = ['light', 'dark', 'custom'] as const;
type ThemeName = (typeof SUPPORTED_THEMES)[number];
type DensityName = 'compact' | 'cozy' | 'comfortable';
type TypographyScale = 'small' | 'base' | 'large';

type ThemeGlobals = Globals & {
  theme?: ThemeName;
  density?: DensityName;
  typography?: TypographyScale;
};

const applyGlobalsToDocument = (
  doc: Document,
  theme: ThemeName,
  density: DensityName,
  typography: TypographyScale
): void => {
  const rootElement = doc.documentElement;
  const bodyElement = doc.body ?? doc.createElement('body');

  SUPPORTED_THEMES.forEach((value) => {
    rootElement.classList.remove(`theme-${value}`);
    bodyElement.classList.remove(`theme-${value}`);
  });

  rootElement.classList.add(`theme-${theme}`);
  bodyElement.classList.add(`theme-${theme}`);

  rootElement.dataset['theme'] = theme;
  bodyElement.dataset['theme'] = theme;
  rootElement.dataset['density'] = density;
  bodyElement.dataset['density'] = density;
  rootElement.dataset['typography'] = typography;
  bodyElement.dataset['typography'] = typography;
};

const applyGlobalsToIframe = (
  iframe: HTMLIFrameElement | null,
  theme: ThemeName,
  density: DensityName,
  typography: TypographyScale
): void => {
  if (!iframe) {
    return;
  }

  const sync = () => {
    if (iframe.contentDocument) {
      applyGlobalsToDocument(iframe.contentDocument, theme, density, typography);
    }
  };

  if (iframe.contentDocument?.readyState === 'complete') {
    sync();
  } else {
    iframe.addEventListener('load', sync, { once: true });
  }
};

export const withThemeFromTokens: DecoratorFunction<AngularRenderer, ThemeGlobals> = (
  storyFn,
  context
) => {
  const globals = context.globals as ThemeGlobals;
  const theme: ThemeName = globals.theme ?? 'light';
  const density: DensityName = globals.density ?? 'cozy';
  const typography: TypographyScale = globals.typography ?? 'base';

  applyGlobalsToDocument(document, theme, density, typography);
  applyGlobalsToIframe(
    document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null,
    theme,
    density,
    typography
  );

  return storyFn(context);
};
