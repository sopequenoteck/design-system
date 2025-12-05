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
      expect(component.overlayPositions.length).toBeGreaterThanOrEqual(2);

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

  describe('Keyboard navigation', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.detectChanges();
    });

    it('should open menu on ArrowDown when closed', () => {
      expect(component.isMenuOpen()).toBeFalse();
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      spyOn(event, 'preventDefault');

      component.onTriggerKeydown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.isMenuOpen()).toBeTrue();
    });

    it('should open menu on ArrowUp when closed', () => {
      expect(component.isMenuOpen()).toBeFalse();
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      spyOn(event, 'preventDefault');

      component.onTriggerKeydown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.isMenuOpen()).toBeTrue();
    });

    it('should open menu on Space when closed', () => {
      expect(component.isMenuOpen()).toBeFalse();
      const event = new KeyboardEvent('keydown', { key: ' ' });
      spyOn(event, 'preventDefault');

      component.onTriggerKeydown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.isMenuOpen()).toBeTrue();
    });

    it('should navigate down in menu with ArrowDown', () => {
      component.toggleMenu();
      const initialIndex = component['activeIndex']();

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      spyOn(event, 'preventDefault');
      component.onMenuKeydown(event, 0);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component['activeIndex']()).toBeGreaterThanOrEqual(0);
    });

    it('should navigate up in menu with ArrowUp', () => {
      component.toggleMenu();
      component['setActiveIndex'](1);

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      spyOn(event, 'preventDefault');
      component.onMenuKeydown(event, 1);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component['activeIndex']()).toBe(0);
    });

    it('should jump to first item with Home', () => {
      component.toggleMenu();
      component['setActiveIndex'](1);

      const event = new KeyboardEvent('keydown', { key: 'Home' });
      spyOn(event, 'preventDefault');
      component.onMenuKeydown(event, 1);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component['activeIndex']()).toBe(0);
    });

    it('should jump to last item with End', () => {
      component.toggleMenu();
      component['setActiveIndex'](0);

      const event = new KeyboardEvent('keydown', { key: 'End' });
      spyOn(event, 'preventDefault');
      component.onMenuKeydown(event, 0);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component['activeIndex']()).toBe(dropdownItems.length - 1);
    });

    it('should close menu on Escape when open', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBeTrue();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      spyOn(event, 'preventDefault');
      component.onMenuKeydown(event, 0);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.isMenuOpen()).toBeFalse();
    });

    it('should close menu on Escape from trigger when open', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBeTrue();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      spyOn(event, 'preventDefault');
      component.onTriggerKeydown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.isMenuOpen()).toBeFalse();
    });

    it('should not prevent default on Escape when menu is closed', () => {
      expect(component.isMenuOpen()).toBeFalse();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      const spy = spyOn(event, 'preventDefault');
      component.onTriggerKeydown(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should close menu on Tab without refocus', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBeTrue();

      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      component.onMenuKeydown(event, 0);

      expect(component.isMenuOpen()).toBeFalse();
    });

    it('should select item on Enter in menu', () => {
      component.toggleMenu();
      const spy = spyOn(component.selectedItemChanged, 'emit');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');
      component.onMenuKeydown(event, 0);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });

    it('should select item on Space in menu', () => {
      component.toggleMenu();
      const spy = spyOn(component.selectedItemChanged, 'emit');

      const event = new KeyboardEvent('keydown', { key: ' ' });
      spyOn(event, 'preventDefault');
      component.onMenuKeydown(event, 0);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });

    it('should not handle keyboard when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      const spy = spyOn(event, 'preventDefault');
      component.onTriggerKeydown(event);

      expect(spy).not.toHaveBeenCalled();
      expect(component.isMenuOpen()).toBeFalse();
    });

    it('should wrap to end when navigating up from first item', () => {
      component.toggleMenu();
      component['setActiveIndex'](0);

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onMenuKeydown(event, 0);

      expect(component['activeIndex']()).toBe(dropdownItems.length - 1);
    });

    it('should wrap to start when navigating down from last item', () => {
      component.toggleMenu();
      component['setActiveIndex'](dropdownItems.length - 1);

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onMenuKeydown(event, dropdownItems.length - 1);

      expect(component['activeIndex']()).toBe(0);
    });
  });

  describe('Mouse interaction', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.detectChanges();
    });

    it('should update active index on mouse enter', () => {
      component.toggleMenu();

      component.onMenuMouseEnter(1);

      expect(component['activeIndex']()).toBe(1);
    });

    it('should not update active index on mouse enter when menu is closed', () => {
      component['setActiveIndex'](0);

      component.onMenuMouseEnter(1);

      expect(component['activeIndex']()).toBe(0);
    });
  });

  describe('Additional edge cases', () => {
    it('should handle empty dropdown items', () => {
      fixture.componentRef.setInput('dropdownItems', []);
      fixture.detectChanges();

      expect(component.getSelectedItem()).toBeUndefined();
    });

    it('should handle null writeValue', () => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.detectChanges();

      component.writeValue(null);

      expect(component.getSelectedItem()).toBeUndefined();
    });

    it('should close menu when setDisabledState is called with true', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBeTrue();

      component.setDisabledState(true);

      expect(component.isMenuOpen()).toBeFalse();
    });

    it('should not select item when disabled', () => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const spy = spyOn(component.selectedItemChanged, 'emit');
      component.setSelectedItem('item-1');

      expect(spy).not.toHaveBeenCalled();
    });

    it('should handle onOverlayDetach', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBeTrue();

      component.onOverlayDetach();

      expect(component.isMenuOpen()).toBeFalse();
    });

    it('should generate unique id by default', () => {
      const id1 = component.id();

      const fixture2 = TestBed.createComponent(DsDropdown);
      const component2 = fixture2.componentInstance;
      const id2 = component2.id();

      expect(id1).not.toBe(id2);
    });

    it('should use provided id when specified', () => {
      fixture.componentRef.setInput('id', 'custom-dropdown');
      fixture.detectChanges();

      expect(component.id()).toBe('custom-dropdown');
    });

    it('should compute active descendant id correctly', () => {
      fixture.componentRef.setInput('dropdownItems', dropdownItems);
      fixture.componentRef.setInput('id', 'test-dropdown');
      fixture.detectChanges();

      component.toggleMenu();
      component['setActiveIndex'](0);

      expect(component.activeDescendantId()).toContain('test-dropdown-option-');
    });

    it('should return undefined active descendant for invalid index', () => {
      fixture.componentRef.setInput('dropdownItems', []);
      fixture.detectChanges();

      component['activeIndex'].set(-1);

      expect(component.activeDescendantId()).toBeUndefined();
    });

    it('should handle array of overlay panel classes', () => {
      fixture.componentRef.setInput('overlayPanelClass', ['class1', 'class2']);
      fixture.detectChanges();

      const classes = component.overlayPanelClasses();
      expect(classes).toContain('ds-dropdown-panel');
      expect(classes).toContain('class1');
      expect(classes).toContain('class2');
    });

    it('should filter empty strings from overlay panel classes', () => {
      fixture.componentRef.setInput('overlayPanelClass', ['class1', '', 'class2']);
      fixture.detectChanges();

      const classes = component.overlayPanelClasses();
      expect(classes).not.toContain('');
    });

    it('should calculate button type as submit when submit is true', () => {
      fixture.componentRef.setInput('submit', true);
      fixture.detectChanges();

      expect(component.buttonType()).toBe('submit');
    });

    it('should calculate button type as button when submit is false', () => {
      fixture.componentRef.setInput('submit', false);
      fixture.detectChanges();

      expect(component.buttonType()).toBe('button');
    });
  });
});
