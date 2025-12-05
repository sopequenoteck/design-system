import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Import des composants DS-Angular
import {
  DsButton,
  DsInputField,
  DsCheckbox,
  DsToggle,
  DsCard,
  DsAlert,
  DsDivider,
  DsBadge,
} from 'ds-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    DsButton,
    DsInputField,
    DsCheckbox,
    DsToggle,
    DsCard,
    DsAlert,
    DsDivider,
    DsBadge,
  ],
  templateUrl: './app.component.html',
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }

      .header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .header h1 {
        margin-bottom: 0.5rem;
      }

      .section {
        margin-bottom: 2rem;
      }

      .section h2 {
        margin-bottom: 1rem;
        font-size: 1.25rem;
      }

      .button-group {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .theme-toggle {
        position: fixed;
        top: 1rem;
        right: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  // Signals pour l'état
  username = signal('');
  email = signal('');
  newsletter = signal(false);
  darkMode = signal(false);
  showAlert = signal(true);

  // Méthodes
  onSubmit() {
    console.log('Formulaire soumis:', {
      username: this.username(),
      email: this.email(),
      newsletter: this.newsletter(),
    });
    alert('Formulaire soumis ! Consultez la console.');
  }

  toggleTheme() {
    this.darkMode.update((v) => !v);
    document.documentElement.className = this.darkMode()
      ? 'theme-dark'
      : 'theme-light';
  }

  closeAlert() {
    this.showAlert.set(false);
  }
}
