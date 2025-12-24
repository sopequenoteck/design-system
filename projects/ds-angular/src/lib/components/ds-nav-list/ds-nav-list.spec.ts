import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsNavList } from './ds-nav-list';
import { NavListGroup, NavListItem } from './ds-nav-list.types';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

describe('DsNavList', () => {
  let component: DsNavList;
  let fixture: ComponentFixture<DsNavList>;

  const mockItems: NavListItem[] = [
    { id: 'home', label: 'Accueil', icon: faHome },
    { id: 'profile', label: 'Profil', icon: faUser, badge: 5 },
    { id: 'settings', label: 'Paramètres', icon: faCog, disabled: true },
  ];

  const mockGroups: NavListGroup[] = [
    {
      id: 'main',
      title: 'Navigation',
      items: mockItems,
    },
    {
      id: 'sources',
      title: 'Sources',
      items: [
        { id: 'personal', label: 'Personnel', emoji: '👤', dotColor: '#3b82f6', badge: 12 },
        { id: 'work', label: 'Travail', emoji: '💼', dotColor: '#ef4444', badge: 3 },
      ],
    },
    {
      id: 'collapsible',
      title: 'Repliable',
      collapsible: true,
      collapsed: false,
      items: [
        { id: 'item1', label: 'Item 1' },
        { id: 'item2', label: 'Item 2' },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsNavList],
    }).compileComponents();

    fixture = TestBed.createComponent(DsNavList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('groups', mockGroups);
    fixture.detectChanges();
  });

  describe('Création', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display all groups', () => {
      expect(component.groups().length).toBe(3);
    });

    it('should have default size md', () => {
      expect(component.size()).toBe('md');
    });

    it('should have default ariaLabel', () => {
      expect(component.ariaLabel()).toBe('Navigation');
    });
  });

  describe('Active Item', () => {
    it('should have no active item by default', () => {
      expect(component.activeItemId()).toBeNull();
    });

    it('should detect active item correctly', () => {
      fixture.componentRef.setInput('activeItemId', 'home');
      fixture.detectChanges();

      expect(component.isActive(mockItems[0])).toBe(true);
      expect(component.isActive(mockItems[1])).toBe(false);
    });

    it('should apply active class', () => {
      fixture.componentRef.setInput('activeItemId', 'home');
      fixture.detectChanges();

      const classes = component.getItemClasses(mockItems[0]);
      expect(classes).toContain('nav-list-item--active');
    });
  });

  describe('Item Click', () => {
    it('should emit itemClick event on click', () => {
      const spy = spyOn(component.itemClick, 'emit');
      const event = new MouseEvent('click');

      component.handleItemClick(mockItems[0], mockGroups[0], event);

      expect(spy).toHaveBeenCalledWith({
        item: mockItems[0],
        group: mockGroups[0],
        event,
      });
    });

    it('should not emit itemClick for disabled items', () => {
      const spy = spyOn(component.itemClick, 'emit');
      const event = new MouseEvent('click');
      const preventDefault = spyOn(event, 'preventDefault');

      component.handleItemClick(mockItems[2], mockGroups[0], event); // disabled item

      expect(spy).not.toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalled();
    });

    it('should emit itemClick on Enter key', () => {
      const spy = spyOn(component.itemClick, 'emit');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      component.handleItemKeydown(mockItems[0], mockGroups[0], event);

      expect(spy).toHaveBeenCalled();
    });

    it('should emit itemClick on Space key', () => {
      const spy = spyOn(component.itemClick, 'emit');
      const event = new KeyboardEvent('keydown', { key: ' ' });

      component.handleItemKeydown(mockItems[0], mockGroups[0], event);

      expect(spy).toHaveBeenCalled();
    });

    it('should not emit itemClick on other keys', () => {
      const spy = spyOn(component.itemClick, 'emit');
      const event = new KeyboardEvent('keydown', { key: 'Tab' });

      component.handleItemKeydown(mockItems[0], mockGroups[0], event);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Disabled Items', () => {
    it('should apply disabled class', () => {
      const classes = component.getItemClasses(mockItems[2]);
      expect(classes).toContain('nav-list-item--disabled');
    });

    it('should not handle keydown for disabled items', () => {
      const spy = spyOn(component.itemClick, 'emit');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      component.handleItemKeydown(mockItems[2], mockGroups[0], event);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Collapsible Groups', () => {
    it('should detect non-collapsible groups', () => {
      expect(component.isGroupCollapsed(mockGroups[0])).toBe(false);
    });

    it('should respect initial collapsed state', () => {
      const collapsedGroup: NavListGroup = {
        id: 'test',
        title: 'Test',
        collapsible: true,
        collapsed: true,
        items: [],
      };

      expect(component.isGroupCollapsed(collapsedGroup)).toBe(true);
    });

    it('should toggle group collapsed state', () => {
      const event = new MouseEvent('click');
      const collapsibleGroup = mockGroups[2];

      expect(component.isGroupCollapsed(collapsibleGroup)).toBe(false);

      component.toggleGroup(collapsibleGroup, event);

      expect(component.isGroupCollapsed(collapsibleGroup)).toBe(true);
    });

    it('should emit groupToggle event', () => {
      const spy = spyOn(component.groupToggle, 'emit');
      const event = new MouseEvent('click');

      component.toggleGroup(mockGroups[2], event);

      expect(spy).toHaveBeenCalledWith({
        group: mockGroups[2],
        collapsed: true,
      });
    });

    it('should not toggle non-collapsible groups', () => {
      const spy = spyOn(component.groupToggle, 'emit');
      const event = new MouseEvent('click');

      component.toggleGroup(mockGroups[0], event);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('CSS Classes', () => {
    it('should apply size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.containerClasses()).toContain('ds-nav-list--lg');
    });

    it('should include base class', () => {
      expect(component.containerClasses()).toContain('ds-nav-list');
    });
  });

  describe('Items with Emoji', () => {
    it('should handle items with emoji', () => {
      const emojiItem = mockGroups[1].items[0];
      expect(emojiItem.emoji).toBe('👤');
      expect(emojiItem.icon).toBeUndefined();
    });
  });

  describe('Items with DotColor', () => {
    it('should handle items with dotColor', () => {
      const dotItem = mockGroups[1].items[0];
      expect(dotItem.dotColor).toBe('#3b82f6');
    });
  });

  describe('Items with Badge', () => {
    it('should handle items with badge', () => {
      const badgeItem = mockGroups[1].items[0];
      expect(badgeItem.badge).toBe(12);
    });

    it('should handle items with badge variant', () => {
      const itemWithVariant: NavListItem = {
        id: 'test',
        label: 'Test',
        badge: 5,
        badgeVariant: 'error',
      };

      expect(itemWithVariant.badgeVariant).toBe('error');
    });
  });

  describe('Group Header Action', () => {
    it('should emit groupAction event on action click', () => {
      const spy = spyOn(component.groupAction, 'emit');
      const event = new MouseEvent('click');
      const stopPropagation = spyOn(event, 'stopPropagation');

      component.handleGroupAction(mockGroups[0], event);

      expect(stopPropagation).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({
        group: mockGroups[0],
        event,
      });
    });
  });
});
