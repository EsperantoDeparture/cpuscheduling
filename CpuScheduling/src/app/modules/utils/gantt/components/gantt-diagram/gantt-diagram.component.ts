import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gantt-diagram',
  templateUrl: './gantt-diagram.component.html',
  styleUrls: ['./gantt-diagram.component.scss']
})
export class GanttDiagramComponent implements OnInit {
  @Input() data: {
    name: string;
    end: number;
    color: string;
    width: number;
  }[];
  constructor() {}

  ngOnInit() {}
}
