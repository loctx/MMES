export const ITEM_FORMULA_STATE = {
  DANG_CHUAN_BI: 0,
  GUI_PHE_DUYET: 1,
  DUYET_CAP_PHONG: 2,
  DA_PHE_DUYET: 3,
  DANG_THUC_HIEN: 4,
  HUY_CONG_THUC: 5,
};

export const lstSateItemFormula = [
  {
    value: ITEM_FORMULA_STATE.DANG_CHUAN_BI,
    name: 'Đang chuẩn bị',
    className: 'tag tag--draft',
  },
  {
    value: ITEM_FORMULA_STATE.GUI_PHE_DUYET,
    name: 'Gửi phê duyệt',
    className: 'tag tag--pending',
  },
  {
    value: ITEM_FORMULA_STATE.DUYET_CAP_PHONG,
    name: 'Duyệt cấp phòng',
    className: 'tag tag--inprogress',
  },
  {
    value: ITEM_FORMULA_STATE.DA_PHE_DUYET,
    name: 'Đã phê duyệt',
    className: 'tag tag--inprogress',
  },
  {
    value: ITEM_FORMULA_STATE.DANG_THUC_HIEN,
    name: 'Đang thực hiện',
    className: 'tag tag--done',
  },
  {
    value: ITEM_FORMULA_STATE.HUY_CONG_THUC,
    name: 'Hủy công thức',
    className: 'tag tag--canceled',
  },
];
