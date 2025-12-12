import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export interface CarouselSlide {
  id: string;
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
}

export type CarouselEffect = 'slide' | 'fade';
export type CarouselDotsPosition = 'bottom' | 'top' | 'left' | 'right';

@Component({
  selector: 'ds-carousel',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-carousel.html',
  styleUrl: './ds-carousel.scss',
})
export class DsCarousel implements AfterViewInit, OnDestroy {
  // Config
  slides = input<CarouselSlide[]>([]);
  autoplay = input<boolean>(false);
  autoplaySpeed = input<number>(3000);
  effect = input<CarouselEffect>('slide');
  dots = input<boolean>(true);
  dotsPosition = input<CarouselDotsPosition>('bottom');
  arrows = input<boolean>(true);
  infinite = input<boolean>(true);
  pauseOnHover = input<boolean>(true);
  activeIndex = input<number>(0);

  // Events
  slideChange = output<{ index: number; slide: CarouselSlide }>();

  // ViewChild
  @ViewChild('track', { static: false }) trackElement?: ElementRef<HTMLDivElement>;
  @ViewChildren('slideElement') slideElements?: QueryList<ElementRef<HTMLDivElement>>;

  // Icons
  readonly icons = {
    left: faChevronLeft,
    right: faChevronRight,
  } as const;

  // Internal state
  readonly internalActiveIndex = signal<number>(0);
  readonly isPaused = signal<boolean>(false);
  readonly isTransitioning = signal<boolean>(false);
  private autoplayTimer: any = null;
  private startX = 0;
  private startY = 0;
  private isDragging = false;

  constructor() {
    // Sync external activeIndex with internal
    effect(() => {
      const extIndex = this.activeIndex();
      const totalSlides = this.slides().length;
      if (totalSlides > 0 && extIndex >= 0 && extIndex < totalSlides) {
        this.internalActiveIndex.set(extIndex);
      }
    });

    // Autoplay effect
    effect(() => {
      if (this.autoplay() && !this.isPaused()) {
        this.startAutoplay();
      } else {
        this.stopAutoplay();
      }
    });
  }

  ngAfterViewInit(): void {
    // Initialiser l'index actif
    const initialIndex = this.activeIndex();
    if (initialIndex >= 0 && initialIndex < this.slides().length) {
      this.internalActiveIndex.set(initialIndex);
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  readonly containerClasses = computed<string>(() => {
    const classes: string[] = ['ds-carousel'];
    classes.push(`ds-carousel--${this.effect()}`);
    classes.push(`ds-carousel--dots-${this.dotsPosition()}`);
    if (this.isTransitioning()) classes.push('ds-carousel--transitioning');
    return classes.join(' ');
  });

  readonly trackStyle = computed(() => {
    if (this.effect() === 'slide') {
      const offset = -this.internalActiveIndex() * 100;
      return { transform: `translateX(${offset}%)` };
    }
    return {};
  });

  slideClasses(index: number): string {
    const classes: string[] = ['ds-carousel__slide'];
    const active = this.internalActiveIndex();

    if (index === active) {
      classes.push('ds-carousel__slide--active');
    }

    if (this.effect() === 'fade') {
      classes.push('ds-carousel__slide--fade');
    }

    return classes.join(' ');
  }

  dotClasses(index: number): string {
    const classes: string[] = ['ds-carousel__dot'];
    if (index === this.internalActiveIndex()) {
      classes.push('ds-carousel__dot--active');
    }
    return classes.join(' ');
  }

  // Public methods
  next(): void {
    const totalSlides = this.slides().length;
    if (totalSlides === 0) return;

    const currentIndex = this.internalActiveIndex();
    let nextIndex = currentIndex + 1;

    if (nextIndex >= totalSlides) {
      nextIndex = this.infinite() ? 0 : currentIndex;
    }

    if (nextIndex !== currentIndex) {
      this.goTo(nextIndex);
    }
  }

  prev(): void {
    const totalSlides = this.slides().length;
    if (totalSlides === 0) return;

    const currentIndex = this.internalActiveIndex();
    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      prevIndex = this.infinite() ? totalSlides - 1 : currentIndex;
    }

    if (prevIndex !== currentIndex) {
      this.goTo(prevIndex);
    }
  }

  goTo(index: number): void {
    const totalSlides = this.slides().length;
    if (index < 0 || index >= totalSlides || index === this.internalActiveIndex()) {
      return;
    }

    this.isTransitioning.set(true);
    this.internalActiveIndex.set(index);

    const slide = this.slides()[index];
    this.slideChange.emit({ index, slide });

    // Reset transitioning flag
    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 300);

    // Reset autoplay
    if (this.autoplay()) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  pause(): void {
    this.isPaused.set(true);
    this.stopAutoplay();
  }

  play(): void {
    this.isPaused.set(false);
    if (this.autoplay()) {
      this.startAutoplay();
    }
  }

  onMouseEnter(): void {
    if (this.pauseOnHover() && this.autoplay()) {
      this.pause();
    }
  }

  onMouseLeave(): void {
    if (this.pauseOnHover() && this.autoplay()) {
      this.play();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case 'Home':
        event.preventDefault();
        this.goTo(0);
        break;
      case 'End':
        event.preventDefault();
        this.goTo(this.slides().length - 1);
        break;
    }
  }

  // Touch/swipe handlers
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.isDragging = false;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) {
      const deltaX = Math.abs(event.touches[0].clientX - this.startX);
      const deltaY = Math.abs(event.touches[0].clientY - this.startY);
      // Detect horizontal swipe
      if (deltaX > deltaY && deltaX > 10) {
        this.isDragging = true;
      }
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;

    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - this.startX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.prev();
      } else {
        this.next();
      }
    }

    this.isDragging = false;
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, this.autoplaySpeed());
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
}
