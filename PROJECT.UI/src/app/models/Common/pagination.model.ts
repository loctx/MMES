export interface Pagination {
    CurrentPage: number;
    TotalPage: number;
    PageSize: number;
    KeyWord:string;
    TotalRecord: number;
    Data?: object;
}