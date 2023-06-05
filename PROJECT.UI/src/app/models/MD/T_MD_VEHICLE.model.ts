import { T_MD_VEHICLE_COMPARTMENT } from "./T_MD_VEHICLE_COMPARTMENT.model";

export interface T_MD_VEHICLE{
    CODE :string;
    TRANSUNIT_CODE :string;
    UNIT: string;
    ACTIVE : boolean;
    OIC_PBATCH :string;
    OIC_PTRIP :string;
    CAPACITY : number;
    TRANSMODE_CODE:string;
    VehicleCompartment : T_MD_VEHICLE_COMPARTMENT[];
    CREATE_BY: string;
    CREATE_DATE: Date;
    UPDATE_BY:string;
    UPDATE_DATE: Date;
}
