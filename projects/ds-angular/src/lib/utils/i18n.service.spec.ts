import { TestBed } from '@angular/core/testing';
import { DsI18nService, SupportedLocale } from './i18n.service';

describe('DsI18nService', () => {
  let service: DsI18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DsI18nService],
    });
    service = TestBed.inject(DsI18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Default locale', () => {
    it('should default to French locale', () => {
      expect(service.locale()).toBe('fr');
    });

    it('should return French labels by default', () => {
      expect(service.get('close')).toBe('Fermer');
      expect(service.get('loading')).toBe('Chargement en cours...');
    });
  });

  describe('setLocale', () => {
    it('should change locale to English', () => {
      service.setLocale('en');
      expect(service.locale()).toBe('en');
      expect(service.get('close')).toBe('Close');
    });

    it('should change locale to Spanish', () => {
      service.setLocale('es');
      expect(service.locale()).toBe('es');
      expect(service.get('close')).toBe('Cerrar');
    });

    it('should change locale to German', () => {
      service.setLocale('de');
      expect(service.locale()).toBe('de');
      expect(service.get('close')).toBe('Schließen');
    });

    it('should fallback to French for unsupported locale', () => {
      spyOn(console, 'warn');
      service.setLocale('it' as SupportedLocale);
      expect(service.locale()).toBe('fr');
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should return correct label for each key', () => {
      expect(service.get('cancel')).toBe('Annuler');
      expect(service.get('confirm')).toBe('Confirmer');
      expect(service.get('save')).toBe('Enregistrer');
      expect(service.get('delete')).toBe('Supprimer');
    });

    it('should return navigation labels', () => {
      expect(service.get('previous')).toBe('Précédent');
      expect(service.get('next')).toBe('Suivant');
      expect(service.get('first')).toBe('Premier');
      expect(service.get('last')).toBe('Dernier');
    });

    it('should return state labels', () => {
      expect(service.get('error')).toBe('Une erreur est survenue');
      expect(service.get('success')).toBe('Opération réussie');
      expect(service.get('warning')).toBe('Attention');
    });
  });

  describe('format', () => {
    it('should format label with single parameter', () => {
      const result = service.format('minLength', { min: 5 });
      expect(result).toBe('Minimum 5 caractères requis');
    });

    it('should format label with multiple parameters', () => {
      const result = service.format('showingItems', { start: 1, end: 10, total: 100 });
      expect(result).toBe('1 - 10 sur 100');
    });

    it('should format in English', () => {
      service.setLocale('en');
      const result = service.format('showingItems', { start: 1, end: 10, total: 100 });
      expect(result).toBe('1 - 10 of 100');
    });
  });

  describe('Custom labels', () => {
    it('should override specific labels', () => {
      service.setCustomLabels({ close: 'Exit' });
      expect(service.get('close')).toBe('Exit');
      expect(service.get('cancel')).toBe('Annuler'); // Other labels unchanged
    });

    it('should reset custom labels', () => {
      service.setCustomLabels({ close: 'Exit' });
      service.resetCustomLabels();
      expect(service.get('close')).toBe('Fermer');
    });

    it('should work with locale change', () => {
      service.setCustomLabels({ close: 'Exit' });
      service.setLocale('en');
      expect(service.get('close')).toBe('Exit'); // Custom overrides locale
    });
  });

  describe('getSupportedLocales', () => {
    it('should return all supported locales', () => {
      const locales = service.getSupportedLocales();
      expect(locales).toContain('fr');
      expect(locales).toContain('en');
      expect(locales).toContain('es');
      expect(locales).toContain('de');
      expect(locales.length).toBe(4);
    });
  });

  describe('Browser locale detection', () => {
    it('should detect French browser', () => {
      spyOnProperty(navigator, 'language', 'get').and.returnValue('fr-FR');
      expect(service.detectBrowserLocale()).toBe('fr');
    });

    it('should detect English browser', () => {
      spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');
      expect(service.detectBrowserLocale()).toBe('en');
    });

    it('should fallback to French for unsupported browser locale', () => {
      spyOnProperty(navigator, 'language', 'get').and.returnValue('it-IT');
      expect(service.detectBrowserLocale()).toBe('fr');
    });

    it('should init from browser locale', () => {
      spyOnProperty(navigator, 'language', 'get').and.returnValue('es-ES');
      service.initFromBrowser();
      expect(service.locale()).toBe('es');
    });
  });

  describe('Labels completeness', () => {
    const labelKeys = [
      'close', 'cancel', 'confirm', 'save', 'delete', 'edit', 'add', 'search', 'clear', 'reset',
      'loading', 'error', 'success', 'warning', 'info',
      'previous', 'next', 'first', 'last', 'page', 'of',
      'required', 'optional', 'invalidEmail', 'invalidUrl', 'minLength', 'maxLength', 'minValue', 'maxValue',
      'expandAll', 'collapseAll', 'openMenu', 'closeMenu', 'selectOption', 'selectedOption', 'noResults',
      'itemsPerPage', 'showingItems', 'goToPage',
      'stepCompleted', 'stepActive', 'stepPending', 'stepError',
    ];

    it('should have all labels in French', () => {
      service.setLocale('fr');
      labelKeys.forEach(key => {
        expect(service.get(key as any)).toBeTruthy(`Missing label: ${key}`);
      });
    });

    it('should have all labels in English', () => {
      service.setLocale('en');
      labelKeys.forEach(key => {
        expect(service.get(key as any)).toBeTruthy(`Missing label: ${key}`);
      });
    });

    it('should have all labels in Spanish', () => {
      service.setLocale('es');
      labelKeys.forEach(key => {
        expect(service.get(key as any)).toBeTruthy(`Missing label: ${key}`);
      });
    });

    it('should have all labels in German', () => {
      service.setLocale('de');
      labelKeys.forEach(key => {
        expect(service.get(key as any)).toBeTruthy(`Missing label: ${key}`);
      });
    });
  });
});
