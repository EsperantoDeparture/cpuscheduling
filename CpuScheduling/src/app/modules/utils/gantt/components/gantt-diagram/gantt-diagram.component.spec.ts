import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttDiagramComponent } from './gantt-diagram.component';

describe('GanttDiagramComponent', () => {
  let component: GanttDiagramComponent;
  let fixture: ComponentFixture<GanttDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
