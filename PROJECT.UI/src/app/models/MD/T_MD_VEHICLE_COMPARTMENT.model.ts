import { T_MD_VEHICLE } from "./T_MD_VEHICLE.model";

export interface T_MD_VEHICLE_COMPARTMENT{
    CODE:string;
    VEHICLE_CODE :string;
    SEQ_NUMBER :string;
    CAPACITY :number;
    Vehicle : T_MD_VEHICLE;
    CREATE_BY: string;
    CREATE_DATE: Date;
    UPDATE_BY:string;
    UPDATE_DATE: Date;
}