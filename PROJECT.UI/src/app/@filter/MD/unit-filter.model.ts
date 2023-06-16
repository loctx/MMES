import { BaseFilter } from "../Common/base-filter.model";

export class UnitFilter extends BaseFilter {}

export interface UnitFormParams {
    code: string,
    name: string
}