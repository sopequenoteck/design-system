import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsCheckboxList } from './ds-checkbox-list';
import { CheckboxListItem } from './ds-checkbox-list.types';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

describe('DsCheckboxList', () => {
  let component: DsCheckboxList;
  let fixture: ComponentFixture<DsCheckboxList>;

  const mockItems: CheckboxListItem[] = [
    { id: 'home', label: 'Accueil', icon: faHome, checked: true },
    { id: 'profile', label: 'Profil', icon: faUser, checked: false },
    { id: 'settings', label: 'Paramètres', icon: faCog, checked: false, disabled: true },
  ];

  const mockItemsWithEmoji: CheckboxListItem[] = [
    { id: 'today', label: "Aujourd'hui", emoji: '📅', checked: true },
    { id: 'inbox', label: 'Boîte de réception', emoji: '📥', checked: false },
    { id: 'archive', label: 'Archives', emoji: '📦', checked: true, helper: 'Anciennes tâches' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCheckboxList],
    }).compileComponents();

    fixture = TestBed.createComponent(DsCheckboxList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', [...mockItems]);
    fixture.detectChanges();
  });

  describe('Création', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display all items', () => {
      expect(component.items().length).toBe(3);
    });

    it('should have default size md', () => {
      expect(component.size()).toBe('md');
    });

    it('should have default ariaLabel', () => {
      expect(component.ariaLabel()).toBe('Liste de sélection');
    });

    it('should not show select all by default', () => {
      expect(component.showSelectAll()).toBe(false);
    });
  });

  describe('Item Change', () => {
    it('should emit itemChange event when item is toggled', () => {
      const spy = spyOn(component.itemChange, 'emit');

      component.onItemCheckedChange(mockItems[1], true, 1);

      expect(spy).toHaveBeenCalledWith({
        item: { ...mockItems[1], checked: true },
        checked: true,
        index: 1,
      });
    });

    it('should emit change event with all items', () => {
      const spy = spyOn(component.change, 'emit');

      component.onItemCheckedChange(mockItems[1], true, 1);

      expect(spy).toHaveBeenCalled();
      const emittedEvent = spy.calls.mostRecent().args[0];
      expect(emittedEvent.checkedIds).toContain('home');
      expect(emittedEvent.checkedIds).toContain('profile');
    });

    it('should update items model', () => {
      component.onItemCheckedChange(mockItems[1], true, 1);

      expect(component.items()[1].checked).toBe(true);
    });

    it('should not change disabled items', () => {
      const spy = spyOn(component.itemChange, 'emit');

      component.onItemCheckedChange(mockItems[2], true, 2);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Select All', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('showSelectAll', true);
      fixture.detectChanges();
    });

    it('should show select all checkbox', () => {
      expect(component.showSelectAll()).toBe(true);
    });

    it('should check all items when select all is clicked', () => {
      component.onSelectAllChange(true);

      const items = component.items();
      // Non-disabled items should be checked
      expect(items[0].checked).toBe(true);
      expect(items[1].checked).toBe(true);
      // Disabled item should remain unchanged
      expect(items[2].checked).toBe(false);
    });

    it('should uncheck all items when select all is unchecked', () => {
      // First check all
      component.onSelectAllChange(true);
      // Then uncheck all
      component.onSelectAllChange(false);

      const items = component.items();
      expect(items[0].checked).toBe(false);
      expect(items[1].checked).toBe(false);
    });

    it('should emit change event on select all', () => {
      const spy = spyOn(component.change, 'emit');

      component.onSelectAllChange(true);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Computed States', () => {
    it('should compute allChecked correctly when all checked', () => {
      fixture.componentRef.setInput('items', [
        { id: '1', label: 'Item 1', checked: true },
        { id: '2', label: 'Item 2', checked: true },
      ]);
      fixture.detectChanges();

      expect(component.allChecked()).toBe(true);
    });

    it('should compute allChecked as false when some unchecked', () => {
      expect(component.allChecked()).toBe(false);
    });

    it('should compute someChecked correctly (indeterminate)', () => {
      expect(component.someChecked()).toBe(true);
    });

    it('should compute checkedIds correctly', () => {
      expect(component.checkedIds()).toContain('home');
      expect(component.checkedIds()).not.toContain('profile');
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled class to item', () => {
      const classes = component.getItemClasses(mockItems[2]);
      expect(classes).toContain('checkbox-list-item--disabled');
    });

    it('should apply checked class to checked item', () => {
      const classes = component.getItemClasses(mockItems[0]);
      expect(classes).toContain('checkbox-list-item--checked');
    });

    it('should disable entire list when disabled input is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const spy = spyOn(component.itemChange, 'emit');
      component.onItemCheckedChange(mockItems[1], true, 1);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should apply disabled class to container', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.containerClasses()).toContain('ds-checkbox-list--disabled');
    });
  });

  describe('CSS Classes', () => {
    it('should apply size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.containerClasses()).toContain('ds-checkbox-list--lg');
    });

    it('should include base class', () => {
      expect(component.containerClasses()).toContain('ds-checkbox-list');
    });
  });

  describe('Items with Emoji', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', [...mockItemsWithEmoji]);
      fixture.detectChanges();
    });

    it('should handle items with emoji', () => {
      const emojiItem = component.items()[0];
      expect(emojiItem.emoji).toBe('📅');
      expect(emojiItem.icon).toBeUndefined();
    });

    it('should handle items with helper text', () => {
      const helperItem = component.items()[2];
      expect(helperItem.helper).toBe('Anciennes tâches');
    });
  });

  describe('ID Generation', () => {
    it('should generate unique item IDs', () => {
      const id1 = component.getItemId(mockItems[0], 0);
      const id2 = component.getItemId(mockItems[1], 1);

      expect(id1).not.toBe(id2);
      expect(id1).toContain('item-home');
      expect(id2).toContain('item-profile');
    });
  });

  describe('Empty List', () => {
    it('should handle empty items array', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();

      expect(component.items().length).toBe(0);
      expect(component.allChecked()).toBe(false);
      expect(component.someChecked()).toBe(false);
    });
  });
});
