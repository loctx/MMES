import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachDonHangComponent } from './danh-sach-don-hang.component';

describe('DanhSachDonHangComponent', () => {
  let component: DanhSachDonHangComponent;
  let fixture: ComponentFixture<DanhSachDonHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhSachDonHangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhSachDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
