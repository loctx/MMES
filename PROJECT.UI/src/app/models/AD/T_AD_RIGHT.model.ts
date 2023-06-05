export interface T_AD_RIGHT{
    CODE: string;
    PARENT: string;
    NAME: string;
    C_ORDER : number;
    CREATE_BY: string;
    CREATE_DATE: Date;
    UPDATE_BY:string;
    UPDATE_DATE: Date;
}

export interface NodeRight{
    id:string,
    pId: string;
    name:string;
    checked:boolean;
    icon:string;
    open:boolean;
    companyCode: string
}
