import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehiComponent } from './edit-vehi.component';

describe('EditVehiComponent', () => {
  let component: EditVehiComponent;
  let fixture: ComponentFixture<EditVehiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
