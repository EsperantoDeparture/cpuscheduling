import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SjfInputFormComponent } from './sjf-input-form.component';

describe('SjfInputFormComponent', () => {
  let component: SjfInputFormComponent;
  let fixture: ComponentFixture<SjfInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SjfInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SjfInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
