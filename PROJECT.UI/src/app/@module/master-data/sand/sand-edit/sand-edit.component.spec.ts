import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandEditComponent } from './sand-edit.component';

describe('SandEditComponent', () => {
  let component: SandEditComponent;
  let fixture: ComponentFixture<SandEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
