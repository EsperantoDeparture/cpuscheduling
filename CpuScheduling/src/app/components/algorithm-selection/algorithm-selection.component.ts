import { Component, OnInit } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-algorithm-selection',
  templateUrl: './algorithm-selection.component.html',
  styleUrls: ['./algorithm-selection.component.scss'],animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0', height: 0 }),
        animate('0.5s ease-out', style({ opacity: '1', height: '*' }))
      ])
    ])
  ]
})
export class AlgorithmSelectionComponent implements OnInit {
  cols = 1;

  constructor() {
    this.cols = window.innerWidth < 768 ? 1 : window.innerWidth < 1140 ? 2 : 3;
    window.onresize = () => {
      this.cols =
        window.innerWidth < 768 ? 1 : window.innerWidth < 1140 ? 2 : 3;
    };
  }

  ngOnInit() {
  }

}
