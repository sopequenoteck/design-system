import { Component, input } from '@angular/core';
import { DsTimeline, TimelineItem } from 'ds-angular';

@Component({
  selector: 'example-ds-timeline-default',
  standalone: true,
  imports: [DsTimeline],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsTimelineDefaultExample {
  mode = input<'left' | 'right' | 'alternate'>('left');

  items: TimelineItem[] = [
    { content: 'Commande passée', date: '10:00' },
    { content: 'Paiement confirmé', date: '10:05' },
    { content: 'En préparation', date: '10:30' },
    { content: 'Expédié', date: '14:00' }
  ];
}
