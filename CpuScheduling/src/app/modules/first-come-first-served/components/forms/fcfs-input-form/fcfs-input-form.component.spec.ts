import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcfsInputFormComponent } from './fcfs-input-form.component';

describe('FcfsInputFormComponent', () => {
  let component: FcfsInputFormComponent;
  let fixture: ComponentFixture<FcfsInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcfsInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcfsInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
