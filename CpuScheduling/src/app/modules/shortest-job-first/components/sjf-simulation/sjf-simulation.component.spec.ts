import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SjfSimulationComponent } from './sjf-simulation.component';

describe('SjfSimulationComponent', () => {
  let component: SjfSimulationComponent;
  let fixture: ComponentFixture<SjfSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SjfSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SjfSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
