import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLanTronComponent } from './create-lan-tron.component';

describe('CreateLanTronComponent', () => {
  let component: CreateLanTronComponent;
  let fixture: ComponentFixture<CreateLanTronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLanTronComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLanTronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
