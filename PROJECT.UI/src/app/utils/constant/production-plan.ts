export const PRODUCTION_PLAN_STEP = {
  DANG_CHUAN_BI: 0,
  TRINH_PHE_DUYET: 1,
  DUYET_CAP_PHONG: 2,
  DANG_THUC_HIEN: 3,
  DA_HOAN_THANH: 4,
  HUY_KE_HOACH: 5,
};

export const lstProductionPlanSteps = [
  {
    value: PRODUCTION_PLAN_STEP.DANG_CHUAN_BI,
    name: 'Đang chuẩn bị',
    class: 'tag tag--draft',
  },
  {
    value: PRODUCTION_PLAN_STEP.TRINH_PHE_DUYET,
    name: 'Chờ phê duyệt',
    class: 'tag tag--pending',
  },
  {
    value: PRODUCTION_PLAN_STEP.DUYET_CAP_PHONG,
    name: 'Duyệt cấp phòng',
    class: 'tag tag--pending',
  },
  {
    value: PRODUCTION_PLAN_STEP.DANG_THUC_HIEN,
    name: 'Đang thực hiện',
    class: 'tag tag--inprogress',
  },
  {
    value: PRODUCTION_PLAN_STEP.DA_HOAN_THANH,
    name: 'Đã hoàn thành',
    class: 'tag tag--done',
  },
  {
    value: PRODUCTION_PLAN_STEP.HUY_KE_HOACH,
    name: 'Huỷ kế hoạch',
    class: 'tag tag--canceled',
  },
];
