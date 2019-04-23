import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcfsSimulationComponent } from './fcfs-simulation.component';

describe('FcfsSimulationComponent', () => {
  let component: FcfsSimulationComponent;
  let fixture: ComponentFixture<FcfsSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcfsSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcfsSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
