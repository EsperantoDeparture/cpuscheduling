import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttDiagramComponent } from './components/gantt-diagram/gantt-diagram.component';

@NgModule({
  declarations: [GanttDiagramComponent],
  imports: [
    CommonModule
  ],
  exports: [GanttDiagramComponent]
})
export class GanttModule { }
