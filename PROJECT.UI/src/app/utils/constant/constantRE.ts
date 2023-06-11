export enum EREASON_EXPORT {
  XUAT_HANG = 'XUAT_HANG',
}
export const REASONS_EXPORT = [
  {
    value: EREASON_EXPORT.XUAT_HANG,
    name: 'Xuất hàng',
  },
];

export enum EACTION {
  TAO_MOI = 'TAO_MOI',
  CAP_NHAT = 'CAP_NHAT',
  XOA = 'XOA',
  DANG_CHUAN_BI = 'DANG_CHUAN_BI',
  TRINH_PHE_DUYET = 'TRINH_PHE_DUYET',
  DANG_THUC_HIEN = 'DANG_THUC_HIEN',
  DA_HOAN_THANH = 'DA_HOAN_THANH',
  HUY_KE_HOACH = 'HUY_KE_HOACH',
}

export const ACTIONS = [
  {
    value: EACTION.TAO_MOI,
    name: 'Tạo mới',
  },
  {
    value: EACTION.CAP_NHAT,
    name: 'Cập nhật',
  },
  {
    value: EACTION.DANG_CHUAN_BI,
    name: 'Đang chuẩn bị',
    class: 'tag tag--draft',
  },
  {
    value: EACTION.TRINH_PHE_DUYET,
    name: 'Trình phê duyệt',
    class: 'tag tag--pending',
  },
  {
    value: EACTION.DANG_THUC_HIEN,
    name: 'Đang thực hiện',
    class: 'tag tag--done',
  },
  {
    value: EACTION.DA_HOAN_THANH,
    name: 'Đã hoàn thành',
    class: 'tag tag--done',
  },
  {
    value: EACTION.HUY_KE_HOACH,
    name: 'Hủy kế hoạch',
    class: 'tag tag--canceled',
  },
];
