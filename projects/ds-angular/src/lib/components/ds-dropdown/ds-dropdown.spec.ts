import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DsDropdown } from './ds-dropdown';
import { By } from '@angular/platform-browser';
import { DropdownItem } from './model/dropdown-item.model';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('DsDropdown', () => {
  let component: DsDropdown;
  let fixture: ComponentFixture<DsDropdown>;

  const dropdownItems: DropdownItem[] = [
    { code: 'item-1', label: 'Item 1', startIcon: faCheck },
    { code: 'item-2', label: 'Item 2', startIcon: faCheck, endIcon: faChevronDown },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(DsDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render trigger button', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
  });

  it('should expose default visual inputs', () => {
    expect(component.type()).toBe('primary');
    expect(component.variant()).toBe('solid');
    expect(component.size()).toBe('md');
    expect(component.block()).toBe(false);
  });

  it('should disable trigger when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('should disable trigger when loading input is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('should toggle menu open state when enabled', () => {
    expect(component.isMenuOpen()).toBeFalse();
    component.toggleMenu();
    expect(component.isMenuOpen()).toBeTrue();
    component.toggleMenu();
    expect(component.isMenuOpen()).toBeFalse();
  });

  it('should not open menu when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.toggleMenu();
    expect(component.isMenuOpen()).toBeFalse();
  });

  it('should open menu on trigger click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    expect(component.isMenuOpen()).toBeTrue();
  });

  it('should open menu via keyboard interaction', () => {
    expect(component.isMenuOpen()).toBeFalse();
    component.onTriggerKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.isMenuOpen()).toBeTrue();
  });

  it('should provide selected item when selectedItem input is set', () => {
    fixture.componentRef.setInput('dropdownItems', dropdownItems);
    fixture.componentRef.setInput('selectedItem', 'item-2');
    fixture.detectChanges();

    expect(component.getSelectedItem()?.code).toBe('item-2');
    expect(component.isItemActive('item-2')).toBeTrue();
  });

  it('should emit selectedItemChanged when an item is chosen', () => {
    fixture.componentRef.setInput('dropdownItems', dropdownItems);
    fixture.detectChanges();

    const spy = spyOn(component.selectedItemChanged, 'emit');
    component.setSelectedItem('item-1');

    expect(spy).toHaveBeenCalledWith('item-1');
    expect(component.isMenuOpen()).toBeFalse();
  });

  it('should emit selection when confirming via keyboard', () => {
    fixture.componentRef.setInput('dropdownItems', dropdownItems);
    fixture.detectChanges();

    const spy = spyOn(component.selectedItemChanged, 'emit');
    component.toggleMenu();
    component.onMenuKeydown(new KeyboardEvent('keydown', { key: 'Enter' }), 0);

    expect(spy).toHaveBeenCalledWith('item-1');
  });

  it('should propagate selection through ControlValueAccessor writeValue', () => {
    fixture.componentRef.setInput('dropdownItems', dropdownItems);
    fixture.detectChanges();

    component.writeValue('item-2');

    expect(component.isItemActive('item-2')).toBeTrue();
    expect(component.getSelectedItem()?.label).toBe('Item 2');
  });

  it('should call registered callbacks when selecting item', () => {
    const onChange = jasmine.createSpy('onChange');
    const onTouched = jasmine.createSpy('onTouched');
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    component.setSelectedItem('item-1');

    expect(onChange).toHaveBeenCalledWith('item-1');
    expect(onTouched).toHaveBeenCalled();
  });

  it('should apply disabled state via setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.isDisabled()).toBeTrue();

    component.toggleMenu();
    expect(component.isMenuOpen()).toBeFalse();
  });

  it('should hide icons while loading', () => {
    fixture.componentRef.setInput('dropdownStartIcon', faCheck);
    fixture.componentRef.setInput('dropdownEndIcon', faChevronDown);
    fixture.detectChanges();

    expect(component.effectiveStartIcon()).toBe(faCheck);
    expect(component.effectiveEndIcon()).toBe(faChevronDown);

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(component.effectiveStartIcon()).toBeNull();
    expect(component.effectiveEndIcon()).toBeNull();
  });

  it('should emit opened and closed events when menu toggles', () => {
    const openedSpy = spyOn(component.opened, 'emit');
    const closedSpy = spyOn(component.closed, 'emit');

    component.toggleMenu();
    expect(openedSpy).toHaveBeenCalled();

    component.toggleMenu();
    expect(closedSpy).toHaveBeenCalled();
  });

  it('should respect closeOnSelect input', () => {
    fixture.componentRef.setInput('dropdownItems', dropdownItems);
    fixture.componentRef.setInput('closeOnSelect', false);
    fixture.detectChanges();

    component.toggleMenu();
    component.setSelectedItem('item-1');

    expect(component.isMenuOpen()).toBeTrue();
  });

  it('should expose aria attributes on trigger', () => {
    fixture.componentRef.setInput('ariaLabel', 'Options menu');
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('primitive-button'));
    expect(trigger.attributes['aria-label']).toBe('Options menu');
  });

  it('should merge overlay panel classes with defaults', () => {
    fixture.componentRef.setInput('overlayPanelClass', 'custom-class');
    fixture.detectChanges();

    expect(component.overlayPanelClasses()).toContain('ds-dropdown-panel');
    expect(component.overlayPanelClasses()).toContain('custom-class');
  });

  describe('Overlay repositioning', () => {
    let overlayContainer: OverlayContainer;

    beforeEach(() => {
      overlayContainer = TestBed.inject(OverlayContainer);
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should configure overlay with proper CDK positions', () => {
      // Vérifier que les positions de fallback CDK sont correctement configurées
      expect(component.overlayPositions.length).toBe(2);

      // Position primaire : bottom-center
      const primaryPosition = component.overlayPositions[0];
      expect(primaryPosition.originX).toBe('center');
      expect(primaryPosition.originY).toBe('bottom');
      expect(primaryPosition.overlayX).toBe('center');
      expect(primaryPosition.overlayY).toBe('top');
      expect(primaryPosition.offsetY).toBe(6);

      // Position de fallback : top-center
      const fallbackPosition = component.overlayPositions[1];
      expect(fallbackPosition.originX).toBe('center');
      expect(fallbackPosition.originY).toBe('top');
      expect(fallbackPosition.overlayX).toBe('center');
      expect(fallbackPosition.overlayY).toBe('bottom');
      expect(fallbackPosition.offsetY).toBe(-6);
    });

    it('should render overlay with cdkConnectedOverlay when menu opens', fakeAsync(() => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.detectChanges();

      expect(component.isMenuOpen()).toBeFalse();

      component.toggleMenu();
      tick(100);
      fixture.detectChanges();

      expect(component.isMenuOpen()).toBeTrue();

      // Vérifier que l'overlay CDK est attaché au DOM
      const overlayPane = overlayContainer.getContainerElement().querySelector('.cdk-overlay-pane');
      expect(overlayPane).toBeTruthy();
    }));

    it('should support automatic repositioning via CDK fallback positions', fakeAsync(() => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.detectChanges();

      // Vérifier que le composant expose les positions de fallback
      // qui permettent au CDK de repositionner automatiquement l'overlay
      expect(component.overlayPositions.length).toBeGreaterThan(1);

      // Vérifier que la position de fallback est inversée (top au lieu de bottom)
      const fallback = component.overlayPositions[1];
      expect(fallback.originY).toBe('top');
      expect(fallback.overlayY).toBe('bottom');

      // Vérifier que l'overlay peut s'afficher (le CDK gérera le repositionnement automatiquement)
      component.toggleMenu();
      tick(100);
      fixture.detectChanges();

      const overlayPane = overlayContainer.getContainerElement().querySelector('.cdk-overlay-pane');
      expect(overlayPane).toBeTruthy();

      // Le CDK Connected Overlay utilisera automatiquement la position de fallback
      // si la position primaire ne peut pas être affichée dans le viewport
    }));

    it('should attach backdrop when overlay opens', fakeAsync(() => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.detectChanges();

      component.toggleMenu();
      tick(100);
      fixture.detectChanges();

      // Vérifier qu'un backdrop CDK est attaché (pour fermeture au clic extérieur)
      const backdrop = overlayContainer.getContainerElement().querySelector('.cdk-overlay-backdrop');
      expect(backdrop).toBeTruthy();
    }));

    it('should keep overlay responsive to viewport changes via CDK', fakeAsync(() => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.detectChanges();

      component.toggleMenu();
      tick(100);
      fixture.detectChanges();

      const overlayPane = overlayContainer.getContainerElement().querySelector('.cdk-overlay-pane');
      expect(overlayPane).toBeTruthy();

      // Simuler un resize du viewport
      // Le CDK overlay gère automatiquement le repositionnement
      window.dispatchEvent(new Event('resize'));
      tick(100);
      fixture.detectChanges();

      // L'overlay devrait toujours être attaché après resize
      const updatedPane = overlayContainer.getContainerElement().querySelector('.cdk-overlay-pane');
      expect(updatedPane).toBeTruthy();
    }));

    it('should close overlay on backdrop click', fakeAsync(() => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.detectChanges();

      component.toggleMenu();
      tick(100);
      fixture.detectChanges();

      expect(component.isMenuOpen()).toBeTrue();

      // Cliquer sur le backdrop devrait fermer l'overlay (géré par hasBackdrop du CDK)
      const backdrop = overlayContainer.getContainerElement().querySelector('.cdk-overlay-backdrop') as HTMLElement;
      expect(backdrop).toBeTruthy();

      backdrop.click();
      tick(100);
      fixture.detectChanges();

      expect(component.isMenuOpen()).toBeFalse();
    }));
  });
});
