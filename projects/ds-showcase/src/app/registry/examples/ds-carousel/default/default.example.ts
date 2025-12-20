import { Component, input } from '@angular/core';
import { DsCarousel, CarouselSlide } from 'ds-angular';

@Component({
  selector: 'example-ds-carousel-default',
  standalone: true,
  imports: [DsCarousel],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsCarouselDefaultExample {
  autoplay = input<boolean>(false);
  arrows = input<boolean>(true);
  dots = input<boolean>(true);

  slides: CarouselSlide[] = [
    { id: '1', image: 'https://picsum.photos/800/400?random=1', alt: 'Slide 1', title: 'First Slide' },
    { id: '2', image: 'https://picsum.photos/800/400?random=2', alt: 'Slide 2', title: 'Second Slide' },
    { id: '3', image: 'https://picsum.photos/800/400?random=3', alt: 'Slide 3', title: 'Third Slide' }
  ];
}
