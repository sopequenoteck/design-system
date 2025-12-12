import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsChip } from './ds-chip';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faXmark, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DsChip', () => {
  let component: DsChip;
  let fixture: ComponentFixture<DsChip>;

  // Helper to get the chip element after detectChanges
  const getChipElement = (): DebugElement => fixture.debugElement.query(By.css('.ds-chip'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsChip, FontAwesomeModule],
    }).compileComponents();

    // Initialize FontAwesome icons
    const library = TestBed.inject(FaIconLibrary);
    library.addIcons(faXmark, faStar, faHeart);

    fixture = TestBed.createComponent(DsChip);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Chip');
  });

  describe('Component initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render with default values', () => {
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--filled');
      expect(getChipElement().nativeElement).toHaveClass('ds-chip--md');
      expect(getChipElement().nativeElement).toHaveClass('ds-chip--default');
    });

    it('should display label', () => {
      fixture.detectChanges();

      const label = getChipElement().query(By.css('.ds-chip__label'));
      expect(label.nativeElement.textContent.trim()).toBe('Test Chip');
    });
  });

  describe('Variants', () => {
    it('should apply filled variant', () => {
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--filled');
    });

    it('should apply outlined variant', () => {
      fixture.componentRef.setInput('variant', 'outlined');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--outlined');
    });
  });

  describe('Sizes', () => {
    it('should apply small size', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--sm');
    });

    it('should apply medium size', () => {
      fixture.componentRef.setInput('size', 'md');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--md');
    });

    it('should apply large size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--lg');
    });
  });

  describe('Colors', () => {
    it('should apply default color', () => {
      fixture.componentRef.setInput('color', 'default');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--default');
    });

    it('should apply primary color', () => {
      fixture.componentRef.setInput('color', 'primary');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--primary');
    });

    it('should apply success color', () => {
      fixture.componentRef.setInput('color', 'success');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--success');
    });

    it('should apply warning color', () => {
      fixture.componentRef.setInput('color', 'warning');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--warning');
    });

    it('should apply error color', () => {
      fixture.componentRef.setInput('color', 'error');
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--error');
    });
  });

  describe('Icon', () => {
    it('should display icon when provided', () => {
      fixture.componentRef.setInput('icon', 'star');
      fixture.detectChanges();

      const icon = getChipElement().query(By.css('.ds-chip__icon'));
      expect(icon).toBeTruthy();
    });

    it('should not display icon when not provided', () => {
      fixture.detectChanges();

      const icon = getChipElement().query(By.css('.ds-chip__icon'));
      expect(icon).toBeFalsy();
    });

    it('should not display icon when avatar is present', () => {
      fixture.componentRef.setInput('icon', 'star');
      fixture.componentRef.setInput('avatar', 'https://example.com/avatar.jpg');
      fixture.detectChanges();

      const icon = getChipElement().query(By.css('.ds-chip__icon'));
      expect(icon).toBeFalsy();
    });
  });

  describe('Avatar', () => {
    it('should display avatar when provided', () => {
      fixture.componentRef.setInput('avatar', 'https://example.com/avatar.jpg');
      fixture.detectChanges();

      const avatar = getChipElement().query(By.css('.ds-chip__avatar'));
      expect(avatar).toBeTruthy();
      expect(avatar.nativeElement.src).toBe('https://example.com/avatar.jpg');
      expect(avatar.nativeElement.alt).toBe('Test Chip');
    });

    it('should not display avatar when not provided', () => {
      fixture.detectChanges();

      const avatar = getChipElement().query(By.css('.ds-chip__avatar'));
      expect(avatar).toBeFalsy();
    });

    it('should prioritize avatar over icon', () => {
      fixture.componentRef.setInput('icon', 'star');
      fixture.componentRef.setInput('avatar', 'https://example.com/avatar.jpg');
      fixture.detectChanges();

      const avatar = getChipElement().query(By.css('.ds-chip__avatar'));
      const icon = getChipElement().query(By.css('.ds-chip__icon'));

      expect(avatar).toBeTruthy();
      expect(icon).toBeFalsy();
    });
  });

  describe('Removable', () => {
    it('should display remove button when removable is true', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const removeBtn = getChipElement().query(By.css('.ds-chip__remove'));
      expect(removeBtn).toBeTruthy();
    });

    it('should not display remove button when removable is false', () => {
      fixture.componentRef.setInput('removable', false);
      fixture.detectChanges();

      const removeBtn = getChipElement().query(By.css('.ds-chip__remove'));
      expect(removeBtn).toBeFalsy();
    });

    it('should not display remove button when disabled', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const removeBtn = getChipElement().query(By.css('.ds-chip__remove'));
      expect(removeBtn).toBeFalsy();
    });

    it('should emit removed event when remove button is clicked', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const removedSpy = jasmine.createSpy('removed');
      component.removed.subscribe(removedSpy);

      const removeBtn = getChipElement().query(By.css('.ds-chip__remove'));
      removeBtn.nativeElement.click();

      expect(removedSpy).toHaveBeenCalledTimes(1);
    });

    it('should stop propagation when remove button is clicked', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      const removeBtn = getChipElement().query(By.css('.ds-chip__remove'));
      removeBtn.nativeElement.click();

      expect(clickedSpy).not.toHaveBeenCalled();
    });

    it('should set aria-label on remove button', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const removeBtn = getChipElement().query(By.css('.ds-chip__remove'));
      expect(removeBtn.nativeElement.getAttribute('aria-label')).toBe('Remove Test Chip');
    });
  });

  describe('Clickable', () => {
    it('should apply clickable class when clickable is true', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--clickable');
    });

    it('should not apply clickable class when disabled', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getChipElement().nativeElement).not.toHaveClass('ds-chip--clickable');
    });

    it('should emit clicked event when chip is clicked', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      getChipElement().nativeElement.click();

      expect(clickedSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit selectedChange event when chip is clicked', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      const selectedChangeSpy = jasmine.createSpy('selectedChange');
      component.selectedChange.subscribe(selectedChangeSpy);

      getChipElement().nativeElement.click();

      expect(selectedChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should not emit events when chip is disabled', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      getChipElement().nativeElement.click();

      expect(clickedSpy).not.toHaveBeenCalled();
    });

    it('should set role="button" when clickable', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      expect(getChipElement().nativeElement.getAttribute('role')).toBe('button');
    });

    it('should set tabindex="0" when clickable', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      expect(getChipElement().nativeElement.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Selected state', () => {
    it('should apply selected class when selected is true', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--selected');
    });

    it('should set aria-selected when clickable and selected', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(getChipElement().nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should toggle selected state when clicked', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      const selectedChangeSpy = jasmine.createSpy('selectedChange');
      component.selectedChange.subscribe(selectedChangeSpy);

      getChipElement().nativeElement.click();
      expect(selectedChangeSpy).toHaveBeenCalledWith(true);

      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      getChipElement().nativeElement.click();
      expect(selectedChangeSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('Disabled state', () => {
    it('should apply disabled class when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getChipElement().nativeElement).toHaveClass('ds-chip--disabled');
    });

    it('should set aria-disabled when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getChipElement().nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set tabindex="-1" when disabled', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getChipElement().nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should not emit events when disabled', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const clickedSpy = jasmine.createSpy('clicked');
      const selectedChangeSpy = jasmine.createSpy('selectedChange');
      component.clicked.subscribe(clickedSpy);
      component.selectedChange.subscribe(selectedChangeSpy);

      getChipElement().nativeElement.click();

      expect(clickedSpy).not.toHaveBeenCalled();
      expect(selectedChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard navigation', () => {
    it('should handle Enter key when clickable', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      getChipElement().nativeElement.dispatchEvent(event);

      expect(clickedSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle Space key when clickable', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      const clickedSpy = jasmine.createSpy('clicked');
      component.clicked.subscribe(clickedSpy);

      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      getChipElement().nativeElement.dispatchEvent(event);

      expect(clickedSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle Delete key when removable', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const removedSpy = jasmine.createSpy('removed');
      component.removed.subscribe(removedSpy);

      const event = new KeyboardEvent('keydown', { key: 'Delete', bubbles: true });
      getChipElement().nativeElement.dispatchEvent(event);

      expect(removedSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle Backspace key when removable', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const removedSpy = jasmine.createSpy('removed');
      component.removed.subscribe(removedSpy);

      const event = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true });
      getChipElement().nativeElement.dispatchEvent(event);

      expect(removedSpy).toHaveBeenCalledTimes(1);
    });

    it('should not handle keyboard events when disabled', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('removable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const clickedSpy = jasmine.createSpy('clicked');
      const removedSpy = jasmine.createSpy('removed');
      component.clicked.subscribe(clickedSpy);
      component.removed.subscribe(removedSpy);

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      getChipElement().nativeElement.dispatchEvent(enterEvent);

      const deleteEvent = new KeyboardEvent('keydown', { key: 'Delete', bubbles: true });
      getChipElement().nativeElement.dispatchEvent(deleteEvent);

      expect(clickedSpy).not.toHaveBeenCalled();
      expect(removedSpy).not.toHaveBeenCalled();
    });
  });

  describe('Computed properties', () => {
    it('should compute chipClasses correctly', () => {
      fixture.componentRef.setInput('variant', 'outlined');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('color', 'primary');
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      const classes = component.chipClasses();
      expect(classes).toContain('ds-chip');
      expect(classes).toContain('ds-chip--outlined');
      expect(classes).toContain('ds-chip--lg');
      expect(classes).toContain('ds-chip--primary');
      expect(classes).toContain('ds-chip--clickable');
      expect(classes).toContain('ds-chip--selected');
    });

    it('should compute role correctly', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      expect(component.role()).toBe('button');

      fixture.componentRef.setInput('clickable', false);
      fixture.detectChanges();

      expect(component.role()).toBeNull();
    });

    it('should compute tabindex correctly', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      expect(component.tabindex()).toBe(0);

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.tabindex()).toBe(-1);

      fixture.componentRef.setInput('clickable', false);
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();

      expect(component.tabindex()).toBeNull();
    });

    it('should compute ariaSelected correctly', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(component.ariaSelected()).toBe(true);

      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      expect(component.ariaSelected()).toBe(false);

      fixture.componentRef.setInput('clickable', false);
      fixture.detectChanges();

      expect(component.ariaSelected()).toBeNull();
    });

    it('should compute ariaDisabled correctly', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.ariaDisabled()).toBe(true);

      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();

      expect(component.ariaDisabled()).toBeNull();
    });
  });
});
