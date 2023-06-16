import { BaseFilter } from "../Common/base-filter.model";

export interface UnitFilter extends BaseFilter {}

export interface UnitFormParams {
    code: string,
    name: string
}