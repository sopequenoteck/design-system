import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

/**
 * Point d'entrée de l'application de démonstration.
 *
 * Utilise le bootstrap Angular 20 avec standalone components.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
