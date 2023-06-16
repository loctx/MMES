export interface T_MD_UNIT {
  Code: string;
  Name: string;
  ACTIVE: boolean;
}

import { Pagination } from '../Common/pagination.model';

export interface T_MD_UNIT_RESPONSE extends Pagination {
  Data: T_MD_UNIT[];
}
