import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttDiagramComponent } from './components/gantt-diagram/gantt-diagram.component';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [GanttDiagramComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [GanttDiagramComponent]
})
export class GanttModule { }
