import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DsTimeline, TimelineItem } from './ds-timeline';
import { faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

describe('DsTimeline', () => {
  let component: DsTimeline;
  let fixture: ComponentFixture<DsTimeline>;

  const mockItems: TimelineItem[] = [
    {
      content: 'Premier événement',
      date: '12 Dec 2025',
      color: 'primary',
    },
    {
      content: 'Deuxième événement',
      date: '11 Dec 2025',
      color: 'success',
      icon: faCheckCircle,
    },
    {
      content: 'Troisième événement',
      date: '10 Dec 2025',
      color: 'warning',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(DsTimeline);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Initialisation', () => {
    it('devrait créer le composant', () => {
      expect(component).toBeTruthy();
    });

    it('devrait avoir les valeurs par défaut correctes', () => {
      expect(component.mode()).toBe('left');
      expect(component.size()).toBe('md');
      expect(component.pending()).toBe(false);
      expect(component.pendingContent()).toBe('En cours...');
      expect(component.reverse()).toBe(false);
    });
  });

  describe('Rendu des items', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();
    });

    it('devrait afficher tous les items', () => {
      const items = fixture.debugElement.queryAll(By.css('.ds-timeline__item'));
      expect(items.length).toBe(3);
    });

    it('devrait afficher les dates des items', () => {
      const dates = fixture.debugElement.queryAll(By.css('.ds-timeline__date'));
      expect(dates.length).toBe(3);
      expect(dates[0].nativeElement.textContent.trim()).toBe('12 Dec 2025');
      expect(dates[1].nativeElement.textContent.trim()).toBe('11 Dec 2025');
    });

    it('devrait afficher le contenu des items', () => {
      const contents = fixture.debugElement.queryAll(By.css('.ds-timeline__text'));
      expect(contents.length).toBe(3);
      expect(contents[0].nativeElement.textContent.trim()).toBe('Premier événement');
      expect(contents[1].nativeElement.textContent.trim()).toBe('Deuxième événement');
    });

    it('devrait afficher les points de timeline', () => {
      const dots = fixture.debugElement.queryAll(By.css('.ds-timeline__dot'));
      expect(dots.length).toBe(3);
    });

    it('devrait afficher les lignes de connexion (sauf pour le dernier item)', () => {
      const lines = fixture.debugElement.queryAll(By.css('.ds-timeline__line'));
      expect(lines.length).toBe(2);
    });

    it('devrait afficher les icônes FontAwesome quand définies', () => {
      const icons = fixture.debugElement.queryAll(By.css('.ds-timeline__icon'));
      // Deuxième item a une icône
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Modes de positionnement', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
    });

    it('devrait appliquer le mode "left"', () => {
      fixture.componentRef.setInput('mode', 'left');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-timeline'));
      expect(container.nativeElement.classList.contains('ds-timeline--left')).toBe(true);
    });

    it('devrait appliquer le mode "right"', () => {
      fixture.componentRef.setInput('mode', 'right');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-timeline'));
      expect(container.nativeElement.classList.contains('ds-timeline--right')).toBe(true);
    });

    it('devrait appliquer le mode "alternate"', () => {
      fixture.componentRef.setInput('mode', 'alternate');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-timeline'));
      expect(container.nativeElement.classList.contains('ds-timeline--alternate')).toBe(true);
    });

    it('devrait calculer correctement la position en mode alternate', () => {
      fixture.componentRef.setInput('mode', 'alternate');
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.ds-timeline__item'));
      expect(items[0].nativeElement.classList.contains('ds-timeline__item--right')).toBe(true);
      expect(items[1].nativeElement.classList.contains('ds-timeline__item--left')).toBe(true);
      expect(items[2].nativeElement.classList.contains('ds-timeline__item--right')).toBe(true);
    });
  });

  describe('Tailles', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
    });

    it('devrait appliquer la taille "sm"', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-timeline'));
      expect(container.nativeElement.classList.contains('ds-timeline--sm')).toBe(true);
    });

    it('devrait appliquer la taille "md"', () => {
      fixture.componentRef.setInput('size', 'md');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-timeline'));
      expect(container.nativeElement.classList.contains('ds-timeline--md')).toBe(true);
    });

    it('devrait appliquer la taille "lg"', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-timeline'));
      expect(container.nativeElement.classList.contains('ds-timeline--lg')).toBe(true);
    });
  });

  describe('Couleurs', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();
    });

    it('devrait appliquer la couleur "primary"', () => {
      const firstItem = fixture.debugElement.query(By.css('.ds-timeline__item'));
      expect(firstItem.nativeElement.classList.contains('ds-timeline__item--primary')).toBe(true);
    });

    it('devrait appliquer la couleur "success"', () => {
      const items = fixture.debugElement.queryAll(By.css('.ds-timeline__item'));
      expect(items[1].nativeElement.classList.contains('ds-timeline__item--success')).toBe(true);
    });

    it('devrait appliquer la couleur par défaut si non spécifiée', () => {
      const itemsWithoutColor: TimelineItem[] = [
        { content: 'Test', date: '10 Dec' },
      ];
      fixture.componentRef.setInput('items', itemsWithoutColor);
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('.ds-timeline__item'));
      expect(item.nativeElement.classList.contains('ds-timeline__item--default')).toBe(true);
    });
  });

  describe('Indicateur pending', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
    });

    it('ne devrait pas afficher l\'indicateur pending par défaut', () => {
      fixture.componentRef.setInput('pending', false);
      fixture.detectChanges();

      const pendingItem = fixture.debugElement.query(By.css('.ds-timeline__item--pending'));
      expect(pendingItem).toBeNull();
    });

    it('devrait afficher l\'indicateur pending quand activé', () => {
      fixture.componentRef.setInput('pending', true);
      fixture.detectChanges();

      const pendingItem = fixture.debugElement.query(By.css('.ds-timeline__item--pending'));
      expect(pendingItem).toBeTruthy();
    });

    it('devrait afficher le texte pending par défaut', () => {
      fixture.componentRef.setInput('pending', true);
      fixture.detectChanges();

      const pendingText = fixture.debugElement.query(By.css('.ds-timeline__text--pending'));
      expect(pendingText.nativeElement.textContent.trim()).toBe('En cours...');
    });

    it('devrait afficher le texte pending personnalisé', () => {
      fixture.componentRef.setInput('pending', true);
      fixture.componentRef.setInput('pendingContent', 'Traitement en cours');
      fixture.detectChanges();

      const pendingText = fixture.debugElement.query(By.css('.ds-timeline__text--pending'));
      expect(pendingText.nativeElement.textContent.trim()).toBe('Traitement en cours');
    });

    it('devrait afficher l\'icône pending', () => {
      fixture.componentRef.setInput('pending', true);
      fixture.detectChanges();

      const pendingIcon = fixture.debugElement.query(By.css('.ds-timeline__icon--pending'));
      expect(pendingIcon).toBeTruthy();
    });

    it('devrait afficher une ligne de connexion vers le pending', () => {
      fixture.componentRef.setInput('pending', true);
      fixture.detectChanges();

      const lines = fixture.debugElement.queryAll(By.css('.ds-timeline__line'));
      // 2 lignes entre les 3 items + 1 ligne vers pending
      expect(lines.length).toBe(3);
    });
  });

  describe('Ordre inversé', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
    });

    it('ne devrait pas inverser l\'ordre par défaut', () => {
      fixture.componentRef.setInput('reverse', false);
      fixture.detectChanges();

      const contents = fixture.debugElement.queryAll(By.css('.ds-timeline__text'));
      expect(contents[0].nativeElement.textContent.trim()).toBe('Premier événement');
      expect(contents[2].nativeElement.textContent.trim()).toBe('Troisième événement');
    });

    it('devrait inverser l\'ordre quand activé', () => {
      fixture.componentRef.setInput('reverse', true);
      fixture.detectChanges();

      const contents = fixture.debugElement.queryAll(By.css('.ds-timeline__text'));
      expect(contents[0].nativeElement.textContent.trim()).toBe('Troisième événement');
      expect(contents[2].nativeElement.textContent.trim()).toBe('Premier événement');
    });
  });

  describe('Événements', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();
    });

    it('devrait émettre itemClick au clic sur un item', () => {
      let emittedEvent: any = null;
      component.itemClick.subscribe((event) => {
        emittedEvent = event;
      });

      const firstItem = fixture.debugElement.query(By.css('.ds-timeline__item'));
      firstItem.nativeElement.click();
      fixture.detectChanges();

      expect(emittedEvent).toBeTruthy();
      expect(emittedEvent.index).toBe(0);
      expect(emittedEvent.item.content).toBe('Premier événement');
    });

    it('devrait émettre itemClick avec la touche Enter', () => {
      let emittedEvent: any = null;
      component.itemClick.subscribe((event) => {
        emittedEvent = event;
      });

      const firstItem = fixture.debugElement.query(By.css('.ds-timeline__item'));
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      firstItem.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(emittedEvent).toBeTruthy();
    });

    it('devrait émettre itemClick avec la touche Space', () => {
      let emittedEvent: any = null;
      component.itemClick.subscribe((event) => {
        emittedEvent = event;
      });

      const firstItem = fixture.debugElement.query(By.css('.ds-timeline__item'));
      const event = new KeyboardEvent('keydown', { key: ' ' });
      firstItem.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(emittedEvent).toBeTruthy();
    });
  });

  describe('Accessibilité', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();
    });

    it('devrait avoir role="list" sur le conteneur', () => {
      const container = fixture.debugElement.query(By.css('.ds-timeline'));
      expect(container.nativeElement.getAttribute('role')).toBe('list');
    });

    it('devrait avoir role="listitem" sur chaque item', () => {
      const items = fixture.debugElement.queryAll(By.css('.ds-timeline__item'));
      items.forEach((item) => {
        expect(item.nativeElement.getAttribute('role')).toBe('listitem');
      });
    });

    it('devrait avoir tabindex="0" sur les items', () => {
      const items = fixture.debugElement.queryAll(By.css('.ds-timeline__item'));
      items.forEach((item) => {
        expect(item.nativeElement.getAttribute('tabindex')).toBe('0');
      });
    });

    it('devrait avoir aria-label sur les points', () => {
      const dots = fixture.debugElement.queryAll(By.css('.ds-timeline__dot'));
      expect(dots[0].nativeElement.getAttribute('aria-label')).toBeTruthy();
    });

    it('devrait avoir aria-hidden sur les icônes et lignes', () => {
      const icons = fixture.debugElement.queryAll(By.css('.ds-timeline__icon'));
      const lines = fixture.debugElement.queryAll(By.css('.ds-timeline__line'));

      icons.forEach((icon) => {
        expect(icon.nativeElement.getAttribute('aria-hidden')).toBe('true');
      });

      lines.forEach((line) => {
        expect(line.nativeElement.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  describe('Méthodes utilitaires', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();
    });

    it('getItemPosition() devrait retourner "right" en mode "left"', () => {
      fixture.componentRef.setInput('mode', 'left');
      fixture.detectChanges();

      expect(component.getItemPosition(0)).toBe('right');
    });

    it('getItemPosition() devrait retourner "left" en mode "right"', () => {
      fixture.componentRef.setInput('mode', 'right');
      fixture.detectChanges();

      expect(component.getItemPosition(0)).toBe('left');
    });

    it('getItemPosition() devrait alterner en mode "alternate"', () => {
      fixture.componentRef.setInput('mode', 'alternate');
      fixture.detectChanges();

      expect(component.getItemPosition(0)).toBe('right');
      expect(component.getItemPosition(1)).toBe('left');
      expect(component.getItemPosition(2)).toBe('right');
    });

    it('isLastItem() devrait retourner true pour le dernier item', () => {
      expect(component.isLastItem(2)).toBe(true);
      expect(component.isLastItem(0)).toBe(false);
      expect(component.isLastItem(1)).toBe(false);
    });

    it('getIcon() devrait retourner l\'icône de l\'item ou defaultIcon', () => {
      const itemWithIcon = mockItems[1];
      const itemWithoutIcon = mockItems[0];

      expect(component.getIcon(itemWithIcon)).toBe(faCheckCircle);
      expect(component.getIcon(itemWithoutIcon)).toBe(component.defaultIcon);
    });
  });

  describe('Classes CSS', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();
    });

    it('containerClasses() devrait inclure le mode', () => {
      fixture.componentRef.setInput('mode', 'alternate');
      fixture.detectChanges();

      const classes = component.containerClasses();
      expect(classes).toContain('ds-timeline--alternate');
    });

    it('containerClasses() devrait inclure la taille', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const classes = component.containerClasses();
      expect(classes).toContain('ds-timeline--lg');
    });

    it('getItemClasses() devrait inclure la position', () => {
      const classes = component.getItemClasses(mockItems[0], 0);
      expect(classes).toContain('ds-timeline__item--right');
    });

    it('getItemClasses() devrait inclure la couleur', () => {
      const classes = component.getItemClasses(mockItems[0], 0);
      expect(classes).toContain('ds-timeline__item--primary');
    });

    it('getDotClasses() devrait inclure la couleur', () => {
      const classes = component.getDotClasses(mockItems[0]);
      expect(classes).toContain('ds-timeline__dot--primary');
    });

    it('getDotClasses() devrait indiquer la présence d\'une icône', () => {
      const classes = component.getDotClasses(mockItems[1]);
      expect(classes).toContain('ds-timeline__dot--with-icon');
    });
  });
});
