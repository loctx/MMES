import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoneCreateComponent } from './stone-create.component';

describe('StoneCreateComponent', () => {
  let component: StoneCreateComponent;
  let fixture: ComponentFixture<StoneCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoneCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoneCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
