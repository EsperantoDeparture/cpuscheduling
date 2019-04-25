import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RrInputFormComponent } from './rr-input-form.component';

describe('RrInputFormComponent', () => {
  let component: RrInputFormComponent;
  let fixture: ComponentFixture<RrInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RrInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RrInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
