import { Component, signal } from '@angular/core';
import { DsCarousel } from 'ds-angular';

/**
 * Page de test isolée pour ds-carousel.
 * Utilisée par les tests e2e Playwright.
 */
@Component({
  selector: 'app-carousel-test',
  standalone: true,
  imports: [DsCarousel],
  template: `
    <!-- Test: Default Carousel -->
    <div class="test-section" data-testid="carousel-default">
      <h3>Default</h3>
      <ds-carousel [slides]="defaultSlides" />
    </div>

    <!-- Test: Carousel Single Slide -->
    <div class="test-section" data-testid="carousel-single-slide">
      <h3>Single Slide</h3>
      <ds-carousel [slides]="singleSlide" />
    </div>

    <!-- Test: Carousel No Arrows -->
    <div class="test-section" data-testid="carousel-no-arrows">
      <h3>No Arrows</h3>
      <ds-carousel [slides]="defaultSlides" [arrows]="false" />
    </div>

    <!-- Test: Carousel No Dots -->
    <div class="test-section" data-testid="carousel-no-dots">
      <h3>No Dots</h3>
      <ds-carousel [slides]="defaultSlides" [dots]="false" />
    </div>

    <!-- Test: Carousel Dots Top -->
    <div class="test-section" data-testid="carousel-dots-top">
      <h3>Dots Top</h3>
      <ds-carousel [slides]="defaultSlides" dotsPosition="top" />
    </div>

    <!-- Test: Carousel Dots Left -->
    <div class="test-section" data-testid="carousel-dots-left">
      <h3>Dots Left</h3>
      <ds-carousel [slides]="defaultSlides" dotsPosition="left" />
    </div>

    <!-- Test: Carousel Dots Right -->
    <div class="test-section" data-testid="carousel-dots-right">
      <h3>Dots Right</h3>
      <ds-carousel [slides]="defaultSlides" dotsPosition="right" />
    </div>

    <!-- Test: Carousel Autoplay -->
    <div class="test-section" data-testid="carousel-autoplay">
      <h3>Autoplay (2s)</h3>
      <ds-carousel [slides]="defaultSlides" [autoplay]="true" [autoplaySpeed]="2000" />
    </div>

    <!-- Test: Carousel Autoplay No Pause -->
    <div class="test-section" data-testid="carousel-autoplay-no-pause">
      <h3>Autoplay No Pause on Hover</h3>
      <ds-carousel
        [slides]="defaultSlides"
        [autoplay]="true"
        [autoplaySpeed]="2000"
        [pauseOnHover]="false"
      />
    </div>

    <!-- Test: Carousel Non-Infinite -->
    <div class="test-section" data-testid="carousel-non-infinite">
      <h3>Non-Infinite</h3>
      <ds-carousel [slides]="defaultSlides" [infinite]="false" />
    </div>

    <!-- Test: Carousel Fade Effect -->
    <div class="test-section" data-testid="carousel-fade-effect">
      <h3>Fade Effect</h3>
      <ds-carousel [slides]="defaultSlides" effect="fade" />
    </div>

    <!-- Test: Carousel Minimal -->
    <div class="test-section" data-testid="carousel-minimal">
      <h3>Minimal (No Arrows, No Dots)</h3>
      <ds-carousel [slides]="defaultSlides" [arrows]="false" [dots]="false" />
    </div>

    <!-- Test: Carousel Images Only -->
    <div class="test-section" data-testid="carousel-images-only">
      <h3>Images Only</h3>
      <ds-carousel [slides]="imagesOnly" />
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 24px;
    }
    .test-section {
      margin-bottom: 32px;
      padding: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }
    h3 {
      margin: 0 0 16px 0;
      font-size: 1rem;
      color: #374151;
    }
    ds-carousel {
      height: 300px;
    }
  `]
})
export class CarouselTestPage {
  defaultSlides = [
    {
      id: 'slide-1',
      image: 'https://picsum.photos/800/400?random=1',
      alt: 'First slide image',
      title: 'First Slide',
      description: 'This is the first slide description'
    },
    {
      id: 'slide-2',
      image: 'https://picsum.photos/800/400?random=2',
      alt: 'Second slide image',
      title: 'Second Slide',
      description: 'This is the second slide description'
    },
    {
      id: 'slide-3',
      image: 'https://picsum.photos/800/400?random=3',
      alt: 'Third slide image',
      title: 'Third Slide',
      description: 'This is the third slide description'
    },
    {
      id: 'slide-4',
      image: 'https://picsum.photos/800/400?random=4',
      alt: 'Fourth slide image',
      title: 'Fourth Slide',
      description: 'This is the fourth slide description'
    }
  ];

  singleSlide = [
    {
      id: 'single-slide',
      image: 'https://picsum.photos/800/400?random=5',
      alt: 'Single slide image',
      title: 'Single Slide',
      description: 'This carousel has only one slide'
    }
  ];

  imagesOnly = [
    { id: 'img-1', image: 'https://picsum.photos/800/400?random=6', alt: 'Image 1' },
    { id: 'img-2', image: 'https://picsum.photos/800/400?random=7', alt: 'Image 2' },
    { id: 'img-3', image: 'https://picsum.photos/800/400?random=8', alt: 'Image 3' }
  ];
}
