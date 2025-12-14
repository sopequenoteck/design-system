import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DsCarousel, CarouselSlide } from './ds-carousel';

describe('DsCarousel', () => {
  let component: DsCarousel;
  let fixture: ComponentFixture<DsCarousel>;

  const mockSlides: CarouselSlide[] = [
    { id: '1', image: '/img1.jpg', alt: 'Slide 1', title: 'Title 1', description: 'Description 1' },
    { id: '2', image: '/img2.jpg', alt: 'Slide 2', title: 'Title 2', description: 'Description 2' },
    { id: '3', image: '/img3.jpg', alt: 'Slide 3', title: 'Title 3', description: 'Description 3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(DsCarousel);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('slides', mockSlides);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render all slides', () => {
      const slides = fixture.nativeElement.querySelectorAll('.ds-carousel__slide');
      expect(slides.length).toBe(3);
    });

    it('should render slide images', () => {
      const images = fixture.nativeElement.querySelectorAll('.ds-carousel__image');
      expect(images.length).toBe(3);
      expect(images[0].src).toContain('/img1.jpg');
    });

    it('should render slide titles and descriptions', () => {
      const titles = fixture.nativeElement.querySelectorAll('.ds-carousel__title');
      const descriptions = fixture.nativeElement.querySelectorAll('.ds-carousel__description');
      expect(titles.length).toBe(3);
      expect(descriptions.length).toBe(3);
      expect(titles[0].textContent).toBe('Title 1');
      expect(descriptions[0].textContent).toBe('Description 1');
    });

    it('should mark first slide as active by default', () => {
      const activeSlides = fixture.nativeElement.querySelectorAll('.ds-carousel__slide--active');
      expect(activeSlides.length).toBe(1);
      expect(component.internalActiveIndex()).toBe(0);
    });

    it('should render navigation arrows by default', () => {
      const arrows = fixture.nativeElement.querySelectorAll('.ds-carousel__arrow');
      expect(arrows.length).toBe(2);
    });

    it('should hide arrows when arrows input is false', () => {
      fixture.componentRef.setInput('arrows', false);
      fixture.detectChanges();
      const arrows = fixture.nativeElement.querySelectorAll('.ds-carousel__arrow');
      expect(arrows.length).toBe(0);
    });

    it('should render dots by default', () => {
      const dots = fixture.nativeElement.querySelectorAll('.ds-carousel__dot');
      expect(dots.length).toBe(3);
    });

    it('should hide dots when dots input is false', () => {
      fixture.componentRef.setInput('dots', false);
      fixture.detectChanges();
      const dots = fixture.nativeElement.querySelectorAll('.ds-carousel__dot');
      expect(dots.length).toBe(0);
    });

    it('should apply correct effect class', () => {
      const container = fixture.nativeElement.querySelector('.ds-carousel');
      expect(container.classList.contains('ds-carousel--slide')).toBe(true);

      fixture.componentRef.setInput('effect', 'fade');
      fixture.detectChanges();
      expect(container.classList.contains('ds-carousel--fade')).toBe(true);
    });

    it('should apply correct dots position class', () => {
      const container = fixture.nativeElement.querySelector('.ds-carousel');
      expect(container.classList.contains('ds-carousel--dots-bottom')).toBe(true);

      fixture.componentRef.setInput('dotsPosition', 'top');
      fixture.detectChanges();
      expect(container.classList.contains('ds-carousel--dots-top')).toBe(true);
    });
  });

  describe('Navigation', () => {
    it('should navigate to next slide', () => {
      component.next();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(1);
    });

    it('should navigate to previous slide', () => {
      component.goTo(1);
      fixture.detectChanges();
      component.prev();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });

    it('should navigate to specific slide via goTo', () => {
      component.goTo(2);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(2);
    });

    it('should loop to first slide when next is called on last slide (infinite mode)', () => {
      fixture.componentRef.setInput('infinite', true);
      component.goTo(2);
      fixture.detectChanges();
      component.next();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });

    it('should not loop when infinite is false', () => {
      fixture.componentRef.setInput('infinite', false);
      component.goTo(2);
      fixture.detectChanges();
      component.next();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(2);
    });

    it('should loop to last slide when prev is called on first slide (infinite mode)', () => {
      fixture.componentRef.setInput('infinite', true);
      component.prev();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(2);
    });

    it('should not loop prev when infinite is false', () => {
      fixture.componentRef.setInput('infinite', false);
      component.prev();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });

    it('should emit slideChange event on navigation', () => {
      let emittedEvent: any = null;
      component.slideChange.subscribe((event) => {
        emittedEvent = event;
      });

      component.next();
      fixture.detectChanges();

      expect(emittedEvent).toBeTruthy();
      expect(emittedEvent.index).toBe(1);
      expect(emittedEvent.slide.id).toBe('2');
    });

    it('should not navigate to invalid index', () => {
      component.goTo(-1);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);

      component.goTo(10);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });

    it('should not navigate if already on target index', () => {
      let emitCount = 0;
      component.slideChange.subscribe(() => {
        emitCount++;
      });

      component.goTo(0);
      fixture.detectChanges();
      expect(emitCount).toBe(0);
    });
  });

  describe('Keyboard navigation', () => {
    it('should navigate next on ArrowRight', () => {
      const container = fixture.nativeElement.querySelector('.ds-carousel');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      container.dispatchEvent(event);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(1);
    });

    it('should navigate prev on ArrowLeft', () => {
      component.goTo(1);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-carousel');
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      container.dispatchEvent(event);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });

    it('should go to first slide on Home', () => {
      component.goTo(2);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-carousel');
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      container.dispatchEvent(event);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });

    it('should go to last slide on End', () => {
      const container = fixture.nativeElement.querySelector('.ds-carousel');
      const event = new KeyboardEvent('keydown', { key: 'End' });
      container.dispatchEvent(event);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(2);
    });
  });

  describe('Autoplay', () => {
    it('should auto-advance slides when autoplay is enabled', fakeAsync(() => {
      fixture.componentRef.setInput('autoplay', true);
      fixture.componentRef.setInput('autoplaySpeed', 1000);
      fixture.detectChanges();

      expect(component.internalActiveIndex()).toBe(0);

      tick(1000);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(1);

      tick(1000);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(2);

      tick(1000);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0); // Loop
    }));

    it('should pause autoplay on pause()', fakeAsync(() => {
      fixture.componentRef.setInput('autoplay', true);
      fixture.componentRef.setInput('autoplaySpeed', 1000);
      fixture.detectChanges();

      component.pause();
      fixture.detectChanges();

      tick(1000);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0); // No change
    }));

    it('should resume autoplay on play()', fakeAsync(() => {
      fixture.componentRef.setInput('autoplay', true);
      fixture.componentRef.setInput('autoplaySpeed', 1000);
      fixture.detectChanges();

      component.pause();
      fixture.detectChanges();

      tick(1000);
      expect(component.internalActiveIndex()).toBe(0);

      component.play();
      fixture.detectChanges();

      tick(1000);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(1);
    }));

    it('should pause on hover when pauseOnHover is true', () => {
      fixture.componentRef.setInput('autoplay', true);
      fixture.componentRef.setInput('pauseOnHover', true);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-carousel');
      container.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      expect(component.isPaused()).toBe(true);
    });

    it('should resume on mouse leave when pauseOnHover is true', () => {
      fixture.componentRef.setInput('autoplay', true);
      fixture.componentRef.setInput('pauseOnHover', true);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-carousel');
      container.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(component.isPaused()).toBe(true);

      container.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(component.isPaused()).toBe(false);
    });

    it('should not pause on hover when pauseOnHover is false', () => {
      fixture.componentRef.setInput('autoplay', true);
      fixture.componentRef.setInput('pauseOnHover', false);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-carousel');
      container.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      expect(component.isPaused()).toBe(false);
    });
  });

  describe('Dots interaction', () => {
    it('should navigate to slide when dot is clicked', () => {
      const dots = fixture.nativeElement.querySelectorAll('.ds-carousel__dot');
      (dots[2] as HTMLElement).click();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(2);
    });

    it('should mark active dot correctly', () => {
      component.goTo(1);
      fixture.detectChanges();

      const activeDots = fixture.nativeElement.querySelectorAll('.ds-carousel__dot--active');
      expect(activeDots.length).toBe(1);
    });
  });

  describe('Arrow interaction', () => {
    it('should navigate next when right arrow is clicked', () => {
      const rightArrow = fixture.nativeElement.querySelector('.ds-carousel__arrow--right');
      rightArrow.click();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(1);
    });

    it('should navigate prev when left arrow is clicked', () => {
      component.goTo(1);
      fixture.detectChanges();

      const leftArrow = fixture.nativeElement.querySelector('.ds-carousel__arrow--left');
      leftArrow.click();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });
  });

  describe('Touch/Swipe', () => {
    // Helper to create mock touch events
    const createMockTouchEvent = (type: string, clientX: number, clientY: number) => ({
      touches: [{ clientX, clientY }],
      changedTouches: [{ clientX, clientY }],
    } as unknown as TouchEvent);

    it('should detect swipe left (next)', () => {
      // Simulate swipe left: start at 200, end at 50 (delta = -150)
      component.onTouchStart(createMockTouchEvent('touchstart', 200, 100));
      component.onTouchMove(createMockTouchEvent('touchmove', 100, 100));
      component.onTouchEnd(createMockTouchEvent('touchend', 50, 100));

      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(1);
    });

    it('should detect swipe right (prev)', () => {
      component.goTo(1);
      fixture.detectChanges();

      // Simulate swipe right: start at 100, end at 250 (delta = +150)
      component.onTouchStart(createMockTouchEvent('touchstart', 100, 100));
      component.onTouchMove(createMockTouchEvent('touchmove', 200, 100));
      component.onTouchEnd(createMockTouchEvent('touchend', 250, 100));

      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });

    it('should not navigate on small swipe', () => {
      // Simulate small swipe: start at 100, end at 130 (delta = 30 < 50 threshold)
      component.onTouchStart(createMockTouchEvent('touchstart', 100, 100));
      component.onTouchMove(createMockTouchEvent('touchmove', 120, 100));
      component.onTouchEnd(createMockTouchEvent('touchend', 130, 100));

      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0); // No change
    });
  });

  describe('ARIA attributes', () => {
    it('should have correct role and aria attributes on container', () => {
      const container = fixture.nativeElement.querySelector('.ds-carousel');
      expect(container.getAttribute('role')).toBe('region');
      expect(container.getAttribute('aria-roledescription')).toBe('carousel');
      expect(container.getAttribute('aria-label')).toContain('3 slides');
    });

    it('should have correct ARIA attributes on slides', () => {
      const slides = fixture.nativeElement.querySelectorAll('.ds-carousel__slide');
      expect(slides[0].getAttribute('role')).toBe('listitem');
      expect(slides[0].getAttribute('aria-hidden')).toBe('false');
      expect(slides[1].getAttribute('aria-hidden')).toBe('true');
    });

    it('should have correct ARIA attributes on dots', () => {
      const dots = fixture.nativeElement.querySelectorAll('.ds-carousel__dot');
      expect(dots[0].getAttribute('role')).toBe('tab');
      expect(dots[0].getAttribute('aria-selected')).toBe('true');
      expect(dots[1].getAttribute('aria-selected')).toBe('false');
    });

    it('should have correct aria-label on arrows', () => {
      const leftArrow = fixture.nativeElement.querySelector('.ds-carousel__arrow--left');
      const rightArrow = fixture.nativeElement.querySelector('.ds-carousel__arrow--right');
      expect(leftArrow.getAttribute('aria-label')).toBe('Previous slide');
      expect(rightArrow.getAttribute('aria-label')).toBe('Next slide');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty slides array', () => {
      fixture.componentRef.setInput('slides', []);
      fixture.detectChanges();

      const slides = fixture.nativeElement.querySelectorAll('.ds-carousel__slide');
      expect(slides.length).toBe(0);

      component.next();
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });

    it('should handle single slide', () => {
      fixture.componentRef.setInput('slides', [mockSlides[0]]);
      fixture.detectChanges();

      const arrows = fixture.nativeElement.querySelectorAll('.ds-carousel__arrow');
      const dots = fixture.nativeElement.querySelectorAll('.ds-carousel__dot');
      expect(arrows.length).toBe(0); // Hidden for single slide
      expect(dots.length).toBe(0); // Hidden for single slide
    });

    it('should sync external activeIndex input', () => {
      fixture.componentRef.setInput('activeIndex', 2);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(2);
    });

    it('should ignore invalid external activeIndex', () => {
      fixture.componentRef.setInput('activeIndex', 10);
      fixture.detectChanges();
      expect(component.internalActiveIndex()).toBe(0);
    });
  });

  describe('Cleanup', () => {
    it('should stop autoplay on destroy', fakeAsync(() => {
      fixture.componentRef.setInput('autoplay', true);
      fixture.componentRef.setInput('autoplaySpeed', 1000);
      fixture.detectChanges();

      fixture.destroy();
      tick(1000);
      // No error should be thrown
    }));
  });
});
