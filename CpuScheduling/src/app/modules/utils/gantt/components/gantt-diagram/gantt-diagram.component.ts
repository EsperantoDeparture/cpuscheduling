import { Component, OnInit, Input, Output } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

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
  loading = false;
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
    this.loading = true;
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
    // Calculate width (in percentage) for each section of the diagram
    const burstSum = d.map(g => g.end).reduce((v1, v2) => v1 + v2);
    for (const g of d) {
      g.width = (g.end / burstSum) * 100;
    }
    this._data = d;
    setTimeout(() => {
      this.colorsChanged.emit(p);
      this.loading = false;
    }, 100);
  }
}
