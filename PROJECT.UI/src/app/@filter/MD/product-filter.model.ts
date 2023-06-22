import { BaseFilter } from '../Common/base-filter.model';

export class ProductFilter extends BaseFilter {
  code:string = '';
  name: string = '';
  state: boolean | string = '';
  unitCode: string = '';
  typeCode: string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
