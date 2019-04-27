import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RrInputFormComponent } from './components/forms/rr-input-form/rr-input-form.component';
import { RoundRobinComponent } from './components/round-robin/round-robin.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { GanttModule } from '../utils/gantt/gantt.module';

@NgModule({
  declarations: [RrInputFormComponent, RoundRobinComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    GanttModule,
    MatProgressSpinnerModule
  ]
})
export class RoundRobinModule {}
