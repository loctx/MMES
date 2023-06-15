import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitFormCreateComponent } from './unit-form-create.component';

describe('UnitFormCreateComponent', () => {
  let component: UnitFormCreateComponent;
  let fixture: ComponentFixture<UnitFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitFormCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
