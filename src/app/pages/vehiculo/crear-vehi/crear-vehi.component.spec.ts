import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVehiComponent } from './crear-vehi.component';

describe('CrearVehiComponent', () => {
  let component: CrearVehiComponent;
  let fixture: ComponentFixture<CrearVehiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearVehiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVehiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
