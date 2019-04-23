import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          width: 0,
          position: 'absolute'
        })
      ),
      transition('void <=> *', animate(225))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  page = '';
  pageFull = '';
  menuExpanded = false;
  constructor(public router: Router, public location: Location) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        try {
          this.pageFull = event.state.root.children[0].data['title'];
          this.page =
            event.state.root.children[0].data['title'].length > 24 &&
            window.innerWidth < 380
              ? event.state.root.children[0].data['title'].slice(0, 24) + '...'
              : event.state.root.children[0].data['title'];
        } catch (error) {
          this.page = '';
        }
      }
    });
  }

  ngOnInit() {}
}
