import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandIndexComponent } from './sand-index.component';

describe('SandIndexComponent', () => {
  let component: SandIndexComponent;
  let fixture: ComponentFixture<SandIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
