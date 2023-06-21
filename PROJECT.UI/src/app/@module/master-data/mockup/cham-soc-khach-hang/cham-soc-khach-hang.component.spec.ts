import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamSocKhachHangComponent } from './cham-soc-khach-hang.component';

describe('ChamSocKhachHangComponent', () => {
  let component: ChamSocKhachHangComponent;
  let fixture: ComponentFixture<ChamSocKhachHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamSocKhachHangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamSocKhachHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
