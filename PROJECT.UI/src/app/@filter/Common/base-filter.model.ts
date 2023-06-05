export interface BaseFilter {
    CurrentPage: number;
    TotalPage: number;
    ItemCount: number;
    PageSize: number;
    KeySearch:any;
    IsLoading: boolean;
    Data: object;
}