export interface BaseFilter {
    CurrentPage: number;
    TotalPage: number;
    PageSize: number;
    KeyWord:string;
    IsLoading?: boolean;
    Data?: object;
}