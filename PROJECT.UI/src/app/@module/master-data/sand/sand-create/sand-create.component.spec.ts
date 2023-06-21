import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandCreateComponent } from './sand-create.component';

describe('SandCreateComponent', () => {
  let component: SandCreateComponent;
  let fixture: ComponentFixture<SandCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
