export interface T_AD_ORGANIZE {
    COMPANY_CODE: string;
    PARENT_CODE: string;
    NAME: string;
    TYPE: string;
    C_ORDER: number;
    PLANT_CODE: string;
    EMAIL: string;
    PHONE: string;
    PROJECT: string;
    IS_SEND_TO_SAP_IMMEDIATE: boolean;
    IS_DCNB_AFTER: boolean;
    IS_DCNB_BEFORE: boolean;
    USER_EGAS: string;
    PASS_EGAS: string;
    LUONG_CANH_BAO: number;
    IS_CANH_BAO_GAN_NGAN: boolean;
    LUONG_TON_KHO_MIN: number;
    CREATE_BY: string;
    CREATE_DATE: Date;
    UPDATE_BY: string;
    UPDATE_DATE: Date;
}

export interface NodeOrganize {
    id: string,
    pId: string;
    name: string;
    checked: boolean;
    icon: string;
    open: boolean;
    companyCode: string
}
