export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalRecord: number;
  totalPage: number;
}
export interface Account {
  id: number;
  userName: string;
  fullName: string;
  passWord: string;
  groupId: number;
  state: boolean;
  deviceId: string;
  deviceIdDayUpdate: Date;
  createDay: Date;
  updateDay: Date;
  createBy: string;
  updateBy: string;
}

export interface lstAccount {
  currentPage: number;
  pageSize: number;
  totalRecord: number;
  totalPage: number;
  data: Account[];
}