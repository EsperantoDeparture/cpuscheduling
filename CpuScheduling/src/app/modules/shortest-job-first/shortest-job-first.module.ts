import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjfInputFormComponent } from './components/forms/sjf-input-form/sjf-input-form.component';
import { SjfSimulationComponent } from './components/sjf-simulation/sjf-simulation.component';

@NgModule({
  declarations: [SjfInputFormComponent, SjfSimulationComponent],
  imports: [
    CommonModule
  ]
})
export class ShortestJobFirstModule { }
