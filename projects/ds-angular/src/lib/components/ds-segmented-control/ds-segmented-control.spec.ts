import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faList, faGripVertical, faMap, faCheck } from '@fortawesome/free-solid-svg-icons';
import { DsSegmentedControl, SegmentOption } from './ds-segmented-control';
import { IconRegistryService } from '../../utils/icon-registry.service';

describe('DsSegmentedControl', () => {
  let component: DsSegmentedControl;
  let fixture: ComponentFixture<DsSegmentedControl>;

  const defaultOptions: SegmentOption[] = [
    { value: 'list', label: 'Liste' },
    { value: 'grid', label: 'Grille' },
    { value: 'map', label: 'Carte' },
  ];

  const optionsWithIcons: SegmentOption[] = [
    { value: 'list', label: 'Liste', icon: 'fas-list' },
    { value: 'grid', label: 'Grille', icon: 'fas-grip-vertical' },
    { value: 'map', label: 'Carte', icon: 'fas-map' },
  ];

  const optionsWithDisabled: SegmentOption[] = [
    { value: 'list', label: 'Liste' },
    { value: 'grid', label: 'Grille', disabled: true },
    { value: 'map', label: 'Carte' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSegmentedControl, ReactiveFormsModule],
      providers: [IconRegistryService],
    }).compileComponents();

    // Enregistrer les icônes pour les tests
    const library = TestBed.inject(FaIconLibrary);
    library.addIcons(faList, faGripVertical, faMap, faCheck);

    fixture = TestBed.createComponent(DsSegmentedControl);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', defaultOptions);
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  // === Structure et rendu ===

  it('devrait afficher tous les segments', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    expect(segments.length).toBe(3);
  });

  it('devrait afficher les labels des options', () => {
    const labels = fixture.nativeElement.querySelectorAll('.ds-segmented-control__label');
    expect(labels[0].textContent).toBe('Liste');
    expect(labels[1].textContent).toBe('Grille');
    expect(labels[2].textContent).toBe('Carte');
  });

  it('devrait avoir le rôle radiogroup sur le conteneur', () => {
    const container = fixture.nativeElement.querySelector('.ds-segmented-control');
    expect(container.getAttribute('role')).toBe('radiogroup');
  });

  it('devrait avoir le rôle radio sur chaque segment', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments.forEach((segment: HTMLElement) => {
      expect(segment.getAttribute('role')).toBe('radio');
    });
  });

  // === Sélection ===

  it('devrait sélectionner un segment au clic', () => {
    const segment = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment')[1];
    segment.click();
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('grid');
    expect(segment.classList.contains('ds-segmented-control__segment--active')).toBe(true);
  });

  it('devrait émettre la valeur au changement', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);

    const segment = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment')[2];
    segment.click();

    expect(onChange).toHaveBeenCalledWith('map');
  });

  it('devrait appeler onTouched au changement', () => {
    const onTouched = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouched);

    const segment = fixture.nativeElement.querySelector('.ds-segmented-control__segment');
    segment.click();

    expect(onTouched).toHaveBeenCalled();
  });

  it('devrait définir aria-checked sur le segment actif', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[0].click();
    fixture.detectChanges();

    expect(segments[0].getAttribute('aria-checked')).toBe('true');
    expect(segments[1].getAttribute('aria-checked')).toBe('false');
  });

  // === Sizes ===

  it('devrait appliquer la classe de taille sm', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-segmented-control');
    expect(container.classList.contains('ds-segmented-control--sm')).toBe(true);
  });

  it('devrait appliquer la classe de taille md par défaut', () => {
    const container = fixture.nativeElement.querySelector('.ds-segmented-control');
    expect(container.classList.contains('ds-segmented-control--md')).toBe(true);
  });

  it('devrait appliquer la classe de taille lg', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-segmented-control');
    expect(container.classList.contains('ds-segmented-control--lg')).toBe(true);
  });

  // === Disabled ===

  it('devrait désactiver tous les segments quand disabled=true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments.forEach((segment: HTMLElement) => {
      expect(segment.hasAttribute('disabled')).toBe(true);
    });
  });

  it('ne devrait pas permettre de sélectionner un segment désactivé', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);

    const segment = fixture.nativeElement.querySelector('.ds-segmented-control__segment');
    segment.click();

    expect(onChange).not.toHaveBeenCalled();
  });

  it('devrait désactiver individuellement un segment', () => {
    fixture.componentRef.setInput('options', optionsWithDisabled);
    fixture.detectChanges();

    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    expect(segments[1].hasAttribute('disabled')).toBe(true);
    expect(segments[1].classList.contains('ds-segmented-control__segment--disabled')).toBe(true);
  });

  it('ne devrait pas permettre de sélectionner une option individuellement désactivée', () => {
    fixture.componentRef.setInput('options', optionsWithDisabled);
    fixture.detectChanges();

    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);

    const segment = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment')[1];
    segment.click();

    expect(onChange).not.toHaveBeenCalled();
  });

  // === Orientation ===

  it('devrait être horizontal par défaut', () => {
    const container = fixture.nativeElement.querySelector('.ds-segmented-control');
    expect(container.classList.contains('ds-segmented-control--horizontal')).toBe(true);
  });

  it('devrait appliquer l\'orientation verticale', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-segmented-control');
    expect(container.classList.contains('ds-segmented-control--vertical')).toBe(true);
  });

  // === Full Width ===

  it('devrait appliquer la classe full-width', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-segmented-control');
    expect(container.classList.contains('ds-segmented-control--full-width')).toBe(true);
  });

  // === Color ===

  it('devrait appliquer la couleur primary par défaut', () => {
    const container = fixture.nativeElement.querySelector('.ds-segmented-control');
    expect(container.classList.contains('ds-segmented-control--primary')).toBe(true);
  });

  it('devrait appliquer la couleur neutral', () => {
    fixture.componentRef.setInput('color', 'neutral');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.ds-segmented-control');
    expect(container.classList.contains('ds-segmented-control--neutral')).toBe(true);
  });

  // === Icons ===

  it('devrait afficher les icônes quand présentes', () => {
    fixture.componentRef.setInput('options', optionsWithIcons);
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll('.ds-segmented-control__icon');
    expect(icons.length).toBe(3);
  });

  it('ne devrait pas afficher d\'icône quand absente', () => {
    const icons = fixture.nativeElement.querySelectorAll('.ds-segmented-control__icon');
    expect(icons.length).toBe(0);
  });

  // === Navigation clavier (horizontal) ===

  it('devrait naviguer avec ArrowRight en mode horizontal', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    segments[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('grid');
  });

  it('devrait naviguer avec ArrowLeft en mode horizontal', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[1].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    segments[1].dispatchEvent(event);
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('list');
  });

  it('devrait aller au premier segment avec Home', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[2].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
    segments[2].dispatchEvent(event);
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('list');
  });

  it('devrait aller au dernier segment avec End', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
    segments[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('map');
  });

  // === Navigation clavier (vertical) ===

  it('devrait naviguer avec ArrowDown en mode vertical', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    segments[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('grid');
  });

  it('devrait naviguer avec ArrowUp en mode vertical', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[1].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
    segments[1].dispatchEvent(event);
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('list');
  });

  it('ne devrait pas naviguer avec ArrowUp/Down en mode horizontal', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    segments[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('list'); // Pas de changement
  });

  it('ne devrait pas naviguer avec ArrowLeft/Right en mode vertical', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    segments[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('list'); // Pas de changement
  });

  it('devrait sauter les options désactivées lors de la navigation clavier', () => {
    fixture.componentRef.setInput('options', optionsWithDisabled);
    fixture.detectChanges();

    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    segments[0].dispatchEvent(event);
    fixture.detectChanges();

    // Devrait sauter "grid" (disabled) et aller à "map"
    expect(component['internalValue']()).toBe('map');
  });

  // === ControlValueAccessor ===

  it('devrait implémenter writeValue', () => {
    component.writeValue('grid');
    fixture.detectChanges();

    expect(component['internalValue']()).toBe('grid');

    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    expect(segments[1].classList.contains('ds-segmented-control__segment--active')).toBe(true);
  });

  it('devrait implémenter setDisabledState', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component['isDisabled']()).toBe(true);
  });

  it('devrait fonctionner avec FormControl', () => {
    const control = new FormControl('list');

    TestBed.createComponent(DsSegmentedControl);
    const testFixture = TestBed.createComponent(DsSegmentedControl);
    const testComponent = testFixture.componentInstance;
    testFixture.componentRef.setInput('options', defaultOptions);
    testFixture.detectChanges();

    testComponent.registerOnChange((value) => control.setValue(value));
    testComponent.writeValue(control.value);
    testFixture.detectChanges();

    expect(testComponent['internalValue']()).toBe('list');
  });

  // === Tabindex ===

  it('devrait définir tabindex=0 sur le segment actif', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[1].click();
    fixture.detectChanges();

    expect(segments[1].getAttribute('tabindex')).toBe('0');
  });

  it('devrait définir tabindex=-1 sur les segments inactifs', () => {
    const segments = fixture.nativeElement.querySelectorAll('.ds-segmented-control__segment');
    segments[1].click();
    fixture.detectChanges();

    expect(segments[0].getAttribute('tabindex')).toBe('-1');
    expect(segments[2].getAttribute('tabindex')).toBe('-1');
  });

  // === activeIndex computed ===

  it('devrait calculer activeIndex correctement', () => {
    expect(component.activeIndex()).toBe(-1); // Aucun sélectionné

    component.writeValue('grid');
    fixture.detectChanges();

    expect(component.activeIndex()).toBe(1);
  });

  // === Helper methods ===

  it('devrait retourner true pour isOptionSelected', () => {
    component.writeValue('list');
    fixture.detectChanges();

    expect(component['isOptionSelected'](defaultOptions[0])).toBe(true);
    expect(component['isOptionSelected'](defaultOptions[1])).toBe(false);
  });

  it('devrait retourner true pour isOptionDisabled', () => {
    fixture.componentRef.setInput('options', optionsWithDisabled);
    fixture.detectChanges();

    expect(component['isOptionDisabled'](optionsWithDisabled[1])).toBe(true);
    expect(component['isOptionDisabled'](optionsWithDisabled[0])).toBe(false);
  });
});
