import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitFormEditComponent } from './unit-form-edit.component';

describe('UnitFormEditComponent', () => {
  let component: UnitFormEditComponent;
  let fixture: ComponentFixture<UnitFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitFormEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
