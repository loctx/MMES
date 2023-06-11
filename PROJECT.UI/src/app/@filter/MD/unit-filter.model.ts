import { BaseFilter } from "../Common/base-filter.model";

export interface UnitFilter extends BaseFilter {}

export interface BaseFormUnit {
    code: string;
    name: string;
}