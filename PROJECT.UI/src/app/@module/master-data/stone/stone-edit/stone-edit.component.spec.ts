import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoneEditComponent } from './stone-edit.component';

describe('StoneEditComponent', () => {
  let component: StoneEditComponent;
  let fixture: ComponentFixture<StoneEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoneEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
