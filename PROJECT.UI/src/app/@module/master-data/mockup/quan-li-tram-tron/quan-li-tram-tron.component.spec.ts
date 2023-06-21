import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiTramTronComponent } from './quan-li-tram-tron.component';

describe('QuanLiTramTronComponent', () => {
  let component: QuanLiTramTronComponent;
  let fixture: ComponentFixture<QuanLiTramTronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLiTramTronComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLiTramTronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
