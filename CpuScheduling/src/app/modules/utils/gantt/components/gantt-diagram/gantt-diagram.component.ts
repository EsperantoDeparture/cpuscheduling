import { Component, OnInit, Input, Output } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gantt-diagram',
  templateUrl: './gantt-diagram.component.html',
  styleUrls: ['./gantt-diagram.component.scss']
})
export class GanttDiagramComponent implements OnInit {
  private _data: {
    name: string;
    end: number;
    color: string;
    width: number;
  }[];
  @Input() numberOfProcesses: number;
  @Output() colorsChanged = new EventEmitter();
  palette: any;
  constructor(private colorService: ColorService) {}

  ngOnInit() {}

  get data() {
    return this._data;
  }

  @Input()
  set data(
    d: {
      name: string;
      end: number;
      color: string;
      width: number;
    }[]
  ) {
    const palette = (this.palette = this.colorService.getPalette({
      count: this.numberOfProcesses,
      lightMin: 37
    }));
    const processes = new Set(d.map(dt => dt.name));
    const p: any = [];
    let i = 0;
    processes.forEach(process => {
      p[process] = palette[i];
      i++;
    });
    for (i = 0; i < d.length; i++) {
      d[i].color = p[d[i].name];
    }
    this._data = d;
    setTimeout(() => this.colorsChanged.emit(p), 100);
  }
}
