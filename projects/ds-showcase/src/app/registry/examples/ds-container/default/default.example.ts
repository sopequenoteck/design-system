import { Component } from '@angular/core';
import { DsContainer } from 'ds-angular';

@Component({
  selector: 'example-ds-container-default',
  standalone: true,
  imports: [DsContainer],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsContainerDefaultExample {}
