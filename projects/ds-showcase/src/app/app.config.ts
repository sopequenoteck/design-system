import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  APP_INITIALIZER,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ComponentRegistry } from './registry/component.registry';
import { ALL_DEFINITIONS } from './registry/definitions';

/** Initialise le registry avec toutes les définitions */
function initializeRegistry(): () => void {
  const registry = inject(ComponentRegistry);
  return () => {
    registry.registerAll(ALL_DEFINITIONS);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeRegistry,
      multi: true,
    },
  ],
};
