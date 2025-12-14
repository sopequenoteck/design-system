import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { DsCarousel, CarouselSlide } from './ds-carousel';

const meta: Meta<DsCarousel> = {
  title: 'Components/Data/Carousel',
  component: DsCarousel,
  tags: ['autodocs'],
  argTypes: {
    slides: {
      control: 'object',
      description: 'Array of slides to display',
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay',
    },
    autoplaySpeed: {
      control: 'number',
      description: 'Autoplay speed in milliseconds',
    },
    effect: {
      control: 'select',
      options: ['slide', 'fade'],
      description: 'Transition effect',
    },
    dots: {
      control: 'boolean',
      description: 'Show navigation dots',
    },
    dotsPosition: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      description: 'Position of navigation dots',
    },
    arrows: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    infinite: {
      control: 'boolean',
      description: 'Enable infinite loop',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause autoplay on hover',
    },
    activeIndex: {
      control: 'number',
      description: 'Active slide index',
    },
    slideChange: {
      action: 'slideChange',
      description: 'Event emitted when slide changes',
    },
  },
};

export default meta;
type Story = StoryObj<DsCarousel>;

const defaultSlides: CarouselSlide[] = [
  {
    id: '1',
    image: 'https://picsum.photos/800/400?random=1',
    alt: 'Landscape 1',
    title: 'Beautiful Mountains',
    description: 'Explore stunning mountain landscapes around the world',
  },
  {
    id: '2',
    image: 'https://picsum.photos/800/400?random=2',
    alt: 'Landscape 2',
    title: 'Ocean Views',
    description: 'Discover breathtaking ocean and beach scenery',
  },
  {
    id: '3',
    image: 'https://picsum.photos/800/400?random=3',
    alt: 'Landscape 3',
    title: 'City Lights',
    description: 'Experience vibrant urban nightlife and architecture',
  },
  {
    id: '4',
    image: 'https://picsum.photos/800/400?random=4',
    alt: 'Landscape 4',
    title: 'Forest Trails',
    description: 'Wander through lush green forests and trails',
  },
];

/**
 * Default carousel with slide effect
 */
export const Default: Story = {
  args: {
    slides: defaultSlides,
    autoplay: false,
    autoplaySpeed: 3000,
    effect: 'slide',
    dots: true,
    dotsPosition: 'bottom',
    arrows: true,
    infinite: true,
    pauseOnHover: true,
    activeIndex: 0,
  },
  render: (args) => ({
    props: args,
    template: `<ds-carousel ${argsToTemplate(args)} />`,
  }),
};

/**
 * Carousel with autoplay enabled
 */
export const Autoplay: Story = {
  args: {
    ...Default.args,
    autoplay: true,
    autoplaySpeed: 2000,
  },
};

/**
 * Carousel with fade effect
 */
export const FadeEffect: Story = {
  args: {
    ...Default.args,
    effect: 'fade',
  },
};

/**
 * Carousel without navigation arrows
 */
export const NoArrows: Story = {
  args: {
    ...Default.args,
    arrows: false,
  },
};

/**
 * Carousel without navigation dots
 */
export const NoDots: Story = {
  args: {
    ...Default.args,
    dots: false,
  },
};

/**
 * Carousel with dots on top
 */
export const DotsTop: Story = {
  args: {
    ...Default.args,
    dotsPosition: 'top',
  },
};

/**
 * Carousel with dots on left
 */
export const DotsLeft: Story = {
  args: {
    ...Default.args,
    dotsPosition: 'left',
  },
};

/**
 * Carousel with dots on right
 */
export const DotsRight: Story = {
  args: {
    ...Default.args,
    dotsPosition: 'right',
  },
};

/**
 * Carousel with minimal UI (no arrows, no dots)
 */
export const Minimal: Story = {
  args: {
    ...Default.args,
    arrows: false,
    dots: false,
  },
};

/**
 * Non-infinite carousel (doesn't loop)
 */
export const NonInfinite: Story = {
  args: {
    ...Default.args,
    infinite: false,
  },
};

/**
 * Carousel with only images (no titles/descriptions)
 */
export const ImagesOnly: Story = {
  args: {
    ...Default.args,
    slides: [
      { id: '1', image: 'https://picsum.photos/800/400?random=5', alt: 'Image 1' },
      { id: '2', image: 'https://picsum.photos/800/400?random=6', alt: 'Image 2' },
      { id: '3', image: 'https://picsum.photos/800/400?random=7', alt: 'Image 3' },
    ],
  },
};

