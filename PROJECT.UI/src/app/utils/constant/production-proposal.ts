export const PRODUCTION_PROPOSAL_STEP = {
  DANG_CHUAN_BI: 0,
  CHO_PHE_DUYET: 1,
  DUYET_CAP_PHONG: 2,
  DUOC_PHE_DUYET: 3,
  DA_HOAN_THANH: 4,
  HUY_KE_HOACH: 5,
};

export const lstProductionProposalSteps = [
  {
    value: PRODUCTION_PROPOSAL_STEP.DANG_CHUAN_BI,
    name: 'Đang chuẩn bị',
    class: 'tag tag--draft',
  },
  {
    value: PRODUCTION_PROPOSAL_STEP.CHO_PHE_DUYET,
    name: 'Chờ phê duyệt',
    class: 'tag tag--pending',
  },
  {
    value: PRODUCTION_PROPOSAL_STEP.DUYET_CAP_PHONG,
    name: 'Duyệt cấp phòng',
    class: 'tag tag--done',
  },
  {
    value: PRODUCTION_PROPOSAL_STEP.DUOC_PHE_DUYET,
    name: 'Được phê duyệt',
    class: 'tag tag--done',
  },
  {
    value: PRODUCTION_PROPOSAL_STEP.DA_HOAN_THANH,
    name: 'Đã hoàn thành',
    class: 'tag tag--done',
  },
  {
    value: PRODUCTION_PROPOSAL_STEP.HUY_KE_HOACH,
    name: 'Huỷ kế hoạch',
    class: 'tag tag--canceled',
  },
];
