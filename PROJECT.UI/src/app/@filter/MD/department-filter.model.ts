import { BaseFilter } from '../Common/base-filter.model';

export class DepartmentFilter extends BaseFilter {
    code:string = '';
    name: string = '';
    state: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
