import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritySimulationComponent } from './priority-simulation.component';

describe('PrioritySimulationComponent', () => {
  let component: PrioritySimulationComponent;
  let fixture: ComponentFixture<PrioritySimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritySimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritySimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
