import { BaseFilter } from '../Common/base-filter.model';

export class ProductFilter extends BaseFilter {
  code:string = '';
  name: string = '';
  unitCode: string = '';
  typeCode: string = '';
}
