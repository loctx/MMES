import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoneIndexComponent } from './stone-index.component';

describe('StoneIndexComponent', () => {
  let component: StoneIndexComponent;
  let fixture: ComponentFixture<StoneIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoneIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoneIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