/**
 * Single slide (arrows and dots hidden automatically)
 */
export const SingleSlide: Story = {
  args: {
    ...Default.args,
    slides: [defaultSlides[0]],
  },
};

/**
 * Fast autoplay (1 second interval)
 */
export const FastAutoplay: Story = {
  args: {
    ...Default.args,
    autoplay: true,
    autoplaySpeed: 1000,
  },
};

/**
 * Slow autoplay (5 seconds interval)
 */
export const SlowAutoplay: Story = {
  args: {
    ...Default.args,
    autoplay: true,
    autoplaySpeed: 5000,
  },
};

/**
 * Autoplay without pause on hover
 */
export const AutoplayNoPause: Story = {
  args: {
    ...Default.args,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
  },
};

/**
 * Carousel with controlled active index
 */
export const ControlledIndex: Story = {
  args: {
    ...Default.args,
    activeIndex: 2,
  },
};

/**
 * Carousel with many slides
 */
export const ManySlides: Story = {
  args: {
    ...Default.args,
    slides: [
      ...defaultSlides,
      {
        id: '5',
        image: 'https://picsum.photos/800/400?random=8',
        alt: 'Slide 5',
        title: 'Desert Dunes',
        description: 'Witness the beauty of vast desert landscapes',
      },
      {
        id: '6',
        image: 'https://picsum.photos/800/400?random=9',
        alt: 'Slide 6',
        title: 'Winter Wonderland',
        description: 'Experience the magic of snowy winter scenes',
      },
      {
        id: '7',
        image: 'https://picsum.photos/800/400?random=10',
        alt: 'Slide 7',
        title: 'Tropical Paradise',
        description: 'Relax in exotic tropical destinations',
      },
    ],
  },
};

/**
 * Complete example with all features
 */
export const Complete: Story = {
  args: {
    slides: defaultSlides,
    autoplay: true,
    autoplaySpeed: 3000,
    effect: 'slide',
    dots: true,
    dotsPosition: 'bottom',
    arrows: true,
    infinite: true,
    pauseOnHover: true,
    activeIndex: 0,
  },
  render: (args) => ({
    props: {
      ...args,
      onSlideChange: (event: any) => {
        console.log('Slide changed:', event);
      },
    },
    template: `
      <div style="max-width: 900px; margin: 0 auto;">
        <ds-carousel
          [slides]="slides"
          [autoplay]="autoplay"
          [autoplaySpeed]="autoplaySpeed"
          [effect]="effect"
          [dots]="dots"
          [dotsPosition]="dotsPosition"
          [arrows]="arrows"
          [infinite]="infinite"
          [pauseOnHover]="pauseOnHover"
          [activeIndex]="activeIndex"
          (slideChange)="onSlideChange($event)"
        />
      </div>
    `,
  }),
};

/**
 * Responsive carousel (scales on mobile)
 */
export const Responsive: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 100%; padding: 20px;">
        <h3>Desktop View (800px)</h3>
        <div style="max-width: 800px; margin-bottom: 40px;">
          <ds-carousel ${argsToTemplate(args)} />
        </div>

        <h3>Tablet View (600px)</h3>
        <div style="max-width: 600px; margin-bottom: 40px;">
          <ds-carousel ${argsToTemplate(args)} />
        </div>

        <h3>Mobile View (400px)</h3>
        <div style="max-width: 400px;">
          <ds-carousel ${argsToTemplate(args)} />
        </div>
      </div>
    `,
  }),
};

/**
 * Themed carousel (Light/Dark/Custom)
 */
export const Themed: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px;">
        <div class="theme-light" style="padding: 20px; background: var(--background-main);">
          <h3>Light Theme</h3>
          <ds-carousel ${argsToTemplate(args)} />
        </div>

        <div class="theme-dark" style="padding: 20px; background: var(--background-main);">
          <h3 style="color: var(--text-default);">Dark Theme</h3>
          <ds-carousel ${argsToTemplate(args)} />
        </div>

        <div class="theme-custom" style="padding: 20px; background: var(--background-main);">
          <h3 style="color: var(--text-default);">Custom Theme</h3>
          <ds-carousel ${argsToTemplate(args)} />
        </div>
      </div>
    `,
  }),
};
