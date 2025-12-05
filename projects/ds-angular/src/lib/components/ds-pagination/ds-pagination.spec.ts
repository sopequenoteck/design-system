import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsPagination, PageChangeEvent } from './ds-pagination';

describe('DsPagination', () => {
  let component: DsPagination;
  let fixture: ComponentFixture<DsPagination>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(DsPagination);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('totalItems', 100);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Computed properties', () => {
    it('should calculate total pages correctly', () => {
      fixture.componentRef.setInput('totalItems', 95);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      expect(component.totalPages()).toBe(10);
    });

    it('should calculate total pages as 1 for empty data', () => {
      fixture.componentRef.setInput('totalItems', 0);
      fixture.detectChanges();
      expect(component.totalPages()).toBe(1);
    });

    it('should normalize current page to valid range', () => {
      fixture.componentRef.setInput('totalItems', 50);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 10);
      fixture.detectChanges();
      expect(component.normalizedCurrentPage()).toBe(5);
    });

    it('should calculate start item correctly', () => {
      fixture.componentRef.setInput('totalItems', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 3);
      fixture.detectChanges();
      expect(component.startItem()).toBe(21);
    });

    it('should calculate end item correctly', () => {
      fixture.componentRef.setInput('totalItems', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 3);
      fixture.detectChanges();
      expect(component.endItem()).toBe(30);
    });

    it('should calculate end item for last partial page', () => {
      fixture.componentRef.setInput('totalItems', 95);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 10);
      fixture.detectChanges();
      expect(component.endItem()).toBe(95);
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('totalItems', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 5);
      fixture.detectChanges();
    });

    it('should allow going to previous page', () => {
      expect(component.canGoPrevious()).toBe(true);
    });

    it('should allow going to next page', () => {
      expect(component.canGoNext()).toBe(true);
    });

    it('should not allow previous on first page', () => {
      fixture.componentRef.setInput('currentPage', 1);
      fixture.detectChanges();
      expect(component.canGoPrevious()).toBe(false);
    });

    it('should not allow next on last page', () => {
      fixture.componentRef.setInput('currentPage', 10);
      fixture.detectChanges();
      expect(component.canGoNext()).toBe(false);
    });

    it('should emit page change on goToPage', () => {
      let emittedEvent: PageChangeEvent | null = null;
      component.pageChange.subscribe((event) => (emittedEvent = event));

      component.goToPage(3);

      expect(emittedEvent).not.toBeNull();
      expect(emittedEvent!.page).toBe(3);
      expect(emittedEvent!.pageSize).toBe(10);
    });

    it('should emit page change on goToFirst', () => {
      let emittedEvent: PageChangeEvent | null = null;
      component.pageChange.subscribe((event) => (emittedEvent = event));

      component.goToFirst();

      expect(emittedEvent!.page).toBe(1);
    });

    it('should emit page change on goToLast', () => {
      let emittedEvent: PageChangeEvent | null = null;
      component.pageChange.subscribe((event) => (emittedEvent = event));

      component.goToLast();

      expect(emittedEvent!.page).toBe(10);
    });

    it('should emit page change on goToPrevious', () => {
      let emittedEvent: PageChangeEvent | null = null;
      component.pageChange.subscribe((event) => (emittedEvent = event));

      component.goToPrevious();

      expect(emittedEvent!.page).toBe(4);
    });

    it('should emit page change on goToNext', () => {
      let emittedEvent: PageChangeEvent | null = null;
      component.pageChange.subscribe((event) => (emittedEvent = event));

      component.goToNext();

      expect(emittedEvent!.page).toBe(6);
    });

    it('should not emit when already on target page', () => {
      let emitCount = 0;
      component.pageChange.subscribe(() => emitCount++);

      component.goToPage(5);

      expect(emitCount).toBe(0);
    });

    it('should not navigate when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      let emitCount = 0;
      component.pageChange.subscribe(() => emitCount++);

      component.goToPage(3);

      expect(emitCount).toBe(0);
    });
  });

  describe('Visible pages', () => {
    it('should show all pages when total is less than max', () => {
      fixture.componentRef.setInput('totalItems', 30);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('maxVisiblePages', 5);
      fixture.detectChanges();

      expect(component.visiblePages()).toEqual([1, 2, 3]);
    });

    it('should show correct range in middle', () => {
      fixture.componentRef.setInput('totalItems', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 5);
      fixture.componentRef.setInput('maxVisiblePages', 5);
      fixture.detectChanges();

      expect(component.visiblePages()).toEqual([3, 4, 5, 6, 7]);
    });

    it('should show ellipsis at start when needed', () => {
      fixture.componentRef.setInput('totalItems', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 5);
      fixture.componentRef.setInput('maxVisiblePages', 5);
      fixture.detectChanges();

      expect(component.showStartEllipsis()).toBe(true);
    });

    it('should show ellipsis at end when needed', () => {
      fixture.componentRef.setInput('totalItems', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 5);
      fixture.componentRef.setInput('maxVisiblePages', 5);
      fixture.detectChanges();

      expect(component.showEndEllipsis()).toBe(true);
    });

    it('should not show start ellipsis on first pages', () => {
      fixture.componentRef.setInput('totalItems', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 1);
      fixture.componentRef.setInput('maxVisiblePages', 5);
      fixture.detectChanges();

      expect(component.showStartEllipsis()).toBe(false);
    });

    it('should not show end ellipsis on last pages', () => {
      fixture.componentRef.setInput('totalItems', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 10);
      fixture.componentRef.setInput('maxVisiblePages', 5);
      fixture.detectChanges();

      expect(component.showEndEllipsis()).toBe(false);
    });
  });

  describe('DOM rendering', () => {
    it('should render navigation element with aria-label', () => {
      const nav = compiled.querySelector('nav[role="navigation"]');
      expect(nav).toBeTruthy();
      expect(nav?.getAttribute('aria-label')).toBe('Pagination');
    });

    it('should render info text', () => {
      fixture.componentRef.setInput('totalItems', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('currentPage', 1);
      fixture.detectChanges();

      const info = compiled.querySelector('.ds-pagination__info');
      expect(info?.textContent?.trim()).toContain('1 - 10 sur 100');
    });

    it('should render page buttons', () => {
      const pageButtons = compiled.querySelectorAll('.ds-pagination__btn--page');
      expect(pageButtons.length).toBeGreaterThan(0);
    });

    it('should mark current page with aria-current', () => {
      fixture.componentRef.setInput('currentPage', 1);
      fixture.detectChanges();

      const activeButton = compiled.querySelector('[aria-current="page"]');
      expect(activeButton).toBeTruthy();
      expect(activeButton?.textContent?.trim()).toBe('1');
    });

    it('should render first/last buttons when showFirstLast is true', () => {
      fixture.componentRef.setInput('showFirstLast', true);
      fixture.detectChanges();

      const firstBtn = compiled.querySelector('.ds-pagination__btn--first');
      const lastBtn = compiled.querySelector('.ds-pagination__btn--last');
      expect(firstBtn).toBeTruthy();
      expect(lastBtn).toBeTruthy();
    });

    it('should not render first/last buttons when showFirstLast is false', () => {
      fixture.componentRef.setInput('showFirstLast', false);
      fixture.detectChanges();

      const firstBtn = compiled.querySelector('.ds-pagination__btn--first');
      const lastBtn = compiled.querySelector('.ds-pagination__btn--last');
      expect(firstBtn).toBeFalsy();
      expect(lastBtn).toBeFalsy();
    });

    it('should render page size selector when enabled', () => {
      fixture.componentRef.setInput('showPageSizeSelector', true);
      fixture.detectChanges();

      const selector = compiled.querySelector('.ds-pagination__size-select');
      expect(selector).toBeTruthy();
    });

    it('should not render page size selector by default', () => {
      const selector = compiled.querySelector('.ds-pagination__size-select');
      expect(selector).toBeFalsy();
    });

    it('should disable buttons when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-pagination--disabled');
      expect(container).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-pagination--sm');
      expect(container).toBeTruthy();
    });

    it('should apply md size class by default', () => {
      const container = compiled.querySelector('.ds-pagination--md');
      expect(container).toBeTruthy();
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const container = compiled.querySelector('.ds-pagination--lg');
      expect(container).toBeTruthy();
    });
  });

  describe('Page size change', () => {
    it('should emit pageSizeChange on select change', () => {
      fixture.componentRef.setInput('showPageSizeSelector', true);
      fixture.detectChanges();

      let emittedSize = 0;
      component.pageSizeChange.subscribe((size) => (emittedSize = size));

      const select = compiled.querySelector('.ds-pagination__size-select') as HTMLSelectElement;
      select.value = '25';
      select.dispatchEvent(new Event('change'));

      expect(emittedSize).toBe(25);
    });
  });

  describe('Keyboard navigation', () => {
    it('should navigate on Enter key', () => {
      let emittedEvent: PageChangeEvent | null = null;
      component.pageChange.subscribe((event) => (emittedEvent = event));

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onPageKeydown(event, 3);

      expect(emittedEvent!.page).toBe(3);
    });

    it('should navigate on Space key', () => {
      let emittedEvent: PageChangeEvent | null = null;
      component.pageChange.subscribe((event) => (emittedEvent = event));

      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.onPageKeydown(event, 3);

      expect(emittedEvent!.page).toBe(3);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on navigation buttons', () => {
      const prevBtn = compiled.querySelector('.ds-pagination__btn--prev');
      const nextBtn = compiled.querySelector('.ds-pagination__btn--next');

      expect(prevBtn?.getAttribute('aria-label')).toBeTruthy();
      expect(nextBtn?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-label on page buttons', () => {
      const pageButtons = compiled.querySelectorAll('.ds-pagination__btn--page');
      pageButtons.forEach((btn) => {
        expect(btn.getAttribute('aria-label')).toMatch(/Page \d+/);
      });
    });
  });
});
