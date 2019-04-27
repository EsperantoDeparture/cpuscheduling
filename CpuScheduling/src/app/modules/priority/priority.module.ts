import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriorityInputFormComponent } from './components/forms/priority-input-form/priority-input-form.component';
import { PrioritySimulationComponent } from './components/priority-simulation/priority-simulation.component';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PriorityInputFormComponent, PrioritySimulationComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule
  ]
})
export class PriorityModule {}
