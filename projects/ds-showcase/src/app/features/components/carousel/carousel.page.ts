import { Component, signal, computed } from '@angular/core';
import { DsCarousel, CarouselSlide, CarouselEffect } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsCarouselDefinition } from '../../../registry/definitions/ds-carousel.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-carousel-page',
  standalone: true,
  imports: [DsCarousel, DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">&lt;{{ definition.selector }}&gt;</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Carousel avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <div class="carousel-container">
              <ds-carousel
                [slides]="slides"
                [effect]="demoEffect()"
                [autoplay]="demoAutoplay()"
                [dots]="demoDots()"
                [arrows]="demoArrows()"
                [infinite]="demoInfinite()"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Autoplay</h3>
          <p class="demo-block__desc">Carousel avec défilement automatique.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="carousel-container">
              <ds-carousel
                [slides]="slides"
                [autoplay]="true"
                [autoplaySpeed]="3000"
                [pauseOnHover]="true"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Fade Effect</h3>
          <p class="demo-block__desc">Transition en fondu.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="carousel-container">
              <ds-carousel
                [slides]="slides"
                effect="fade"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Custom Dots Position</h3>
          <p class="demo-block__desc">Position personnalisée des indicateurs.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="carousel-container">
              <ds-carousel
                [slides]="slides"
                dotsPosition="top"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Without Navigation</h3>
          <p class="demo-block__desc">Carousel sans flèches ni dots (autoplay uniquement).</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="carousel-container">
              <ds-carousel
                [slides]="slides"
                [arrows]="false"
                [dots]="false"
                [autoplay]="true"
              />
            </div>
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .carousel-container { max-width: 600px; height: 300px; }
  `]
})
export class CarouselPage {
  definition = DsCarouselDefinition;

  slides: CarouselSlide[] = [
    { id: '1', image: 'https://picsum.photos/800/400?random=1', alt: 'Slide 1', title: 'First Slide' },
    { id: '2', image: 'https://picsum.photos/800/400?random=2', alt: 'Slide 2', title: 'Second Slide' },
    { id: '3', image: 'https://picsum.photos/800/400?random=3', alt: 'Slide 3', title: 'Third Slide' },
    { id: '4', image: 'https://picsum.photos/800/400?random=4', alt: 'Slide 4', title: 'Fourth Slide' },
  ];

  defaultValues = signal<ControlValues>({
    effect: 'slide',
    autoplay: false,
    dots: true,
    arrows: true,
    infinite: true,
  });

  demoEffect = computed(() => this.defaultValues()['effect'] as CarouselEffect);
  demoAutoplay = computed(() => this.defaultValues()['autoplay'] as boolean);
  demoDots = computed(() => this.defaultValues()['dots'] as boolean);
  demoArrows = computed(() => this.defaultValues()['arrows'] as boolean);
  demoInfinite = computed(() => this.defaultValues()['infinite'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
