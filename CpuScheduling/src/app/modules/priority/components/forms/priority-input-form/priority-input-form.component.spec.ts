import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityInputFormComponent } from './priority-input-form.component';

describe('PriorityInputFormComponent', () => {
  let component: PriorityInputFormComponent;
  let fixture: ComponentFixture<PriorityInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
