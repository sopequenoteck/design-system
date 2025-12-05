import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DsTabs, TabItem } from './ds-tabs';

describe('DsTabs', () => {
  let component: DsTabs;
  let fixture: ComponentFixture<DsTabs>;

  const mockTabs: TabItem[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true },
    { id: 'tab4', label: 'Tab 4' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(DsTabs);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render all tabs', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();

    const tabButtons = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'));
    expect(tabButtons.length).toBe(4);
  });

  it('should set first tab as active by default', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();

    const firstTab = fixture.debugElement.query(By.css('.ds-tabs__tab'));
    expect(firstTab.nativeElement.classList.contains('ds-tabs__tab--active')).toBe(true);
    expect(firstTab.nativeElement.getAttribute('aria-selected')).toBe('true');
    expect(firstTab.nativeElement.getAttribute('tabindex')).toBe('0');
  });

  it('should activate tab when activeTabId input is set', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTabId', 'tab2');
    fixture.detectChanges();

    const secondTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[1];
    expect(secondTab.nativeElement.classList.contains('ds-tabs__tab--active')).toBe(true);
  });

  it('should emit tabChanged when clicking a tab', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();

    let changedTab: TabItem | undefined;
    component.tabChanged.subscribe((tab) => {
      changedTab = tab;
    });

    const secondTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[1];
    secondTab.nativeElement.click();

    expect(changedTab).toEqual(mockTabs[1]);
  });

  it('should not emit tabChanged when clicking disabled tab', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();

    let emitCount = 0;
    component.tabChanged.subscribe(() => {
      emitCount++;
    });

    const disabledTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[2];
    disabledTab.nativeElement.click();

    expect(emitCount).toBe(0);
  });

  it('should apply disabled class to disabled tabs', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();

    const disabledTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[2];
    expect(disabledTab.nativeElement.classList.contains('ds-tabs__tab--disabled')).toBe(true);
    expect(disabledTab.nativeElement.disabled).toBe(true);
  });

  it('should navigate with ArrowRight key', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();

    const firstTab = fixture.debugElement.query(By.css('.ds-tabs__tab')).nativeElement;
    firstTab.focus();

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    firstTab.dispatchEvent(event);
    fixture.detectChanges();

    const secondTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[1];
    expect(secondTab.nativeElement.classList.contains('ds-tabs__tab--active')).toBe(true);
  });

  it('should navigate with ArrowLeft key', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTabId', 'tab2');
    fixture.detectChanges();

    const secondTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[1].nativeElement;
    secondTab.focus();

    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    secondTab.dispatchEvent(event);
    fixture.detectChanges();

    const firstTab = fixture.debugElement.query(By.css('.ds-tabs__tab'));
    expect(firstTab.nativeElement.classList.contains('ds-tabs__tab--active')).toBe(true);
  });

  it('should skip disabled tabs when navigating with keyboard', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTabId', 'tab2');
    fixture.detectChanges();

    const secondTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[1].nativeElement;
    secondTab.focus();

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    secondTab.dispatchEvent(event);
    fixture.detectChanges();

    // Should skip tab3 (disabled) and go to tab4
    const fourthTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[3];
    expect(fourthTab.nativeElement.classList.contains('ds-tabs__tab--active')).toBe(true);
  });

  it('should navigate to first tab with Home key', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTabId', 'tab4');
    fixture.detectChanges();

    const fourthTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[3].nativeElement;
    fourthTab.focus();

    const event = new KeyboardEvent('keydown', { key: 'Home' });
    fourthTab.dispatchEvent(event);
    fixture.detectChanges();

    const firstTab = fixture.debugElement.query(By.css('.ds-tabs__tab'));
    expect(firstTab.nativeElement.classList.contains('ds-tabs__tab--active')).toBe(true);
  });

  it('should navigate to last enabled tab with End key', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();

    const firstTab = fixture.debugElement.query(By.css('.ds-tabs__tab')).nativeElement;
    firstTab.focus();

    const event = new KeyboardEvent('keydown', { key: 'End' });
    firstTab.dispatchEvent(event);
    fixture.detectChanges();

    // Should go to tab4 (last enabled, skipping disabled tab3)
    const fourthTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[3];
    expect(fourthTab.nativeElement.classList.contains('ds-tabs__tab--active')).toBe(true);
  });

  it('should render tab with icon', () => {
    const tabsWithIcon: TabItem[] = [
      { id: 'tab1', label: 'Tab 1', icon: 'fa-solid fa-home' },
    ];
    fixture.componentRef.setInput('tabs', tabsWithIcon);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.ds-tabs__icon'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.classList.contains('fa-solid')).toBe(true);
  });

  it('should set correct aria attributes', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();

    const firstTab = fixture.debugElement.query(By.css('.ds-tabs__tab')).nativeElement;
    expect(firstTab.getAttribute('role')).toBe('tab');
    expect(firstTab.getAttribute('aria-selected')).toBe('true');
    expect(firstTab.getAttribute('aria-controls')).toBe('panel-tab1');
    expect(firstTab.getAttribute('id')).toBe('tab-tab1');
  });

  it('should position indicator based on active tab', () => {
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTabId', 'tab2');
    fixture.detectChanges();

    const indicator = fixture.debugElement.query(By.css('.ds-tabs__indicator')).nativeElement;
    expect(indicator.style.transform).toContain('translateX(100%)');
  });

  describe('Edge cases', () => {
    it('should handle invalid activeTabId gracefully', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.componentRef.setInput('activeTabId', 'invalid-id');
      fixture.detectChanges();

      expect(component.activeIndex()).toBe(0);
    });

    it('should handle empty tabs array without crashing', () => {
      fixture.componentRef.setInput('tabs', []);
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should not navigate when all remaining tabs are disabled', () => {
      const allDisabledExceptFirst: TabItem[] = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2', disabled: true },
        { id: 'tab3', label: 'Tab 3', disabled: true },
      ];
      fixture.componentRef.setInput('tabs', allDisabledExceptFirst);
      fixture.detectChanges();

      const firstTab = fixture.debugElement.query(By.css('.ds-tabs__tab')).nativeElement;
      firstTab.focus();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      firstTab.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.activeIndex()).toBe(0);
    });

    it('should ignore keydown when target is not a tab', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      const initialIndex = component.activeIndex();
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      document.body.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.activeIndex()).toBe(initialIndex);
    });

    it('should ignore non-navigation keys', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      const firstTab = fixture.debugElement.query(By.css('.ds-tabs__tab')).nativeElement;
      firstTab.focus();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      firstTab.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.activeIndex()).toBe(0);
    });
  });

  describe('selectedChange output', () => {
    it('should emit selectedChange with correct tab on selection', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      let emittedTab: TabItem | undefined;
      component.tabChanged.subscribe((tab) => {
        emittedTab = tab;
      });

      component['selectTab'](mockTabs[1], 1);

      expect(emittedTab).toEqual(mockTabs[1]);
    });
  });

  describe('ARIA attributes', () => {
    it('should set aria-selected false for inactive tabs', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      const secondTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[1].nativeElement;
      expect(secondTab.getAttribute('aria-selected')).toBe('false');
    });

    it('should set tabindex -1 for inactive tabs', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      const secondTab = fixture.debugElement.queryAll(By.css('.ds-tabs__tab'))[1].nativeElement;
      expect(secondTab.getAttribute('tabindex')).toBe('-1');
    });

    it('should have role tablist on container', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('.ds-tabs__list')).nativeElement;
      expect(tablist.getAttribute('role')).toBe('tablist');
    });
  });

  describe('TrackBy function', () => {
    it('should track tabs by id', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      const trackByResult = component['trackByTabId'](0, mockTabs[0]);
      expect(trackByResult).toBe('tab1');
    });
  });

  describe('Internal state management', () => {
    it('should update internal active index when tab is selected', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      component['selectTab'](mockTabs[1], 1);
      expect(component['internalActiveIndex']()).toBe(1);
    });

    it('should compute activeTab correctly', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      expect(component['activeTab']()).toEqual(mockTabs[0]);
    });

    it('should fallback to first tab when activeTab computation fails', () => {
      fixture.componentRef.setInput('tabs', mockTabs);
      fixture.detectChanges();

      // Force invalid state
      component['internalActiveIndex'].set(999);
      expect(component['activeTab']()).toEqual(mockTabs[0]);
    });
  });
});
