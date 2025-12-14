import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsEmpty } from './ds-empty';
import { faSearch, faInbox } from '@fortawesome/free-solid-svg-icons';

describe('DsEmpty', () => {
  let component: DsEmpty;
  let fixture: ComponentFixture<DsEmpty>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(DsEmpty);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default state', () => {
    it('should render with default title', () => {
      const title = compiled.querySelector('.ds-empty__title');
      expect(title?.textContent?.trim()).toBe('Aucune donnée');
    });

    it('should render with default icon (faInbox)', () => {
      const icon = compiled.querySelector('.ds-empty__icon');
      expect(icon).toBeTruthy();
    });

    it('should not render description by default', () => {
      const description = compiled.querySelector('.ds-empty__description');
      expect(description).toBeNull();
    });

    it('should render with md size by default', () => {
      const container = compiled.querySelector('.ds-empty--md');
      expect(container).toBeTruthy();
    });

    it('should have region role with aria-label', () => {
      const container = compiled.querySelector('[role="region"]');
      expect(container?.getAttribute('aria-label')).toBe('État vide : Aucune donnée');
    });
  });

  describe('Props', () => {
    it('should render custom title', () => {
      fixture.componentRef.setInput('title', 'Aucun résultat trouvé');
      fixture.detectChanges();

      const title = compiled.querySelector('.ds-empty__title');
      expect(title?.textContent?.trim()).toBe('Aucun résultat trouvé');
    });

    it('should render description when provided', () => {
      fixture.componentRef.setInput('description', 'Essayez de modifier vos filtres');
      fixture.detectChanges();

      const description = compiled.querySelector('.ds-empty__description');
      expect(description?.textContent?.trim()).toBe('Essayez de modifier vos filtres');
    });

    it('should render custom icon', () => {
      fixture.componentRef.setInput('icon', faSearch);
      fixture.detectChanges();

      const icon = compiled.querySelector('.ds-empty__icon fa-icon');
      expect(icon).toBeTruthy();
    });

    it('should render image when imageUrl is provided', () => {
      fixture.componentRef.setInput('imageUrl', '/assets/empty.svg');
      fixture.detectChanges();

      const image = compiled.querySelector('.ds-empty__image img');
      expect(image).toBeTruthy();
      expect(image?.getAttribute('src')).toBe('/assets/empty.svg');
    });

    it('should hide icon when imageUrl is provided', () => {
      fixture.componentRef.setInput('imageUrl', '/assets/empty.svg');
      fixture.detectChanges();

      const icon = compiled.querySelector('.ds-empty__icon');
      expect(icon).toBeNull();
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-empty--sm');
      expect(container).toBeTruthy();
    });

    it('should apply md size class', () => {
      fixture.componentRef.setInput('size', 'md');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-empty--md');
      expect(container).toBeTruthy();
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-empty--lg');
      expect(container).toBeTruthy();
    });

    it('should apply size to icon', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const icon = compiled.querySelector('.ds-empty__icon--lg');
      expect(icon).toBeTruthy();
    });

    it('should apply size to image', () => {
      fixture.componentRef.setInput('imageUrl', '/assets/empty.svg');
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const image = compiled.querySelector('.ds-empty__image--sm');
      expect(image).toBeTruthy();
    });
  });

  describe('Content projection', () => {
    it('should render actions slot container', () => {
      // Le container d'actions est toujours rendu pour permettre la projection de contenu
      fixture.detectChanges();

      const actions = fixture.nativeElement.querySelector('.ds-empty__actions');
      expect(actions).toBeTruthy();
    });
  });

  describe('Computed properties', () => {
    it('hasImage should return true when imageUrl is provided', () => {
      fixture.componentRef.setInput('imageUrl', '/assets/empty.svg');
      fixture.detectChanges();

      expect(component.hasImage()).toBe(true);
    });

    it('hasImage should return false when imageUrl is empty', () => {
      fixture.componentRef.setInput('imageUrl', '');
      fixture.detectChanges();

      expect(component.hasImage()).toBe(false);
    });

    it('hasDescription should return true when description is provided', () => {
      fixture.componentRef.setInput('description', 'Some description');
      fixture.detectChanges();

      expect(component.hasDescription()).toBe(true);
    });

    it('hasDescription should return false when description is empty', () => {
      fixture.componentRef.setInput('description', '');
      fixture.detectChanges();

      expect(component.hasDescription()).toBe(false);
    });

    it('containerClasses should include size modifier', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.containerClasses()).toContain('ds-empty--lg');
    });

    it('iconClasses should include size modifier', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(component.iconClasses()).toContain('ds-empty__icon--sm');
    });

    it('imageClasses should include size modifier', () => {
      fixture.componentRef.setInput('size', 'md');
      fixture.detectChanges();

      expect(component.imageClasses()).toContain('ds-empty__image--md');
    });
  });

  describe('Accessibility', () => {
    it('should have role="region"', () => {
      const container = compiled.querySelector('[role="region"]');
      expect(container).toBeTruthy();
    });

    it('should update aria-label when title changes', () => {
      fixture.componentRef.setInput('title', 'Nouveau titre');
      fixture.detectChanges();

      const container = compiled.querySelector('[role="region"]');
      expect(container?.getAttribute('aria-label')).toBe('État vide : Nouveau titre');
    });

    it('should have aria-hidden on icon', () => {
      const icon = compiled.querySelector('fa-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have alt text on image', () => {
      fixture.componentRef.setInput('imageUrl', '/assets/empty.svg');
      fixture.componentRef.setInput('title', 'Aucun fichier');
      fixture.detectChanges();

      const img = compiled.querySelector('.ds-empty__image-element');
      expect(img?.getAttribute('alt')).toBe('Aucun fichier');
    });
  });
});
